'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';

const supabase = createClient();

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState<'profile' | 'billing' | 'region' | 'security'>('profile');
  const [bizName, setBizName] = useState('');
  const [tz, setTz] = useState('UTC+3');
  const [lang, setLang] = useState('English');
  const [region, setRegion] = useState('auto-edge');
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [delText, setDelText] = useState('');
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.replace('/login'); return; }
      setUser(data.user);
      const { data: b } = await supabase.from('businesses').select('business_name').eq('id', data.user.id).maybeSingle();
      if (b) setBizName(b.business_name || '');
      setLoading(false);
    });
  }, [router]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setMsg('');
    const { error } = await supabase.from('businesses').upsert({ id: user.id, work_email: user.email, business_name: bizName.trim() });
    setMsg(error ? `Error: ${error.message}` : 'Settings saved successfully.');
  };

  if (loading) return <div className="p-12 text-center text-xs font-mono text-cyan-400">Loading settings...</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-8 text-white">
      <div className="border-b border-indigo-950 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Account & Enterprise Settings</h1>
          <p className="text-indigo-300 text-sm mt-1">Manage infrastructure, security policies, and billing credentials.</p>
        </div>
        <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">SOC-2 Secure</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-1.5 md:col-span-1">
          <button onClick={() => setTab('profile')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition ${tab === 'profile' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800' : 'text-indigo-300 hover:bg-indigo-950/40'}`}>👤 Profile & Org</button>
          <button onClick={() => setTab('billing')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition ${tab === 'billing' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800' : 'text-indigo-300 hover:bg-indigo-950/40'}`}>💳 Billing & Plans</button>
          <button onClick={() => setTab('region')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition ${tab === 'region' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800' : 'text-indigo-300 hover:bg-indigo-950/40'}`}>🌍 Region & Language</button>
          <button onClick={() => setTab('security')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition ${tab === 'security' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800' : 'text-indigo-300 hover:bg-indigo-950/40'}`}>🔒 Security & Policies</button>
        </div>

        <div className="md:col-span-3 space-y-6">
          {msg && <div className="p-4 rounded-xl text-xs bg-cyan-950/60 text-cyan-300 border border-cyan-800">{msg}</div>}

          {tab === 'profile' && (
            <form onSubmit={save} className="bg-[#0b0f29] p-8 rounded-2xl border border-indigo-900 space-y-6">
              <h2 className="text-lg font-bold">Organization Profile</h2>
              <div>
                <label className="block text-xs font-bold text-indigo-300 uppercase mb-2">Account Email</label>
                <input type="email" value={user?.email || ''} disabled className="w-full bg-[#030014] border border-indigo-950 rounded-xl px-4 py-3 text-xs text-indigo-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-indigo-300 uppercase mb-2">Business Name</label>
                <input type="text" value={bizName} onChange={(e) => setBizName(e.target.value)} placeholder="WebMCP Global" className="w-full bg-[#030014] border border-indigo-800 rounded-xl px-4 py-3 text-xs text-white" />
              </div>
              <button type="submit" className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs px-6 py-3 rounded-xl">Save Changes</button>
            </form>
          )}

          {tab === 'billing' && (
            <div className="bg-[#0b0f29] p-8 rounded-2xl border border-indigo-900 space-y-6">
              <h2 className="text-lg font-bold">Billing, Plans & Payment Methods</h2>
              <div className="p-5 rounded-xl bg-indigo-950/50 border border-indigo-900 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400">ACTIVE TIER</span>
                  <p className="text-base font-extrabold mt-0.5">Free Developer Tier</p>
                </div>
                <button onClick={() => router.push('/plans')} className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl">Upgrade ⚡</button>
              </div>
              <div>
                <h3 className="text-xs font-bold text-indigo-300 uppercase mb-3">Payment Method</h3>
                <div className="p-4 rounded-xl bg-[#030014] border border-indigo-900 flex justify-between items-center text-xs">
                  <span className="text-indigo-300">No active credit card linked</span>
                  <button onClick={() => alert('Opening Stripe Checkout Portal...')} className="text-cyan-400 font-semibold hover:underline">+ Add Card</button>
                </div>
              </div>
            </div>
          )}

          {tab === 'region' && (
            <div className="bg-[#0b0f29] p-8 rounded-2xl border border-indigo-900 space-y-6">
              <h2 className="text-lg font-bold">Region & Language Preferences</h2>
              <div>
                <label className="block text-xs font-bold text-indigo-300 uppercase mb-2">Edge Node</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full bg-[#030014] border border-indigo-800 rounded-xl px-4 py-3 text-xs text-white">
                  <option value="auto-edge">Auto-Edge (Global Lowest Latency)</option>
                  <option value="me-central">Middle East Central (Amman / Dubai)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-indigo-300 uppercase mb-2">Timezone</label>
                <select value={tz} onChange={(e) => setTz(e.target.value)} className="w-full bg-[#030014] border border-indigo-800 rounded-xl px-4 py-3 text-xs text-white">
                  <option value="UTC+3">UTC+3 (Amman, Riyadh)</option>
                  <option value="UTC">UTC (Universal Time)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-indigo-300 uppercase mb-2">Language</label>
                <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full bg-[#030014] border border-indigo-800 rounded-xl px-4 py
