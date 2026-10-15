import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import BorderGlow from '../components/home/BorderGlow';
import SEO from '../components/common/SEO';
import { PAGE_SEO } from '../config/seo.config';
import Logo from '../components/common/Logo';
import { FloatingDoodles } from '../components/common/FloatingDoodles';

const loginDoodles = [
  { type: 'paperPlane', size: 64, color: '#4F7CFF', rotate: 12, opacity: 0.55, position: { top: '10%', right: '12%' } },
  { type: 'bulb', size: 52, color: '#6366F1', rotate: -15, opacity: 0.48, position: { top: '14%', left: '12%' } },
  { type: 'cap', size: 58, color: '#7469F8', rotate: 18, opacity: 0.45, position: { bottom: '12%', left: '14%' } },
  { type: 'book', size: 56, color: '#3B82F6', rotate: -10, opacity: 0.48, position: { bottom: '15%', right: '12%' } },
  { type: 'aPlus', size: 48, color: '#4F7CFF', rotate: 8, opacity: 0.42, position: { top: '35%', left: '7%' } },
  { type: 'atom', size: 52, color: '#6366F1', rotate: -20, opacity: 0.45, position: { top: '40%', right: '8%' } },
  { type: 'sparkle', size: 38, color: '#7469F8', rotate: 0, opacity: 0.55, position: { top: '7%', left: '26%' } },
  { type: 'pencil', size: 48, color: '#2563EB', rotate: 25, opacity: 0.45, position: { bottom: '30%', right: '7%' } },
  { type: 'math', size: 48, color: '#4F7CFF', rotate: -8, opacity: 0.42, position: { bottom: '32%', left: '6%' } }
];

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await authAPI.login(form);
      login(data.data.user, data.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #F8FAFF 0%, #EDF4FF 100%)', padding: 24, position: 'relative', overflow: 'hidden' }}>
      <SEO {...PAGE_SEO.login} />
      <FloatingDoodles items={loginDoodles} />
      <BorderGlow
        borderRadius={32}
        backgroundColor="#FFFFFF"
        style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 2 }}
      >
        <div style={{ padding: 48, cursor: 'default' }}>
          <div style={{ display: 'inline-block', marginBottom: 32 }}>
            <Logo height={38} variant="clay" onClick={() => navigate('/')} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 8 }}>Welcome back</h1>
          <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', marginBottom: 32 }}>Sign in to your TheMentR account</p>
          {error && <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '10px 14px', borderRadius: 8, fontSize: 14, marginBottom: 20 }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</label>
              <input className="form-input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="your@email.com" />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Password</label>
              <input className="form-input" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>{loading ? 'Signing in...' : 'Sign In →'}</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--color-text-secondary)' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--color-blue)', fontWeight: 600, textDecoration: 'none' }}>Create one</Link>
          </p>
        </div>
      </BorderGlow>
    </div>
  );
}
