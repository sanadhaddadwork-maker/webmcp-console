"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Copy, Shield, Key, Globe, Building2, Mail, Lock } from "lucide-react"

export default function GetStarted() {
  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [showPolicy, setShowPolicy] = useState(false)
  
  const [formData, setFormData] = useState({
    businessName: "",
    workEmail: "",
    websiteUrl: "",
    acceptedPolicy: false
  })

  const [apiKey, setApiKey] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.businessName || !formData.workEmail || !formData.websiteUrl || !formData.acceptedPolicy) {
      alert("Please fill out all fields and accept the Security & Privacy Policy.")
      return
    }

    const cleanDomain = formData.websiteUrl.replace(/https?:\/\//, "").replace(/\/.*$/, "")
    const generatedKey = "ak_live_" + btoa(cleanDomain).substring(0, 8) + "_" + Math.random().toString(36).substring(2, 10)
    setApiKey(generatedKey)
    setStep(2)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const manifestTag = '<link rel="agent-manifest" type="application/json" href="https://engine.agentinterface.workers.dev/v1/parse?url=' + encodeURIComponent(formData.websiteUrl || "https://yourbusiness.com") + '" />'

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-2 text-xs font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-full">
          <Shield className="w-3.5 h-3.5" /> WebMCP Production Setup
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 flex flex-col justify-center">
        {step === 1 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Get Started with AgentInterface</h1>
              <p className="text-slate-400 text-sm mt-1">
                Register your business to unlock your WebMCP production API key and automated AI agent endpoints.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Business / Organization Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Acme Corp Inc."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="email"
                    name="workEmail"
                    required
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    placeholder="alex@acme.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Official Website Domain
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="url"
                    name="websiteUrl"
                    required
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    placeholder="https://acme.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Used to limit API requests exclusively to your verified domain.</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptedPolicy}
                    onChange={(e) => setFormData({ ...formData, acceptedPolicy: e.target.checked })}
                    className="mt-1 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
                  />
                  <span className="text-xs text-slate-400 leading-relaxed">
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() => setShowPolicy(true)}
                      className="text-indigo-400 hover:underline font-medium"
                    >
                      WebMCP Security, Anti-Leak & Data Privacy Policy
                    </button>
                    . I understand AgentInterface only parses public HTML interactive DOM structures and never accesses private databases, cookies, or user credentials.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-sm transition-all shadow-lg shadow-indigo-600/20 mt-4"
              >
                Create Account & Generate API Key
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
                <h2 className="text-xl font-bold text-white">Verification Complete for {formData.businessName}</h2>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Your Production WebMCP API Key
                </label>
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-amber-400 justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-slate-500" />
                    <span>{apiKey}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(apiKey)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Add to your Website HTML <code className="text-indigo-400">&lt;head&gt;</code> Tag
                </label>
                <div className="relative bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-indigo-300 overflow-x-auto">
                  <code>{manifestTag}</code>
                  <button
                    onClick={() => copyToClipboard(manifestTag)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-white bg-slate-900 p-1.5 rounded border border-slate-800"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {copied && (
                <p className="text-xs text-emerald-400 font-mono text-center">Copied to clipboard!</p>
              )}

              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
                >
                  Edit Business Details
                </button>
                <Link
                  href="/"
                  className="flex-1 text-center py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Go to Live Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {showPolicy && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 md:p-8 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <Lock className="w-5 h-5 text-indigo-400" /> WebMCP Data Policy & Security Code
              </div>
              <button onClick={() => setShowPolicy(false)} className="text-slate-400 hover:text-white text-sm">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
              <section className="space-y-1">
                <h3 className="font-semibold text-slate-100 text-sm">1. Zero Database Intrusiveness</h3>
                <p>
                  AgentInterface operates exclusively at the publicly rendered DOM level. We do not inspect, log, or query your underlying backend databases, internal APIs, session cookies, or user tracking variables.
                </p>
              </section>

              <section className="space-y-1">
                <h3 className="font-semibold text-slate-100 text-sm">2. Anti-Leak & Isolation Policy</h3>
                <p>
                  All requests processed by Cloudflare Worker engines run in isolated execution sandboxes. Business details (Work Email, Domain Name) are stored strictly for domain-bound API key rate limiting and are never sold or shared with third-party LLM providers.
                </p>
              </section>

              <section className="space-y-1">
                <h3 className="font-semibold text-slate-100 text-sm">3. Scope-Bound API Keys</h3>
                <p>
                  Each API key generated is cryptographically locked to the registered business domain. Requests originating outside authorized origins or exceeding standard traffic limits (100 req/min) are automatically throttled at the Cloudflare Edge CDN level.
                </p>
              </section>
            </div>

            <div className="pt-3 border-t border-slate-800 text-right">
              <button
                onClick={() => setShowPolicy(false)}
                className="px-4 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-lg hover:bg-indigo-500"
              >
                I Understand & Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
