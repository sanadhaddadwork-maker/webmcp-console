import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6 space-y-16 text-white">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 shadow-inner">
          Enterprise Edge Proxy & Telemetry Platform
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          WebMCP Console
        </h1>
        <p className="text-indigo-300 text-sm md:text-base max-w-2xl mx-auto">
          High-performance edge proxy routing, real-time agent telemetry, and granular API security built for modern autonomous architectures.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/telemetry" className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-lg shadow-indigo-600/30">
            View Live Telemetry 📊
          </Link>
          <Link href="/plans" className="bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-cyan-400 font-bold text-xs px-6 py-3 rounded-xl transition">
            Explore Plans ⚡
          </Link>
        </div>
      </div>

      {/* Core Features Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-indigo-950">
        <div className="p-6 rounded-2xl bg-[#0b0f29] border border-indigo-900/80 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-cyan-400 text-sm font-bold">📊</div>
          <h3 className="text-sm font-bold text-white">Real-Time Telemetry</h3>
          <p className="text-xs text-indigo-300">Track request latencies, token consumption, and edge proxy routing statuses instantly.</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0b0f29] border border-indigo-900/80 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-cyan-400 text-sm font-bold">🔑</div>
          <h3 className="text-sm font-bold text-white">Secure API Key Routing</h3>
          <p className="text-xs text-indigo-300">Provision and revoke scoped keys with strict rate-limiting and enterprise isolation.</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0b0f29] border border-indigo-900/80 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-cyan-400 text-sm font-bold">🌐</div>
          <h3 className="text-sm font-bold text-white">Global Edge Nodes</h3>
          <p className="text-xs text-indigo-300">Deploy automatically across global anycast edge routing nodes for minimal latency.</p>
        </div>
      </div>

      {/* Business Transformation: With vs Without AI Agent Accessibility */}
      <div className="pt-12 border-t border-indigo-950 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold">Enterprise Transformation Architecture</h2>
          <p className="text-xs text-indigo-300">How WebMCP empowers modern enterprises with and without autonomous AI agent accessibility.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Without AI Agent Accessibility */}
          <div className="p-8 rounded-2xl bg-[#0b0f29]/60 border border-rose-950/60 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
              <span>⚠️</span> Traditional Business (Without Agent Accessibility)
            </div>
            <ul className="space-y-3 text-xs text-indigo-200">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span> Manual API integrations requiring continuous human engineering oversight.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span> Static client interactions limited by rigid UI forms and rigid database queries.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span> Fragmented telemetry across disparate regional servers with high latency.
              </li>
            </ul>
          </div>

          {/* With AI Agent Accessibility */}
          <div className="p-8 rounded-2xl bg-[#0b0f29] border border-cyan-800/80 space-y-4 shadow-xl shadow-cyan-950/20">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <span>⚡</span> WebMCP Enabled (With AI Agent Accessibility)
            </div>
            <ul className="space-y-3 text-xs text-indigo-200">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span> Autonomous multi-agent web execution via standardized Model Context Protocol.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span> Secure edge proxy routing with encrypted token verification and rate limiting.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span> Real-time analytics, automated billing tier synchronization, and instant failover.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
