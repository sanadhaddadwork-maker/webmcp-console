import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center space-y-6">
      <div className="px-3 py-1 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
        Enterprise Edge Proxy v1.0
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
        WebMCP Console
      </h1>
      <p className="text-indigo-300 text-sm max-w-md mx-auto">
        Low-latency edge proxy routing, telemetry monitoring, and identity settings for agent architectures.
      </p>
      <div className="flex gap-4 pt-2">
        <Link href="/settings" className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition">
          Go to Settings ⚙️
        </Link>
        <Link href="/telemetry" className="bg-indigo-950 border border-indigo-800 text-cyan-400 font-bold text-xs px-6 py-3 rounded-xl transition">
          View Telemetry 📊
        </Link>
      </div>
    </div>
  );
}
