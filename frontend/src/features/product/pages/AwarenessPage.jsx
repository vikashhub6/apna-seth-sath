import { useState, useEffect, useRef } from 'react';

const articles = [
  { id: 1, title: 'Understanding Precision Medicine in 2024', category: 'Biotechnology', author: 'Dr. Elena Vance', readTime: '5 min read', desc: 'How genetic profiling is revolutionizing treatment plans for chronic metabolic conditions.', emoji: '🧬', color: 'bg-purple-50' },
  { id: 2, title: 'The Neurochemistry of Daily Performance', category: 'Mental Wellness', author: 'Clinician Marcus Ray', readTime: '6 min read', desc: 'Unlocking the secrets of serotonin and dopamine through focused lifestyle interventions.', emoji: '🧠', color: 'bg-blue-50' },
  { id: 3, title: 'Sleep Architecture & Cognitive Health', category: 'Sleep Science', author: 'Dr. Priya Nair', readTime: '4 min read', desc: 'Why deep sleep is the most powerful cognitive enhancer available to modern humans.', emoji: '😴', color: 'bg-indigo-50' },
  { id: 4, title: 'Gut Microbiome: Your Second Brain', category: 'Nutrition', author: 'Dr. Rajan Mehta', readTime: '7 min read', desc: 'Emerging research reveals how gut bacteria influence mental health, immunity, and longevity.', emoji: '🦠', color: 'bg-green-50' },
  { id: 5, title: 'Heart Rate Variability as a Health Marker', category: 'Cardiology', author: 'Dr. Alistair Vance', readTime: '5 min read', desc: 'HRV tracking is redefining how we understand stress resilience and recovery.', emoji: '🫀', color: 'bg-red-50' },
  { id: 6, title: 'Mindfulness-Based Stress Reduction', category: 'Mental Wellness', author: 'Dr. Sarah Jenkins', readTime: '8 min read', desc: 'Clinical evidence supporting MBSR for anxiety, chronic pain, and burnout recovery.', emoji: '🧘', color: 'bg-teal-50' },
];

