import { useState, useEffect } from 'react';
import axios from 'axios';

const categoryColors = {
  'Insurance': 'bg-blue-100 text-blue-700',
  'General': 'bg-purple-100 text-purple-700',
  'Rural': 'bg-green-100 text-green-700',
  'Maternal': 'bg-rose-100 text-rose-700',
  'Critical Care': 'bg-red-100 text-red-700',
};

function SchemeCard({ scheme }) {
  const [applied, setApplied] = useState(false);

  return (
    <div className="card p-5 hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🛡️</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-bold text-gray-900 text-sm">{scheme.name}</h3>
            <span className={`badge text-xs ${categoryColors[scheme.category] || 'bg-gray-100 text-gray-600'}`}>{scheme.category}</span>
          </div>
        </div>
      </div>
      <p className="text-muted text-sm leading-relaxed mb-4">{scheme.description}</p>
      <div className="bg-surface rounded-xl p-3 mb-4 text-xs space-y-1">
        <div className="flex justify-between"><span className="text-muted">Age Range</span><span className="font-medium">{scheme.eligibility.ageMin} – {scheme.eligibility.ageMax} yrs</span></div>
        <div className="flex justify-between"><span className="text-muted">Income Limit</span><span className="font-medium">₹{scheme.eligibility.maxIncome.toLocaleString()}/yr</span></div>
        <div className="flex justify-between"><span className="text-muted">Gender</span><span className="font-medium capitalize">{scheme.eligibility.gender}</span></div>
      </div>
      <div className="flex items-center justify-between">
        <span className={`badge text-xs ${scheme.status === 'ACTIVE ENROLLMENT' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {scheme.status}
        </span>
        <button onClick={() => setApplied(true)}
          className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all ${applied ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-dark active:scale-95'}`}>
          {applied ? '✓ Applied' : 'Apply →'}
        </button>
      </div>
    </div>
  );
}

export default function SchemesPage() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ age: '', income: '', gender: 'all' });

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.age) params.age = filters.age;
      if (filters.income) params.income = filters.income;
      if (filters.gender !== 'all') params.gender = filters.gender;
      const { data } = await axios.get('/api/schemes', { params });
      setSchemes(data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchSchemes(); }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#4A0E8F] to-[#1a1a6e] rounded-3xl p-10 mb-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
          <div className="w-full h-full bg-gradient-radial from-accent to-transparent"></div>
        </div>
        <div className="relative max-w-xl">
          <span className="badge bg-accent/20 text-accent border border-accent/30 mb-4">VITALITY GATEWAY</span>
          <h1 className="text-4xl font-bold mb-3">Empowering Your Health</h1>
          <p className="text-white/75 mb-6 leading-relaxed">Access government-backed health initiatives and expert-curated wellness insights tailored to your unique biological profile.</p>
          <div className="flex gap-3">
            <button className="bg-accent text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-green-600 transition-all">Explore Schemes →</button>
            <button className="bg-white/15 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/25 transition-all border border-white/20">Health Articles</button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-5 mb-6">
        <h3 className="font-bold text-gray-900 mb-4">🔍 Filter Schemes by Eligibility</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-muted mb-1.5 block">Your Age</label>
            <input className="input text-sm" type="number" placeholder="e.g. 35" value={filters.age}
              onChange={e => setFilters({ ...filters, age: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted mb-1.5 block">Annual Income (₹)</label>
            <input className="input text-sm" type="number" placeholder="e.g. 300000" value={filters.income}
              onChange={e => setFilters({ ...filters, income: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted mb-1.5 block">Gender</label>
            <select className="input text-sm" value={filters.gender}
              onChange={e => setFilters({ ...filters, gender: e.target.value })}>
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <button onClick={fetchSchemes} className="btn-primary mt-4 px-6">Apply Filters</button>
      </div>

      {/* Emergency Helplines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Official Govt Health Schemes</h2>
              <p className="text-muted text-sm">Direct access to state-sponsored care programs</p>
            </div>
            <span className="text-primary text-sm font-medium">{schemes.length} schemes</span>
          </div>
          {loading ? (
            <div className="text-center py-12 text-muted">Loading schemes...</div>
          ) : schemes.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="text-3xl mb-2">🔍</p>
              <p className="font-semibold">No schemes match your filters</p>
              <p className="text-muted text-sm mt-1">Try adjusting the filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schemes.map(s => <SchemeCard key={s._id} scheme={s} />)}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="card p-5 border-l-4 border-red-500">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-red-500 text-lg">*</span>
              <h3 className="font-bold text-gray-900">EMERGENCY HELPLINE</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <div>
                  <p className="text-xs text-muted">AMBULANCE SERVICE</p>
                  <p className="font-bold text-lg text-gray-900">102 / 108</p>
                </div>
                <a href="tel:102" className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 hover:bg-red-200 transition-colors">📞</a>
              </div>
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="text-xs text-muted">MENTAL HEALTH CRISIS</p>
                  <p className="font-bold text-gray-900">1800-599-0019</p>
                </div>
                <a href="tel:18005990019" className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors">🎧</a>
              </div>
              <p className="text-xs text-muted">Standard call rates may apply. Services available 24/7 across all regions.</p>
            </div>
          </div>

          <div className="card p-5 gradient-accent text-white">
            <h3 className="font-bold mb-2">Community Health Pulse</h3>
            <div className="space-y-3">
              <div>
                <p className="text-white/70 text-xs mb-1">Vaccination Progress</p>
                <p className="text-3xl font-bold">94.2%</p>
                <div className="bg-white/20 rounded-full h-2 mt-2"><div className="bg-white rounded-full h-2 w-[94%]"></div></div>
              </div>
              <div>
                <p className="text-white/70 text-xs">Active Awareness Hubs</p>
                <p className="text-2xl font-bold">1.2k</p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-gray-900 mb-1">Weekly Health Digest</h3>
            <p className="text-muted text-xs mb-4">Receive curated medical breakthroughs and policy updates directly.</p>
            <input className="input text-sm mb-3" placeholder="Email Address" />
            <button className="btn-primary w-full">Subscribe Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
