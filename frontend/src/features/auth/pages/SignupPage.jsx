import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await authService.signup(form);
      login(data.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="relative text-center text-white max-w-md">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <span className="text-4xl">🏥</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Join SehatSaathi</h1>
          <p className="text-white/80 text-lg">Start your health journey today.</p>
          <div className="mt-10 space-y-3">
            {['Free doctor consultations', 'Government health schemes', 'Emergency support 24/7', 'Health social feed'].map(feat => (
              <div key={feat} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm text-left">
                <span className="text-green-400 text-lg">✓</span>
                <span className="text-sm">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md animate-slide-up">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-xl">🏥</div>
              <span className="font-bold text-lg text-primary">SehatSaathi</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
            <p className="text-muted mt-2">Join thousands on their health journey</p>
          </div>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input className="input" type="text" placeholder="Sarah Khan" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input className="input" type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone (optional)</label>
              <input className="input" type="tel" placeholder="+91 98765 43210" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input className="input" type="password" placeholder="Min. 6 characters" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
