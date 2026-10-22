'use client';

export default function TelemetryPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-8 text-white">
      <div className="border-b border-indigo-950 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Real-Time Telemetry & Edge Metrics</h1>
          <p className="text-indigo-300 text-sm mt-1">Monitor global edge proxy throughput, request latency, and error rates.</p>
        </div>
        <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Live Stream Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#0b0f29] p-6 rounded-2xl border border-indigo-900 space-y-1">
          <p className="text-xs text-indigo-300 font-bold uppercase">Requests / Min</p>
          <p className="text-2xl font-extrabold text-cyan-400">1,428</p>
        </div>
        <div className="bg-[#0b0f29] p-6 rounded-2xl border border-indigo-900 space-y-1">
          <p className="text-xs text-indigo-300 font-bold uppercase">Avg Latency</p>
          <p className="text-2xl font-extrabold text-white">24ms</p>
        </div>
        <div className="bg-[#0b0f29] p-6 rounded-2xl border border-indigo-900 space-y-1">
          <p className="text-xs text-indigo-300 font-bold uppercase">Error Rate (5xx)</p>
          <p className="text-2xl font-extrabold text-emerald-400">0.01%</p>
        </div>
        <div className="bg-[#0b0f29] p-6 rounded-2xl border border-indigo-900 space-y-1">
          <p className="text-xs text-indigo-300 font-bold uppercase">Active Nodes</p>
          <p className="text-2xl font-extrabold text-cyan-400">32 / 32</p>
        </div>
      </div>
    </div>
  );
}
