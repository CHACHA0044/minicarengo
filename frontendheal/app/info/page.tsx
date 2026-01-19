"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URL } from "@/utils/api";

export default function Info() {
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

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
      router.push("/home");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const resources = [
    {
      title: "Mental Health Resources",
      icon: "🧠",
      color: "bg-purple-50",
      borderColor: "border-purple-200",
      items: [
        "24/7 Crisis Helpline: 1-800-273-8255",
        "Online Counseling Services",
        "Support Group Meetings",
        "Meditation and Mindfulness Apps"
      ]
    },
    {
      title: "Medical Assistance",
      icon: "🏥",
      color: "bg-blue-50",
      borderColor: "border-blue-200",
      items: [
        "Free Health Checkup Camps",
        "Prescription Assistance Programs",
        "Telemedicine Consultations",
        "Emergency Medical Services"
      ]
    },
    {
      title: "Financial Support",
      icon: "💰",
      color: "bg-green-50",
      borderColor: "border-green-200",
      items: [
        "Treatment Cost Assistance",
        "Medical Bill Payment Plans",
        "Insurance Guidance",
        "Fundraising Support"
      ]
    },
    {
      title: "Educational Resources",
      icon: "📚",
      color: "bg-orange-50",
      borderColor: "border-orange-200",
      items: [
        "Disease Information Guides",
        "Nutrition and Diet Plans",
        "Exercise and Wellness Programs",
        "Caregiver Training"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-indigo-50">
      
      {/* NAVBAR */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
            <div className="bg-blue-600 text-white rounded-full p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-blue-600">MiniCare NGO</span>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="font-medium text-gray-700">{user.name}</span>
              </div>
            )}
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition-all duration-300 shadow-md font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Health Resources and Information
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Access comprehensive resources, support services, and educational materials to help you on your health journey
          </p>
        </div>
      </div>

      {/* RESOURCES */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <div 
              key={index}
              className={`${resource.color} ${resource.borderColor} border-2 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{resource.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900">{resource.title}</h2>
              </div>

              <ul className="space-y-3">
                {resource.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </div>

        {/* EMERGENCY CONTACT */}
        <div className="mt-12 bg-red-50 border-2 border-red-200 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-red-900">Emergency Contacts</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl">
              <p className="text-sm font-medium text-gray-600 mb-1">Emergency Services</p>
              <p className="text-2xl font-bold text-red-600">911</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <p className="text-sm font-medium text-gray-600 mb-1">Poison Control</p>
              <p className="text-2xl font-bold text-red-600">1-800-222-1222</p>
            </div>
           </div>
    <div className="mt-12 bg-blue-600 rounded-3xl p-12 text-center text-white">
      <h3 className="text-3xl font-bold mb-4">Need Personalized Support?</h3>
      <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
        Connect with our team of healthcare professionals for personalized guidance and support
      </p>
      <button 
        onClick={() => router.push("/patient")}
        className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
      >
        Get Support Now
      </button>
    </div></div></div>
  
);
}