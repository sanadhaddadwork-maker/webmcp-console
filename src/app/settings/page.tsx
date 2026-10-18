"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseBrowser";

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<any>(null);
  const [activePlan, setActivePlan] = useState<any>(null);
  const [savedToast, setSavedToast] = useState(false);
  
  // Deletion Modal States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [secondDeleteConfirm, setSecondDeleteConfirm] = useState(false);

  // Profile Form State
  const [name, setName] = useState("Sanad Haddad");
  const [username, setUsername] = useState("sanadhaddad");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+962 7 9000 0000");

  // Notifications State
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  // Region & Localization State
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Asia/Amman");

  // Privacy State
  const [visibility, setVisibility] = useState("public");
  const [analyticsCookies, setAnalyticsCookies] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        setEmail(user.email || "");
      } else {
        const mock = localStorage.getItem("mock_user");
        if (mock) {
          const parsed = JSON.parse(mock);
          setUser(parsed);
          setEmail(parsed.email || "");
        }
      }
    });

    const plan = localStorage.getItem("active_plan");
    if (plan) setActivePlan(JSON.parse(plan));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleFinalDelete = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8 relative">
      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center space-x-2 shadow-2xl animate-fade-in">
          <span className="font-bold">✓ Success:</span>
          <span>Your settings have been saved successfully.</span>
        </div>
      )}

      {/* Page Header */}
      <div className="border-b border-indigo-950 pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">Account & Workspace Settings</h1>
        <p className="text-xs text-indigo-200/70">Manage your profile, security, notifications, region, and billing options.</p>
      </div>

      {/* Layout: Sidebar & Content Panel */}
      <div className="grid md:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="space-y-1 bg-[#090520]/60 border border-indigo-950 rounded-2xl p-3 h-fit">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-3 ${
              activeTab === "profile"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-indigo-200/70 hover:text-white hover:bg-indigo-950/60"
            }`}
          >
            <span>👤</span>
            <span>Profile & Account</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notifications")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-3 ${
              activeTab === "notifications"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-indigo-200/70 hover:text-white hover:bg-indigo-950/60"
            }`}
          >
            <span>🔔</span>
            <span>Notifications</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("region")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-3 ${
              activeTab === "region"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-indigo-200/70 hover:text-white hover:bg-indigo-950/60"
            }`}
          >
            <span>🌍</span>
            <span>Region & Localization</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("privacy")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-3 ${
              activeTab === "privacy"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-indigo-200/70 hover:text-white hover:bg-indigo-950/60"
            }`}
          >
            <span>🛡️</span>
            <span>Privacy & Data</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("billing")}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center space-x-3 ${
              activeTab === "billing"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-indigo-200/70 hover:text-white hover:bg-indigo-950/60"
            }`}
          >
            <span>💳</span>
            <span>Billing & Plans</span>
          </button>
        </div>

        {/* Content Panel */}
        <div className="md:col-span-3">
          <form onSubmit={handleSave} className="space-y-6">

            {/* TAB 1: PROFILE & ACCOUNT */}
            {activeTab === "profile" && (
              <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-6 space-y-6 shadow-xl animate-fade-in">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Public Profile & Credentials</h2>
                  <p className="text-[11px] text-indigo-200/60">Manage your profile details and contact information.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-indigo-200 uppercase mb-1">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-indigo-200 uppercase mb-1">Username</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] font-bold text-indigo-200 uppercase">Bio</label>
                      <span className="text-[10px] text-indigo-400/60 italic">(Optional)</span>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Tell us a bit about yourself or your team (optional)..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-white placeholder-indigo-300/30 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-indigo-200 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-indigo-200 uppercase mb-1">Phone Number (Jordan)</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-indigo-950 flex items-center justify-between">
                    <div>
                      <p className="text-rose-400 font-bold">Danger Zone</p>
                      <p className="text-[11px] text-indigo-300/60">Permanently delete your account and developer workspace.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDeleteModalOpen(true)}
                      className="px-4 py-2 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 rounded-xl font-medium transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-6 space-y-6 shadow-xl animate-fade-in">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Notifications & Alerts</h2>
                  <p className="text-[11px] text-indigo-200/60">Choose how and when you receive real-time updates.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-indigo-950">
                    <div>
                      <p className="font-semibold text-white">Email Notifications</p>
                      <p className="text-[11px] text-indigo-300/60">Receive billing receipts and account alerts.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailNotif}
                      onChange={(e) => setEmailNotif(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-indigo-950">
                    <div>
                      <p className="font-semibold text-white">Push Notifications</p>
                      <p className="text-[11px] text-indigo-300/60">Real-time alerts for proxy errors and latency spikes.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={pushNotif}
                      onChange={(e) => setPushNotif(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-semibold text-white">SMS Alerts</p>
                      <p className="text-[11px] text-indigo-300/60">Receive urgent system notifications on your phone.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsNotif}
                      onChange={(e) => setSmsNotif(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: REGION & LOCALIZATION */}
            {activeTab === "region" && (
              <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-6 space-y-6 shadow-xl animate-fade-in">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Region & Localization</h2>
                  <p className="text-[11px] text-indigo-200/60">Customize global languages and timezones for your account.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-indigo-200 uppercase mb-1.5">Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="en">English (US)</option>
                        <option value="ar">العربية (Arabic)</option>
                        <option value="es">Español (Spanish)</option>
                        <option value="fr">Français (French)</option>
                        <option value="de">Deutsch (German)</option>
                        <option value="ja">日本語 (Japanese)</option>
                        <option value="zh">中文 (Chinese Simplified)</option>
                        <option value="tr">Türkçe (Turkish)</option>
                        <option value="ru">Русский (Russian)</option>
                        <option value="it">Italiano (Italian)</option>
                        <option value="pt">Português (Portuguese)</option>
                        <option value="ko">한국어 (Korean)</option>
                        <option value="nl">Nederlands (Dutch)</option>
                        <option value="pl">Polski (Polish)</option>
                        <option value="sv">Svenska (Swedish)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-indigo-200 uppercase mb-1.5">Timezone</label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Asia/Amman">Asia/Amman (GMT+3)</option>
                        <option value="UTC">UTC (Coordinated Universal Time)</option>
                        <option value="Europe/London">Europe/London (GMT+0 / BST)</option>
                        <option value="Europe/Paris">Europe/Paris (CET / CEST)</option>
                        <option value="Europe/Berlin">Europe/Berlin (CET / CEST)</option>
                        <option value="America/New_York">America/New_York (EST / EDT)</option>
                        <option value="America/Chicago">America/Chicago (CST / CDT)</option>
                        <option value="America/Los_Angeles">America/Los_Angeles (PST / PDT)</option>
                        <option value="Asia/Dubai">Asia/Dubai (GST +4)</option>
                        <option value="Asia/Riyadh">Asia/Riyadh (AST +3)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (JST +9)</option>
                        <option value="Asia/Singapore">Asia/Singapore (SGT +8)</option>
                        <option value="Australia/Sydney">Australia/Sydney (AEST / AEDT)</option>
                        <option value="Africa/Cairo">Africa/Cairo (EEST +3)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PRIVACY */}
            {activeTab === "privacy" && (
              <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-6 space-y-6 shadow-xl animate-fade-in">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Privacy & Data Management</h2>
                  <p className="text-[11px] text-indigo-200/60">Control public visibility and download account data.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-indigo-200 uppercase mb-1.5">Profile Visibility</label>
                    <select
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="public">Public Developer Directory</option>
                      <option value="private">Private (Only You)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-indigo-950">
                    <div>
                      <p className="font-semibold text-white">Analytics Cookies</p>
                      <p className="text-[11px] text-indigo-300/60">Allow telemetry to help optimize proxy performance.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={analyticsCookies}
                      onChange={(e) => setAnalyticsCookies(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">Data Portability</p>
                      <p className="text-[11px] text-indigo-300/60">Download a complete JSON export of your developer records.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert("Data export package generated! Check your email.")}
                      className="px-4 py-2 bg-indigo-950 hover:bg-indigo-900 text-indigo-200 rounded-xl font-medium transition-colors"
                    >
                      Export Data (JSON)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: BILLING & SUBSCRIPTIONS */}
            {activeTab === "billing" && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider">Current Subscription Plan</h2>
                      <p className="text-[11px] text-indigo-200/60">Your active tier and included capabilities.</p>
                    </div>
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50">
                      {activePlan ? activePlan.name : "Pro SaaS Tier"}
                    </span>
                  </div>

                  <div className="bg-[#030014] border border-indigo-950 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-indigo-950 pb-3">
                      <div>
                        <p className="font-bold text-white text-base">{activePlan ? activePlan.name : "Pro SaaS Tier"}</p>
                        <p className="text-indigo-300/60 text-xs">{activePlan ? activePlan.price : "$149"} / month</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => router.push("/plans")}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md"
                      >
                        Change Plan →
                      </button>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase text-indigo-400 mb-2">Included Benefits:</p>
                      <ul className="grid md:grid-cols-2 gap-2 text-xs text-indigo-200/80">
                        <li className="flex items-center space-x-2"><span className="text-cyan-400 font-bold">✓</span><span>500,000 monthly requests</span></li>
                        <li className="flex items-center space-x-2"><span className="text-cyan-400 font-bold">✓</span><span>Unlimited Worker Proxies</span></li>
                        <li className="flex items-center space-x-2"><span className="text-cyan-400 font-bold">✓</span><span>Advanced AI Agent Routing</span></li>
                        <li className="flex items-center space-x-2"><span className="text-cyan-400 font-bold">✓</span><span>Priority Edge Latency</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#090520] border border-indigo-900/60 rounded-2xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider">Payment Method & Information</h2>
                      <p className="text-[11px] text-indigo-200/60">Manage your local payment routing and stored payment details.</p>
                    </div>
                  </div>

                  <div className="bg-[#030014] border border-indigo-950 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white">Active Payment Routing:</span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">CliQ / Mobile Wallet / Credit Card</span>
                      </div>
                      <p className="text-xs text-indigo-300/60">Local Jordan routing enabled to avoid international VAT/Sales tax burdens.</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => router.push("/checkout?plan=pro&name=Pro%20SaaS%20Tier&price=$149")}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                    >
                      Update Payment Method & Info →
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* Sticky Save Changes Button */}
            {activeTab !== "billing" && (
              <div className="flex justify-end pt-4 border-t border-indigo-950">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98]"
                >
                  Save Changes
                </button>
              </div>
            )}

          </form>
        </div>

      </div>

      {/* Primary Account Deletion Confirmation Modal */}
      {deleteModalOpen && !secondDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#090520] border border-rose-500/40 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-rose-400">Delete Account?</h3>
            <p className="text-xs text-indigo-200/70">
              Are you sure you want to proceed with deleting your developer workspace and associated data?
            </p>
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-indigo-950 text-indigo-200 text-xs font-medium hover:bg-indigo-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setSecondDeleteConfirm(true)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-lg shadow-rose-600/30"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Confirmation Warning Modal */}
      {deleteModalOpen && secondDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#090520] border-2 border-rose-600 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 text-rose-500">
              <span className="text-xl">⚠️</span>
              <h3 className="text-lg font-extrabold">Final Confirmation</h3>
            </div>
            <p className="text-xs font-semibold text-rose-200 bg-rose-950/40 border border-rose-900/60 p-3 rounded-xl">
              Are you sure you want to delete your account? All of your data will be erased.
            </p>
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSecondDeleteConfirm(false);
                  setDeleteModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-950 text-indigo-200 text-xs font-medium hover:bg-indigo-900 transition-colors"
              >
                Keep Account
              </button>
              <button
                type="button"
                onClick={handleFinalDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-extrabold transition-colors shadow-xl shadow-rose-700/40"
              >
                Yes, Erase Everything
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
