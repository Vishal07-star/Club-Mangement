import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent, demoMode = false) => {
    e?.preventDefault();
    setError('');
    setLoading(true);
    const em = demoMode ? 'admin@clubhub.com' : email;
    const pw = demoMode ? 'admin123' : password;
    await new Promise(r => setTimeout(r, 600));
    const ok = login(em, pw);
    if (ok) navigate('/dashboard');
    else {
      setError('Invalid email or password. Use admin@clubhub.com / admin123');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-surface-900 flex items-center justify-center p-4">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl animate-scaleIn">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Dumbbell size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">ClubHub</h1>
            <p className="text-primary-200 text-sm mt-1 font-medium">Club Membership Management System</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-100 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@clubhub.com"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-100 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-300 hover:text-white transition-colors"
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-400/40 rounded-xl p-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-primary-300 text-xs">or</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          {/* Demo login */}
          <button
            onClick={() => handleLogin(undefined, true)}
            className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Shield size={18} className="text-primary-300" />
            Login as Demo Admin
          </button>

          {/* Credentials hint */}
          <div className="mt-5 bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-primary-300 space-y-1">
            <p className="font-semibold text-primary-200">Demo Credentials</p>
            <p>Email: <span className="text-white">admin@clubhub.com</span></p>
            <p>Password: <span className="text-white">admin123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
