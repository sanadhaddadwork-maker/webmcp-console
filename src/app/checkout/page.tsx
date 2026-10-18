"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planName = searchParams.get("name") || "Pro SaaS Tier";
  const planPrice = searchParams.get("price") || "$150";

  const [paymentMethod, setPaymentMethod] = useState("cliq");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cliqAlias, setCliqAlias] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      localStorage.setItem("active_plan", JSON.stringify({ name: planName, price: planPrice }));
    }, 1500);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto my-16 bg-[#090520] border border-emerald-500/40 rounded-2xl p-8 text-center space-y-4 shadow-2xl animate-fade-in">
        <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
          ✓
        </div>
        <h2 className="text-xl font-bold text-white">Payment Successful!</h2>
        <p className="text-xs text-indigo-200/70">
          Your subscription for <span className="text-white font-semibold">{planName}</span> has been securely processed via <span className="uppercase text-cyan-400 font-bold">{paymentMethod}</span>.
        </p>
        <button
          onClick={() => router.push("/keys")}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg"
        >
          Go to API Keys Console →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between border-b border-indigo-950 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Secure Checkout</h1>
          <p className="text-xs text-indigo-200/70">Complete your transaction safely with Jordan-optimized payment routing.</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-indigo-300/60 uppercase block">Total Due</span>
          <span className="text-xl font-extrabold text-cyan-400">{planPrice} <span className="text-xs font-normal text-indigo-200/60">/mo</span></span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-[#090520]/60 border border-indigo-950 rounded-2xl p-6 space-y-4 h-fit">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-200">Order Summary</h3>
          <div className="space-y-2 text-xs border-t border-indigo-950 pt-3">
            <div className="flex justify-between text-indigo-200/80">
              <span>Plan:</span>
              <span className="font-semibold text-white">{planName}</span>
            </div>
            <div className="flex justify-between text-indigo-200/80">
              <span>Billing Cycle:</span>
              <span className="text-white">Monthly</span>
            </div>
            <div className="flex justify-between text-indigo-200/80 pt-2 border-t border-indigo-950 font-bold">
              <span className="text-white">Total:</span>
              <span className="text-cyan-400">{planPrice}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handlePay} className="md:col-span-2 bg-[#090520] border border-indigo-900/60 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="space-y-3">
            <label className="block text-[10px] font-bold text-indigo-200 uppercase tracking-wider">
              Select Payment Method (Jordan Tax-Optimized)
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("cliq")}
                className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                  paymentMethod === "cliq"
                    ? "bg-indigo-600/20 border-indigo-500 text-white"
                    : "bg-[#030014] border-indigo-950 text-indigo-300/60 hover:text-white"
                }`}
              >
                ⚡ CliQ Instant
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("wallet")}
                className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                  paymentMethod === "wallet"
                    ? "bg-indigo-600/20 border-indigo-500 text-white"
                    : "bg-[#030014] border-indigo-950 text-indigo-300/60 hover:text-white"
                }`}
              >
                📱 Mobile Wallet
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                  paymentMethod === "card"
                    ? "bg-indigo-600/20 border-indigo-500 text-white"
                    : "bg-[#030014] border-indigo-950 text-indigo-300/60 hover:text-white"
                }`}
              >
                💳 Credit Card
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-indigo-200 mb-1.5 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                required
                placeholder="Sanad Haddad"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-indigo-300/30 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-indigo-200 mb-1.5 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                placeholder="xpert4money101@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-indigo-300/30 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {paymentMethod === "cliq" && (
              <div>
                <label className="block text-[10px] font-bold text-indigo-200 mb-1.5 uppercase tracking-wider">CliQ Alias / Mobile Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 079XXXXXXXX or Alias"
                  value={cliqAlias}
                  onChange={(e) => setCliqAlias(e.target.value)}
                  className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-indigo-300/30 focus:outline-none focus:border-indigo-500"
                />
                <p className="text-[10px] text-indigo-300/50 mt-1">An instant payment request (R2P) will be sent to your bank app.</p>
              </div>
            )}

            {paymentMethod === "wallet" && (
              <div>
                <label className="block text-[10px] font-bold text-indigo-200 mb-1.5 uppercase tracking-wider">Zain Cash / Orange Money Number</label>
                <input
                  type="text"
                  required
                  placeholder="079XXXXXXXX"
                  className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-indigo-300/30 focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-indigo-200 mb-1.5 uppercase tracking-wider">Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-indigo-300/30 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-indigo-200 mb-1.5 uppercase tracking-wider">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      placeholder="12/28"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-indigo-300/30 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-indigo-200 mb-1.5 uppercase tracking-wider">CVV</label>
                    <input
                      type="password"
                      required
                      placeholder="123"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full bg-[#030014] border border-indigo-900/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-indigo-300/30 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Authorizing Secure Payment..." : `Pay ${planPrice} & Activate Plan →`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center text-xs text-indigo-300 py-12">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
