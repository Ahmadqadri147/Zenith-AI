import React, { useState, useRef } from 'react';
import { useInterview } from '../hooks/useInterview';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';
import ReportHistoryDrawer from '../components/ReportHistoryDrawer';

const Home = () => {
    const { loading, generateReport } = useInterview();
    const { handleLogout } = useAuth();
    const [selfDescription, setSelfDescription] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [file, setFile] = useState(null);
    const [model, setModel] = useState('gemini-1.5-flash');
    const [error, setError] = useState(null);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError(null);
        } else {
            setError('Please upload a valid PDF file.');
            setFile(null);
        }
    };

    const logout = async () => {
        try {
            await handleLogout();
            navigate('/login');
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Resume upload is required.');
            return;
        }
        if (!selfDescription.trim() || !jobDescription.trim()) {
            setError('Please provide all details.');
            return;
        }

        try {
            const report = await generateReport({
                resumeFile: file,
                SelfDescription: selfDescription,
                JobDescription: jobDescription,
                model: model
            });
            if (report && report._id) {
                navigate(`/interview/${report._id}`);
            }
        } catch (err) {
            setError('Error generating report. Please try again.');
        }
    };

    return (
        <div className="app-container">
            {/* Sidebar with Steps/Info */}
            <aside className="sidebar flex flex-col justify-between hidden lg:flex">
                <div className="space-y-12 pb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                            <span className="text-white font-bold text-xl">Z</span>
                        </div>
                        <span className="text-2xl font-black tracking-tight">Zenith AI</span>
                    </div>

                    <div className="space-y-8">
                        {[
                            { num: '01', title: 'Upload Resume', desc: 'Provide your latest experience in PDF format.' },
                            { num: '02', title: 'Self Profile', desc: 'Tell us about your achievements and goals.' },
                            { num: '03', title: 'Target Role', desc: 'Paste the JD you are preparing for.' }
                        ].map((step, idx) => (
                            <div key={idx} className="flex gap-4 group">
                                <span className="text-xs font-black text-indigo-600 mt-1">{step.num}</span>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-10 border-t border-gray-100 space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">AI Model Configuration</label>
                        <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                        >
                            <option value="gemini-2.5-flash-lite">Gemini 2.5 Flash lite (Fast)</option>
                            <option value="gemini-3-flash-preview">Gemini 3 Flash Preview (best)</option>
                            <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash (Experimental)</option>
                        </select>
                        <p className="text-[10px] text-gray-400 italic leading-relaxed">Switch to a different model if you encounter rate limits or errors.</p>
                    </div>
                </div>

                <div className="p-6 bg-indigo-50 rounded-2xl">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Powered by</p>
                    <p className="text-xs font-bold text-gray-700">Zenith AI Intelligence v2.4</p>
                </div>
            </aside>

            {/* Main Form Area */}
            <main className="main-content flex flex-col">
                <div className="flex items-center justify-between mb-12">
                    <div className="lg:hidden flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">Z</span>
                        </div>
                        <span className="text-lg font-bold">Zenith AI</span>
                    </div>
                    <div className="ml-auto flex items-center gap-6">
                        <button
                            onClick={() => setIsHistoryOpen(true)}
                            className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-indigo-600 transition-all group"
                        >
                            <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-indigo-50 transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            History
                        </button>
                        <div className="w-px h-6 bg-gray-100"></div>
                        <button
                            onClick={logout}
                            className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto w-full animate-fade">
                    <div className="mb-12">
                        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Generate Preparation Report</h1>
                        <p className="text-gray-500 font-medium">Complete the details below to start your AI-powered interview coaching session.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="premium-card p-10 space-y-8">
                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Professional Resume</label>
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all cursor-pointer ${file ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-200 hover:border-indigo-400 hover:bg-gray-50'
                                    }`}
                            >
                                <svg className={`w-8 h-8 mb-3 ${file ? 'text-indigo-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-sm font-bold text-gray-900">{file ? file.name : 'Upload PDF Resume'}</p>
                                <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" accept=".pdf" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Self Description</label>
                                <textarea
                                    rows={5}
                                    value={selfDescription}
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    className="premium-input w-full resize-none"
                                    placeholder="Briefly describe your career journey and major achievements..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Job Description</label>
                                <textarea
                                    rows={5}
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className="premium-input w-full resize-none"
                                    placeholder="Paste the target job description here..."
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-xl text-lg font-bold text-white transition-all ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100'
                                }`}
                        >
                            {loading ? 'Analyzing Profile...' : 'Generate Report'}
                        </button>
                    </form>
                </div>
            </main>

            <ReportHistoryDrawer
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
            />
        </div>
    );
};

export default Home;