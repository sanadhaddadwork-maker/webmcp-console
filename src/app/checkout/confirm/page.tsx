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

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: planKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-slate-900/60 border border-slate-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Futuristic background glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">Order Summary</span>
          <h1 className="text-3xl font-bold mt-1 mb-2">{plan.name}</h1>
          
          <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-slate-800">
            <span className="text-5xl font-extrabold">{plan.price}</span>
            <span className="text-slate-400">{plan.period}</span>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-medium text-slate-300">Included Features:</h3>
            <ul className="space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-blue-500/25 disabled:opacity-50"
          >
            {loading ? 'Preparing Checkout...' : 'Confirm Plan & Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmPlanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading plan details...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
