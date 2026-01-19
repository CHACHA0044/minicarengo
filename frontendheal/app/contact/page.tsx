"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/utils/api";

export default function Contact() {
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/auth/me`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setUser(data.user);
      })
      .catch(err => console.error("Auth error:", err));
  }, []);

  const submit = async () => {
    if (!message) {
      setMsg("Please enter your message");
      setTimeout(() => setMsg(""), 3000);
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      // Simulate API call or actual submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitted(true);
      setMsg("Your message has been sent successfully! We will get back to you soon.");
      
      setTimeout(() => {
        setMessage("");
        setSubmitted(false);
        setMsg("");
      }, 3000);

    } catch (error) {
      console.error("Submit error:", error);
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-6 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg">

        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full mb-4">
            <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-gray-500 mt-3 text-sm">
            We would love to hear from you. Send us a message!
          </p>
        </div>

        {msg && (
          <div className={`p-4 rounded-xl mb-6 text-center font-medium ${
            msg.includes("successfully") 
              ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200" 
              : "bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border border-red-200"
          }`}>
            {msg}
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <textarea
                placeholder="Tell us how we can help you..."
                className="border-2 border-gray-200 pl-12 p-3 w-full rounded-xl h-40 resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Message will be sent from: {user?.name || "Loading..."} ({user?.email || "Loading..."})
            </p>
          </div>
        </div>

        <button
          onClick={submit}
          disabled={loading || submitted}
          className="w-full mt-6 py-4 rounded-full text-white font-bold text-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : submitted ? (
            <>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Message Sent!
            </>
          ) : (
            <>
              Send Message
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </button>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-bold text-gray-800 mb-4 text-center">
            Other Ways to Reach Us
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600 bg-amber-50 p-3 rounded-lg hover:bg-amber-100 transition-colors duration-200">
              <svg className="w-5 h-5 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 bg-amber-50 p-3 rounded-lg hover:bg-amber-100 transition-colors duration-200">
              <svg className="w-5 h-5 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">support@minicare.org</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 bg-amber-50 p-3 rounded-lg hover:bg-amber-100 transition-colors duration-200">
              <svg className="w-5 h-5 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">123 Care Street, City, State</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          We typically respond within 24 hours during business days
        </p>

      </div>
    </div>
  );
}