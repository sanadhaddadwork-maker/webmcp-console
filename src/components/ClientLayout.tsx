'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseBrowser';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Close dropdown when clicking outside
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
    <div className="min-h-screen flex flex-col text-white">
      {/* Navbar Header */}
      <header className="border-b border-indigo-950 bg-[#030014]/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-xs font-mono">W</span>
            WebMCP
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-indigo-200">
            <Link href="/" className={`hover:text-cyan-400 transition ${pathname === '/' ? 'text-cyan-400' : ''}`}>Home</Link>
            <Link href="/plans" className={`hover:text-cyan-400 transition ${pathname === '/plans' ? 'text-cyan-400' : ''}`}>Plans & Pricing</Link>
            <Link href="/api-keys" className={`hover:text-cyan-400 transition ${pathname === '/api-keys' ? 'text-cyan-400' : ''}`}>API Keys</Link>
            <Link href="/telemetry" className={`hover:text-cyan-400 transition ${pathname === '/telemetry' ? 'text-cyan-400' : ''}`}>Telemetry</Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-9 h-9 rounded-full bg-indigo-900 border border-indigo-700 flex items-center justify-center font-bold text-xs text-cyan-300 hover:ring-2 hover:ring-cyan-400 transition"
                >
                  {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#0b0f29] border border-indigo-900 shadow-2xl py-1 z-50">
                    <div className="px-4 py-2 border-b border-indigo-950 text-[11px] text-indigo-400 truncate">
                      {user.email}
                    </div>
                    <Link
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-indigo-200 hover:bg-indigo-950/60 hover:text-cyan-400 transition"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/30 transition"
                    >
                      Sign Out
                    </button>
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
