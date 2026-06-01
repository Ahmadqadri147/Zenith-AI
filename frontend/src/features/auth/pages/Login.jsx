import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';

const Login = () => {
  const { handlelogin } = useAuth();
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
        await handlelogin({ email, password });
        navigate('/home');
    } catch (err) {
        console.error("Login failed:", err);
        setError(err.response?.data?.message || err.message || "Invalid email or password. Please try again.");
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#fcfcfd] px-6">
      <div className="mb-12 flex flex-col items-center gap-4 animate-fade">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100">
            <span className="text-white font-bold text-2xl">Z</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
        <p className="text-sm font-medium text-gray-500">Sign in to continue to Zenith AI</p>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off" className="premium-card p-10 w-full max-w-[440px] space-y-8 animate-fade">
        {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold text-center animate-fade">
                {error}
            </div>
        )}

        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Email Address</label>
            <input
                required
                disabled={submitting}
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className={`premium-input w-full ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                type="email"
                autoComplete="off"
                placeholder="name@company.com"
            />
        </div>

        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <button type="button" disabled={submitting} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 disabled:opacity-50">Forgot Password?</button>
            </div>
            <input
                required
                disabled={submitting}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className={`premium-input w-full ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
            />
        </div>

        <button 
            type="submit" 
            disabled={submitting}
            className={`w-full py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 ${
                submitting 
                ? 'bg-indigo-400 text-white cursor-not-allowed shadow-none' 
                : 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5'
            }`}
        >
          {submitting ? (
              <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
              </>
          ) : 'Sign In'}
        </button>
      </form>

      <p className="mt-8 text-sm font-medium text-gray-500 animate-fade">
        Don't have an account?{' '}
        <button 
            onClick={() => navigate('/register')} 
            className="font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
        >
            Create an account
        </button>
      </p>

      <button 
        onClick={() => navigate('/')}
        className="mt-12 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
      >
        ← Back to Landing Page
      </button>
    </div>
  );
};

export default Login;