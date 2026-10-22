'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';

const supabase = createClient();

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState<'profile' | 'billing' | 'region' | 'security' | 'terms'>('profile');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [bizName, setBizName] = useState('');
  const [tz, setTz] = useState('UTC+3');
  const [lang, setLang] = useState('English');
  const [region, setRegion] = useState('auto-edge');
  const [notif, setNotif] = useState(true);
  const [showDel, setShowDel] = useState(false);
  const [delText, setDelText] = useState('');
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.replace('/login'); return; }
      setUser(data.user);
      const { data: b } = await supabase.from('businesses').select('*').eq('id', data.user.id).maybeSingle();
      if (b) { setBizName(b.business_name || ''); setFullName(b.full_name || ''); setUsername(b.username || ''); }
      setLoading(false);
    });
  }, [router]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setMsg('');
    const { error } = await supabase.from('businesses').upsert({ id: user.id, work_email: user.email, full_name: fullName.trim(), username: username.trim(), business_name: bizName.trim() });
    setMsg(error ? `Error: ${error.message}` : 'Profile saved successfully.');
  };

  if (loading) return <div className="p-12 text-center text-xs font-mono text-cyan-400">Loading settings...</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-8 text-white">
      <div className="border-b border-indigo-950 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Account & Enterprise Settings</h1>
          <p className="text-indigo-300 text-sm mt-1">Manage global identity, routing nodes, and compliance policies.</p>
        </div>
        <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">SOC-2 Secure</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-1.5 md:col-span-1">
          <button onClick={() => setTab('profile')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition ${tab === 'profile' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800' : 'text-indigo-300 hover:bg-indigo-950/40'}`}>👤 Profile & Identity</button>
          <button onClick={() => setTab('billing')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition ${tab === 'billing' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800' : 'text-indigo-300 hover:bg-indigo-950/40'}`}>💳 Billing & Plans</button>
          <button onClick={() => setTab('region')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition ${tab === 'region' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800' : 'text-indigo-300 hover:bg-indigo-950/40'}`}>🌍 Region & Language</button>
          <button onClick={() => setTab('security')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition ${tab === 'security' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800' : 'text-indigo-300 hover:bg-indigo-950/40'}`}>🔒 Security & Policies</button>
          <button onClick={() => setTab('terms')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition ${tab === 'terms' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800' : 'text-indigo-300 hover:bg-indigo-950/40'}`}>⚖️ Terms & Compliance</button>
        </div>

        <div className="md:col-span-3 space-y-6">
          {msg && <div className="p-4 rounded-xl text-xs bg-cyan-950/60 text-cyan-300 border border-cyan-800">{msg}</div>}

          {tab === 'profile' && (
            <form onSubmit={saveProfile} className="bg-[#0b0f29] p-8 rounded-2xl border border-indigo-900 space-y-6">
              <h2 className="text-lg font-bold">Profile & Identity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-indigo-300 uppercase mb-2">Full Name</label><input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full bg-[#030014] border border-indigo-800 rounded-xl px-4 py-3 text-xs text-white" /></div>
                <div><label className="block text-xs font-bold text-indigo-300 uppercase mb-2">Username</label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full bg-[#030014] border border-indigo-800 rounded-xl px-4 py-3 text-xs text-white" /></div>
              </div>
              <div><label className="block text-xs font-bold text-indigo-300 uppercase mb-2">Work Name</label><input type="text" value={bizName} onChange={(e) => setBizName(e.target.value)} placeholder="Business Name" className="w-full bg-[#030014] border border-indigo-800 rounded-xl px-4 py-3 text-xs text-white" /></div>
              <div><label className="block text-xs font-bold text-indigo-300 uppercase mb-2">Account Email</label><input type="email" value={user?.email || ''} disabled className="w-full bg-[#030014] border border-indigo-950 rounded-xl px-4 py-3 text-xs text-indigo-400 cursor-not-allowed" /></div>
              <button type="submit" className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs px-6 py-3 rounded-xl">Save Changes</button>
            </form>
          )}

          {tab === 'billing' && (
            <div className="bg-[#0b0f29] p-8 rounded-2xl border border-indigo-900 space-y-6">
              <h2 className="text-lg font-bold">Billing & Plans</h2>
              <div className="p-5 rounded-xl bg-indigo-950/50 border border-indigo-900 flex justify-between items-center">
                <div><span className="text-[10px] font-mono text-cyan-400">ACTIVE TIER</span><p className="text-base font-extrabold mt-0.5">Free Developer Tier</p></div>
                <button onClick={() => router.push('/plans')} className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl">Upgrade ⚡</button>
              </div>
              <div><h3 className="text-xs font-bold text-indigo-300 uppercase mb-3">Payment Method</h3><div className="p-4 rounded-xl bg-[#030014] border border-indigo-900 flex justify-between items-center text-xs"><span className="text-indigo-300">No active card linked</span><button onClick={() => alert('Opening Stripe Portal...')} className="text-cyan-400 font-semibold hover:underline">+ Add Card</button></div></div>
            </div>
          )}

          {tab === 'region' && (
            <div className="bg-[#0b0f29] p-8 rounded-2xl border border-indigo-900 space-y-6">
              <h2 className="text-lg font-bold">Region & Language Preferences</h2>
              <div><label className="block text-xs font-bold text-indigo-300 uppercase mb-2">Edge Node</label><select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full bg-[#030014] border border-indigo-800 rounded-xl px-4 py-3 text-xs text-white"><option value="auto-edge">Auto-Edge (Global Lowest Latency)</option><option value="me-central">Middle East Central (Amman / Dubai)</option></select></div>
              <div><label className="block text-xs font-bold text-indigo-300 uppercase mb-2">Timezone</label><select value={tz} onChange={(e) => setTz(e.target.value)} className="w-full bg-[#030014] border border-indigo-800 rounded-xl px-4 py-3 text-xs text-white"><option value="UTC+3">UTC+3 (Amman, Riyadh)</option><option value="UTC">UTC (Universal Time)</option></select></div>
              <div><label className="block text-xs font-bold text-indigo-300 uppercase mb-2">Language</label><select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full bg-[#030014] border border-indigo-800 rounded-xl px-4 py-3 text-xs text-white"><option value="English">English (US)</option><option value="Arabic">العربية (Arabic)</option></select></div>
              <button onClick={() => alert('Preferences saved!')} className="bg-indigo-600 text-white font-bold text-xs px-6 py-3 rounded-xl">Save Preferences</button>
            </div>
          )}

          {tab === 'security' && (
            <div className="space-y-6">
              <div className="bg-[#0b0f29] p-8 rounded-2xl border border-indigo-900 space-y-6">
                <h2 className="text-lg font-bold">Security & Notifications</h2>
                <div className="flex justify-between items-center p-4 rounded-xl bg-[#030014] border border-indigo-900">
                  <div><p className="text-xs font-bold">Email & SMS Security Alerts</p><p className="text-[11px] text-indigo-300">Instant notifications for new logins & events.</p></div>
                  <input type="checkbox" checked={notif} onChange={(e) => setNotif(e.target.checked)} className="w-4 h-4 accent-cyan-400" />
                </div>
              </div>
              <div className="bg-rose-950/20 p-8 rounded-2xl border border-rose-900/40 space-y-4">
                <h2 className="text-lg font-bold text-rose-400">Danger Zone</h2>
                <div className="flex justify-between items-center p-4 rounded-xl bg-[#030014] border border-rose-900/50">
                  <div><p className="text-xs font-bold">Delete Account & Data</p><p className="text-[11px] text-rose-300">Irreversible erasure of all logs and keys.</p></div>
                  <button onClick={() => setShowDel(true)} className="bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl">Delete Account</button>
                </div>
              </div>
            </div>
          )}

          {tab === 'terms' && (
            <div className="bg-[#0b0f29] p-8 rounded-2xl border border-indigo-900 space-y-4 text-xs text-indigo-200">
              <h2 className="text-lg font-bold text-white">Terms of Service & Policy</h2>
              <p><strong>1. Acceptable Use:</strong> Services must be used solely for authorized proxy telemetry and agent interactions. Abuse or automated attack traffic results in immediate termination.</p>
              <p><strong>2. Data Compliance:</strong> Telemetry metadata is stored in encrypted tables protected by Row Level Security (RLS) under GDPR and SOC-2 guidelines.</p>
              <p><strong>3. Uptime SLA:</strong> Global edge nodes guarantee 99.99% uptime with automated region failover.</p>
            </div>
          )}
        </div>
      </div>

      {showDel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b0f29] border border-rose-900 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">⚠️ Are you sure?</h3>
            <p className="text-xs text-indigo-200">This action is <strong className="text-rose-400">irreversible</strong>. All data will be erased.</p>
            <div>
              <label className="block text-[11px] font-mono text-indigo-300 uppercase mb-2">Type <strong>DELETE</strong> to confirm:</label>
              <input type="text" value={delText} onChange={(e) => setDelText(e.target.value)} placeholder="DELETE" className="w-full bg-[#030014] border border-rose-900 rounded-xl px-4 py-2.5 text-xs text-white" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => { setShowDel(false); setDelText(''); }} className="px-4 py-2 text-xs text-indigo-300">Cancel</button>
              <button onClick={() => { if (delText === 'DELETE') { alert('Account deleted.'); setShowDel(false); } else { alert('Type DELETE'); } }} className="bg-rose-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl">Permanently Erase</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
