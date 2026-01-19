"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utils/api";

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setMsg("Please fill in all required fields");
      setTimeout(() => setMsg(""), 3000);
      return;
    }

    if (!isLogin && !formData.name) {
      setMsg("Please enter your name");
      setTimeout(() => setMsg(""), 3000);
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
        
    const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "Something went wrong");
        return;
      }

      setMsg(isLogin ? "Login successful!" : "Registration successful!");
      
      setTimeout(() => {
        router.push("/role");
      }, 1000);

    } catch (error) {
      console.error("Auth error:", error);
      setMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-6 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-blue-600">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-500 mt-3 text-sm">
            {isLogin ? "Login to continue to MiniCare" : "Register to get started with MiniCare"}
          </p>
        </div>

        {msg && (
          <div className={`p-4 rounded-xl mb-6 text-center font-medium ${
            msg.includes("successful") 
              ? "bg-green-50 text-green-700 border border-green-200" 
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {msg}
          </div>
        )}

        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="border-2 border-gray-200 pl-12 p-3 w-full rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="border-2 border-gray-200 pl-12 p-3 w-full rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="border-2 border-gray-200 pl-12 p-3 w-full rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 py-4 rounded-full text-white font-bold text-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isLogin ? "Logging in..." : "Creating account..."}
            </>
          ) : (
            <>
              {isLogin ? "Login" : "Create Account"}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMsg("");
              setFormData({ name: "", email: "", password: "" });
            }}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => router.push("/")}
            className="w-full text-gray-600 hover:text-gray-800 font-medium text-sm flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}