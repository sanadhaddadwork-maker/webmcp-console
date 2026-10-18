"use client";

import { useState } from "react";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("24h");

  const metrics = {
    "24h": { requests: "18,420", latency: "38ms", successRate: "99.8%", activeAgents: "14" },
    "7d": { requests: "142,890", latency: "41ms", successRate: "99.6%", activeAgents: "38" },
    "30d": { requests: "620,400", latency: "42ms", successRate: "99.7%", activeAgents: "84" },
  }[timeframe];

  const agentBreakdown = [
    { name: "ChatGPT-4o (OpenAI)", share: "45%", count: timeframe === "24h" ? "8,289" : "64,300", color: "bg-cyan-500" },
    { name: "Claude 3.5 Sonnet (Anthropic)", share: "32%", count: timeframe === "24h" ? "5,894" : "45,720", color: "bg-indigo-500" },
    { name: "Perplexity AI", share: "15%", count: timeframe === "24h" ? "2,763" : "21,430", color: "bg-purple-500" },
    { name: "Other WebMCP Agents", share: "8%", count: timeframe === "24h" ? "1,474" : "11,440", color: "bg-emerald-500" },
  ];

  const logs = [
    { id: "log_1", agent: "Claude-WebMCP-Bot/1.0", endpoint: "/api/cart/checkout", method: "POST", status: 200, latency: "32ms", time: "1 min ago" },
    { id: "log_2", agent: "ChatGPT-UserAgent/4.0", endpoint: "/api/search?q=running+shoes", method: "GET", status: 200, latency: "28ms", time: "3 mins ago" },
    { id: "log_3", agent: "PerplexityBot/2.1", endpoint: "/.well-known/webmcp.json", method: "GET", status: 200, latency: "19ms", time: "7 mins ago" },
    { id: "log_4", agent: "ChatGPT-UserAgent/4.0", endpoint: "/api/cart/checkout", method: "POST", status: 200, latency: "44ms", time: "12 mins ago" },
    { id: "log_5", agent: "Anthropic-Crawler/3.5", endpoint: "/api/products/catalog", method: "GET", status: 304, latency: "15ms", time: "18 mins ago" },
    { id: "log_6", agent: "Custom-Agent-Scraper", endpoint: "/api/checkout/pay", method: "POST", status: 422, latency: "89ms", time: "24 mins ago" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8 relative animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-950 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Agent Telemetry & Analytics</h1>
          <p className="text-xs text-indigo-200/70">
            Real-time request metrics, proxy response latency, and agent conversion breakdown.
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center space-x-1 bg-[#090520] p-1 rounded-xl border border-indigo-950">
          {(["24h", "7d", "30d"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === t
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-indigo-300 hover:text-white"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: LIVE METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-5 space-y-2 shadow-xl">
          <p className="text-[10px] uppercase font-bold text-indigo-400">Total Agent Requests</p>
          <div className="text-2xl font-black text-white">{metrics.requests}</div>
          <span className="text-[10px] text-emerald-400 font-semibold">↑ 14% vs previous period</span>
        </div>

        <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-5 space-y-2 shadow-xl">
          <p className="text-[10px] uppercase font-bold text-indigo-400">Avg Edge Latency</p>
          <div className="text-2xl font-black text-cyan-300">{metrics.latency}</div>
          <span className="text-[10px] text-cyan-400 font-semibold">⚡ Cloudflare Worker Edge</span>
        </div>

        <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-5 space-y-2 shadow-xl">
          <p className="text-[10px] uppercase font-bold text-indigo-400">Schema Success Rate</p>
          <div className="text-2xl font-black text-emerald-400">{metrics.successRate}</div>
          <span className="text-[10px] text-emerald-400 font-semibold">Zero schema parsing drops</span>
        </div>

        <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-5 space-y-2 shadow-xl">
          <p className="text-[10px] uppercase font-bold text-indigo-400">Unique Active Bots</p>
          <div className="text-2xl font-black text-purple-300">{metrics.activeAgents}</div>
          <span className="text-[10px] text-purple-400 font-semibold">Claude, ChatGPT, Perplexity</span>
        </div>

      </div>

      {/* SECTION 2: AI AGENT DISTRIBUTION & LATENCY GRAPH */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Agent Traffic Breakdown */}
        <div className="md:col-span-2 bg-[#090520] border border-indigo-900/60 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Agent Traffic Distribution</h2>
            <span className="text-[10px] text-indigo-300/60">Filtered by {timeframe.toUpperCase()}</span>
          </div>

          <div className="space-y-4">
            {agentBreakdown.map((item) => (
              <div key={item.name} className="space-y-1.5 text-xs">
                <div className="flex justify-between text-indigo-200">
                  <span className="font-semibold text-white">{item.name}</span>
                  <span>{item.count} requests ({item.share})</span>
                </div>
                <div className="w-full bg-[#030014] rounded-full h-2.5 overflow-hidden border border-indigo-950">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: item.share }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time Health Status */}
        <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-indigo-950 pb-3">System Health</h2>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-[#030014] rounded-xl border border-indigo-950">
                <span className="text-indigo-200">Worker Status</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">100% Operational</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#030014] rounded-xl border border-indigo-950">
                <span className="text-indigo-200">Local Routing</span>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">Jordan CliQ Active</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#030014] rounded-xl border border-indigo-950">
                <span className="text-indigo-200">Schema Version</span>
                <span className="text-[10px] font-mono text-indigo-300">web-mcp-v1</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-indigo-950 text-center">
            <p className="text-[11px] text-indigo-300/60">Edge Workers deployed in 280+ global locations.</p>
          </div>
        </div>

      </div>

      {/* SECTION 3: RECENT REQUEST LOG STREAM */}
      <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Live Agent Request Stream</h2>
          <span className="text-[10px] font-mono text-cyan-400 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Real-time Streaming</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-indigo-950 text-indigo-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Agent User-Agent</th>
                <th className="py-2.5 px-3">Target Endpoint</th>
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-950/60">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-indigo-950/40 transition-colors font-mono">
                  <td className="py-3 px-3 text-indigo-300/60 text-[11px]">{log.time}</td>
                  <td className="py-3 px-3 text-white font-semibold font-sans">{log.agent}</td>
                  <td className="py-3 px-3 text-cyan-300">{log.endpoint}</td>
                  <td className="py-3 px-3">
                    <span className="bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded text-[10px]">
                      {log.method}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 200
                          ? "text-emerald-400 bg-emerald-950/60"
                          : log.status === 304
                          ? "text-cyan-400 bg-cyan-950/60"
                          : "text-rose-400 bg-rose-950/60"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right text-indigo-200">{log.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
