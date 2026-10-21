'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseBrowser';

interface ApiKey {
  id: string;
  key_label: string;
  api_key: string;
  created_at: string;
}

export default function HomePage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [labelInput, setLabelInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const supabase = createClient();

  // Load keys directly from Supabase
  useEffect(() => {
    fetchKeys();
  }, []);

  async function fetchKeys() {
    setLoading(true);
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setKeys(data);
    }
    setLoading(false);
  }

  // Create a new key in Supabase
  async function handleCreateKey(e: React.FormEvent) {
    e.preventDefault();
    if (!labelInput.trim()) return;

    setCreating(true);
    const generatedKey = `wm_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

    const { data, error } = await supabase
      .from('api_keys')
      .insert([{ key_label: labelInput, api_key: generatedKey }])
      .select();

    if (!error && data) {
      setKeys([data[0], ...keys]);
      setLabelInput('');
    } else if (error) {
      alert(`Error creating key: ${error.message}`);
    }
    setCreating(false);
  }

  // Delete key from Supabase
  async function handleDeleteKey(id: string) {
    const { error } = await supabase.from('api_keys').delete().eq('id', id);
    if (!error) {
      setKeys(keys.filter((key) => key.id !== id));
    } else if (error) {
      alert(`Error deleting key: ${error.message}`);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <header className="border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tight">API Keys & Cloudflare Proxies</h1>
        <p className="text-sm text-gray-400 mt-2">
          Manage authentication keys and proxy deployment code snippets for your WebMCP agent endpoints.
        </p>
      </header>

      {/* Form: Generate Key */}
      <form onSubmit={handleCreateKey} className="flex gap-4 bg-gray-900/60 p-4 rounded-xl border border-gray-800">
        <input
          type="text"
          placeholder="Key Label (e.g., shopify01, Staging Key)"
          value={labelInput}
          onChange={(e) => setLabelInput(e.target.value)}
          className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          disabled={creating}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-sm px-6 py-2 rounded-lg transition"
        >
          {creating ? 'Generating...' : '+ Create New API Key'}
        </button>
      </form>

      {/* Active Credentials Table */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 font-semibold text-sm text-gray-300 flex justify-between items-center">
          <span>ACTIVE CREDENTIALS</span>
          <span className="text-xs text-gray-500">{keys.length} Active Keys</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">Loading keys from Supabase...</div>
        ) : keys.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No active API keys found in database. Create one above to get started!
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {keys.map((key) => (
              <div key={key.id} className="p-5 flex items-center justify-between gap-4 hover:bg-gray-800/30 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{key.key_label}</span>
                    <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 text-[10px] px-2 py-0.5 rounded-full font-medium">
                      Active
                    </span>
                  </div>
                  <code className="text-xs text-blue-400 bg-blue-950/30 px-2.5 py-1 rounded inline-block border border-blue-900/40 font-mono">
                    {key.api_key}
                  </code>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 mr-2">
                    {new Date(key.created_at).toLocaleDateString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteKey(key.id)}
                    className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded bg-red-950/30 hover:bg-red-900/40 border border-red-900/40 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
