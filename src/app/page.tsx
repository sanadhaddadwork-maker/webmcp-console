'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-24 py-8 bg-transparent">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-10 pb-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-mono bg-indigo-950/80 text-cyan-300 px-4 py-1.5 rounded-full border border-indigo-800/60 uppercase tracking-widest shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            The Standard for Agentic Web Infrastructure
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Make Your Website <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-blue-500">
              AI Agent Accessible
            </span>
          </h1>
          <p className="text-gray-300 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Expose structured Model Context Protocol (MCP) tool definitions directly over secure Web APIs. Allow autonomous LLM agents like ChatGPT, Claude, and Perplexity to interact seamlessly with your platform.
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

      {/* The Core Comparison: Without vs With WebMCP */}
      <section className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white">Why Your Platform Needs WebMCP</h2>
          <p className="text-gray-300 text-sm">
            See the difference between relying on brittle web scrapers and deploying native agent protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Without WebMCP */}
          <div className="bg-rose-950/20 backdrop-blur-xl border border-rose-900/40 rounded-3xl p-8 space-y-6 shadow-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono bg-rose-950/80 text-rose-300 px-3 py-1 rounded-full border border-rose-800/60 uppercase">
              <span>✕ Without WebMCP</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Brittle Scraping &amp; HTML Parsing</h3>
            <ul className="space-y-4 text-xs text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-base">✕</span>
                <span><strong>Frequent Breakages:</strong> UI redesigns or CSS class changes instantly break LLM scrapers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-base">✕</span>
                <span><strong>High Token Costs:</strong> Parsing heavy HTML DOM trees wastes thousands of unnecessary context tokens.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-400 font-bold text-base">✕</span>
                <span><strong>Zero Security Control:</strong> No standardized authentication or rate limiting for autonomous bots.</span>
              </li>
            </ul>
          </div>

          {/* With WebMCP */}
          <div className="bg-indigo-950/30 backdrop-blur-xl border border-cyan-500/40 rounded-3xl p-8 space-y-6 shadow-2xl ring-2 ring-cyan-500/20">
            <div className="inline-flex items-center gap-2 text-xs font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/60 uppercase">
              <span>✓ With WebMCP Protocol</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Deterministic Agent Tool Calling</h3>
            <ul className="space-y-4 text-xs text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold text-base">✓</span>
                <span><strong>Structured JSON Schemas:</strong> Agents receive precise, machine-readable parameter definitions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold text-base">✓</span>
                <span><strong>Sub-40ms Edge Routing:</strong> Powered by Cloudflare Workers for lightning-fast worldwide execution.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold text-base">✓</span>
                <span><strong>Enterprise Authorization:</strong> Secure `mcp_live_` API keys backed by real-time Supabase telemetry.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Deep Dive Feature Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white">Complete Infrastructure Suite</h2>
          <p className="text-gray-300 text-sm">
            Everything required to build, secure, and monitor your AI agent integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-indigo-950/30 backdrop-blur-xl border border-indigo-900/50 rounded-2xl p-8 space-y-4 shadow-xl hover:border-cyan-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm font-bold font-mono">
              01
            </div>
            <h3 className="text-xl font-bold text-white">API Key Management</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Generate scoped live credentials with custom labels, instant revocation, and database synchronization.
            </p>
          </div>

          <div className="bg-indigo-950/30 backdrop-blur-xl border border-indigo-900/50 rounded-2xl p-8 space-y-4 shadow-xl hover:border-cyan-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm font-bold font-mono">
              02
            </div>
            <h3 className="text-xl font-bold text-white">Telemetry &amp; Analytics</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Monitor traffic distribution across ChatGPT, Claude, and Perplexity with real-time latency and success metrics.
            </p>
          </div>

          <div className="bg-indigo-950/30 backdrop-blur-xl border border-indigo-900/50 rounded-2xl p-8 space-y-4 shadow-xl hover:border-cyan-500/50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold font-mono">
              03
            </div>
            <h3 className="text-xl font-bold text-white">Flexible Subscriptions</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Scale smoothly from Free Tier ($0) up to Enterprise ($499/mo) with automated Supabase billing sync.
            </p>
          </div>
        </div>
      </section>

      {/* Developer Schema Showcase */}
      <section className="bg-indigo-950/20 backdrop-blur-xl border border-indigo-900/40 rounded-3xl p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/40 uppercase">
            Protocol Specification
          </span>
          <h2 className="text-3xl font-extrabold text-white">Standardized Agent Discovery</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            AI agents automatically inspect your `/.well-known/mcp.json` manifest to discover available actions, parameter types, and secure authentication requirements.
          </p>
          <div className="pt-2">
            <Link
              href="/keys"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/50 px-4 py-2 rounded-xl transition-colors"
            >
              <span>Explore API Console</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="bg-[#030014]/90 border border-indigo-900/80 rounded-2xl p-6 font-mono text-xs text-indigo-300 shadow-2xl space-y-3 overflow-x-auto">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-950">
            <span className="text-gray-500">/.well-known/mcp.json</span>
            <span className="text-cyan-400 font-semibold">WebMCP v1.0</span>
          </div>
          <p className="text-gray-500">// Autonomous Agent Tool Manifest</p>
          <p>{'{'}</p>
          <p className="pl-4 text-cyan-300">&quot;mcpVersion&quot;: <span className="text-emerald-400">&quot;1.0.0&quot;</span>,</p>
          <p className="pl-4 text-cyan-300">&quot;tools&quot;: [</p>
          <p className="pl-8">{'{'}</p>
          <p className="pl-12 text-purple-400">&quot;name&quot;: <span className="text-emerald-400">&quot;execute_agent_action&quot;</span>,</p>
          <p className="pl-12 text-purple-400">&quot;description&quot;: <span className="text-emerald-400">&quot;Secure LLM proxy routing endpoint&quot;</span>,</p>
          <p className="pl-12 text-purple-400">&quot;authRequired&quot;: <span className="text-orange-400">true</span></p>
          <p className="pl-8">{'}'}</p>
          <p className="pl-4">]</p>
          <p>{'}'}</p>
        </div>
      </section>
    </div>
  );
}
