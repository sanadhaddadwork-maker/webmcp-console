'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';

const supabase = createClient();

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userPlan, setUserPlan] = useState<string>('Free Tier');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: biz } = await supabase
          .from('businesses')
          .select('plan')
          .eq('id', user.id)
          .maybeSingle();

        if (biz?.plan) {
          setUserPlan(biz.plan);
        }
      }
    }
    getUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col text-white bg-[#030014]">
      {/* Header */}
      <header className="border-b border-indigo-950 bg-[#030014]/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-xs font-mono">W</span>
            WebMCP <span className="text-[10px] bg-indigo-950 text-indigo-400 border border-indigo-800/60 px-2 py-0.5 rounded-md font-mono">CONSOLE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-indigo-200">
            <Link href="/" className={`hover:text-cyan-400 transition ${pathname === '/' ? 'text-cyan-400 font-bold' : ''}`}>Home</Link>
            <Link href="/telemetry" className={`hover:text-cyan-400 transition ${pathname === '/telemetry' ? 'text-cyan-400 font-bold' : ''}`}>Telemetry</Link>
            <Link href="/api-keys" className={`hover:text-cyan-400 transition ${pathname === '/api-keys' ? 'text-cyan-400 font-bold' : ''}`}>API Keys</Link>
            <Link href="/plans" className={`hover:text-cyan-400 transition ${pathname === '/plans' ? 'text-cyan-400 font-bold' : ''}`}>Plans & Pricing</Link>
            <Link href="/settings" className={`hover:text-cyan-400 transition ${pathname === '/settings' ? 'text-cyan-400 font-bold' : ''}`}>Settings</Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-800/60 hover:border-cyan-500/50 transition text-left"
                >
                  <div className="w-6 h-6 rounded-lg bg-indigo-900 flex items-center justify-center text-xs font-bold text-cyan-300">
                    {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden sm:block text-[11px]">
                    <div className="text-white font-medium truncate max-w-[120px]">{user.email?.split('@')[0]}</div>
                    <div className="text-cyan-400 text-[9px] font-mono">{userPlan}</div>
                  </div>
                  <span className="text-indigo-400 text-[10px]">▼</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0b0f29] border border-indigo-900/80 shadow-2xl p-3 z-50 space-y-3">
                    <div className="px-2 pt-1 pb-2 border-b border-indigo-950/80">
                      <p className="text-[9px] uppercase font-mono text-indigo-400 tracking-wider">Signed in as</p>
                      <p className="text-xs font-semibold text-white truncate mt-0.5">{user.email}</p>
                      <span className="inline-block text-[9px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded-full mt-2">
                        • {userPlan}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <Link href="/" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-indigo-200 hover:bg-indigo-950/70 hover:text-white transition">
                        🏠 <span>Home</span>
                      </Link>
                      <Link href="/telemetry" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-indigo-200 hover:bg-indigo-950/70 hover:text-white transition">
                        📊 <span>Telemetry</span>
                      </Link>
                      <Link href="/api-keys" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-indigo-200 hover:bg-indigo-950/70 hover:text-white transition">
                        🔑 <span>API Keys</span>
                      </Link>
                      <Link href="/plans" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-indigo-200 hover:bg-indigo-950/70 hover:text-white transition">
                        ⚡ <span>Plans & Pricing</span>
                      </Link>
                      <Link href="/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-indigo-200 hover:bg-indigo-950/70 hover:text-cyan-400 transition font-medium">
                        ⚙️ <span>Settings</span>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-indigo-950/80">
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-950/40 transition font-medium"
                      >
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-xs font-medium text-indigo-200 hover:text-white px-3 py-2 transition">
                  Log In
                </Link>
                <Link href="/signup" className="text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 px-4 py-2 rounded-xl transition shadow-lg shadow-indigo-600/30">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
