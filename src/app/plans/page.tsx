'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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

  const plans = [
    {
      id: 'free',
      name: 'Free Tier',
      price: '$0',
      period: '/month',
      description: 'Default starting tier for new accounts & testing agents.',
      features: ['Up to 10,000 requests/mo', '1 Active API Key', 'Community Support', 'Standard Edge Routing'],
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for growing agents and early production setups.',
      features: ['Up to 100,000 requests/mo', '5 Active API Keys', 'Email Support', 'Global Edge Proxy'],
    },
    {
      id: 'pro',
      name: 'Pro Tier',
      price: '$149',
      period: '/month',
      description: 'Built for scaling heavy production proxy traffic.',
      features: ['Up to 500,000 requests/mo', 'Unlimited API Keys', 'Priority Regional Edge Routing', '24/7 Priority Support'],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$499',
      period: '/month',
      description: 'Custom SLA, dedicated infrastructure, & zero limits.',
      features: ['Unlimited requests', 'Dedicated Cloudflare Workers', 'Custom Schema Validation', 'Dedicated Account Manager'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-6 bg-transparent">
      {/* Header */}
      <header className="border-b border-indigo-950/40 pb-8 text-center space-y-3 bg-transparent">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Plans &amp; Pricing</h1>
        <p className="text-gray-300 text-sm max-w-xl mx-auto">
          Choose the right scale for your agent proxy infrastructure with secure checkout confirmation.
        </p>
        {business && (
          <div className="inline-flex items-center gap-2 bg-indigo-950/50 border border-indigo-800/60 rounded-full px-5 py-2 text-xs text-indigo-200 shadow-xl backdrop-blur-md">
            <span>Account:</span>
            <strong className="text-white">{business.business_name}</strong>
            <span className="text-indigo-400">({business.work_email})</span>
            <span className="text-indigo-800">|</span>
            <span>Active Plan:</span>
            <span className="text-cyan-400 font-semibold">{business.plan}</span>
          </div>
        )}
      </header>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-transparent">
        {plans.map((p) => {
          const isCurrentPlan = business?.plan === p.name;

          return (
            <div
              key={p.id}
              className={`bg-indigo-950/30 backdrop-blur-md border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                isCurrentPlan
                  ? 'border-cyan-500 ring-2 ring-cyan-500/30 shadow-2xl shadow-cyan-500/20 bg-indigo-900/40'
                  : 'border-indigo-900/50 hover:border-cyan-500/50 hover:bg-indigo-950/50'
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
                <ul className="space-y-2.5 text-xs text-gray-300 border-t border-indigo-900/40 pt-4">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {isCurrentPlan ? (
                <button
                  disabled
                  className="w-full mt-8 py-2.5 rounded-xl font-semibold text-xs bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 cursor-not-allowed"
                >
                  Active Plan
                </button>
              ) : (
                <Link href={`/checkout/confirm?plan=${p.id}`} className="w-full mt-8 block">
                  <button className="w-full py-2.5 rounded-xl font-semibold text-xs bg-white text-black hover:bg-gray-200 shadow-lg transition-all">
                    Select {p.name}
                  </button>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
