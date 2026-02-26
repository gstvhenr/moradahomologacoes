'use client';

import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => boolean;
  error: string;
}

export function LoginPage({ onLogin, error }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simula delay para UX
    await new Promise(r => setTimeout(r, 600));
    onLogin(email, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-300/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[30%] left-[20%] w-[20%] h-[20%] rounded-full bg-accent-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo / Branding */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Homologação - Morada
          </h1>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@morada.com.br"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center animate-pulse">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-400 hover:from-brand-500 hover:to-cyan-300 text-white font-semibold text-sm shadow-lg shadow-brand-600/30 hover:shadow-brand-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-brand-600/30"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Entrar
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
