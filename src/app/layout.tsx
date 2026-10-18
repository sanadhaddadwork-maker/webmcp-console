"use client";

import "./globals.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseBrowser";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [activePlan, setActivePlan] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      } else {
        const mockUser = localStorage.getItem("mock_user");
        if (mockUser) setUser(JSON.parse(mockUser));
      }
    }).catch(() => {
      const mockUser = localStorage.getItem("mock_user");
      if (mockUser) setUser(JSON.parse(mockUser));
    });

    const plan = localStorage.getItem("active_plan");
    if (plan) setActivePlan(JSON.parse(plan));

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("mock_user");
    localStorage.removeItem("active_plan");
    setUser(null);
    setActivePlan(null);
    setDropdownOpen(false);
    router.push("/login");
  };

  return (
    <html lang="en">
      <body className="text-white min-h-screen font-sans antialiased selection:bg-indigo-500 selection:text-white relative bg-cyber-grid">
        
        {/* Reactive Interactive Mouse Aura */}
        <div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.15), transparent 80%)`,
          }}
        />

        {/* Top Navigation */}
        <header className="border-b border-indigo-950/80 bg-[#030014]/70 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative z-10">
            
            {/* Logo & Brand */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px] transition-transform group-hover:scale-105 shadow-md shadow-indigo-600/30">
                  <div className="w-full h-full bg-[#030014] rounded-[11px] flex items-center justify-center">
                    <span className="text-cyan-400 font-black text-sm">W</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold tracking-tight text-white text-sm">WebMCP</span>
                  <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800/50 uppercase">
                    Console
                  </span>
                </div>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-7 text-[13px] font-bold text-indigo-100">
                <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                <Link href="/plans" className="hover:text-cyan-400 transition-colors">Plans & Pricing</Link>
                <Link href="/keys" className="hover:text-cyan-400 transition-colors">API Keys</Link>
                <Link href="/analytics" className="hover:text-cyan-400 transition-colors">Telemetry</Link>
              </nav>
            </div>

            {/* Right Action / Profile Menu */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-3 focus:outline-none group p-1.5 rounded-xl hover:bg-indigo-950/60 border border-transparent hover:border-indigo-900 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20">
                      <div className="w-full h-full bg-[#030014] rounded-full flex items-center justify-center text-xs font-bold text-cyan-300">
                        {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                      </div>
                    </div>
                    <div className="hidden text-left sm:block">
                      <span className="text-xs font-semibold text-white block max-w-[120px] truncate">
                        {user.email}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-medium block">
                        {activePlan ? activePlan.name : "Free Tier"}
                      </span>
                    </div>
                    <span className="text-indigo-400 text-xs">▼</span>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#090520] border border-indigo-900/80 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in divide-y divide-indigo-950">
                      <div className="px-4 py-3 space-y-1">
                        <p className="text-[10px] uppercase font-bold text-indigo-400">Signed in as</p>
                        <p className="text-xs font-semibold text-white truncate">{user.email}</p>
                        <div className="pt-1">
                          <span className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-cyan-300 bg-cyan-950/50 px-2.5 py-1 rounded-full border border-cyan-800/40">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            <span>{activePlan ? activePlan.name : "Free Developer Tier"}</span>
                          </span>
                        </div>
                      </div>

                      <div className="py-1 text-xs">
                        <Link
                          href="/"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-indigo-200 hover:bg-indigo-950/60 hover:text-white transition-colors"
                        >
                          🏠 Home
                        </Link>
                        <Link
                          href="/analytics"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-indigo-200 hover:bg-indigo-950/60 hover:text-white transition-colors"
                        >
                          📊 Telemetry & Analytics
                        </Link>
                        <Link
                          href="/plans"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-indigo-200 hover:bg-indigo-950/60 hover:text-white transition-colors"
                        >
                          ⚡ Upgrade Plan ($29 / $149 / $499)
                        </Link>
                        <Link
                          href="/keys"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-indigo-200 hover:bg-indigo-950/60 hover:text-white transition-colors"
                        >
                          🔑 API Keys & Proxies
                        </Link>
                        <Link
                          href="/settings"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-indigo-200 hover:bg-indigo-950/60 hover:text-white transition-colors font-medium"
                        >
                          ⚙️ Settings & Workspace
                        </Link>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors font-medium flex items-center space-x-2"
                        >
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="text-xs text-indigo-200 hover:text-white px-4 py-2 font-medium transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Main Content Container */}
        <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
