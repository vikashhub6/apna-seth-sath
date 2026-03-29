import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default function EmergencyPage() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [called, setCalled] = useState(false);

  useEffect(() => {
    axios.get('/api/emergency').then(r => setHospitals(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleEmergencyCall = () => {
    setCalled(true);
    setTimeout(() => setCalled(false), 4000);
    window.location.href = 'tel:108';
  };

  return (
    <div className="animate-fade-in">
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, white 0%, transparent 60%)' }}></div>
        </div>
        <div className="relative flex items-center justify-between flex-wrap gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">🚨 Emergency Support</h1>
            <p className="text-white/80 text-lg">24/7 emergency assistance. Help is always nearby.</p>
            <div className="flex gap-4 mt-6 flex-wrap">
              <button onClick={handleEmergencyCall}
                className={`flex items-center gap-2 font-bold px-8 py-4 rounded-2xl text-lg transition-all active:scale-95 ${called ? 'bg-green-500' : 'bg-white text-red-600 hover:bg-red-50'}`}>
                <span>{called ? '✓' : '📞'}</span>
                {called ? 'Calling 108...' : 'Call Ambulance (108)'}
              </button>
              <a href="tel:102" className="flex items-center gap-2 font-bold px-8 py-4 rounded-2xl text-lg bg-white/20 border border-white/30 hover:bg-white/30 transition-all">
                <span>🏥</span> Call 102
              </a>
            </div>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="font-bold text-xl mb-2">Quick Dial</p>
            {[['🚑', 'Ambulance', '108'], ['🏥', 'Hospital', '102'], ['🧠', 'Mental Health', '1800-599-0019']].map(([icon, label, num]) => (
              <a key={num} href={`tel:${num}`} className="flex items-center gap-3 hover:bg-white/10 rounded-xl px-3 py-2 transition-colors">
                <span>{icon}</span>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-white/70 text-xs">{num}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Map Placeholder + Hospitals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <div className="card overflow-hidden">
          <div className="bg-[#1a2035] h-72 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage: `repeating-linear-gradient(0deg, rgba(108,60,225,0.15) 0px, transparent 1px, transparent 40px),
                repeating-linear-gradient(90deg, rgba(108,60,225,0.15) 0px, transparent 1px, transparent 40px)`
            }}></div>
            {/* Simulated map markers */}
            <div className="relative w-full h-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">+</div>
                <p className="text-white text-xs text-center mt-1 font-medium">Central Clinic</p>
              </div>
              <div className="absolute top-1/4 right-1/4">
                <div className="w-6 h-6 bg-accent rounded-lg flex items-center justify-center text-white text-xs shadow-lg">🏥</div>
              </div>
              <div className="absolute bottom-1/4 left-1/4">
                <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center text-white text-xs shadow-lg">🏥</div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 text-white text-sm border border-white/20">
              📍 Current Location: Central District
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-gray-900 mb-1">Area Map</h3>
            <p className="text-muted text-sm">Showing nearby hospitals and care centers</p>
          </div>
        </div>

        {/* Hospital List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12 text-muted">Loading nearby hospitals...</div>
          ) : hospitals.map(h => (
            <div key={h._id} className={`card p-4 ${h.recommended ? 'border-accent border-2' : ''}`}>
              {h.recommended && (
                <div className="flex items-center gap-1 mb-2">
                  <span className="badge bg-accent/10 text-accent text-xs">⭐ RECOMMENDED</span>
                </div>
              )}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{h.name}</h3>
                  <p className="text-muted text-sm">{h.type}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className="text-muted">📍 {h.distance}</span>
                    <span className={`badge text-xs ${parseInt(h.wait) <= 15 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      ⏱ {h.wait} wait
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {h.services?.map(s => (
                      <span key={s} className="badge bg-surface text-muted text-xs border border-border">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <a href={`tel:${h.phone}`} className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-primary-dark transition-colors">📞</a>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="btn-primary flex-1 text-sm py-2">Get Directions</button>
                <button className="btn-outline flex-1 text-sm py-2">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
