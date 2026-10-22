'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Telemetry', href: '/telemetry' },
    { name: 'API Keys', href: '/api-keys' },
    { name: 'Playground', href: '/playground' },
    { name: 'Settings', href: '/settings' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#030014]/80 backdrop-blur-md border-b border-indigo-950">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/telemetry" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center font-extrabold text-white text-xs shadow-lg">
            W
          </div>
          <span className="font-extrabold tracking-tight text-white text-sm">
            WebMCP<span className="text-cyan-400 font-mono text-xs ml-1.5 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900">CONSOLE</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  active
                    ? 'bg-indigo-950 text-cyan-400 border border-indigo-800'
                    : 'text-indigo-300 hover:text-white hover:bg-indigo-950/40'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Status / Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-900/60 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Edge Operational
          </div>
        </div>
      </div>
    </header>
  );
}
