'use client';

import { useState } from 'react';

export default function ApiKeysPage() {
  const [keys, setKeys] = useState([
    { id: '1', name: 'Production Edge Key', prefix: 'wmcp_live_9x8f...', created: '2026-09-15', lastUsed: '2 mins ago' },
  ]);
  const [keyName, setKeyName] = useState('');
  const [newKey, setNewKey] = useState('');

  const generateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName) return;
    const generated = 'wmcp_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setNewKey(generated);
    setKeys([...keys, { id: Date.now().toString(), name: keyName, prefix: generated.substring(0, 14) + '...', created: 'Just now', lastUsed: 'Never' }]);
    setKeyName('');
  };

  const revokeKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-8 text-white">
      <div className="border-b border-indigo-950 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">API Key Management</h1>
          <p className="text-indigo-300 text-sm mt-1">Generate and revoke high-privilege bearer tokens for agent proxy requests.</p>
        </div>
      </div>

      {newKey && (
        <div className="p-4 rounded-xl bg-cyan-950/80 border border-cyan-800 text-xs space-y-2">
          <p className="font-bold text-cyan-300">🔑 New API Key Generated (Copy this now—it will not be shown again!)</p>
          <div className="p-3 bg-[#030014] rounded font-mono text-white select-all">{newKey}</div>
          <button onClick={() => setNewKey('')} className="text-[10px] text-cyan-400 hover:underline">Dismiss</button>
        </div>
      )}

      <form onSubmit={generateKey} className="bg-[#0b0f29] p-6 rounded-2xl border border-indigo-900 space-y-4">
        <h2 className="text-base font-bold">Create New API Key</h2>
        <div className="flex gap-4">
          <input type="text" value={keyName} onChange={(e) => setKeyName(e.target.value)} placeholder="Key identifier (e.g. CI/CD Pipeline)" className="flex-1 bg-[#030014] border border-indigo-800 rounded-xl px-4 py-2.5 text-xs text-white" />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition">Generate Key</button>
        </div>
      </form>

      <div className="bg-[#0b0f29] rounded-2xl border border-indigo-900 overflow-hidden">
        <div className="p-4 bg-indigo-950/40 border-b border-indigo-900 text-xs font-bold text-indigo-300 uppercase">Active Keys ({keys.length})</div>
        <div className="divide-y divide-indigo-950">
          {keys.map(k => (
            <div key={k.id} className="p-4 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-white">{k.name}</p>
                <p className="font-mono text-indigo-400 mt-0.5">{k.prefix} • Created {k.created}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-cyan-400 font-mono text-[10px]">Last used: {k.lastUsed}</span>
                <button onClick={() => revokeKey(k.id)} className="bg-rose-950/60 border border-rose-800 text-rose-300 px-3 py-1.5 rounded-lg hover:bg-rose-900 transition">Revoke</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
