'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';

export default function PlansPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          
          // Fetch business record
          const { data: bizData } = await supabase
            .from('businesses')
            .select('*')
            .eq('work_email', user.email)
            .maybeSingle();

          if (bizData) {
            setBusiness(bizData);
          } else {
            setBusiness({ plan: 'Free Tier', business_name: 'My Account', work_email: user.email });
          }
        } else {
          // Check mock user fallback
          const mockUser = localStorage.getItem("mock_user");
          if (mockUser) {
            const parsed = JSON.parse(mockUser);
            setUser(parsed);
            const savedPlan = localStorage.getItem("active_plan");
            const planName = savedPlan ? JSON.parse(savedPlan).name : 'Free Tier';
            setBusiness({ plan: planName, business_name: 'My Account', work_email: parsed.email });
          }
        }
      } catch (err) {
        console.error('Error loading user on plans page:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [supabase]);

  const handleSelectPlan = (planId: string) => {
    if (!user) {
      router.push(`/login?redirect=/plans`);
      return;
    }
    if (planId === 'free') {
      return;
    }
    router.push(`/checkout/confirm?plan=${planId}`);
  };

  // If user is not logged in, currentPlan is null so nothing is highlighted as active
  const currentPlan = user ? (business?.plan || 'Free Tier') : null;

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">Plans & Pricing</h1>
        <p className="text-indigo-200/70 text-sm">
          Choose the right scale for your agent proxy infrastructure with secure checkout confirmation.
        </p>

        {/* Dynamic Account & Active Plan Banner (Only shown if logged in) */}
        {!loading && user && (
          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-indigo-950/60 border border-indigo-800/50 text-xs text-indigo-200 backdrop-blur-md">
            <span>Account: <strong className="text-white">{business?.business_name || 'My Account'}</strong> ({user.email})</span>
            <span className="text-indigo-500">•</span>
            <span>Active Plan: <strong className="text-cyan-400">{currentPlan}</strong></span>
          </div>
        )}
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Free Tier */}
        <div className={`rounded-2xl p-6 bg-[#0b0f29]/80 border backdrop-blur-md flex flex-col justify-between transition-all ${currentPlan === 'Free Tier' ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-indigo-900/50'}`}>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Free Tier</h3>
              {currentPlan === 'Free Tier' && <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">CURRENT PLAN</span>}
            </div>
            <p className="text-xs text-indigo-300/70 mb-6">Default starting tier for new accounts & testing agents.</p>
            <div className="mb-6">
              <span className="text-3xl font-black text-white">$0</span>
              <span className="text-xs text-indigo-300">/month</span>
            </div>
            <ul className="space-y-3 text-xs text-indigo-200 mb-8">
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Up to 10,000 requests/mo</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> 1 Active API Key</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Community Support</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Standard Edge Routing</li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectPlan('free')}
            disabled={currentPlan === 'Free Tier'}
            className="w-full py-2.5 rounded-xl font-bold text-xs transition-all border border-indigo-800/60 text-white bg-indigo-950/40 hover:bg-indigo-900/60 disabled:opacity-50"
          >
            {currentPlan === 'Free Tier' ? 'Active Plan' : user ? 'Select Free Tier' : 'Log in to Select'}
          </button>
        </div>

        {/* Starter Tier */}
        <div className={`rounded-2xl p-6 bg-[#0b0f29]/80 border backdrop-blur-md flex flex-col justify-between transition-all ${currentPlan === 'Starter' ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-indigo-900/50'}`}>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Starter</h3>
              {currentPlan === 'Starter' && <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">CURRENT PLAN</span>}
            </div>
            <p className="text-xs text-indigo-300/70 mb-6">Perfect for growing agents and early production setups.</p>
            <div className="mb-6">
              <span className="text-3xl font-black text-white">$29</span>
              <span className="text-xs text-indigo-300">/month</span>
            </div>
            <ul className="space-y-3 text-xs text-indigo-200 mb-8">
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Up to 100,000 requests/mo</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> 5 Active API Keys</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Email Support</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Global Edge Proxy</li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectPlan('starter')}
            disabled={currentPlan === 'Starter'}
            className="w-full py-2.5 rounded-xl font-bold text-xs transition-all border border-indigo-800/60 text-white bg-indigo-950/40 hover:bg-indigo-900/60 disabled:opacity-50"
          >
            {currentPlan === 'Starter' ? 'Active Plan' : user ? 'Select Starter' : 'Log in to Select'}
          </button>
        </div>

        {/* Pro Tier */}
        <div className={`rounded-2xl p-6 bg-[#0b0f29]/80 border backdrop-blur-md flex flex-col justify-between transition-all relative ${currentPlan === 'Pro Tier' ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-indigo-600/60 shadow-xl shadow-indigo-600/10'}`}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
            Most Popular
          </div>
          <div>
            <div className="flex justify-between items-center mb-4 mt-2">
              <h3 className="text-lg font-bold text-white">Pro Tier</h3>
              {currentPlan === 'Pro Tier' && <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">CURRENT PLAN</span>}
            </div>
            <p className="text-xs text-indigo-300/70 mb-6">Built for scaling heavy production proxy traffic.</p>
            <div className="mb-6">
              <span className="text-3xl font-black text-white">$149</span>
              <span className="text-xs text-indigo-300">/month</span>
            </div>
            <ul className="space-y-3 text-xs text-indigo-200 mb-8">
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Up to 500,000 requests/mo</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Unlimited API Keys</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Priority Regional Edge Routing</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> 24/7 Priority Support</li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectPlan('pro')}
            disabled={currentPlan === 'Pro Tier'}
            className="w-full py-2.5 rounded-xl font-bold text-xs transition-all bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            {currentPlan === 'Pro Tier' ? 'Active Plan' : user ? 'Select Pro' : 'Log in to Select'}
          </button>
        </div>

        {/* Enterprise Tier */}
        <div className={`rounded-2xl p-6 bg-[#0b0f29]/80 border backdrop-blur-md flex flex-col justify-between transition-all ${currentPlan === 'Enterprise' ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-indigo-900/50'}`}>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Enterprise</h3>
              {currentPlan === 'Enterprise' && <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">CURRENT PLAN</span>}
            </div>
            <p className="text-xs text-indigo-300/70 mb-6">Custom SLA, dedicated infrastructure, & zero limits.</p>
            <div className="mb-6">
              <span className="text-3xl font-black text-white">$499</span>
              <span className="text-xs text-indigo-300">/month</span>
            </div>
            <ul className="space-y-3 text-xs text-indigo-200 mb-8">
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Unlimited requests</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Dedicated Cloudflare Workers</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Custom Schema Validation</li>
              <li className="flex items-center"><span className="text-cyan-400 mr-2">✓</span> Dedicated Account Manager</li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectPlan('enterprise')}
            disabled={currentPlan === 'Enterprise'}
            className="w-full py-2.5 rounded-xl font-bold text-xs transition-all border border-indigo-800/60 text-white bg-indigo-950/40 hover:bg-indigo-900/60 disabled:opacity-50"
          >
            {currentPlan === 'Enterprise' ? 'Active Plan' : user ? 'Select Enterprise' : 'Log in to Select'}
          </button>
        </div>
      </div>
    </div>
  );
}
