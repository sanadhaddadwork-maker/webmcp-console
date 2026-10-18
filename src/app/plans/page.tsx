"use client";

import { useRouter } from "next/navigation";

export default function PlansComparisonPage() {
  const router = useRouter();

  const handleSelectPlan = (tierKey: string, price: string, name: string) => {
    router.push(`/checkout?plan=${tierKey}&name=${encodeURIComponent(name)}&price=${price}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-3.5 py-1 rounded-full border border-indigo-800/50 shadow-sm">
          Transparent Comparison
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Compare Developer Plans & Features
        </h1>
        <p className="text-xs text-indigo-200/70 max-w-lg mx-auto">
          Choose the optimal WebMCP engine tier tailored to your scaling demands.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch pt-4">
        
        {/* Starter Plan */}
        <div className="group bg-[#090520]/60 border border-indigo-950 hover:border-indigo-700/70 rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-950/50 hover:bg-[#0b0628]">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">Starter</h3>
              <p className="text-[11px] text-indigo-200/60">For personal projects & early developer testing.</p>
            </div>
            <div className="text-3xl font-extrabold text-white">
              $29 <span className="text-xs font-normal text-indigo-200/60">/ mo</span>
            </div>
            <ul className="space-y-3 text-xs text-indigo-200/80 pt-4 border-t border-indigo-950">
              <li className="flex items-center space-x-2.5">
                <span className="text-indigo-400 font-bold">✓</span>
                <span>50,000 requests / month</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-indigo-400 font-bold">✓</span>
                <span>3 Cloudflare Worker Proxies</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-indigo-400 font-bold">✓</span>
                <span>Standard WebMCP Schema Parsing</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-indigo-400 font-bold">✓</span>
                <span>Standard Latency Edge Proxy</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-indigo-400 font-bold">✓</span>
                <span>Community & Documentation Support</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectPlan("starter", "$29", "Starter Tier")}
            className="w-full py-2.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-indigo-200 hover:text-white text-xs font-semibold transition-all duration-200 border border-indigo-900/50"
          >
            Select Starter
          </button>
        </div>

        {/* Pro SaaS (Recommended) */}
        <div className="group bg-gradient-to-b from-indigo-950/90 via-[#0a0624] to-[#030014] border-2 border-indigo-500 hover:border-cyan-400 rounded-2xl p-6 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-indigo-950/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/20">
          
          {/* Recommended Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg shadow-indigo-500/30">
            ⭐ Recommended
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">Pro SaaS</h3>
              <p className="text-[11px] text-indigo-200/70">For professional stores & web agent integration.</p>
            </div>
            <div className="text-3xl font-extrabold text-white">
              $149 <span className="text-xs font-normal text-indigo-200/60">/ mo</span>
            </div>
            <ul className="space-y-3 text-xs text-indigo-200/90 pt-4 border-t border-indigo-900/60">
              <li className="flex items-center space-x-2.5">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>500,000 requests / month</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Unlimited Cloudflare Worker Proxies</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Advanced AI Agent Routing Schema</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Priority Global Edge Latency</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Priority Developer Email Support</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectPlan("pro", "$149", "Pro SaaS Tier")}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold transition-all duration-200 shadow-lg shadow-indigo-600/40 active:scale-[0.98]"
          >
            Select Pro SaaS
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="group bg-[#090520]/60 border border-indigo-950 hover:border-indigo-700/70 rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-950/50 hover:bg-[#0b0628]">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">Enterprise</h3>
              <p className="text-[11px] text-indigo-200/60">For high-volume web marketplaces & enterprise stores.</p>
            </div>
            <div className="text-3xl font-extrabold text-white">
              $499 <span className="text-xs font-normal text-indigo-200/60">/ mo</span>
            </div>
            <ul className="space-y-3 text-xs text-indigo-200/80 pt-4 border-t border-indigo-950">
              <li className="flex items-center space-x-2.5">
                <span className="text-indigo-400 font-bold">✓</span>
                <span>Unlimited monthly requests</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-indigo-400 font-bold">✓</span>
                <span>Custom Dedicated Worker Infrastructure</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-indigo-400 font-bold">✓</span>
                <span>Custom WebMCP Protocol Extensions</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-indigo-400 font-bold">✓</span>
                <span>Dedicated Single-Tenant Edge Nodes</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="text-indigo-400 font-bold">✓</span>
                <span>24/7 Dedicated Technical Engineer Support</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectPlan("enterprise", "$499", "Enterprise Tier")}
            className="w-full py-2.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-indigo-200 hover:text-white text-xs font-semibold transition-all duration-200 border border-indigo-900/50"
          >
            Select Enterprise
          </button>
        </div>

      </div>
    </div>
  );
}
