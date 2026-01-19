"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utils/api";

export default function Doctor() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/auth/me`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
          fetchPatients();
        }
      })
      .catch(err => console.error("Auth error:", err));
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/patients`, {
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setPatients(data.patients || []);
      }
    } catch (error) {
      console.error("Fetch patients error:", error);
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-blue-50">
      
      {/* NAVBAR */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
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
                  {user.name?.charAt(0).toUpperCase() || "D"}
                </div>
                <span className="font-medium text-gray-700">Dr. {user.name}</span>
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

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Doctor Dashboard
          </h1>
          <p className="text-gray-600">
            Review and manage patient requests
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : patients.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Patient Requests</h3>
            <p className="text-gray-600">There are currently no patient requests to review.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-500">{patient.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Patient Message:</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {patient.message || "No message provided"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedPatient(patient)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-sm"
                  >
                    View Details
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium text-sm">
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PATIENT DETAILS MODAL */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Patient Details</h2>
                <button 
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPatient.name}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPatient.email}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm font-medium text-gray-700 mb-1">Message</p>
                  <p className="text-gray-900 leading-relaxed">{selectedPatient.message || "No message provided"}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setSelectedPatient(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full hover:bg-gray-300 transition-all duration-300 font-bold"
                >
                  Close
                </button>
                <button className="flex-1 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-all duration-300 font-bold">
                  Accept Case
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}