'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';

const supabase = createClient();

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'region' | 'security'>('profile');
  
  const [businessName, setBusinessName] = useState('');
  const [timezone, setTimezone] = useState('UTC+3');
  const [language, setLanguage] = useState('English');
  const [proxyRegion, setProxyRegion] = useState('auto-edge');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.replace('/login?redirect=/settings');
          return;
        }

        setUser(user);

        const { data: biz } = await supabase
          .from('businesses')
          .select('business_name, plan')
          .eq('id', user.id)
          .maybeSingle();

        if (biz) {
          setBusinessName(biz.business_name || '');
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('businesses')
        .upsert({
          id: user.id,
          work_email: user.email,
          business_name: businessName.trim(),
        });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Settings saved successfully!');
      }
    } catch (err: any) {
      setMessage(`Unexpected error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-indigo-300 text-xs font-mono">
          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>Loading control center...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-8">
      <div className="border-b border-indigo-950 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Account & System Settings</h1>
        <p className="text-indigo-200/70 text-sm mt-1">
          Manage your organization profile, billing methods, proxy regions, and language preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-1.5 md:col-span-1">
          <button type="button" onClick={() => setActiveTab('profile')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition flex items-center gap-2.5 ${activeTab === 'profile' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800/60 shadow-lg' : 'text-indigo-300 hover:bg-indigo-950/40 hover:text-white'}`}>
            <span>👤</span> Profile & Organization
          </button>
          <button type="button" onClick={() => setActiveTab('billing')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition flex items-center gap-2.5 ${activeTab === 'billing' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800/60 shadow-lg' : 'text-indigo-300 hover:bg-indigo-950/40 hover:text-white'}`}>
            <span>💳</span> Billing & Payments
          </button>
          <button type="button" onClick={() => setActiveTab('region')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition flex items-center gap-2.5 ${activeTab === 'region' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800/60 shadow-lg' : 'text-indigo-300 hover:bg-indigo-950/40 hover:text-white'}`}>
            <span>🌍</span> Region & Language
          </button>
          <button type="button" onClick={() => setActiveTab('security')} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition flex items-center gap-2.5 ${activeTab === 'security' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800/60 shadow-lg' : 'text-indigo-300 hover:bg-indigo-950/40 hover:text-white'}`}>
            <span>🔒</span> Security & Sessions
          </button>
        </div>

        <div className="md:col-span-3">
          {message && (
            <div className={`mb-6 p-3 rounded-xl text-xs font-medium ${message.startsWith('Settings saved') ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/50' : 'bg-rose-950/60 text-rose-300 border border-rose-800/50'}`}>
              {message}
            </div>
          )}

          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="bg-[#0b0f29]/80 p-6 md:p-8 rounded-2xl border border-indigo-900/50 backdrop-blur-md shadow-xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Organization Profile</h2>
                <p className="text-xs text-indigo-300/70 mt-0.5">Update your business details and associated credentials.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-indigo-300 uppercase tracking-wider">Email Address</label>
                <input type="email" value={user?.email || ''} disabled className="w-full bg-[#030014]/60 border border-indigo-950 rounded-xl px-4 py-2.5 text-xs text-indigo-400 cursor-not-allowed" />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-indigo-300 uppercase tracking-wider">Organization / Business Name</label>
                <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. Acme Corp" className="w-full bg-[#030014] border border-indigo-800/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-indigo-400/50 focus:outline-none focus:border-cyan-400 transition" />
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-lg">
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'billing' && (
            <div className="bg-[#0b0f29]/80 p-6 md:p-8 rounded-2xl border border-indigo-900/50 backdrop-blur-md shadow-xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Billing & Payments</h2>
                <p className="text-xs text-indigo-300/70 mt-0.5">Manage your subscription plan, invoices, and payment methods.</p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-900/60 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Current Active Tier</p>
                  <p className="text-[11px] text-cyan-400 font-mono mt-0.5">Free Tier — Standard Edge Proxies</p>
                </div>
                <button type="button" onClick={() => router.push('/plans')} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
                  Upgrade Plan ⚡
                </button>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Payment Method</h3>
                <div className="p-4 rounded-xl bg-[#030014] border border-indigo-900/60 flex items-center justify-between text-xs">
                  <span className="text-indigo-300">No active card on file (Free Tier)</span>
                  <span className="text-cyan-400 cursor-pointer hover:underline font-medium">+ Add Payment Card</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'region' && (
            <div className="bg-[#0b0f29]/80 p-6 md:p-8 rounded-2xl border border-indigo-900/50 backdrop-blur-md shadow-xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white">Region & Language</h2>
                <p className="text-xs text-indigo-300/70 mt-0.5">Configure edge routing zones, console language, and local timezones.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-indigo-300 uppercase tracking-wider">Default Proxy Edge Node</label>
                <select value={proxyRegion} onChange={(e) => setProxyRegion(e.target.value)} className="w-full bg-[#030014] border border-indigo-800/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition">
                  <option value="auto-edge">Auto-Edge (Global Lowest Latency)</option>
                  <option value="me-central">Middle East Central (Amman / Dubai)</option>
                  <option value="eu-west">Europe West (Frankfurt / London)</option>
                  <option value="us-east">US East (N. Virginia)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-indigo-300 uppercase tracking-wider">Timezone</label>
                <select value={timezone} onChange={(e) => setTimezone(e.target.
