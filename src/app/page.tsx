import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-6 text-center space-y-8">
      <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
        Enterprise Edge Proxy v1.0
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
        WebMCP Console
      </h1>
      <p className="text-indigo-300 text-sm md:text-base max-w-xl mx-auto">
        Secure, low-latency edge proxy routing, telemetry monitoring, and API key management for modern agent architectures.
      </p>
      <div className="flex justify-center gap-4 pt-4">
        <Link href="/telemetry" className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-lg">
          Open Telemetry 📊
        </Link>
        <Link href="/settings" className="bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-cyan-400 font-bold text-xs px-6 py-3 rounded-xl transition">
          Account Settings ⚙️
        </Link>
      </div>
    </div>
  );
}
