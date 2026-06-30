import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import BorderGlow from '../components/home/BorderGlow';

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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-neutral)', padding: 24 }}>
      <BorderGlow
        borderRadius={32}
        backgroundColor="#edece7"
        style={{ width: '100%', maxWidth: 420 }}
      >
        <div style={{ padding: 48, cursor: 'default' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: 32 }}>
            <img src="/logo.png" alt="TheMentR Logo" style={{ height: 42, objectFit: 'contain' }} />
          </Link>
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
