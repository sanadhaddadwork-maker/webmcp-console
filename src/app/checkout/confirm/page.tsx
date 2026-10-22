'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

const PLAN_DETAILS: Record<string, { 
  name: string; 
  price: string; 
  period: string; 
  tagline: string;
  features: { title: string; desc: string }[];
  specs: { label: string; value: string }[];
}> = {
  starter: {
    name: 'Starter Tier',
    price: '$29',
    period: '/month',
    tagline: 'Perfect for growing agents and early production setups.',
    features: [
      { title: 'Global Edge Proxy', desc: 'Low-latency routing across worldwide edge nodes.' },
      { title: 'Up to 100,000 Requests', desc: 'Generous monthly volume for active agent workflows.' },
      { title: '5 Active API Keys', desc: 'Securely scope keys across different environments.' },
    ],
    specs: [
      { label: 'Network SLA', value: '99.9% Uptime' },
      { label: 'Support Tier', value: 'Standard Email Support' },
      { label: 'Rate Limit', value: '50 req/sec burst' },
    ],
  },
  pro: {
    name: 'Pro Tier',
    price: '$149',
    period: '/month',
    tagline: 'Built for scaling heavy production proxy traffic and multi-agent systems.',
    features: [
      { title: 'Priority Regional Edge Routing', desc: 'Optimized routing paths for maximum execution speed.' },
      { title: 'Up to 500,000 Requests', desc: 'High-capacity throughput with automated scaling.' },
      { title: 'Unlimited API Keys', desc: 'Granular key management for team collaboration.' },
    ],
    specs: [
      { label: 'Network SLA', value: '99.95% Uptime' },
      { label: 'Support Tier', value: '24/7 Priority Support' },
      { label: 'Rate Limit', value: '250 req/sec burst' },
    ],
  },
  enterprise: {
    name: 'Enterprise Tier',
    price: '$499',
    period: '/month',
    tagline: 'Custom SLA, dedicated infrastructure, and zero operational limits.',
    features: [
      { title: 'Dedicated Cloudflare Workers', isolated: true, desc: 'Isolated worker instances reserved exclusively for your agents.' } as any,
      { title: 'Unlimited Requests', desc: 'Zero throttling or caps on your production pipelines.' },
      { title: 'Custom Schema Validation', desc: 'Advanced payload inspection and custom validation rules.' },
    ],
    specs: [
      { label: 'Network SLA', value: '99.99% Guaranteed' },
      { label: 'Support Tier', value: 'Dedicated Account Manager' },
      { label: 'Rate Limit', value: 'Unlimited / Custom' },
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
    <div className="max-w-5xl mx-auto py-12 px-6 text-white bg-transparent">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">Secure Checkout Pipeline</span>
        <h1 className="text-4xl font-extrabold mt-2">Review Your Subscription</h1>
        <p className="text-gray-400 text-sm mt-1">{plan.tagline}</p>
      </div>

      {/* Two-Column Professional Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Detailed Features & Specs (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-indigo-900/50 rounded-2xl p-8 bg-indigo-950/20 backdrop-blur-md">
            <h2 className="text-lg font-bold text-white mb-4">Included Capabilities</h2>
            <div className="space-y-4">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 text-xs font-bold mt-0.5 flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{f.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-indigo-900/40 mt-8 pt-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-4">Infrastructure Specifications</h3>
              <div className="grid grid-cols-3 gap-4">
                {plan.specs.map((spec, i) => (
                  <div key={i} className="bg-indigo-950/40 border border-indigo-900/40 rounded-xl p-3">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">{spec.label}</span>
                    <strong className="text-xs text-cyan-300 font-semibold mt-1 block">{spec.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Checkout Action Card */}
        <div className="border border-indigo-900/50 rounded-2xl p-6 bg-indigo-950/30 backdrop-blur-md relative">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-semibold text-gray-400 uppercase">{plan.name}</span>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded-full font-semibold">
              RECURRING
            </span>
          </div>

          <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-indigo-900/40">
            <span className="text-5xl font-extrabold">{plan.price}</span>
            <span className="text-gray-400 text-sm">{plan.period}</span>
          </div>

          <div className="space-y-3 text-xs text-gray-300 mb-6">
            <div className="flex justify-between">
              <span>Billing Cycle</span>
              <span className="text-white font-medium">Monthly (Cancel Anytime)</span>
            </div>
            <div className="flex justify-between">
              <span>Setup Fees</span>
              <span className="text-cyan-400 font-medium">$0.00</span>
            </div>
            <div className="flex justify-between border-t border-indigo-900/40 pt-3 text-sm font-bold text-white">
              <span>Total Due Today</span>
              <span>{plan.price}</span>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-semibold text-black bg-white hover:bg-gray-200 transition-all shadow-xl disabled:opacity-50 text-sm"
          >
            {loading ? 'Connecting to Stripe...' : 'Proceed to Secure Checkout'}
          </button>

          <p className="text-[10px] text-center text-gray-400 mt-4">
            🔒 Encrypted 256-bit SSL session powered by Stripe.
          </p>
        </div>

      </div>
    </div>
  );
}

export default function ConfirmPlanPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-white">Loading confirmation details...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
