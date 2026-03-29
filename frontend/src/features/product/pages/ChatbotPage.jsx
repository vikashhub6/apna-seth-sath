import { useState, useRef, useEffect } from 'react';

const botResponses = {
  'hello': "Hello! I'm your SehatSaathi AI health assistant. How can I support your wellness journey today? 😊",
  'hi': "Hi there! I'm here to help with health information, symptom guidance, and wellness tips. What's on your mind?",
  'headache': "Headaches can have many causes — dehydration, stress, eye strain, or tension. Try drinking water and resting in a quiet, dark room. If the headache is severe, sudden, or accompanied by vision changes, please seek emergency care immediately.",
  'fever': "A mild fever (under 102°F/38.9°C) can often be managed with rest, hydration, and over-the-counter fever reducers. If fever exceeds 103°F, lasts more than 3 days, or is accompanied by severe symptoms, please consult a doctor.",
  'sleep': "Good sleep is foundational to health! Aim for 7-9 hours nightly. Try keeping a consistent schedule, avoiding screens 1 hour before bed, and keeping your room cool and dark. Our breathing exercise can help you wind down.",
  'anxiety': "Managing anxiety is important. Try deep breathing (4-7-8 technique), grounding exercises (5-4-3-2-1 senses), or a short walk. If anxiety is significantly affecting your daily life, speaking to a mental health professional can make a huge difference.",
  'diet': "A balanced diet includes plenty of vegetables, whole grains, lean proteins, and healthy fats. Minimize processed foods and added sugars. Staying hydrated is equally important — aim for 8 glasses of water daily.",
  'exercise': "Regular physical activity is one of the best things you can do for your health. Even 30 minutes of moderate walking daily significantly reduces disease risk. Find activities you enjoy — consistency matters more than intensity!",
  'blood pressure': "High blood pressure (hypertension) often has no symptoms but increases heart disease risk. Reduce sodium intake, exercise regularly, manage stress, and limit alcohol. Regular monitoring is key.",
  'diabetes': "Diabetes management involves blood sugar monitoring, a balanced diet low in refined carbs, regular exercise, and prescribed medications. Work closely with your healthcare team for personalized guidance.",
  'doctor': "You can book a consultation with our verified specialists in the Consultations section. We have experts in Neurology, Cardiology, Mental Health, Genetics, Dermatology, and Sports Medicine.",
  'emergency': "For medical emergencies in India, call 108 (Ambulance) or 102 (Emergency). You can also find nearby hospitals in our Emergency section. Don't delay if you're experiencing severe symptoms!",
  'schemes': "India has several government health schemes like Ayushman Bharat (₹5L coverage), National Health Mission, and PMSBY. Check our Schemes section to find programs you're eligible for based on your age, income, and gender.",
  'thanks': "You're welcome! Your health is my priority. Feel free to ask anything anytime. Stay healthy! 💚",
  'default': "That's an interesting health query! I'd recommend consulting one of our specialist doctors for personalized advice. You can book a session in the Consultations section. Is there something specific I can help clarify?",
};

const suggestions = [
  "I have a headache", "Tips for better sleep", "Manage anxiety",
  "Blood pressure advice", "Book a doctor", "Emergency numbers",
  "Government health schemes", "Exercise recommendations",
];

function getBotResponse(message) {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(botResponses)) {
    if (key !== 'default' && lower.includes(key)) return response;
  }
  return botResponses.default;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: "Hi! I'm Sehat AI, your personal health assistant. 🏥\n\nI can help with health information, symptom guidance, wellness tips, and navigating SehatSaathi's features. How can I help you today?", time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: userMsg, time: new Date() }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    setTyping(false);
    setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: getBotResponse(userMsg), time: new Date() }]);
  };

  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="card p-5 mb-4 flex items-center gap-4">
        <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center text-2xl">🤖</div>
        <div className="flex-1">
          <h2 className="font-bold text-gray-900">Sehat AI</h2>
          <p className="text-muted text-sm">Your intelligent health assistant</p>
        </div>
        <span className="badge bg-green-100 text-green-700 text-xs">🟢 Online</span>
      </div>

      {/* Chat Window */}
      <div className="card overflow-hidden" style={{ height: '60vh', display: 'flex', flexDirection: 'column' }}>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
              {msg.role === 'bot' && (
                <div className="w-8 h-8 gradient-hero rounded-xl flex items-center justify-center text-sm flex-shrink-0 mr-2">🤖</div>
              )}
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-surface text-gray-800 rounded-bl-none border border-border'
                }`}>
                  {msg.text}
                </div>
                <p className={`text-xs text-muted mt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>{formatTime(msg.time)}</p>
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex items-center gap-2 animate-fade-in">
              <div className="w-8 h-8 gradient-hero rounded-xl flex items-center justify-center text-sm flex-shrink-0">🤖</div>
              <div className="bg-surface rounded-2xl rounded-bl-none px-4 py-3 border border-border">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}></div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-white">
          <div className="flex gap-2">
            <input
              className="input flex-1 text-sm"
              placeholder="Ask about symptoms, health tips, doctors..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            />
            <button onClick={() => sendMessage()}
              className="btn-primary px-4 py-2.5 flex-shrink-0">
              Send ↗
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="mt-4">
        <p className="text-xs text-muted mb-3 font-medium">💡 Suggested questions</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button key={s} onClick={() => sendMessage(s)}
              className="text-xs bg-white border border-border text-gray-700 px-3 py-2 rounded-xl hover:border-primary hover:text-primary transition-all">
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
