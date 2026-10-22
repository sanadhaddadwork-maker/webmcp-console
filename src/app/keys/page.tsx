{/* Simplified Developer Integration Guide */}
      <div className="bg-[#0b0f29]/80 border border-indigo-900/50 rounded-2xl p-6 backdrop-blur-md shadow-xl space-y-5">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">How to Use Your API Keys</h2>
          <p className="text-xs text-indigo-300/70">
            Connect your AI agents to your website in 3 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/30">1</div>
            <div className="font-bold text-white">Copy Your Key</div>
            <p className="text-indigo-300/70">
              Generate and copy an active API key from above to use as your secure access password.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/30">2</div>
            <div className="font-bold text-white">Connect Your App</div>
            <p className="text-indigo-300/70">
              Send requests from your app to our proxy endpoint <code className="text-cyan-300 font-mono">/api/proxy</code> with your key attached in the headers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/30">3</div>
            <div className="font-bold text-white">Track Live Traffic</div>
            <p className="text-indigo-300/70">
              Head over to your <strong>Telemetry</strong> tab to view live requests and performance stats instantly.
            </p>
          </div>
        </div>
      </div>
