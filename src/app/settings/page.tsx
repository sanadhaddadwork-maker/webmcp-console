'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [businessName, setBusinessName] = useState('');
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

        // Fetch business details
        const { data: biz } = await supabase
          .from('businesses')
          .select('business_name')
          .eq('id', user.id)
          .maybeSingle();

        if (biz) {
          setBusinessName(biz.business_name || '');
        }
      } catch (err) {
        console.error('Failed to load profile settings:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [supabase, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
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
          <span>Loading settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 space-y-8">
      {/* Header */}
      <div className="border-b border-indigo-950 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Account Settings</h1>
        <p className="text-indigo-200/70 text-sm mt-1">
          Manage your organization details, security, and account preferences.
        </p>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleUpdateProfile} className="bg-[#0b0f29]/80 p-6 md:p-8 rounded-2xl border border-indigo-900/50 backdrop-blur-md shadow-xl space-y-6">
        {message && (
          <div className={`p-3 rounded-xl text-xs font-medium ${message.startsWith('Settings saved') ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/50' : 'bg-rose-950/60 text-rose-300 border border-rose-800/50'}`}>
            {message}
          </div>
        )}

        {/* Email Readonly */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-indigo-300 uppercase tracking-wider">
            Email Address
          </label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full bg-[#030014]/60 border border-indigo-950 rounded-xl px-4 py-2.5 text-xs text-indigo-400 cursor-not-allowed"
          />
          <p className="text-[11px] text-indigo-400/60">Your email address is managed via your authentication login.</p>
        </div>

        {/* Business Name */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-indigo-300 uppercase tracking-wider">
            Organization / Business Name
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Acme Corp"
            className="w-full bg-[#030014] border border-indigo-800/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-indigo-400/50 focus:outline-none focus:border-cyan-400 transition"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 disabled:opacity-50 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-lg shadow-indigo-600/30"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
