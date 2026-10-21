'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseBrowser';

interface Business {
  id: string;
  business_name: string;
  work_email: string;
  website_url?: string;
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
      .single();

    if (!error && data) {
      setBusiness(data);
    }
    setLoading(false);
  }

  async function handleSelectPlan(planName: string) {
    if (!business) return;
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
      description: 'Ideal for testing & early prototype agents.',
      features: ['Up to 10,000 requests/mo', '1 Active API Key', 'Community Support'],
    },
    {
      name: 'Pro Tier',
      price: '$49',
      period: '/month',
      description: 'Built for scaling production proxy traffic.',
      features: ['Up to 500,000 requests/mo', 'Unlimited API Keys', 'Priority Regional Edge Routing', '24/7 Support'],
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      description: 'Custom SLA, dedicated infrastructure, & zero limits.',
      features: ['Unlimited requests', 'Dedicated Cloudflare Workers', 'Custom Schema Validation', 'Dedicated Account Manager'],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-6xl mx-auto space-y-8">
      <header className="border-b border-gray-800 pb-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Plans & Pricing</h1>
        <p className="text-gray-400 mt-2">
          Choose the right scale for your agent proxy infrastructure.
        </p>
        {business && (
          <div className="mt-4 inline-block bg-gray-900 border border-gray-800 rounded-full px-4 py-1.5 text-xs text-gray-300">
            Account: <strong className="text-white">{business.business_name}</strong> ({business.work_email}) — Active Plan: <span className="text-emerald-400 font-semibold">{business.plan}</span>
          </div>
        )}
      </header>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p) => {
          const isCurrentPlan = business?.plan === p.name;

          return (
            <div
              key={p.name}
              className={`bg-gray-900/60 border rounded-2xl p-6 flex flex-col justify-between transition ${
                isCurrentPlan ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  {isCurrentPlan && (
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                      CURRENT PLAN
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2 min-h-[32px]">{p.description}</p>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-extrabold">{p.price}</span>
                  <span className="text-xs text-gray-500">{p.period}</span>
                </div>
                <ul className="space-y-2 text-xs text-gray-300 border-t border-gray-800/80 pt-4">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                disabled={updating || isCurrentPlan || loading}
                onClick={() => handleSelectPlan(p.name)}
                className={`w-full mt-8 py-2.5 rounded-xl font-semibold text-xs transition ${
                  isCurrentPlan
                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-gray-200'
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
