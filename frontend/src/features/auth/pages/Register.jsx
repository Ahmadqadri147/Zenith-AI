import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';

const Register = () => {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await handleRegister({ username, email, password });
        navigate('/home');
    } catch (err) {
        console.error("Registration failed:", err);
    }
  };

  if (loading) {
      return (
          <div className="h-screen flex flex-col items-center justify-center bg-[#fcfcfd]">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 font-bold">Creating Account...</p>
          </div>
      );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#fcfcfd] px-6">
      <div className="mb-12 flex flex-col items-center gap-4 animate-fade">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100">
            <span className="text-white font-bold text-2xl">Z</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h1>
        <p className="text-sm font-medium text-gray-500">Join Zenith AI and master your career</p>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off" className="premium-card p-10 w-full max-w-[440px] space-y-6 animate-fade">
        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Full Name</label>
            <input
                required
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="premium-input w-full"
                type="text"
                autoComplete="off"
                placeholder="John Doe"
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Email Address</label>
            <input
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="premium-input w-full"
                type="email"
                autoComplete="off"
                placeholder="name@company.com"
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Password</label>
            <input
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="premium-input w-full"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
            />
            <p className="text-[10px] text-gray-400 font-medium italic">Must be at least 8 characters long.</p>
        </div>

        <button 
            type="submit" 
            className="w-full py-4 bg-indigo-600 text-white rounded-xl text-lg font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-0.5"
        >
          Get Started
        </button>
      </form>

      <p className="mt-8 text-sm font-medium text-gray-500 animate-fade">
        Already have an account?{' '}
        <button 
            onClick={() => navigate('/login')} 
            className="font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
        >
            Sign in
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

export default Register;