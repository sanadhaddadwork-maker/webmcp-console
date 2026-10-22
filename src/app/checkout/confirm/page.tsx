'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PLAN_DETAILS: Record<string, { name: string; price: string; interval: string; features: string[] }> = {
  starter: {
    name: 'Starter Tier',
    price: '$29',
    interval: '/month',
    features: ['Up to 5 AI Agents', '10,000 WebMCP Calls/mo', 'Community Support', 'Basic Analytics'],
  },
  pro: {
    name: 'Pro Tier',
    price: '$149',
    interval: '/month',
    features: ['Unlimited AI Agents', '250,000 WebMCP Calls/mo', 'Priority Support', 'Advanced Telemetry & Webhooks', 'Custom Domain Proxy'],
  },
  enterprise: {
    name: 'Enterprise Tier',
    price: 'Custom',
    interval: '',
    features: ['Unlimited Everything', 'Dedicated Infrastructure', 'SLA & 24/7 Phone Support', 'Custom Integrations', 'SOC2 Compliance'],
  },
};

function CheckoutConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan')?.toLowerCase() || '';

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const plan = PLAN_DETAILS[planId];

  useEffect(() => {
    async function checkAuthAndPlan() {
      // 1. Guard against invalid plan IDs
      if (!plan) {
        router.push('/plans');
        return;
      }

      // 2. Guard against unauthenticated users
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Redirect to login with return URL
        router.push(`/login?redirect=/checkout/confirm?plan=${planId}`);
        return;
      }

      setUser(session.user);
      setLoading(false);
    }

    checkAuthAndPlan();
  }, [planId, plan, router]);

  const handleProceedToCheckout = async () => {
    setCheckoutLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Failed to initialize payment session.');
      }

      window.location.href = data.url;
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center space-x-3 text-indigo-400">
          <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Verifying session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="mb-8">
        <Link href="/plans" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 mb-4">
          ← Back to Plans
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight">Confirm Your Subscription</h1>
        <p className="text-indigo-200/70 text-sm mt-1">
          Review your order details below before proceeding to secure checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Details Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#0b0f29]/80 border border-indigo-900/50 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-white mb-4">Account Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-indigo-950">
                <span className="text-indigo-300">Subscriber</span>
                <span className="text-white font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-indigo-950">
                <span className="text-indigo-300">Selected Plan</span>
                <span className="text-white font-medium">{plan.name}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-indigo-300">Billing Cycle</span>
                <span className="text-white font-medium">Monthly (Cancel anytime)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0b0f29]/80 border border-indigo-900/50 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-white mb-4">Plan Highlights</h2>
            <ul className="space-y-2.5">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-indigo-100">
                  <svg className="w-4 h-4 text-cyan-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Summary Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-[#0b0f29]/80 border border-indigo-900/50 rounded-2xl p-6 backdrop-blur-md sticky top-24 space-y-6">
            <h2 className="text-lg font-semibold text-white">Order Summary</h2>

            <div className="space-y-3 text-sm border-b border-indigo-950 pb-4">
              <div className="flex justify-between text-indigo-200">
                <span>{plan.name}</span>
                <span>{plan.price}</span>
              </div>
              <div className="flex justify-between text-indigo-400 text-xs">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline text-white">
              <span className="font-semibold text-base">Total Due Now</span>
              <div className="text-right">
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-xs text-indigo-300">{plan.interval}</span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
                {errorMsg}
              </div>
            )}

            <button
              onClick={handleProceedToCheckout}
              disabled={checkoutLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {checkoutLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Redirecting...</span>
                </>
              ) : (
                <span>Proceed to Checkout →</span>
              )}
            </button>

            <p className="text-[11px] text-indigo-300/60 text-center leading-relaxed">
              Encrypted 256-bit SSL transaction via Stripe Checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutConfirmPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-indigo-400">Loading checkout preview...</div>}>
      <CheckoutConfirmContent />
    </Suspense>
  );
}
