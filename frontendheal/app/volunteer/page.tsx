"use client";
import { useEffect, useState } from "react";
import { API_URL } from "@/utils/api";

export default function Volunteer() {

  const [user, setUser] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [helpTypes, setHelpTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const helpOptions = [
    { title: "Blood Donation", icon: "🩸", color: "from-red-100 to-red-200", activeColor: "from-red-500 to-red-600" },
    { title: "Patient Counseling", icon: "💬", color: "from-blue-100 to-blue-200", activeColor: "from-blue-500 to-blue-600" },
    { title: "Medicine Support", icon: "💊", color: "from-purple-100 to-purple-200", activeColor: "from-purple-500 to-purple-600" },
    { title: "Hospital Assistance", icon: "🏥", color: "from-green-100 to-green-200", activeColor: "from-green-500 to-green-600" },
    { title: "Financial Help", icon: "💰", color: "from-yellow-100 to-yellow-200", activeColor: "from-yellow-500 to-yellow-600" },
    { title: "Home Care Support", icon: "🏠", color: "from-indigo-100 to-indigo-200", activeColor: "from-indigo-500 to-indigo-600" }
  ];

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

  const toggleHelp = (opt: string) => {
    setHelpTypes(prev =>
      prev.includes(opt)
        ? prev.filter(o => o !== opt)
        : [...prev, opt]
    );
  };

  const submit = async () => {
    if (!phone || helpTypes.length === 0) {
      setMsg("Please select at least one help type and enter your phone number");
      setTimeout(() => setMsg(""), 3000);
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const payload = {
        name: user?.name,
        email: user?.email,
        role: "volunteer",
        helpOptions: helpTypes,
        phone
      };

      const res = await fetch(`${API_URL}/api/users/submit`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "Something went wrong");
        return;
      }

      setSubmitted(true);
      setMsg("Thank you for volunteering! We will contact you soon.");
      
      setTimeout(() => {
        setPhone("");
        setHelpTypes([]);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-6 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl">

        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full mb-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Volunteer With Us
          </h2>
          <p className="text-gray-500 mt-3 text-sm">
            Select the ways you would like to help make a difference
          </p>
        </div>

        {msg && (
          <div className={`p-4 rounded-xl mb-6 text-center font-medium ${
            msg.includes("Thank you") 
              ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200" 
              : "bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border border-red-200"
          }`}>
            {msg}
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-blue-600">●</span>
            How would you like to help?
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {helpOptions.map(opt => (
              <div
                key={opt.title}
                onClick={() => toggleHelp(opt.title)}
                className={`cursor-pointer p-5 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 border-2 shadow-md hover:shadow-xl ${
                  helpTypes.includes(opt.title)
                    ? `bg-gradient-to-br ${opt.activeColor} text-white border-transparent scale-105`
                    : `bg-gradient-to-br ${opt.color} border-gray-200 hover:border-gray-300`
                }`}
              >
                <div className="text-4xl mb-2 transform transition-transform duration-300 hover:scale-110">
                  {opt.icon}
                </div>
                <p className={`font-semibold text-sm ${
                  helpTypes.includes(opt.title) ? "text-white" : "text-gray-700"
                }`}>
                  {opt.title}
                </p>
                {helpTypes.includes(opt.title) && (
                  <div className="mt-2">
                    <svg className="w-5 h-5 mx-auto text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {helpTypes.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-xl mb-6">
            <p className="text-sm text-blue-700 text-center font-medium">
              Selected {helpTypes.length} {helpTypes.length === 1 ? "option" : "options"}: 
              <span className="font-bold ml-1">{helpTypes.join(", ")}</span>
            </p>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                className="border-2 border-gray-200 pl-12 p-3 w-full rounded-xl bg-gray-50 text-gray-700 font-medium cursor-not-allowed"
                value={user?.name || "Loading..."}
                disabled
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                className="border-2 border-gray-200 pl-12 p-3 w-full rounded-xl bg-gray-50 text-gray-700 font-medium cursor-not-allowed"
                value={user?.email || "Loading..."}
                disabled
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                placeholder="Enter your phone number"
                className="border-2 text-black border-gray-200 pl-12 p-3 w-full rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                type="tel"
              />
            </div>
          </div>
        </div>

        <button
          onClick={submit}
          disabled={loading || submitted}
          className="w-full mt-6 py-4 rounded-full text-white font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : submitted ? (
            <>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Submitted Successfully!
            </>
          ) : (
            <>
              Submit Application
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-6">
          By submitting, you agree to be contacted by our team for volunteer coordination
        </p>

      </div>
    </div>
  );
}