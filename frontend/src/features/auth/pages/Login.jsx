import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useauth.js';

const Login = () => {
  const { loading, handlelogin } = useAuth();
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await handlelogin({ email, password });
        navigate('/home');
    } catch (err) {
        console.error("Login failed:", err);
    }
  };

  if (loading) {
      return (
          <div className="h-screen flex flex-col items-center justify-center bg-[#fcfcfd]">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 font-bold">Authenticating...</p>
          </div>
      );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#fcfcfd] px-6">
      <div className="mb-12 flex flex-col items-center gap-4 animate-fade">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100">
            <span className="text-white font-bold text-2xl">Z</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
        <p className="text-sm font-medium text-gray-500">Sign in to continue to Zenith AI</p>
      </div>

      <form onSubmit={handleSubmit} className="premium-card p-10 w-full max-w-[440px] space-y-8 animate-fade">
        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Email Address</label>
            <input
                required
                onChange={(e) => setemail(e.target.value)}
                className="premium-input w-full"
                type="email"
                placeholder="name@company.com"
            />
        </div>

        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot Password?</button>
            </div>
            <input
                required
                onChange={(e) => setpassword(e.target.value)}
                className="premium-input w-full"
                type="password"
                placeholder="••••••••"
            />
        </div>

        <button 
            type="submit" 
            className="w-full py-4 bg-indigo-600 text-white rounded-xl text-lg font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-0.5"
        >
          Sign In
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