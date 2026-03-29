import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

const navLinks = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/feed', label: 'Health Feed' },
  { path: '/doctors', label: 'Consultations' },
  { path: '/schemes', label: 'Schemes' },
  { path: '/emergency', label: 'Emergency' },
  { path: '/awareness', label: 'Awareness' },
  { path: '/chatbot', label: 'AI Chat' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav style={{ backgroundColor: '#1a1a2e', borderBottom: '1px solid rgba(108,60,225,0.3)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '64px', gap: '24px' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ width: '36px', height: '36px', background: '#6C3CE1', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>S</div>
            <span style={{ fontWeight: '700', color: 'white', fontSize: '18px' }}>SehatSaathi</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
            {navLinks.map(({ path, label }) => (
              <Link key={path} to={path} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: location.pathname === path ? '600' : '400', color: location.pathname === path ? '#a78bfa' : '#ffffff', backgroundColor: location.pathname === path ? 'rgba(108,60,225,0.2)' : 'transparent', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
                {label}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#6C3CE1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '14px' }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <button onClick={() => { logout(); navigate('/login'); }} style={{ color: '#ffffff', fontSize: '13px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
