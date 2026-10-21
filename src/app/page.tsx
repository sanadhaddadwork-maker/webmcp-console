'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-20 py-8 bg-transparent">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-10 pb-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-mono bg-indigo-950/80 text-cyan-300 px-4 py-1.5 rounded-full border border-indigo-800/60 uppercase tracking-widest shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Next-Gen AI Agent Proxy Infrastructure
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Supercharge Your AI Agents with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-blue-500">WebMCP</span>
          </h1>
          <p className="text-gray-300 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Deploy ultra-fast Cloudflare Worker edge routes, manage secure API keys, and monitor real-time agent telemetry from a single high-performance enterprise console.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/keys"
              className="bg-white text-black hover:bg-gray-200 font-bold text-xs px-8 py-3.5 rounded-xl transition-all shadow-xl shadow-white/10"
            >
              Get Started Free 🔑
            </Link>
            <Link
              href="/analytics"
              className="bg-indigo-950/50 hover:bg-indigo-900/60 text-indigo-200 border border-indigo-800/60 font-bold text-xs px-8 py-3.5 rounded-xl transition-all backdrop-blur-md"
            >
              Explore Telemetry 📊
            </Link>
            <Link
              href="/plans"
              className="bg-[#090520] hover:bg-indigo-950/80 text-cyan-300 border border-cyan-800/50 font-bold text-xs px-8 py-3.5 rounded-xl transition-all backdrop-blur-md"
            >
              View Pricing ⚡
            </Link>
          </div>
        </div>
      </section>

      {/* Live Metrics Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-indigo-950/20 backdrop-blur-md border border-indigo-900/40 rounded-3xl p-8 shadow-2xl">
        <div className="text-center space-y-1">
          <div className="text-3xl lg:text-4xl font-extrabold text-white">38ms</div>
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono">Avg Edge Latency</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-3xl lg:text-4xl font-extrabold text-white">99.8%</div>
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono">Schema Success Rate</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-3xl lg:text-4xl font-extrabold text-white">18.4K+</div>
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono">Requests Routed</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-3xl lg:text-4xl font-extrabold text-emerald-400 flex items-center justify-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span> 100%
          </div>
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono">Worker Uptime</div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white">Built for High-Scale Agent Traffic</h2>
          <p className="text-gray-400 text-sm">
            Everything you need to secure, monitor, and scale your autonomous WebMCP workflows globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-indigo-950/30 backdrop-blur-xl border border-indigo-900/50 rounded-2xl p-8 space-y-4 shadow-xl hover:border-cyan-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl font-bold">
              🔑
            </div>
            <h3 className="text-xl font-bold text-white">Secure API Key Engine</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Generate, label, and revoke scoped live API credentials instantly. Integrated directly with Supabase for bulletproof authentication across all endpoints.
            </p>
            <Link href="/keys" className="inline-block text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2">
              Manage Keys →
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-indigo-950/30 backdrop-blur-xl border border-indigo-900/50 rounded-2xl p-8 space-y-4 shadow-xl hover:border-cyan-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl font-bold">
              📊
            </div>
            <h3 className="text-xl font-bold text-white">Real-Time Telemetry</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Track agent traffic distribution across ChatGPT, Claude, and Perplexity with live response status codes, sub-40ms latency metrics, and regional edge insights.
            </p>
            <Link href="/analytics" className="inline-block text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2">
              View Telemetry →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-indigo-950/30 backdrop-blur-xl border border-indigo-900/50 rounded-2xl p-8 space-y-4 shadow-xl hover:border-cyan-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xl font-bold">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-white">Flexible Pricing Tiers</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Choose from Free ($0), Starter ($29), Pro ($149), and Enterprise ($499) tiers with real-time database plan synchronization.
            </p>
            <Link href="/plans" className="inline-block text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2">
              Explore Plans →
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise Architecture Section */}
      <section className="bg-indigo-950/20 backdrop-blur-xl border border-indigo-900/40 rounded-3xl p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/40 uppercase">
            Global Edge Architecture
          </span>
          <h2 className="text-3xl font-extrabold text-white">Powered by Cloudflare Workers & Supabase</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your proxy requests are routed across 280+ global edge locations with zero cold starts. Coupled with lightning-fast PostgreSQL database tables in Supabase, your agent infrastructure scales effortlessly.
          </p>
          <ul className="space-y-3 text-xs text-gray-300">
            <li className="flex items-center gap-2"><span className="text-cyan-400 font-bold">✓</span> Sub-40ms worldwide routing response times</li>
            <li className="flex items-center gap-2"><span className="text-cyan-400 font-bold">✓</span> Automatic schema validation and error recovery</li>
            <li className="flex items-center gap-2"><span className="text-cyan-400 font-bold">✓</span> Real-time subscription tier updates</li>
          </ul>
        </div>
        <div className="bg-[#030014]/80 border border-indigo-900/80 rounded-2xl p-6 font-mono text-xs text-indigo-300 shadow-inner space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
            <span className="text-gray-500">webmcp-proxy-worker.ts</span>
            <span className="text-emerald-400 font-semibold">● ACTIVE</span>
          </div>
          <p className="text-gray-400">// Edge proxy routing handler</p>
          <p><span className="text-purple-400">export default</span> {'{'}</p>
          <p className="pl-4"><span className="text-purple-400">async</span> fetch(request, env) {'{'}</p>
          <p className="pl-8 text-cyan-300">const apiKey = request.headers.get(&quot;Authorization&quot;);</p>
          <p className="pl-8 text-cyan-300">const valid = await verifyKey(apiKey, env.SUPABASE_URL);</p>
          <p className="pl-8"><span className="text-purple-400">if</span> (!valid) <span className="text-purple-400">return</span> <span className="text-yellow-300">new</span> Response(&quot;Unauthorized&quot;, {'{'} status: <span className="text-orange-400">401</span> {'}'});</p>
          <p className="pl-8 text-emerald-400">return forwardToAgent(request, env.TARGET_URL);</p>
          <p className="pl-4">{'}'}</p>
          <p>{'}'}</p>
        </div>
      </section>
    </div>
  );
}
