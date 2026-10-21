'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto py-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-[#090520]/80 to-indigo-950/60 border border-indigo-900/60 backdrop-blur-xl rounded-3xl p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <span className="inline-block text-[11px] font-mono bg-indigo-900/80 text-cyan-300 px-3 py-1 rounded-full border border-indigo-700/50 uppercase tracking-widest">
            Enterprise Agent Proxy Engine
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">WebMCP Console</span>
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl leading-relaxed">
            Manage your AI agent endpoints, secure high-performance API keys, monitor live edge proxy telemetry, and scale your business subscription tiers in real time.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/keys"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <span>🔑 Manage API Keys</span>
            </Link>
            <Link
              href="/analytics"
              className="bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-200 border border-indigo-800/60 font-bold text-xs px-6 py-3 rounded-xl transition flex items-center gap-2"
            >
              <span>📊 View Telemetry</span>
            </Link>
            <Link
              href="/plans"
              className="bg-[#090520] hover:bg-indigo-950/50 text-cyan-300 border border-cyan-800/40 font-bold text-xs px-6 py-3 rounded-xl transition flex items-center gap-2"
            >
              <span>⚡ Plans & Pricing</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#090520]/80 border border-indigo-900/60 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-2">
          <div className="text-cyan-400 font-mono text-xs uppercase tracking-wider">Active Proxy Node</div>
          <div className="text-xl font-bold text-white">Jordan Edge (CLI Active)</div>
          <p className="text-xs text-gray-400">Cloudflare worker routing requests with sub-40ms latency.</p>
        </div>
        <div className="bg-[#090520]/80 border border-indigo-900/60 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-2">
          <div className="text-cyan-400 font-mono text-xs uppercase tracking-wider">Subscription Tier</div>
          <div className="text-xl font-bold text-white">Supabase Synced</div>
          <p className="text-xs text-gray-400">Live synchronization with your business billing account.</p>
        </div>
        <div className="bg-[#090520]/80 border border-indigo-900/60 backdrop-blur-md rounded-2xl p-6 shadow-xl space-y-2">
          <div className="text-cyan-400 font-mono text-xs uppercase tracking-wider">System Health</div>
          <div className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> 100% Operational
          </div>
          <p className="text-xs text-gray-400">All edge workers and database triggers responding normally.</p>
        </div>
      </div>
    </div>
  );
}
