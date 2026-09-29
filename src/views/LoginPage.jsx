import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, Shield, Lock, Mail, User, AlertCircle, CheckCircle2, UserPlus, ArrowRight } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('SUPER_ADMIN');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (mode === 'login') {
      if (!email || !password) {
        setError('Please enter your email and password.');
        return;
      }

      setIsLoading(true);
      try {
        const res = await axios.post('/api/v1/admin/login', { email, password });
        if (res.data.success) {
          localStorage.setItem('lumedrive_admin_token', res.data.token);
          localStorage.setItem('lumedrive_admin_user', JSON.stringify(res.data.admin));
          onLoginSuccess(res.data.admin);
        } else {
          setError(res.data.message || 'Invalid credentials. Please try again.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed. Check your credentials.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Register Mode
      if (!fullName || !email || !password) {
        setError('Please fill in all required fields.');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      setIsLoading(true);
      try {
        const res = await axios.post('/api/v1/admin/register', {
          fullName,
          email,
          password,
          role,
        });

        if (res.data.success) {
          setSuccessMsg('Account created successfully! Signing in...');
          localStorage.setItem('lumedrive_admin_token', res.data.token);
          localStorage.setItem('lumedrive_admin_user', JSON.stringify(res.data.admin));
          setTimeout(() => {
            onLoginSuccess(res.data.admin);
          }, 800);
        } else {
          setError(res.data.message || 'Registration failed. Please try again.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--bg-app)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(216, 178, 87, 0.08), transparent 70%), radial-gradient(circle at 90% 90%, rgba(56, 189, 248, 0.04), transparent 50%)',
    }}>
      {/* Container — Split Layout */}
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '920px',
        minHeight: mode === 'register' ? '580px' : '520px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 32px 80px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(216, 178, 87, 0.22)',
        transition: 'all 0.3s ease',
      }}>

        {/* ── Left Panel (Brand Identity) ─────────────────────── */}
        <div style={{
          width: '340px',
          minWidth: '340px',
          background: 'linear-gradient(160deg, #0E1420 0%, #080A0F 60%, #0B0D14 100%)',
          borderRight: '1px solid rgba(216, 178, 87, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '44px 36px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative glow orb */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            left: '-60px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(216, 178, 87, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Brand Center */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1, justifyContent: 'center' }}>
            {/* Logo */}
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #F5DE88 0%, #D8B257 60%, #8F7228 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '22px',
              boxShadow: '0 0 32px rgba(216, 178, 87, 0.4), 0 8px 24px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden',
              padding: '4px',
            }}>
              <img
                src="/logo.png"
                alt="LumeDrive"
                style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '14px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#080A0F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>';
                }}
              />
            </div>

            {/* Brand Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <h1 className="font-display gold-gradient-text" style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
                LumeDrive
              </h1>
              <span style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(216, 178, 87, 0.18)', color: '#F5DE88', fontWeight: 800, letterSpacing: '0.06em' }}>
                PRO
              </span>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 24px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Global Dispatch Console
            </p>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '250px', textAlign: 'center', margin: 0 }}>
              {mode === 'login'
                ? 'A powerful end-to-end luxury chauffeur dispatch & compliance management platform.'
                : 'Create your administrator credentials to manage fleet telemetry, bookings, and compliance.'}
            </p>

            {/* Feature Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
              {['Live Dispatch', 'PCO Compliance', 'VAT Invoicing', 'B2B Portals'].map((feature) => (
                <span key={feature} style={{
                  fontSize: '0.68rem',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                }}>
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Version */}
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Version 2.4 UK/EU
          </div>
        </div>

        {/* ── Right Panel (Form) ─────────────────────────── */}
        <div style={{
          flex: 1,
          background: '#0B0E15',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '36px 42px',
          overflowY: 'auto',
        }}>
          {/* Top Switch Header (Like Reference Image) */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
              style={{
                background: 'rgba(216, 178, 87, 0.08)',
                border: '1px solid rgba(216, 178, 87, 0.35)',
                color: 'var(--gold-primary)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(216, 178, 87, 0.18)';
                e.currentTarget.style.borderColor = 'var(--gold-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(216, 178, 87, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(216, 178, 87, 0.35)';
              }}
            >
              {mode === 'login' ? 'CREATE ACCOUNT' : 'SIGN IN'}
            </button>
          </div>

          {/* Form Content */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', margin: '0 0 6px', fontFamily: '"Outfit", sans-serif' }}>
              {mode === 'login' ? 'Sign in to LumeDrive' : 'Create Admin Account'}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 24px' }}>
              {mode === 'login'
                ? 'Enter your admin credentials to access the dispatch console.'
                : 'Enter your administrative credentials to register.'}
            </p>

            {/* Error / Success Alerts */}
            {error && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 14px',
                borderRadius: '10px',
                background: 'rgba(244, 63, 94, 0.1)',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                marginBottom: '18px',
                animation: 'fadeIn 0.2s ease',
              }}>
                <AlertCircle size={16} color="#FB7185" />
                <span style={{ fontSize: '0.8rem', color: '#FB7185', fontWeight: 600 }}>{error}</span>
              </div>
            )}

            {successMsg && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 14px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                marginBottom: '18px',
                animation: 'fadeIn 0.2s ease',
              }}>
                <CheckCircle2 size={16} color="#34D399" />
                <span style={{ fontSize: '0.8rem', color: '#34D399', fontWeight: 600 }}>{successMsg}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Full Name (Only for Register) */}
              {mode === 'register' && (
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input
                      type="text"
                      placeholder="e.g. Muhammad Mushaf Khan"
                      className="aura-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{ paddingLeft: '38px', height: '42px', fontSize: '0.86rem' }}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    type="email"
                    placeholder="admin@lumedrive.com"
                    className="aura-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: '38px', height: '42px', fontSize: '0.86rem' }}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Password
                  </label>
                  {mode === 'login' && (
                    <a href="#" style={{ fontSize: '0.72rem', color: 'var(--gold-primary)', fontWeight: 600, textDecoration: 'none' }}
                      onClick={(e) => { e.preventDefault(); setError('Contact system administrator or use your registered email to reset.'); }}>
                      Forgot password?
                    </a>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={mode === 'register' ? 'Choose strong password (min 6 chars)...' : 'Enter your password...'}
                    className="aura-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: '38px', paddingRight: '40px', height: '42px', fontSize: '0.86rem' }}
                    autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password & Role (Only for Register) */}
              {mode === 'register' && (
                <>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Confirm Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Re-enter password..."
                        className="aura-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ paddingLeft: '38px', height: '42px', fontSize: '0.86rem' }}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Administrative Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="aura-input"
                      style={{ height: '42px', fontSize: '0.86rem', background: '#0D111A' }}
                    >
                      <option value="SUPER_ADMIN">👑 Super Admin (Full Console Access)</option>
                      <option value="DISPATCHER">🛰️ Head of Dispatch Operations</option>
                      <option value="AUDITOR">🛡️ Compliance & Licensing Auditor</option>
                    </select>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-aura-primary"
                style={{
                  width: '100%',
                  height: '44px',
                  justifyContent: 'center',
                  fontSize: '0.88rem',
                  marginTop: '8px',
                  opacity: isLoading ? 0.8 : 1,
                  cursor: isLoading ? 'wait' : 'pointer',
                }}
              >
                {isLoading ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite', width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    {mode === 'login' ? 'Authenticating...' : 'Creating Account...'}
                  </>
                ) : (
                  <>
                    {mode === 'login' ? <Shield size={15} /> : <UserPlus size={15} />}
                    {mode === 'login' ? 'Sign In to Console' : 'Create Admin Account'}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Copyright */}
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '20px' }}>
            © 2026 LumeDrive. All rights reserved. Secure Admin Portal.
          </div>
        </div>

      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
