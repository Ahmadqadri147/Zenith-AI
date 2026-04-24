import React from 'react';
import { useNavigate } from 'react-router';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#fcfcfd] selection:bg-indigo-100 selection:text-indigo-700">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                            <span className="text-white font-bold text-xl">Z</span>
                        </div>
                        <span className="text-2xl font-black tracking-tight text-gray-900">Zenith AI</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/login')}
                            className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            Sign In
                        </button>
                        <button 
                            onClick={() => navigate('/register')}
                            className="px-6 py-2.5 text-sm font-bold bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-0.5"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center space-y-8 animate-fade">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100 mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                        </span>
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">v2.4 Is Now Live</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tight leading-[0.9]">
                        Master Your Next <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Interview.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-500 font-medium leading-relaxed">
                        Elevate your career with AI-driven interview coaching. Analyze your resume, identify skill gaps, and generate ATS-optimized professional profiles in seconds.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                        <button 
                            onClick={() => navigate('/register')}
                            className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl text-lg font-bold shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:scale-105"
                        >
                            Build Your Future Free
                        </button>
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <span>No Credit Card Required</span>
                            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                            <span>AI-Powered Analysis</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Smart Resume Analysis",
                            desc: "Our AI deeply scans your professional history to align your experience with industry expectations.",
                            icon: "📄",
                            color: "bg-blue-50 text-blue-600"
                        },
                        {
                            title: "ATS-Optimized Resumes",
                            desc: "Generate professional, single-page resumes that beat the bots and get noticed by recruiters.",
                            icon: "🚀",
                            color: "bg-emerald-50 text-emerald-600"
                        },
                        {
                            title: "Interview Coaching",
                            desc: "Get personalized technical and behavioral questions based on your specific profile and target role.",
                            icon: "🤝",
                            color: "bg-purple-50 text-purple-600"
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="premium-card p-10 group hover:border-indigo-100 transition-all hover:shadow-2xl hover:shadow-indigo-50">
                            <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats/Proof Section */}
            <section className="py-20 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around gap-12 text-center">
                    <div>
                        <p className="text-4xl font-black text-indigo-600 mb-2">95%</p>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Match Accuracy</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-indigo-600 mb-2">2x</p>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">More Interviews</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-indigo-600 mb-2">10k+</p>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Reports Generated</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 text-center">
                <div className="max-w-4xl mx-auto premium-card p-16 bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-none shadow-3xl shadow-indigo-200">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Ready to Land Your Dream Job?</h2>
                    <p className="text-indigo-100 text-lg mb-10 font-medium opacity-90">
                        Join thousands of professionals who have used Zenith AI to accelerate their career growth.
                    </p>
                    <button 
                        onClick={() => navigate('/register')}
                        className="px-12 py-5 bg-white text-indigo-600 rounded-2xl text-lg font-black shadow-xl hover:bg-indigo-50 transition-all hover:scale-105"
                    >
                        Get Started for Free
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-100 px-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Z</span>
                    </div>
                    <span className="text-lg font-black tracking-tight text-gray-900">Zenith AI</span>
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">© 2026 Zenith AI • All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default LandingPage;
