'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

const PLAN_DETAILS: Record<string, { name: string; price: string; period: string; features: string[] }> = {
  pro: {
    name: 'Pro Tier',
    price: '$29',
    period: '/month',
    features: [
      'Unlimited WebMCP Agent Executions',
      'High-Priority Cloudflare Proxy Routing',
      'Advanced Supabase Analytics & Event Logs',
      '24/7 Dedicated Developer Support',
    ],
  },
  enterprise: {
    name: 'Enterprise Tier',
    price: '$99',
    period: '/month',
    features: [
      'Custom Agent Model Fine-Tuning',
      'Dedicated Cloudflare Worker Infrastructure',
      'SLA & Priority Emergency Support',
      'Custom Database Integrations',
    ],
  },
};

function ConfirmContent() {
  const searchParams = useSearchParams();
  const planKey = searchParams.get('plan') || 'pro';
  const plan = PLAN_DETAILS[planKey] || PLAN_DETAILS.pro;
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: planKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErrorMsg(data.error || 'Failed to create checkout session');
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6 text-white">
      {/* Clean transparent container without heavy box background */}
      <div className="border border-indigo-950/60 rounded-2xl p-8 bg-transparent relative">
        <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">Order Summary</span>
        <h1 className="text-3xl font-bold mt-1 mb-2">{plan.name}</h1>
        
        <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-indigo-950/40">
          <span className="text-5xl font-extrabold">{plan.price}</span>
          <span className="text-gray-400">{plan.period}</span>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-medium text-gray-300">Included Features:</h3>
          <ul className="space-y-3">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                <span className="text-cyan-400 font-bold">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-300">
            {errorMsg}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-4 rounded-xl font-semibold text-black bg-white hover:bg-gray-200 transition-all shadow-xl disabled:opacity-50"
        >
          {loading ? 'Connecting to Stripe...' : 'Confirm Plan & Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
}

export default function ConfirmPlanPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-white">Loading plan summary...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