function BreathingTool() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState('ready');
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef(null);

  const phases = [
    { name: 'Inhale', duration: 4, color: 'from-primary to-blue-400', instruction: 'Breathe in slowly...' },
    { name: 'Hold', duration: 4, color: 'from-blue-400 to-cyan-400', instruction: 'Hold your breath...' },
    { name: 'Exhale', duration: 6, color: 'from-cyan-400 to-accent', instruction: 'Breathe out slowly...' },
    { name: 'Rest', duration: 2, color: 'from-accent to-primary', instruction: 'Rest...' },
  ];

  useEffect(() => {
    if (!active) { clearInterval(timerRef.current); setPhase('ready'); setCount(0); return; }
    let phaseIdx = 0, seconds = 0;
    setPhase(phases[0].name);
    timerRef.current = setInterval(() => {
      seconds++;
      setCount(seconds);
      if (seconds >= phases[phaseIdx].duration) {
        seconds = 0;
        phaseIdx = (phaseIdx + 1) % phases.length;
        if (phaseIdx === 0) setCycles(c => c + 1);
        setPhase(phases[phaseIdx].name);
        setCount(0);
      }
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [active]);

  const currentPhase = phases.find(p => p.name === phase) || phases[0];
  const progress = active ? (count / currentPhase.duration) * 100 : 0;

  return (
    <div className="card p-8 text-center">
      <h3 className="font-bold text-xl text-gray-900 mb-2">🧘 Breathing Exercise</h3>
      <p className="text-muted text-sm mb-8">4-4-6-2 box breathing technique for immediate stress relief</p>

      <div className="relative w-44 h-44 mx-auto mb-8">
        <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#E8ECF4" strokeWidth="6" />
          <circle cx="50" cy="50" r="45" fill="none"
            stroke={active ? '#6C3CE1' : '#E8ECF4'} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            style={{ transition: 'stroke-dashoffset 1s linear' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {active ? (
            <>
              <p className="text-3xl font-bold text-primary">{currentPhase.duration - count}</p>
              <p className="text-sm font-semibold text-gray-700">{phase}</p>
              <p className="text-xs text-muted mt-1">{currentPhase.instruction}</p>
            </>
          ) : (
            <p className="text-muted text-sm text-center px-4">Tap Start to begin breathing exercise</p>
          )}
        </div>
      </div>

      {cycles > 0 && <p className="text-accent font-semibold text-sm mb-4">✓ {cycles} cycle{cycles > 1 ? 's' : ''} completed</p>}

      <div className="flex gap-3 justify-center">
        <button onClick={() => { setActive(!active); setCycles(0); }}
          className={`px-8 py-3 rounded-xl font-semibold transition-all active:scale-95 ${active ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'btn-primary'}`}>
          {active ? 'Stop' : 'Start'}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-6 text-xs text-center">
        {phases.map(p => (
          <div key={p.name} className={`rounded-xl p-2 ${phase === p.name && active ? 'bg-primary/10 text-primary font-bold' : 'bg-surface text-muted'}`}>
            <p className="font-semibold">{p.name}</p>
            <p>{p.duration}s</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AwarenessPage() {
  const [selected, setSelected] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const categories = ['All', ...new Set(articles.map(a => a.category))];
  const filtered = categoryFilter === 'All' ? articles : articles.filter(a => a.category === categoryFilter);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Health Awareness Hub</h1>
        <p className="text-muted mt-2">Science-backed articles and wellness tools for your daily routine</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Category filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCategoryFilter(c)}
                className={`whitespace-nowrap text-sm px-4 py-2 rounded-xl font-medium transition-all flex-shrink-0 ${categoryFilter === c ? 'bg-primary text-white' : 'bg-white border border-border text-muted hover:border-primary hover:text-primary'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(article => (
              <div key={article.id} onClick={() => setSelected(article)}
                className="card p-5 cursor-pointer hover:shadow-card-hover transition-all duration-300 group">
                <div className={`w-full h-36 ${article.color} rounded-xl flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform duration-200`}>
                  {article.emoji}
                </div>
                <span className="badge bg-primary/10 text-primary text-xs mb-2">{article.category}</span>
                <h3 className="font-bold text-gray-900 mb-2 leading-tight">{article.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-3">{article.desc}</p>
                <div className="flex items-center justify-between text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs">
                      {article.author.charAt(0)}
                    </div>
                    <span>{article.author}</span>
                  </div>
                  <span>{article.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <BreathingTool />

          <div className="card p-5">
            <h3 className="font-bold text-gray-900 mb-4">💡 Daily Health Tips</h3>
            <div className="space-y-3">
              {[
                { tip: 'Drink 500ml water immediately after waking up', icon: '💧' },
                { tip: 'Take a 5-minute walk every hour if sitting', icon: '🚶' },
                { tip: 'Practice 4-7-8 breathing before sleep', icon: '😴' },
                { tip: 'Limit screen time 1 hour before bed', icon: '📵' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-surface rounded-xl">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <p className="text-sm text-gray-700">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5 gradient-hero text-white">
            <h3 className="font-bold mb-2">Weekly Health Digest</h3>
            <p className="text-white/70 text-sm mb-4">Get curated health insights delivered weekly.</p>
            <input className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/50 mb-3" placeholder="Email Address" />
            <button className="w-full bg-white text-primary font-semibold py-2.5 rounded-xl text-sm hover:bg-white/90 transition-all">Subscribe Now</button>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className={`w-full h-48 ${selected.color} rounded-2xl flex items-center justify-center text-7xl mb-6`}>{selected.emoji}</div>
            <span className="badge bg-primary/10 text-primary text-xs mb-3">{selected.category}</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selected.title}</h2>
            <p className="text-muted text-sm mb-4">{selected.desc}</p>
            <p className="text-gray-700 text-sm leading-relaxed">This article explores cutting-edge research and practical insights to help you understand and optimize your health. Our team of medical experts curates evidence-based information tailored to help you make informed health decisions.</p>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2 text-sm text-muted">
                <div className="w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs font-bold">{selected.author.charAt(0)}</div>
                <span>{selected.author} · {selected.readTime}</span>
              </div>
              <button onClick={() => setSelected(null)} className="btn-ghost text-sm">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
