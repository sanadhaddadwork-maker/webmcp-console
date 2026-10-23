import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-28 py-10 bg-transparent">
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-12 pb-8 relative">
        {/* Optimized blur layer with will-change for GPU acceleration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none will-change-transform"></div>
        
        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2.5 text-xs font-mono bg-indigo-950 text-cyan-300 px-4 py-2 rounded-full border border-indigo-700/60 uppercase tracking-widest shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>WebMCP Protocol v1.0 — Agentic Infrastructure</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Make Your Website <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-blue-400">
              AI Agent Accessible.
            </span>
          </h1>

          <p className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Stop losing agent traffic to brittle scrapers. Expose structured Model Context Protocol (MCP) tools over lightning-fast edge proxies so ChatGPT, Claude, and Perplexity can interact with your platform flawlessly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <Link
              href="/keys"
              prefetch={true}
              className="bg-white text-black hover:bg-gray-100 font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-xl hover:scale-105"
            >
              Deploy Agent Keys Free 🔑
            </Link>
            <Link
              href="/analytics"
              prefetch={true}
              className="bg-indigo-950 hover:bg-indigo-900 text-indigo-200 border border-indigo-700/60 font-bold text-sm px-8 py-4 rounded-xl transition-all hover:border-cyan-400"
            >
              Watch Live Telemetry 📊
            </Link>
            <Link
              href="/plans"
              prefetch={true}
              className="bg-[#090520] hover:bg-indigo-950 text-cyan-300 border border-cyan-500/50 font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-cyan-500/10 hover:scale-105"
            >
              Explore Pricing ⚡
            </Link>
          </div>
        </div>
      </section>

      {/* Live Metrics Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-indigo-950/40 border border-indigo-900/50 rounded-3xl p-8 shadow-xl">
        <div className="text-center space-y-1">
          <div className="text-3xl lg:text-4xl font-extrabold text-white font-mono">35ms</div>
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono">Global Edge Latency</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-3xl lg:text-4xl font-extrabold text-white font-mono">99.98%</div>
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono">Schema Parsing Accuracy</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-3xl lg:text-4xl font-extrabold text-white font-mono">24.8K+</div>
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono">Daily Agent Requests</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-3xl lg:text-4xl font-extrabold text-emerald-400 flex items-center justify-center gap-2 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> 100%
          </div>
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono">Proxy Uptime</div>
        </div>
      </section>

      {/* Without vs With WebMCP */}
      <section className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white">The Paradigm Shift in Web Architecture</h2>
          <p className="text-gray-300 text-sm">
            Why leading platforms are abandoning traditional HTML scraping in favor of native agent protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Without WebMCP */}
          <div className="bg-rose-950/20 border border-rose-900/40 rounded-3xl p-8 space-y-6 shadow-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono bg-rose-950/80 text-rose-300 px-3.5 py-1.5 rounded-full border border-rose-800/60 uppercase">
              <span>✕ Without WebMCP (Legacy Scraping)</span>
            </div>
            <h3 className="text-2xl font-bold text-white">High Failure &amp; Maintenance Drag</h3>
            <ul className="space-y-4 text-xs text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-lg leading-none">✕</span>
                <span><strong>Constant Breakages:</strong> A single CSS class update or UI redesign instantly breaks AI scraper scripts.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-lg leading-none">✕</span>
                <span><strong>Massive Token Bloat:</strong> Parsing heavy HTML DOM trees drains thousands of expensive LLM context tokens.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-lg leading-none">✕</span>
                <span><strong>Zero Security &amp; Rate Limits:</strong> No reliable way to authenticate or monetize automated bot traffic.</span>
              </li>
            </ul>
          </div>

          {/* With WebMCP */}
          <div className="bg-indigo-950/50 border border-cyan-500/50 rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono bg-cyan-950/80 text-cyan-300 px-3.5 py-1.5 rounded-full border border-cyan-800/60 uppercase">
              <span>✓ With WebMCP Protocol (Agentic Standard)</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Deterministic, Secure Tool Execution</h3>
            <ul className="space-y-4 text-xs text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold text-lg leading-none">✓</span>
                <span><strong>Structured JSON Manifests:</strong> Agents receive precise, validated parameter definitions directly.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold text-lg leading-none">✓</span>
                <span><strong>Sub-35ms Edge Proxying:</strong> Powered by Cloudflare Workers across 280+ global metropolitan hubs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold text-lg leading-none">✓</span>
                <span><strong>Enterprise Authorization:</strong> Secure `mcp_live_` API credentials backed by real-time Supabase sync.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white">Engineered for Maximum Scale</h2>
          <p className="text-gray-300 text-sm">
            Everything your engineering team needs to turn your web app into an agent powerhouse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-indigo-950/40 border border-indigo-900/60 rounded-2xl p-8 space-y-4 shadow-xl hover:border-cyan-500/60 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-lg font-bold font-mono">
              🔑
            </div>
            <h3 className="text-xl font-bold text-white">Scoped API Key Engine</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Generate and revoke live production credentials instantly with granular permissioning and automated Supabase tracking.
            </p>
          </div>

          <div className="bg-indigo-950/40 border border-indigo-900/60 rounded-2xl p-8 space-y-4 shadow-xl hover:border-cyan-500/60 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-lg font-bold font-mono">
              📊
            </div>
            <h3 className="text-xl font-bold text-white">Real-Time Telemetry Hub</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Analyze traffic volume across ChatGPT, Claude, and Perplexity with live latency metrics and success-rate tracking.
            </p>
          </div>

          <div className="bg-indigo-950/40 border border-indigo-900/60 rounded-2xl p-8 space-y-4 shadow-xl hover:border-cyan-500/60 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-lg font-bold font-mono">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-white">Tiered Business Billing</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Seamlessly switch between Free ($0), Starter ($29), Pro ($149), and Enterprise ($499) tiers with instant DB sync.
            </p>
          </div>
        </div>
      </section>

      {/* Developer Schema Showcase */}
      <section className="bg-indigo-950/40 border border-indigo-900/50 rounded-3xl p-10 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3.5 py-1.5 rounded-full border border-cyan-800/60 uppercase">
            Instant Discovery
          </span>
          <h2 className="text-3xl font-extrabold text-white">Standardized Agent Discovery</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            AI agents automatically inspect your `/.well-known/mcp.json` manifest to discover tools, parameters, and authentication rules with zero manual configuration.
          </p>
          <div className="pt-2">
            <Link
              href="/keys"
              prefetch={true}
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950 border border-cyan-800/60 px-5 py-2.5 rounded-xl transition-colors shadow-lg"
            >
              <span>Get Your API Key Now</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="bg-[#030014] border border-indigo-900/80 rounded-2xl p-6 font-mono text-xs text-indigo-300 shadow-xl space-y-3 overflow-x-auto">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
            <span className="text-gray-500">/.well-known/mcp.json</span>
            <span className="text-cyan-400 font-semibold">WebMCP v1.0 Spec</span>
          </div>
          <p className="text-gray-500">// Autonomous Agent Tool Manifest</p>
          <p>{'{'}</p>
          <p className="pl-4 text-cyan-300">&quot;mcpVersion&quot;: <span className="text-emerald-400">&quot;1.0.0&quot;</span>,</p>
          <p className="pl-4 text-cyan-300">&quot;tools&quot;: [</p>
          <p className="pl-8">{'{'}</p>
          <p className="pl-12 text-purple-400">&quot;name&quot;: <span className="text-emerald-400">&quot;execute_agent_action&quot;</span>,</p>
          <p className="pl-12 text-purple-400">&quot;endpoint&quot;: <span className="text-emerald-400">&quot;https://webmcp.io/proxy&quot;</span>,</p>
          <p className="pl-12 text-purple-400">&quot;authRequired&quot;: <span className="text-orange-400">true</span></p>
          <p className="pl-8">{'}'}</p>
          <p className="pl-4">]</p>
          <p>{'}'}</p>
        </div>
      </section>
    </div>
  );
}
