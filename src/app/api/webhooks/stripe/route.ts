import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed' || event.type === 'customer.subscription.updated') {
      let priceId = '';
      let customerEmail = '';

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        priceId = lineItems.data[0]?.price?.id || '';
        customerEmail = session.customer_details?.email || '';
      } else if (event.type === 'customer.subscription.updated') {
        const subscription = event.data.object as Stripe.Subscription;
        priceId = subscription.items.data[0]?.price?.id || '';
        
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        if (!customer.deleted) {
          customerEmail = customer.email || '';
        }
      }

      let planName = 'Starter';
      if (priceId === process.env.STRIPE_PRICE_STARTER) planName = 'Starter';
      if (priceId === process.env.STRIPE_PRICE_PRO) planName = 'Pro Tier';
      if (priceId === process.env.STRIPE_PRICE_ENTERPRISE) planName = 'Enterprise';

      if (customerEmail) {
        await supabaseAdmin
          .from('businesses')
          .update({ plan: planName })
          .eq('work_email', customerEmail);
      } else {
        await supabaseAdmin
          .from('businesses')
          .update({ plan: planName })
          .limit(1);
      }
    }
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
