'use client';

export default function ApiKeysPage() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6 space-y-6 text-white">
      <div className="border-b border-indigo-950 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">API Keys & Edge Proxies</h1>
        <p className="text-indigo-300 text-sm mt-1">Provision, revoke, and inspect scoped security keys for agent routing.</p>
      </div>
      <div className="bg-[#0b0f29] p-8 rounded-2xl border border-indigo-900">
        <p className="text-xs text-indigo-300">Your active proxy keys are securely synchronized with Supabase.</p>
      </div>
    </div>
  );
}
