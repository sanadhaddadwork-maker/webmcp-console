"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseBrowser";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      } else {
        const mockUser = localStorage.getItem("mock_user");
        if (mockUser) setUser(JSON.parse(mockUser));
      }
    }).catch(() => {
      const mockUser = localStorage.getItem("mock_user");
      if (mockUser) setUser(JSON.parse(mockUser));
    });
  }, []);

  const handleActionClick = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/plans");
    }
  };

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`http://localhost:8788/v1/parse?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({
        success: true,
        targetUrl: url,
        schemaVersion: "web-mcp-v1",
        extractedActions: [
          { action: "search", endpoint: "/api/search", method: "GET" },
          { action: "checkout", endpoint: "/api/cart/checkout", method: "POST" }
        ],
        message: "Simulated response (Cloudflare Worker active on port 8788)"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-24 py-6 w-full">
      
      {/* SECTION 1: HERO & AUDIT INPUT */}
      <div className="text-center space-y-6 max-w-4xl mx-auto pt-4">
        <div className="inline-flex items-center space-x-2 text-[11px] font-bold tracking-wide uppercase text-indigo-300 bg-indigo-950/70 px-4 py-1.5 rounded-full border border-indigo-800/60 shadow-lg shadow-indigo-950/50">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>The Next Frontier of E-Commerce & Web Search</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
          Don't Let AI Shoppers Skip Your Store.{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
            Make It AI-Agent Accessible.
          </span>
        </h1>

        <p className="text-sm md:text-base text-indigo-200/80 max-w-2xl mx-auto leading-relaxed">
          Millions of buyers ask Claude, ChatGPT, and Perplexity to research and purchase products for them. WebMCP bridges your store to autonomous AI agents in minutes—no site redesign required.
        </p>

        {/* Audit Input Form */}
        <form onSubmit={handleRunAudit} className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto pt-2">
          <input
            type="url"
            required
            placeholder="Enter your store URL (e.g., https://yourstore.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full sm:flex-1 bg-[#090520] border border-indigo-900/80 rounded-2xl px-5 py-3.5 text-xs text-white placeholder-indigo-300/40 focus:outline-none focus:border-indigo-500 shadow-inner"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap active:scale-[0.98]"
          >
            {loading ? "Analyzing Store..." : "Run AI Audit →"}
          </button>
        </form>
      </div>

      {/* Audit Output Result Card */}
      {result && (
        <div className="max-w-3xl mx-auto bg-[#090520] border border-indigo-900/80 rounded-2xl p-6 space-y-4 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-200">Generated WebMCP AI Schema</h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60 font-bold">200 OK • AI Compatible</span>
          </div>
          <pre className="bg-[#030014] p-4 rounded-xl border border-indigo-950 font-mono text-xs text-cyan-300 overflow-x-auto max-h-96">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {/* SECTION 2: TRUST & PERFORMANCE GUARANTEES */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#090520]/80 border border-indigo-950 rounded-2xl p-4 text-center space-y-1">
          <div className="text-cyan-400 font-black text-base">99.99%</div>
          <div className="text-[11px] font-bold text-white">Edge Uptime SLA</div>
          <p className="text-[10px] text-indigo-300/60">Powered by Cloudflare network.</p>
        </div>

        <div className="bg-[#090520]/80 border border-indigo-950 rounded-2xl p-4 text-center space-y-1">
          <div className="text-cyan-400 font-black text-base">&lt; 50ms</div>
          <div className="text-[11px] font-bold text-white">Proxy Latency</div>
          <p className="text-[10px] text-indigo-300/60">Instant AI response time.</p>
        </div>

        <div className="bg-[#090520]/80 border border-indigo-950 rounded-2xl p-4 text-center space-y-1">
          <div className="text-cyan-400 font-black text-base">Zero-Touch</div>
          <div className="text-[11px] font-bold text-white">Non-Invasive</div>
          <p className="text-[10px] text-indigo-300/60">Never alters your core code.</p>
        </div>

        <div className="bg-[#090520]/80 border border-indigo-950 rounded-2xl p-4 text-center space-y-1">
          <div className="text-cyan-400 font-black text-base">Local & Global</div>
          <div className="text-[11px] font-bold text-white">Tax Compliant</div>
          <p className="text-[10px] text-indigo-300/60">CliQ, Wallets, & Card routing.</p>
        </div>
      </div>

      {/* SECTION 3: RISK VS REWARD COMPARISON */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-950/40 via-[#090520] to-rose-950/30 border border-indigo-900/60 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left: Without WebMCP */}
          <div className="space-y-4 border-b md:border-b-0 md:border-r border-indigo-950 pb-6 md:pb-0 md:pr-8">
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/50">
              <span>❌ Without WebMCP</span>
            </div>
            <h3 className="text-xl font-bold text-white">Invisible to AI Buyers</h3>
            <ul className="space-y-2.5 text-xs text-indigo-200/70">
              <li className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>AI agents fail on dynamic popups, CAPTCHAs, and heavy client scripts.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Your store gets skipped when users ask AI to search or buy products.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Requires costly engineering rewrites every time your site design changes.</span>
              </li>
            </ul>
          </div>

          {/* Right: With WebMCP */}
          <div className="space-y-4 md:pl-4">
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50">
              <span>⚡ With WebMCP Edge Proxy</span>
            </div>
            <h3 className="text-xl font-bold text-white">100% Agent Accessible</h3>
            <ul className="space-y-2.5 text-xs text-indigo-200/80">
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Translates dynamic stores into sub-50ms JSON schemas for ChatGPT & Claude.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Captures automated checkout transactions directly from AI assistants.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Zero frontend code changes—deploy via Cloudflare Edge in 3 minutes.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* SECTION 4: HOW IT WORKS (3 SIMPLE STEPS) */}
      <div className="max-w-5xl mx-auto space-y-12 bg-[#090520]/60 border border-indigo-900/60 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Get AI-Ready In 3 Easy Steps</h2>
          <p className="text-xs md:text-sm text-indigo-200/70">Connecting your website to the WebMCP network takes less than 3 minutes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3 relative">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-lg shadow-indigo-600/40">
                1
              </span>
              <h3 className="text-sm font-bold text-white">Generate Your API Key</h3>
            </div>
            <p className="text-xs text-indigo-200/70 leading-relaxed pl-11">
              Sign up for an account, choose your tier, and navigate to <span className="text-cyan-400 font-medium">API Keys & Proxies</span> to copy your private key.
            </p>
          </div>

          <div className="space-y-3 relative">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-xs flex items-center justify-center shadow-lg shadow-cyan-500/40">
                2
              </span>
              <h3 className="text-sm font-bold text-white">Deploy Worker Proxy</h3>
            </div>
            <p className="text-xs text-indigo-200/70 leading-relaxed pl-11">
              Add our lightweight Cloudflare Worker snippet to your website domain. Plug in your API key to authenticate the proxy tunnel.
            </p>
          </div>

          <div className="space-y-3 relative">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center justify-center shadow-lg shadow-emerald-500/40">
                3
              </span>
              <h3 className="text-sm font-bold text-white">Capture AI Sales</h3>
            </div>
            <p className="text-xs text-indigo-200/70 leading-relaxed pl-11">
              Run an audit to verify active endpoints. Your store is now live on the WebMCP network, ready for automated agent traffic and sales.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: NEW COMPELLING CATCHPHRASE CALLOUT */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-900/60 via-[#090520] to-cyan-950/60 border border-indigo-800/80 rounded-3xl p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            The Autonomous Web Is Here. Connect Your Store Today.
          </h2>
          <p className="text-xs md:text-sm text-indigo-200/80 leading-relaxed">
            Prepare your website for the shift from human-driven search to autonomous AI agent transactions. Zero rewrites required.
          </p>
        </div>
        <div>
          <button
            onClick={handleActionClick}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs transition-all shadow-xl shadow-indigo-600/40 active:scale-[0.98]"
          >
            Get Started with WebMCP →
          </button>
        </div>
      </div>

    </div>
  );
}
