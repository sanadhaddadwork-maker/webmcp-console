'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';

const supabase = createClient();

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'region' | 'security'>('profile');

  // Form states
  const [businessName, setBusinessName] = useState('');
  const [timezone, setTimezone] = useState('UTC+3 (Amman / Riyadh)');
  const [language, setLanguage] = useState('English (US)');
  const [proxyRegion, setProxyRegion] = useState('auto-edge (Global Low-Latency)');

  // Notification preferences
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

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
        setMessage('Settings and preferences synchronized successfully.');
      }
    } catch (err: any) {
      setMessage(`Unexpected error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      alert('Please type DELETE to confirm account termination.');
      return;
    }
    alert('Account deletion initiated. Contact enterprise support to finalize data wipe.');
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-indigo-300 text-xs font-mono">
          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>Securing enterprise session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-8">
      {/* Header */}
      <div className="border-b border-indigo-950 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Account & Enterprise Settings</h1>
          <p className="text-indigo-200/70 text-sm mt-1">
            Manage global security policies, billing methods, and node infrastructure.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> SOC-2 Compliant
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-1.5 md:col-span-1">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium transition flex items
