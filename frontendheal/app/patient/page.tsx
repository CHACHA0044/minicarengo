"use client";
import { useEffect, useState, useRef } from "react";
import { API_URL } from "@/utils/api";

export default function Patient() {

  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const [done, setDone] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");

  /* CHATBOT */
  const [showChat, setShowChat] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [chatLog, setChatLog] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  /* AUTO SCROLL */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, isTyping]);

  /* FETCH LOGGED USER */
  useEffect(() => {
    fetch(`${API_URL}/api/auth/me`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setUser(data.user);
      });
  }, []);

  /* SUBMIT */
  const submit = async () => {

    if (!message) return;

    setLoading(true);
    setInfoMsg("🔍 Analyzing your description...");

    try {

      await fetch(`${API_URL}/api/users/submit`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user?.name,
          email: user?.email,
          role: "patient",
          message
        })
      });

      const aiRes = await fetch(
        `${API_URL}/api/ai/summarize`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: message })
        }
      );

      const aiData = await aiRes.json();

      setDone(true);
      setMessage("");

      setInfoMsg("✅ Analysis complete! Here's what we found...");

      setTimeout(() => {
        setSummary(aiData.summary);
        setShowSummary(true);
        setInfoMsg("");
      }, 1500);

    } catch (error) {
      console.error("Submit error:", error);
      setInfoMsg("❌ An error occurred. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  /* CHAT SEND */
  const sendChat = async () => {

    if (!chatMsg.trim()) return;

    const userMessage = chatMsg;
    setChatMsg("");

    // Add user message
    setChatLog(prev => [
      ...prev,
      { from: "user", text: userMessage }
    ]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Simulate thinking delay
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

      const res = await fetch(
        `${API_URL}/api/ai/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage })
        }
      );

      const data = await res.json();

      // Additional delay to make it feel more natural
      await new Promise(resolve => setTimeout(resolve, 500));

      setIsTyping(false);

      setChatLog(prev => [
        ...prev,
        { from: "bot", text: data.reply }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
      setChatLog(prev => [
        ...prev,
        { from: "bot", text: "Sorry, I'm having trouble responding right now. Please try again." }
      ]);
    }
  };

  /* HANDLE ENTER KEY */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendChat();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-white px-6 py-12">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-blue-600">
            Patient Support
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            We are here to help you feel better
          </p>
        </div>

        {/* INPUT */}
        {!done && (
          <div className="space-y-4">
            <textarea
              placeholder="Describe your symptoms or health concerns..."
              className="border-2 border-gray-200 text-black p-4 w-full rounded-xl mt-6 h-32 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />

            <button
              onClick={submit}
              disabled={loading}
              className="w-full mt-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : "Submit Request"}
            </button>
          </div>
        )}

        {/* STATUS MESSAGE */}
        {infoMsg && (
          <div className="mt-5">
            <p className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 p-4 rounded-xl text-center font-medium border border-green-200 shadow-sm">
              {infoMsg}
            </p>
          </div>
        )}

        {/* SUMMARY */}
        {showSummary && (
          <div className="space-y-6 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500 rounded-lg flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-blue-900 mb-1">AI Analysis</p>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    {summary}
                  </p>
                </div>
              </div>
            </div>

            {/* OPTIONS */}
            <div>
              <p className="text-gray-600 text-sm font-medium mb-3 text-center">
                Choose how you would like to proceed:
              </p>
              <div className="grid grid-cols-2 gap-4">

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl text-center hover:scale-105 hover:shadow-lg transform transition-all duration-300 cursor-pointer border-2 border-blue-200 hover:border-blue-400 group">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    👨‍⚕️
                  </div>
                  <p className="font-bold text-blue-900">
                    Talk to Doctor
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Available 10 AM – 6 PM
                  </p>
                </div>

                {/* OPEN CHAT */}
                <div
                  onClick={() => setShowChat(true)}
                  className="bg-gradient-to-br from-indigo-50 to-purple-100 p-5 rounded-xl text-center hover:scale-105 hover:shadow-lg transform transition-all duration-300 cursor-pointer border-2 border-indigo-200 hover:border-indigo-400 group"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    🤖
                  </div>
                  <p className="font-bold text-indigo-900">
                    Chat with Bot
                  </p>
                  <p className="text-xs text-indigo-600 mt-1">
                    Instant replies
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* CHAT UI */}
        {showChat && (
          <div className="mt-6 bg-gradient-to-br from-gray-50 to-blue-50 p-5 rounded-2xl border-2 border-blue-100 shadow-lg">

            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <span className="text-gray-800">Health Assistant</span>
              </h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="h-64 overflow-y-auto space-y-3 mb-4 pr-2">

              {chatLog.length === 0 && (
                <div className="text-center text-gray-400 mt-16">
                  <p className="text-sm">Start a conversation!</p>
                  <p className="text-xs mt-1">Ask me anything about your health</p>
                </div>
              )}

              {chatLog.map((c, i) => (
                <div
                  key={i}
                  className={`flex ${c.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                      c.from === "user"
                        ? "bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}

              {/* TYPING INDICATOR */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-sm shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            <div className="flex gap-2">
              <input
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="border-2 text-black border-gray-200 p-3 flex-1 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                disabled={isTyping}
              />

              <button
                onClick={sendChat}
                disabled={isTyping || !chatMsg.trim()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}