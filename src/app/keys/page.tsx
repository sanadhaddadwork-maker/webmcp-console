'use client';

import { useState, useEffect } from 'react';
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
  const supabase = createClient();

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

  async function generateKey(e: React.FormEvent) {
    e.preventDefault();
    if (!labelInput.trim()) return;

    setCreating(true);
    const generatedKey = `mcp_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

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

  async function deleteKey(id: string) {
    const { error } = await supabase.from('api_keys').delete().eq('id', id);
    if (!error) {
      setKeys(keys.filter((key) => key.id !== id));
    } else {
      alert(`Error deleting key: ${error.message}`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-white">
      <header className="border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">API Key Management</h1>
        <p className="text-sm text-gray-400 mt-1">
          Create and manage access keys for your WebMCP agent integrations.
        </p>
      </header>

      <form onSubmit={generateKey} className="flex gap-3 bg-gray-900 p-4 rounded-xl border border-gray-800">
        <input
          type="text"
          placeholder="Key Label (e.g., Development Agent)"
          value={labelInput}
          onChange={(e) => setLabelInput(e.target.value)}
          className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          disabled={creating}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-sm px-5 py-2 rounded-lg transition"
        >
          {creating ? 'Generating...' : '+ Generate New Key'}
        </button>
      </form>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 font-semibold text-sm text-gray-300">
          Your Active Keys
        </div>

        {loading ? (
          <div className="p-6 text-center text-sm text-gray-500">Loading keys...</div>
        ) : keys.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No API keys found. Generate one above to get started!
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {keys.map((key) => (
              <div key={key.id} className="p-4 flex items-center justify-between gap-4 hover:bg-gray-800/40 transition">
                <div>
                  <div className="font-medium text-sm text-white">{key.key_label}</div>
                  <code className="text-xs text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded mt-1 inline-block border border-blue-800/40">
                    {key.api_key}
                  </code>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">
                    {new Date(key.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => deleteKey(key.id)}
                    className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded bg-red-950/30 hover:bg-red-900/50 border border-red-900/40 transition"
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
