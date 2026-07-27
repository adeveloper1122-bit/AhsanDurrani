import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { ChatMessage } from "../types";
import { playClickSound, playHoverSound } from "../utils/audio";

export const AIChatbot: React.FC = () => {
  const { isChatbotOpen, setIsChatbotOpen, soundEnabled } = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_welcome",
      sender: "ai",
      text: "Hello 👋 I'm Ahsan AI. I can help you explore Ahsan Durrani's Services, Portfolio, Pricing, Skillset, or calculate project quotes! How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatbotOpen) {
      scrollToBottom();
    }
  }, [messages, isChatbotOpen, isTyping]);

  // Speech Synthesis (TTS)
  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      // Ignore speech synth error
    }
  };

  // Speech Recognition (STT)
  const toggleListening = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) return;

    playClickSound(soundEnabled);
    setInput("");

    const userMsg: ChatMessage = {
      id: "msg_" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationHistory: newHistory.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await response.json();
      const replyText = data.reply || "Ahsan AI is ready to assist you with your project requirements.";

      const aiMsg: ChatMessage = {
        id: "msg_ai_" + Date.now(),
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source,
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(replyText);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: "msg_err_" + Date.now(),
        sender: "ai",
        text: "I experienced a temporary connection hiccup. However, you can reach Ahsan Durrani directly at AhsanDurraniHR@gmail.com or +92 3180598980!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickReplies = [
    "Who is Ahsan Durrani?",
    "Show Services",
    "Pricing Packages",
    "How to Hire Ahsan?",
    "WordPress Expertise",
  ];

  return (
    <>
      {/* Floating Circular Toggle Button Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => {
            playClickSound(soundEnabled);
            setIsChatbotOpen(!isChatbotOpen);
          }}
          onMouseEnter={() => playHoverSound(soundEnabled)}
          data-cursor="chat"
          className="relative w-14 h-14 rounded-full bg-[#8201F2] text-white flex items-center justify-center shadow-[0_0_30px_rgba(130,1,242,0.8)] hover:scale-110 active:scale-95 transition-all cursor-pointer group"
        >
          <div className="absolute -inset-1 rounded-full bg-[#8201F2] opacity-40 animate-ping -z-10" />
          {isChatbotOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          )}
        </motion.button>
      </div>

      {/* Chat Window Glass Card */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] rounded-3xl bg-gradient-to-b from-gray-900/95 via-black/98 to-black border border-[#8201F2]/50 shadow-[0_20px_60px_rgba(130,1,242,0.4)] backdrop-blur-2xl flex flex-col overflow-hidden"
            id="chatbot-window"
          >
            {/* Header */}
            <div className="p-4 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8201F2] flex items-center justify-center text-white shadow-[0_0_15px_#8201F2]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Ahsan AI Assistant</span>
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  </h3>
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Gemini Powered Engine</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* TTS Toggle */}
                <button
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  title={ttsEnabled ? "Mute Voice Response" : "Enable Voice Response (TTS)"}
                  className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                    ttsEnabled ? "bg-[#8201F2] text-white" : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsChatbotOpen(false)}
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${
                    m.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                      m.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-[#8201F2]/30 border border-[#8201F2] text-purple-300"
                    }`}
                  >
                    {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-[#8201F2] text-white rounded-tr-none shadow-[0_0_15px_rgba(130,1,242,0.4)]"
                        : "bg-white/[0.05] border border-white/10 text-gray-200 rounded-tl-none"
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className="block text-[9px] font-mono text-white/50 text-right mt-1">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-purple-300 font-mono">
                  <Bot className="w-4 h-4 text-[#8201F2] animate-spin" />
                  <span>Ahsan AI is thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Chips */}
            <div className="p-2.5 bg-white/[0.02] border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickReplies.map((qr, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qr)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#8201F2] border border-white/10 text-[10px] font-mono text-gray-300 hover:text-white whitespace-nowrap transition-all cursor-pointer"
                >
                  {qr}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-black border-t border-white/10 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isListening
                    ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                }`}
                title="Voice Input (STT)"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Ahsan AI anything..."
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#8201F2]"
              />

              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 rounded-xl bg-[#8201F2] text-white hover:bg-purple-600 disabled:opacity-50 transition-all cursor-pointer shadow-[0_0_12px_#8201F2]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
