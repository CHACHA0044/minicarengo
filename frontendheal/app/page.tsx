"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URL } from "@/utils/api";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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

  const handleSeekHelp = () => {
    if (user) {
      router.push("/role");
    } else {
      router.push("/auth");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
      router.push("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
            <div className="bg-blue-600 text-white rounded-full p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-blue-600">
              MiniCare NGO
            </span>
          </div>

          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="/" className="hover:text-blue-600 transition-colors duration-200">
              Home
            </a>
            <a href="https://www.jarurat.care/about-us" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors duration-200">
              About Us
            </a>
            <a href="https://www.jarurat.care/get-involved" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors duration-200">
              Get Involved
            </a>
            <a href="https://www.jarurat.care/#news" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors duration-200">
              News
            </a>
            <a href="https://www.jarurat.care/contact-us" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors duration-200">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="font-medium text-gray-700">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition-all duration-300 shadow-md font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => router.push("/auth")}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md font-medium"
              >
                Login
              </button>
            )}
            
            <a 
              href="https://www.jarurat.care/donate"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-all duration-300 shadow-md font-medium"
            >
              Donate Now
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                We Care for Those Who Need It Most
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                MiniCare NGO provides compassionate support, medical guidance, and resources to patients and families facing health challenges.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleSeekHelp}
                  className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
                >
                  Seek Help Now
                </button>
                <a
                  href="https://www.jarurat.care/get-involved"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-md inline-block text-center"
                >
                  Volunteer With Us
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="bg-blue-100 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-8 text-center">
                  <div className="w-32 h-32 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Caring for Communities</h3>
                  <p className="text-gray-600">Providing hope, support, and resources to those in need</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              How We Can Help You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the service that best fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-blue-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-200">
              <div className="inline-block p-4 bg-blue-600 rounded-full mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Patient Support</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Get medical guidance, emotional support, and personalized care from our dedicated team of healthcare professionals.
              </p>
              <button
                onClick={handleSeekHelp}
                className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition-all duration-300"
              >
                Seek Support
              </button>
            </div>

            <div className="bg-green-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-green-200">
              <div className="inline-block p-4 bg-green-600 rounded-full mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-3">Volunteer Registration</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Join us in making a real difference by helping patients and their families through challenging times.
              </p>
              <button
                onClick={handleSeekHelp}
                className="w-full bg-green-600 text-white py-3 rounded-full font-bold hover:bg-green-700 transition-all duration-300"
              >
                Register Now
              </button>
            </div>

            <div className="bg-orange-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-orange-200">
              <div className="inline-block p-4 bg-orange-600 rounded-full mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-orange-900 mb-3">Contact Us</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Have questions or need assistance? Reach out to our team and we will get back to you promptly.
              </p>
              <button
                onClick={() => router.push("/contact")}
                className="w-full bg-orange-600 text-white py-3 rounded-full font-bold hover:bg-orange-700 transition-all duration-300"
              >
                Get in Touch
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Our Impact So Far
          </h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white bg-opacity-20 rounded-3xl p-8 border-2 border-white border-opacity-30 shadow-xl">
              <p className="text-5xl font-extrabold mb-3 text-black">5000+</p>
              <p className="text-black font-semibold text-lg">Patients Helped</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-3xl p-8 border-2 border-white border-opacity-30 shadow-xl">
              <p className="text-5xl font-extrabold text-black mb-3">1200+</p>
              <p className="text-black font-semibold text-lg">Active Volunteers</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-3xl p-8 border-2 border-white border-opacity-30 shadow-xl">
              <p className="text-5xl font-extrabold text-black mb-3">50+</p>
              <p className="text-black font-semibold text-lg">Partner Hospitals</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-3xl p-8 border-2 border-white border-opacity-30 shadow-xl">
              <p className="text-5xl font-extrabold text-black mb-3">24/7</p>
              <p className="text-black font-semibold text-lg">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Why Choose MiniCare NGO
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing compassionate and comprehensive care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted Care</h3>
              <p className="text-gray-600">
                Our experienced team provides reliable and compassionate support to every patient and family member.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Availability</h3>
              <p className="text-gray-600">
                We are here whenever you need us. Our support team is available around the clock to assist you.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600">
                Our network of volunteers and partners work together to create lasting positive impact in communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 text-white rounded-full p-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">MiniCare NGO</span>
              </div>
              <p className="text-sm text-gray-400">
                Dedicated to providing compassionate care and support to those in need.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="https://www.jarurat.care/about-us" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="https://www.jarurat.care/get-involved" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Get Involved</a></li>
                <li><a href="https://www.jarurat.care/#news" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">News</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Our Services</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={handleSeekHelp} className="hover:text-blue-400 transition-colors">Patient Support</button></li>
                <li><button onClick={handleSeekHelp} className="hover:text-blue-400 transition-colors">Volunteer Program</button></li>
                <li><button onClick={() => router.push("/contact")} className="hover:text-blue-400 transition-colors">Contact Us</button></li>
                <li><a href="https://www.jarurat.care/donate" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Donate</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@minicare.org</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Care Street, City</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2024 MiniCare NGO. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}