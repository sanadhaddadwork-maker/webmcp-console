'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';

interface ApiKey {
  id: string;
  key_label: string;
  api_key: string;
  created_at: string;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [labelInput, setLabelInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;

    async function checkAuthAndFetchKeys() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          if (isMounted) router.replace('/login?redirect=/api-keys');
          return;
        }

        const { data, error } = await supabase
          .from('api_keys')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50);

        if (!error && data && isMounted) {
          setKeys(data);
        }
      } catch (err) {
        console.error('Failed to fetch keys:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkAuthAndFetchKeys();

    return () => {
      isMounted = false;
    };
  }, [supabase, router]);

  async function generateKey(e: React.FormEvent) {
    e.preventDefault();
    if (!labelInput.trim() || creating) return;

    setCreating(true);
    const generatedKey = `mcp_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/login?redirect=/api-keys');
        return;
      }

      const { data, error } = await supabase
        .from('api_keys')
        .insert([{ 
          user_id: user.id, 
          key_label: labelInput.trim(), 
          api_key: generatedKey 
        }])
        .select();

      if (!error && data) {
        setKeys((prev) => [data[0], ...prev]);
        setLabelInput('');
      } else if (error) {
        alert(`Error creating key: ${error.message}`);
      }
    } catch (err: any) {
      alert(`Unexpected error: ${err.message}`);
    } finally {
      setCreating(false);
    }
  }

  async function deleteKey(id: string) {
    try {
      const { error } = await supabase.from('api_keys').delete().eq('id', id);
      if (!error) {
        setKeys((prev) => prev.filter((key) => key.id !== id));
      } else {
        alert(`Error deleting key: ${error.message}`);
      }
    } catch (err: any) {
      alert(`Unexpected error: ${err.message}`);
    }
  }

  const copyToClipboard = (keyStr: string) => {
    navigator.clipboard.writeText(keyStr);
    setCopiedKey(keyStr);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-indigo-300 text-xs font-mono">
          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>Authenticating session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-10">
      {/* Header */}
      <div className="border-b border-indigo-950 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">API Key Management</h1>
        <p className="text-indigo-200/70 text-sm mt-1">
          Create and manage secure access keys for your WebMCP agent integrations.
        </p>
      </div>

      {/* Generator Form */}
      <form onSubmit={generateKey} className="flex gap-3 bg-[#0b0f29]/80 p-5 rounded-2xl border border-indigo-900/50 backdrop-blur-md shadow-xl">
        <input
          type="text"
          placeholder="Key Label (e.g., Development Agent)"
          value={labelInput}
          onChange={(e) => setLabelInput(e.target.value)}
          className="flex-1 bg-[#030014] border border-indigo-800/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-indigo-400/50 focus:outline-none focus:border-cyan-400 transition"
          required
        />
        <button
          type="submit"
          disabled={creating}
          className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 disabled:opacity-50 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30 whitespace-nowrap"
        >
          {creating ? 'Generating...' : '+ Generate New Key'}
        </button>
      </form>

      {/* Keys Table Container */}
      <div className="bg-[#0b0f29]/80 border border-indigo-900/50 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl">
        <div className="px-6 py-4 border-b border-indigo-950 font-bold text-xs text-indigo-300 uppercase tracking-wider">
          Your Active Keys
        </div>

        {keys.length === 0 ? (
          <div className="p-8 text-center text-xs text-indigo-400/70">
            No API keys found. Generate one above to get started!
          </div>
        ) : (
          <div className="divide-y divide-indigo-950/60">
            {keys.map((key) => (
              <div key={key.id} className="p-5 flex items-center justify-between gap-4 hover:bg-indigo-950/30 transition">
                <div>
                  <div className="font-semibold text-sm text-white">{key.key_label}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <code className="text-[11px] font-mono text-cyan-300 bg-cyan-950/50 px-2.5 py-1 rounded-lg border border-cyan-800/40">
                      {key.api_key}
                    </code>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(key.api_key)}
                      className="text-[10px] text-indigo-300 hover:text-white px-2 py-1 rounded bg-indigo-950 border border-indigo-800/50 transition"
                    >
                      {copiedKey === key.api_key ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-[11px] text-indigo-400/70">
                    {new Date(key.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => deleteKey(key.id)}
                    className="text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg bg-rose-950/30 hover:bg-rose-900/50 border border-rose-900/40 transition font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comprehensive Professional Integration Guide */}
      <div className="bg-[#0b0f29]/80 border border-indigo-900/50 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-xl space-y-8">
        <div className="border-b border-indigo-950 pb-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider mb-1">
            Complete WebMCP Integration Guide
          </h2>
          <p className="text-xs text-indigo-300/70">
            Follow this step-by-step developer guide to connect your website or app to our agent proxy infrastructure.
          </p>
        </div>

        <div className="space-y-8 text-xs text-indigo-200">
          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/40 text-xs">
                1
              </span>
              <h3 className="font-bold text-white text-sm">Generate & Store Your API Key</h3>
            </div>
            <p className="text-indigo-300/80 leading-relaxed pl-9">
              Generate a key above and store it securely in your website&apos;s server-side environment variables. Never expose this key in public client-side JavaScript.
            </p>
            <div className="pl-9">
              <div className="text-[11px] font-mono text-indigo-400 mb-1">In your website project (.env.local):</div>
              <pre className="p-3.5 rounded-xl bg-[#030014] text-cyan-300 font-mono text-[11px] border border-indigo-900/60 overflow-x-auto">
{`WEBMCP_API_KEY=mcp_live_your_generated_key_here
WEBMCP_PROXY_URL=https://webmcp-console.vercel.app/api/proxy`}
              </pre>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/40 text-xs">
                2
              </span>
              <h3 className="font-bold text-white text-sm">Send Requests Through the Proxy Endpoint</h3>
            </div>
            <p className="text-indigo-300/80 leading-relaxed pl-9">
              Route your AI agent queries and tool calls through our high-performance proxy. Pass your key in the <code className="text-cyan-300 font-mono bg-cyan-950/60 px-1.5 py-0.5 rounded">Authorization</code> header as a Bearer token.
            </p>
            <div className="pl-9 space-y-2">
              <div className="text-[11px] font-mono text-indigo-400">Node.js / TypeScript Example:</div>
              <pre className="p-3.5 rounded-xl bg-[#030014] text-cyan-300 font-mono text-[11px] border border-indigo-900/60 overflow-x-auto">
{`async function sendAgentQuery(prompt: string) {
  const response = await fetch(process.env.WEBMCP_PROXY_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${process.env.WEBMCP_API_KEY}\`,
    },
    body: JSON.stringify({
      agent_id: 'my-website-agent',
      prompt: prompt,
      action: 'process_query',
    }),
  });

  if (!response.ok) {
    throw new Error(\`WebMCP Proxy Error: \${response.status}\`);
  }

  const result = await response.json();
  return result;
}`}
              </pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/40 text-xs">
                3
              </span>
              <h3 className="font-bold text-white text-sm">Verify Payload & Handle Responses</h3>
            </div>
            <p className="text-indigo-300/80 leading-relaxed pl-9">
              The WebMCP proxy validates your API key, runs schema sanitization, and returns structured agent payloads. Ensure your application parses the JSON response appropriately.
            </p>
            <div className="pl-9">
              <div className="text-[11px] font-mono text-indigo-400 mb-1">Expected Standard JSON Response:</div>
              <pre className="p-3.5 rounded-xl bg-[#030014] text-cyan-300 font-mono text-[11px] border border-indigo-900/60 overflow-x-auto">
{`{
  "status": "success",
  "data": {
    "agent_id": "my-website-agent",
    "response": "Agent task executed successfully.",
    "execution_time_ms": 42
  }
}`}
              </pre>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/40 text-xs">
                4
              </span>
              <h3 className="font-bold text-white text-sm">Monitor Live Performance in Telemetry</h3>
            </div>
            <p className="text-indigo-300/80 leading-relaxed pl-9">
              Once requests begin executing through your website, navigate to the <strong>Telemetry</strong> tab in this console to view real-time request rates, latency tracking, and execution logs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
