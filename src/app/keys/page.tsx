"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  scope: "Full Access" | "Read Only";
  status: "Active" | "Revoked";
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScope, setNewKeyScope] = useState<"Full Access" | "Read Only">("Full Access");
  const [visibleKeys, setVisibleKeys] = useState<{ [key: string]: boolean }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedKeyForSnippet, setSelectedKeyForSnippet] = useState<string>("");

  useEffect(() => {
    // Load existing keys from local storage or initialize mock keys
    const saved = localStorage.getItem("webmcp_api_keys");
    if (saved) {
      const parsed = JSON.parse(saved);
      setKeys(parsed);
      if (parsed.length > 0) setSelectedKeyForSnippet(parsed[0].key);
    } else {
      const initialKeys: ApiKey[] = [
        {
          id: "key_1",
          name: "Production Worker Proxy",
          key: "wm_live_8f912a7bc43901de820a45",
          created: "2026-10-01",
          scope: "Full Access",
          status: "Active",
        },
        {
          id: "key_2",
          name: "Staging Test Key",
          key: "wm_test_3c190a42df1890ef01192d",
          created: "2026-10-10",
          scope: "Read Only",
          status: "Active",
        },
      ];
      setKeys(initialKeys);
      localStorage.setItem("webmcp_api_keys", JSON.stringify(initialKeys));
      setSelectedKeyForSnippet(initialKeys[0].key);
    }
  }, []);

  const saveKeysToStorage = (updatedKeys: ApiKey[]) => {
    setKeys(updatedKeys);
    localStorage.setItem("webmcp_api_keys", JSON.stringify(updatedKeys));
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const randomHash = Array.from({ length: 22 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    
    const newKeyItem: ApiKey = {
      id: `key_${Date.now()}`,
      name: newKeyName.trim(),
      key: `wm_live_${randomHash}`,
      created: new Date().toISOString().split("T")[0],
      scope: newKeyScope,
      status: "Active",
    };

    const updated = [newKeyItem, ...keys];
    saveKeysToStorage(updated);
    if (!selectedKeyForSnippet) setSelectedKeyForSnippet(newKeyItem.key);
    setNewKeyName("");
    setModalOpen(false);
  };

  const handleRevokeKey = (id: string) => {
    const updated = keys.map((k) => (k.id === id ? { ...k, status: "Revoked" as const } : k));
    saveKeysToStorage(updated);
  };

  const handleDeleteKey = (id: string) => {
    const updated = keys.filter((k) => k.id !== id);
    saveKeysToStorage(updated);
  };

  const toggleVisibility = (id: string) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8 relative animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-950 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">API Keys & Cloudflare Proxies</h1>
          <p className="text-xs text-indigo-200/70">
            Manage authentication keys and proxy deployment code snippets for your WebMCP agent endpoints.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap active:scale-[0.98]"
        >
          + Create New API Key
        </button>
      </div>

      {/* SECTION 1: API KEYS LIST */}
      <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Active Credentials</h2>
          <span className="text-[10px] text-indigo-300/60">{keys.filter((k) => k.status === "Active").length} Active Keys</span>
        </div>

        <div className="space-y-3">
          {keys.map((item) => (
            <div
              key={item.id}
              className={`bg-[#030014] border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                item.status === "Revoked"
                  ? "border-rose-950/50 opacity-60"
                  : "border-indigo-950 hover:border-indigo-800/80"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-white text-xs">{item.name}</span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                      item.status === "Active"
                        ? "text-emerald-400 bg-emerald-950/60 border-emerald-800/50"
                        : "text-rose-400 bg-rose-950/60 border-rose-800/50"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[9px] font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/40">
                    {item.scope}
                  </span>
                </div>

                {/* Key Display with Reveal/Copy */}
                <div className="flex items-center space-x-2 pt-1">
                  <code className="text-xs font-mono text-cyan-300 bg-[#090520] px-3 py-1 rounded-lg border border-indigo-950">
                    {visibleKeys[item.id]
                      ? item.key
                      : `${item.key.substring(0, 10)}${"•".repeat(16)}`}
                  </code>

                  <button
                    onClick={() => toggleVisibility(item.id)}
                    className="text-xs text-indigo-300 hover:text-white p-1 rounded transition-colors"
                    title={visibleKeys[item.id] ? "Hide Key" : "Reveal Key"}
                  >
                    {visibleKeys[item.id] ? "👁️‍🗨️" : "👁️"}
                  </button>

                  <button
                    onClick={() => copyToClipboard(item.key, item.id)}
                    className="text-xs text-indigo-300 hover:text-cyan-400 p-1 rounded transition-colors"
                    title="Copy Key"
                  >
                    {copiedId === item.id ? "✓ Copied" : "📋"}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 self-end md:self-center">
                {item.status === "Active" && (
                  <button
                    onClick={() => handleRevokeKey(item.id)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-medium transition-colors"
                  >
                    Revoke
                  </button>
                )}
                <button
                  onClick={() => handleDeleteKey(item.id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[11px] font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: READY-TO-DEPLOY CLOUDFLARE WORKER SNIPPET */}
      <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-indigo-950 pb-3">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Cloudflare Worker Proxy Code</h2>
            <p className="text-[11px] text-indigo-200/60">Deploy this worker script to bridge your site to the WebMCP network in 3 minutes.</p>
          </div>
          
          <select
            value={selectedKeyForSnippet}
            onChange={(e) => setSelectedKeyForSnippet(e.target.value)}
            className="bg-[#030014] border border-indigo-900/60 rounded-xl px-3 py-1.5 text-xs text-cyan-300 focus:outline-none"
          >
            {keys
              .filter((k) => k.status === "Active")
              .map((k) => (
                <option key={k.id} value={k.key}>
                  Use Key: {k.name}
                </option>
              ))}
          </select>
        </div>

        <div className="relative">
          <pre className="bg-[#030014] p-4 rounded-xl border border-indigo-950 font-mono text-xs text-indigo-200 overflow-x-auto">
{`export default {
  async fetch(request, env) {
    const WEBMCP_KEY = "${selectedKeyForSnippet || "wm_live_your_key_here"}";
    
    // Intercept AI Agent Schema requests
    const url = new URL(request.url);
    if (url.pathname === "/.well-known/webmcp.json") {
      return new Response(JSON.stringify({
        schemaVersion: "web-mcp-v1",
        status: "200 OK",
        actions: [
          { action: "search", endpoint: "/api/search", method: "GET" },
          { action: "checkout", endpoint: "/api/cart/checkout", method: "POST" }
        ]
      }), {
        headers: {
          "Content-Type": "application/json",
          "X-WebMCP-Auth": WEBMCP_KEY,
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return fetch(request);
  }
};`}
          </pre>
          <button
            onClick={() => copyToClipboard(`export default {\n  async fetch(request, env) {\n    const WEBMCP_KEY = "${selectedKeyForSnippet || "wm_live_your_key_here"}";\n    const url = new URL(request.url);\n    if (url.pathname === "/.well-known/webmcp.json") {\n      return new Response(JSON.stringify({\n        schemaVersion: "web-mcp-v1",\n        status: "200 OK",\n        actions: [\n          { action: "search", endpoint: "/api/search", method: "GET" },\n          { action: "checkout", endpoint: "/api/cart/checkout", method: "POST" }\n        ]\n      }), {\n        headers: {\n          "Content-Type": "application/json",\n          "X-WebMCP-Auth": WEBMCP_KEY,\n          "Access-Control-Allow-Origin": "*"\n        }\n      });\n    }\n    return fetch(request);\n  }\n};`, "snippet")}
            className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold shadow-md transition-all"
          >
            {copiedId === "snippet" ? "✓ Snippet Copied!" : "Copy Worker Snippet"}
          </button>
        </div>
      </div>

      {/* CREATE API KEY MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#090520] border border-indigo-800/80 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Create New API Key</h3>
            
            <form onSubmit={handleCreateKey} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-indigo-200 uppercase mb-1">Key Name / Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Production Shopify Worker"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-indigo-200 uppercase mb-1">Permission Scope</label>
                <select
                  value={newKeyScope}
                  onChange={(e: any) => setNewKeyScope(e.target.value)}
                  className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Full Access">Full Access (Read & Execute Actions)</option>
                  <option value="Read Only">Read Only (Schema Inspection Only)</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-950 text-indigo-200 font-medium hover:bg-indigo-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold transition-all shadow-lg shadow-indigo-600/30"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
