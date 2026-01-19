"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Role() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* FETCH LOGGED USER */
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const go = (path: string) => {
    router.push(path);
  };

  /* LOGOUT */
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      {/* NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
          
          {/* LOGO */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => go("/")}>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MiniCare NGO
            </span>
          </div>

          {/* NAV LINKS */}
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <span className="hover:text-blue-600 cursor-pointer transition-colors duration-200 hover:scale-105 transform">
              Home
            </span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors duration-200 hover:scale-105 transform">
              About Us
            </span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors duration-200 hover:scale-105 transform">
              Get Involved
            </span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors duration-200 hover:scale-105 transform">
              Blogs
            </span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors duration-200 hover:scale-105 transform">
              Contact
            </span>
          </div>

          {/* USER & ACTIONS */}
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="font-medium text-gray-700">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => go("/login")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium"
              >
                Login
              </button>
            )}
            
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium">
              Donate Now
            </button>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 animate-fadeIn">
            How can we help you today?
          </h1>
          <p className="mt-3 text-xl text-blue-50 max-w-2xl mx-auto px-4">
            Choose the service you're looking for and we'll guide you through
          </p>
        </div>
        
        {/* DECORATIVE ELEMENTS */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
      </div>

      {/* WELCOME MESSAGE */}
      {user && (
        <div className="max-w-6xl mx-auto px-6 pt-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
            <p className="text-center text-gray-700 text-lg">
              Welcome back, <span className="font-bold text-blue-600">{user.name}</span>! 
              <span className="ml-2">We're glad to see you again 👋</span>
            </p>
          </div>
        </div>
      )}

      {/* OPTIONS */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">

        {/* PATIENT */}
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:scale-105 border-2 border-transparent hover:border-blue-200">
          <div className="inline-block p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-blue-600 mb-3">
            Patient Support
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Get medical guidance, emotional support and personalized care from our dedicated team of healthcare professionals.
          </p>

          <button
            onClick={() => go("/patient")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium w-full"
          >
            Seek Support →
          </button>
        </div>

        {/* VOLUNTEER */}
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:scale-105 border-2 border-transparent hover:border-green-200">
          <div className="inline-block p-4 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-green-600 mb-3">
            Volunteer Registration
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Join us in making a real difference by helping patients and their families through challenging times.
          </p>

          <button
            onClick={() => go("/volunteer")}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium w-full"
          >
            Register Now →
          </button>
        </div>

        {/* CONTACT */}
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:scale-105 border-2 border-transparent hover:border-purple-200">
          <div className="inline-block p-4 bg-gradient-to-br from-purple-100 to-pink-200 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-purple-600 mb-3">
            Contact Us
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Have questions or need assistance? Reach out to our team and we'll get back to you promptly.
          </p>

          <button
            onClick={() => go("/contact")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium w-full"
          >
            Get in Touch →
          </button>
        </div>

      </div>

      {/* STATS SECTION */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Our Impact So Far
          </h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <p className="text-4xl font-bold text-black mb-2">5000+</p>
              <p className="text-blue-400">Patients Helped</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <p className="text-4xl font-bold text-black mb-2">1200+</p>
              <p className="text-blue-400">Active Volunteers</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <p className="text-4xl font-bold text-black mb-2">50+</p>
              <p className="text-blue-400">Partner Hospitals</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <p className="text-4xl font-bold text-black mb-2">24/7</p>
              <p className="text-blue-400">Support Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">MiniCare NGO</span>
          </div>
          <p className="text-gray-400 mb-4">
            Dedicated to providing compassionate care and support to those in need
          </p>
          <p className="text-sm text-gray-500">
            © 2024 MiniCare NGO. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}