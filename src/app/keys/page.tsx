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
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
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
                  <code className="text-[11px] font-mono text-cyan-300 bg-cyan-950/50 px-2.5 py-1 rounded-lg mt-1.5 inline-block border border-cyan-800/40">
                    {key.api_key}
                  </code>
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

      {/* Developer Integration Guide Card */}
      <div className="bg-[#0b0f29]/80 border border-indigo-900/50 rounded-2xl p-6 backdrop-blur-md shadow-xl space-y-6">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Integration Guide</h2>
          <p className="text-xs text-indigo-300/70">
            Follow these step-by-step instructions to connect your website and make it AI-accessible using your WebMCP keys.
          </p>
        </div>

        <div className="space-y-4 text-xs text-indigo-200">
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-2">
            <div className="font-bold text-cyan-400">Step 1: Store your API Key securely</div>
            <p className="text-indigo-300/80">
              Copy one of your active keys above and add it to your server-side environment configuration file (e.g., <code className="text-cyan-300 bg-cyan-950/50 px-1.5 py-0.5 rounded font-mono">.env.local</code>):
            </p>
            <pre className="p-3 rounded-lg bg-[#030014] text-cyan-300 font-mono text-[11px] border border-indigo-900/50 overflow-x-auto">
{`WEB_MCP_API_KEY=mcp_live_your_actual_key_here
WEB_MCP_PROXY_URL=https://webmcp-console.vercel.app/api/proxy`}
            </pre>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-2">
            <div className="font-bold text-cyan-400">Step 2: Route agent requests through the proxy</div>
            <p className="text-indigo-300/80">
              When your AI agents or LLMs need to interact with your application backend, execute queries through the WebMCP proxy endpoint with your Bearer token:
            </p>
            <pre className="p-3 rounded-lg bg-[#030014] text-cyan-300 font-mono text-[11px] border border-indigo-900/50 overflow-x-auto">
{`async function queryAgentAction(promptText: string) {
  const response = await fetch('https://webmcp-console.vercel.app/api/proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${process.env.WEB_MCP_API_KEY}\`,
    },
    body: JSON.stringify({
      agent_id: 'primary-dev-agent',
      prompt: promptText,
    }),
  });

  return await response.json();
}`}
            </pre>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-2">
            <div className="font-bold text-cyan-400">Step 3: Monitor traffic in Telemetry</div>
            <p className="text-indigo-300/80">
              Once live traffic begins flowing through your proxy endpoint, check your <strong>Telemetry</strong> tab in the console to inspect request volume, routing latency, and execution payloads in real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
