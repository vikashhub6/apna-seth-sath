export default function EmergencyBanner({ called, onCall }) {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, white 0%, transparent 60%)' }}></div>
      </div>
      <div className="relative flex items-center justify-between flex-wrap gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">🚨 Emergency Support</h1>
          <p className="text-white/80 text-lg">24/7 emergency assistance. Help is always nearby.</p>
          <div className="flex gap-4 mt-6 flex-wrap">
            <button onClick={onCall}
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
  );
}