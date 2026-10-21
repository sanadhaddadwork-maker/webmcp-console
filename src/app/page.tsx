'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-20 py-8 bg-transparent">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-8 pb-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-mono bg-indigo-950/80 text-cyan-300 px-4 py-1.5 rounded-full border border-indigo-800/60 uppercase tracking-widest shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            WebMCP Protocol v1.0
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Make Your Website <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-blue-500">
              AI Agent Accessible
            </span>
          </h1>
          <p className="text-gray-300 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Expose structured Model Context Protocol (MCP) tool definitions directly over Web APIs. Allow LLM agents like ChatGPT, Claude, and Perplexity to interact seamlessly with your application.
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
              Live Telemetry 📊
            </Link>
            <Link
              href="/plans"
              className="bg-[#090520]/80 hover:bg-indigo-950/80 text-cyan-300 border border-cyan-800/50 font-bold text-xs px-8 py-3.5 rounded-xl transition-all backdrop-blur-md"
            >
              Plans & Pricing ⚡
            </Link>
          </div>
        </div>
      </section>

      {/* Live Stats Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-indigo-950/20 backdrop-blur-md border border-indigo-900/40 rounded-3xl p-8 shadow-2xl">
        <div className="text-center space-y-1">
          <div className="text-3xl lg:text-4xl font-extrabold text-white">38ms</div>
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono">Edge Response Latency</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-3xl lg:text-4xl font-extrabold text-white">99.8%</div>
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono">Schema Parsing Accuracy</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-3xl lg:text-4xl font-extrabold text-white">18,420+</div>
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono">Agent Requests Processed</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-3xl lg:text-4xl font-extrabold text-emerald-400 flex items-center justify-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span> 100%
          </div>
          <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono">Protocol Uptime</div>
        </div>
      </section>

      {/* How WebMCP Works */}
      <section className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white">How WebMCP Bridges Websites &amp; AI Agents</h2>
          <p className="text-gray-300 text-sm">
            Traditional web endpoints are designed for human HTML rendering. WebMCP exposes machine-readable JSON schemas designed specifically for autonomous LLM tool calling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-indigo-950/30 backdrop-blur-xl border border-indigo-900/50 rounded-2xl p-8 space-y-4 shadow-xl hover:border-cyan-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm font-bold font-mono">
              01
            </div>
            <h3 className="text-xl font-bold text-white">Declare Schema</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Define your site&apos;s capabilities—from e-commerce checkout to data queries—using standardized WebMCP JSON schemas.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-indigo-950/30 backdrop-blur-xl border border-indigo-900/50 rounded-2xl p-8 space-y-4 shadow-xl hover:border-cyan-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm font-bold font-mono">
              02
            </div>
            <h3 className="text-xl font-bold text-white">Proxy Authentication</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Authenticate requests through secure `mcp_live_` API keys, backed by instant Supabase authorization &amp; token rate limiting.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-indigo-950/30 backdrop-blur-xl border border-indigo-900/50 rounded-2xl p-8 space-y-4 shadow-xl hover:border-cyan-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold font-mono">
              03
            </div>
            <h3 className="text-xl font-bold text-white">Execute Agent Actions</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Autonomous bots interact directly with your WebMCP endpoints, bypassing scraping errors and providing reliable agent responses.
            </p>
          </div>
        </div>
      </section>

      {/* Code & Schema Demo */}
      <section className="bg-indigo-950/20 backdrop-blur-xl border border-indigo-900/40 rounded-3xl p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/40 uppercase">
            Developer Integration
          </span>
          <h2 className="text-3xl font-extrabold text-white">Simple &amp; Deterministic Integration</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Add WebMCP headers to your existing API endpoints. Agents discover your site capabilities via `/.well-known/mcp.json` and execute structured actions safely.
          </p>
          <div className="pt-2">
            <Link
              href="/keys"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/50 px-4 py-2 rounded-xl transition-colors"
            >
              <span>Generate WebMCP Keys</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="bg-[#030014]/90 border border-indigo-900/80 rounded-2xl p-6 font-mono text-xs text-indigo-300 shadow-2xl space-y-3 overflow-x-auto">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
            <span className="text-gray-500">/.well-known/mcp.json</span>
            <span className="text-cyan-400 font-semibold">WebMCP Schema</span>
          </div>
          <p className="text-gray-500">// Standardized Agent Tool manifest</p>
          <p>{'{'}</p>
          <p className="pl-4 text-cyan-300">&quot;mcpVersion&quot;: <span className="text-emerald-400">&quot;1.0.0&quot;</span>,</p>
          <p className="pl-4 text-cyan-300">&quot;tools&quot;: [</p>
          <p className="pl-8">{'{'}</p>
          <p className="pl-12 text-purple-400">&quot;name&quot;: <span className="text-emerald-400">&quot;search_products&quot;</span>,</p>
          <p className="pl-12 text-purple-400">&quot;description&quot;: <span className="text-emerald-400">&quot;Query live catalog items for LLM agents&quot;</span>,</p>
          <p className="pl-12 text-purple-400">&quot;endpoint&quot;: <span className="text-emerald-400">&quot;https://api.yoursite.com/mcp/search&quot;</span></p>
          <p className="pl-8">{'}'}</p>
          <p className="pl-4">]</p>
          <p>{'}'}</p>
        </div>
      </section>
    </div>
  );
}
