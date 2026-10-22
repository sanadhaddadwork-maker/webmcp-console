'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6 space-y-16 text-white">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 shadow-inner">
          Enterprise Edge Proxy & Autonomous Agent Infrastructure
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
          WebMCP Console
        </h1>
        <p className="text-indigo-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          The high-performance edge proxy routing layer, real-time telemetry suite, and secure identity control center engineered for autonomous agent architectures and enterprise scaling.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/telemetry" className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition shadow-lg shadow-indigo-600/30 hover:scale-105">
            Launch Live Telemetry 📊
          </Link>
          <Link href="/api-keys" className="bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-cyan-400 font-bold text-xs px-6 py-3.5 rounded-xl transition hover:scale-105">
            Manage API Keys 🔑
          </Link>
        </div>
      </div>

      {/* Deep Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-indigo-950">
        <div className="p-6 rounded-2xl bg-[#0b0f29] border border-indigo-900/80 space-y-3 shadow-xl">
          <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-cyan-400 text-base font-bold">🌐</div>
          <h3 className="text-sm font-bold text-white">Edge Anycast Routing</h3>
          <p className="text-xs text-indigo-300 leading-relaxed">Automatic regional edge node selection routing client requests through the lowest-latency path globally.</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0b0f29] border border-indigo-900/80 space-y-3 shadow-xl">
          <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-cyan-400 text-base font-bold">📊</div>
          <h3 className="text-sm font-bold text-white">Advanced Telemetry</h3>
          <p className="text-xs text-indigo-300 leading-relaxed">Granular tracking of token consumption, request latency percentiles, and proxy throughput in real time.</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0b0f29] border border-indigo-900/80 space-y-3 shadow-xl">
          <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-cyan-400 text-base font-bold">🔒</div>
          <h3 className="text-sm font-bold text-white">Secure Supabase RLS</h3>
          <p className="text-xs text-indigo-300 leading-relaxed">Enterprise-grade Row Level Security protecting identity profiles, billing tiers, and scoped API tokens.</p>
        </div>
      </div>

      {/* Detailed Enterprise Transformation Breakdown */}
      <div className="pt-12 border-t border-indigo-950 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold">Enterprise Transformation Architecture</h2>
          <p className="text-xs text-indigo-300">Comparing standard corporate digital presence with WebMCP autonomous agent accessibility.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Without WebMCP */}
          <div className="p-8 rounded-2xl bg-[#0b0f29]/40 border border-rose-950/60 space-y-5">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
              <span>⚠️</span> Traditional Business (Without Agent Accessibility)
            </div>
            <ul className="space-y-3.5 text-xs text-indigo-200">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold mt-0.5">✕</span> Manual API integrations requiring continuous human engineering oversight and custom maintenance.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold mt-0.5">✕</span> Static client interactions restricted by rigid UI forms and siloed database queries.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold mt-0.5">✕</span> Fragmented logging and blind spots in cross-regional proxy routing analytics.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold mt-0.5">✕</span> Vulnerable to sudden traffic spikes and rate-limiting failures without smart edge load balancing.
              </li>
            </ul>
          </div>

          {/* With WebMCP */}
          <div className="p-8 rounded-2xl bg-[#0b0f29] border border-cyan-800/80 space-y-5 shadow-2xl shadow-cyan-950/30">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <span>⚡</span> WebMCP Enabled (With AI Agent Accessibility)
            </div>
            <ul className="space-y-3.5 text-xs text-indigo-200">
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-bold mt-0.5">✓</span> Autonomous multi-agent web execution via standardized Model Context Protocol endpoints.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-bold mt-0.5">✓</span> Encrypted edge proxy routing with granular token verification, rate-limiting, and auto-failover.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-bold mt-0.5">✓</span> Real-time analytics dashboard tracking every agent transaction down to the millisecond.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-cyan-400 font-bold mt-0.5">✓</span> Automated billing tier synchronization and instant regional node scaling via Supabase.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
