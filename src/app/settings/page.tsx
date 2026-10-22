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
  const [timezone, setTimezone] = useState('UTC+3 (Amman / Riyadh)');
  const [language, setLanguage] = useState('English (US)');
  const [proxyRegion, setProxyRegion] = useState('auto-edge');

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { router.replace('/login'); return; }
        setUser(user);
        const { data: biz } = await supabase.from('businesses').select('business_name').eq('id', user.id).maybeSingle();
        if (biz) setBusinessName(biz.business_name || '');
      } catch (err) {
        console.error(err);
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
      const { error } = await supabase.from('businesses').upsert({ id: user.id, work_email: user.email, business_name: businessName.trim() });
      if (error) setMessage(`Error: ${error.message}`);
      else setMessage('Enterprise settings updated successfully.');
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-xs font-mono text-cyan-400">Loading secure environment...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-8 text-white">
      <div className="border-b border-indigo-950 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Account & Enterprise Settings</h1>
          <p className="text-indigo-200/70 text-sm mt-1">Manage infrastructure, security policies, and billing credentials.</p>
        </div>
        <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-800">SOC-2 Compliant</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-1.5 md:col-span-1">
          <button type="button" onClick={() => setActiveTab('profile')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition flex items-center gap-3 ${activeTab === 'profile' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800' : 'text-indigo-300 hover:bg-indigo-950/40'}`}>👤 Profile & Org</button>
          <button type="button" onClick={() => setActiveTab('billing')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition flex items-center gap-3 ${activeTab === 'billing' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800' : 'text-indigo-300 hover:bg-indigo-950/40'}`}>💳 Billing & Payments</button>
          <button type="button" onClick={() => setActiveTab('region')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition flex items-center gap-3 ${activeTab === 'region' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800' : 'text-indigo-300 hover:bg-indigo-950/40'}`}>🌍 Region & Language</button>
          <button type="button" onClick={() => setActiveTab('security')} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition flex items-center gap-3 ${activeTab === 'security' ? 'bg-indigo-950 text-cyan-400 border border-indigo-800' : 'text-indigo-300 hover:bg-indigo-950/40'}`}>🔒 Security & Policies</button>
        </div>

        <div className="md:col-span-3 space-y-6">
          {message && <div className="p-4 rounded-xl text-xs font-medium bg-cyan-950/60 text-cyan-300 border border-cyan-800">{message}</div>}

          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="bg-[#0b0f29]/90 p-8 rounded-2xl border border-indigo-900 shadow-2xl space-y-6">
              <h2 className="text-lg font-bold">Organization Profile</h2>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-indigo-300 uppercase">Account Email</label>
