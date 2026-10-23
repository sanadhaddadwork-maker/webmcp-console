'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export default function AISupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'chat' | 'ticket'>('chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey there! 👋 I'm your WebMCP AI Assistant. Running into trouble with your edge proxy, API keys, or agent manifest setup? Ask me anything!"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Ticket form state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Network error connecting to the support net. Please try again or submit a support ticket via the 'Contact Us' tab." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDesc.trim()) return;
    
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketSubject('');
      setTicketDesc('');
      setView('chat');
      setMessages(prev => [...prev, { role: 'assistant', content: "Your support ticket has been successfully transmitted to our engineering team! We'll review it and reach out shortly." }]);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white px-5 py-3.5 rounded-full shadow-2xl shadow-indigo-600/40 font-bold text-xs transition-all hover:scale-105 border border-cyan-400/30 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping"></span>
          <span>WebMCP AI Support</span>
          <span className="text-sm">✨</span>
        </button>
      )}

      {/* Chat / Support Window Drawer */}
      {isOpen && (
        <div className="w-[380px] sm:w-[420px] h-[550px] bg-[#0b0f29] border border-indigo-900/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#030014]/90 border-b border-indigo-950 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-xs font-bold shadow-md">
                AI
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">WebMCP Assistant</h3>
                <p className="text-[10px] text-cyan-400 font-mono">Online • Instant Solutions</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setView(view === 'chat' ? 'ticket' : 'chat')}
                className="text-[10px] font-mono bg-indigo-950/80 hover:bg-indigo-900 text-indigo-200 border border-indigo-800/60 px-2.5 py-1 rounded-lg transition"
              >
                {view === 'chat' ? '🛠️ Contact Us' : '💬 AI Chat'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-indigo-950/50 transition text-sm font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body Content */}
          {view === 'chat' ? (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-sm shadow-md'
                          : 'bg-indigo-950/60 border border-indigo-900/60 text-indigo-100 rounded-bl-sm shadow-inner'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start">
                    <div className="bg-indigo-950/60 border border-indigo-900/60 text-indigo-300 rounded-2xl rounded-bl-sm px-4 py-3 text-xs font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Footer */}
              <form onSubmit={handleSendMessage} className="p-3 bg-[#030014]/60 border-t border-indigo-950 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your issue or ask a question..."
                  className="flex-1 bg-indigo-950/40 border border-indigo-800/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-indigo-400/50 focus:outline-none focus:border-cyan-500 transition"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-md"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            /* Escalation Ticket Form */
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {ticketSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl">
                    ✓
                  </div>
                  <h4 className="text-sm font-bold text-white">Ticket Dispatched!</h4>
                  <p className="text-xs text-indigo-300">Our engineering team has received your logs and description. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-white mb-1">Human Engineering Support</h4>
                    <p className="text-[11px] text-indigo-300">Couldn't solve it with the AI? Submit a ticket directly to Sanad and the team.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-indigo-400">Issue Subject</label>
                    <input
                      type="text"
                      required
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="e.g., Cloudflare Proxy 502 Error"
                      className="w-full bg-indigo-950/40 border border-indigo-800/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-indigo-400/50 focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase text-indigo-400">Detailed Description</label>
                    <textarea
                      required
                      rows={4}
                      value={ticketDesc}
                      onChange={(e) => setTicketDesc(e.target.value)}
                      placeholder="Paste your error codes, steps to reproduce, or code snippet..."
                      className="w-full bg-indigo-950/40 border border-indigo-800/60 rounded-xl p-3 text-xs text-white placeholder-indigo-400/50 focus:outline-none focus:border-cyan-500 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-600/30 transition"
                  >
                    Submit Support Ticket 🚀
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
