'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseBrowser';

interface Business {
  id: string;
  business_name: string;
  work_email: string;
  plan: string;
}

export default function PricingPage() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchBusiness();
  }, []);

  async function fetchBusiness() {
    setLoading(true);
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      setBusiness(data);
    } else {
      setBusiness({
        id: 'default',
        business_name: 'Acme Corp',
        work_email: 'admin@webmcp.io',
        plan: 'Free Tier',
      });
    }
    setLoading(false);
  }

  async function handleSelectPlan(planName: string) {
    if (!business || business.id === 'default') return;
    setUpdating(true);

    const { error } = await supabase
      .from('businesses')
      .update({ plan: planName })
      .eq('id', business.id);

    if (!error) {
      setBusiness({ ...business, plan: planName });
    } else {
      console.error('Error updating plan:', error.message);
    }
    setUpdating(false);
  }

  const plans = [
    {
      name: 'Free Tier',
      price: '$0',
      period: '/month',
      description: 'Default starting tier for new accounts & testing agents.',
      features: ['Up to 10,000 requests/mo', '1 Active API Key', 'Community Support', 'Standard Edge Routing'],
    },
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for growing agents and early production setups.',
      features: ['Up to 100,000 requests/mo', '5 Active API Keys', 'Email Support', 'Global Edge Proxy'],
    },
    {
      name: 'Pro Tier',
      price: '$149',
      period: '/month',
      description: 'Built for scaling heavy production proxy traffic.',
      features: ['Up to 500,000 requests/mo', 'Unlimited API Keys', 'Priority Regional Edge Routing', '24/7 Priority Support'],
    },
    {
      name: 'Enterprise',
      price: '$499',
      period: '/month',
      description: 'Custom SLA, dedicated infrastructure, & zero limits.',
      features: ['Unlimited requests', 'Dedicated Cloudflare Workers', 'Custom Schema Validation', 'Dedicated Account Manager'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-6">
      {/* Header */}
      <header className="border-b border-indigo-950/80 pb-8 text-center space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Plans & Pricing</h1>
        <p className="text-gray-300 text-sm max-w-xl mx-auto">
          Choose the right scale for your agent proxy infrastructure with real-time Supabase sync.
        </p>
        {business && (
          <div className="inline-flex items-center gap-2 bg-[#090520]/90 border border-indigo-900/80 rounded-full px-5 py-2 text-xs text-indigo-200 shadow-xl backdrop-blur-md">
            <span>Account:</span>
            <strong className="text-white">{business.business_name}</strong>
            <span className="text-indigo-400">({business.work_email})</span>
            <span className="text-indigo-800">|</span>
            <span>Active Plan:</span>
            <span className="text-cyan-400 font-semibold">{business.plan}</span>
          </div>
        )}
      </header>

      {/* Pricing Cards Grid (4 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((p) => {
          const isCurrentPlan = business?.plan === p.name;

          return (
            <div
              key={p.name}
              className={`bg-[#090520]/80 backdrop-blur-xl border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                isCurrentPlan
                  ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-2xl shadow-cyan-500/10'
                  : 'border-indigo-900/60 hover:border-indigo-700 hover:bg-[#090520]'
              }`}
            >
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  {isCurrentPlan && (
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded-full font-semibold">
                      CURRENT PLAN
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-300 mt-3 min-h-[40px]">{p.description}</p>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-extrabold text-white">{p.price}</span>
                  <span className="text-xs text-gray-400">{p.period}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-gray-300 border-t border-indigo-950 pt-4">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                disabled={updating || isCurrentPlan || loading}
                onClick={() => handleSelectPlan(p.name)}
                className={`w-full mt-8 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  isCurrentPlan
                    ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/50 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-gray-200 shadow-lg'
                }`}
              >
                {updating ? 'Updating...' : isCurrentPlan ? 'Active Plan' : `Switch to ${p.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
