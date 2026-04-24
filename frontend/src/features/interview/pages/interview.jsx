import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useInterview } from '../hooks/useInterview';

const Interview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { report, getreportbyid, generateResumePdf, loading } = useInterview();
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('technical');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                await getreportbyid(id);
            } catch (err) {
                setError('Report generation failed.');
            }
        };
        if (id) fetchReport();
    }, [id]);

    if (loading && !report) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-[#fcfcfd]">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400 font-bold">Zenith AI is syncing analysis...</p>
            </div>
        );
    }

    if (error || !report) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#fcfcfd] px-6">
                <div className="premium-card p-12 text-center max-w-md w-full">
                    <h2 className="text-2xl font-black text-gray-900 mb-2">Error</h2>
                    <p className="text-gray-500 mb-8">{error || 'Analysis not found.'}</p>
                    <button onClick={() => navigate('/')} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">Back to Home</button>
                </div>
            </div>
        );
    }

    const { MatchScore, TechnicalQuestions, BehavioralQuestions, SkillsGap, PreparationPlan, title } = report;

    return (
        <div className="app-container">
            {/* Navigation Sidebar */}
            <aside className="sidebar flex flex-col justify-between">
                <div className="space-y-10">
                    <div className="lg:hidden flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">Z</span>
                        </div>
                        <span className="text-lg font-bold">Zenith AI</span>
                    </div>

                    <nav className="space-y-1">
                        {[
                            { id: 'technical', label: 'Technical Domain', icon: '💻' },
                            { id: 'behavioral', label: 'Soft Skills', icon: '🤝' },
                            { id: 'skills', label: 'Skills Gap', icon: '🎯' },
                            { id: 'plan', label: 'Preparation Plan', icon: '📅' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveSection(tab.id)}
                                className={`nav-item w-full ${activeSection === tab.id ? 'active' : ''}`}
                            >
                                <span className="text-lg">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    <div className="pt-10 border-t border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Global Metrics</p>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-gray-500">Match Score</span>
                                <span className="text-lg font-black text-indigo-600">{MatchScore}%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-600" style={{ width: `${MatchScore}%` }}></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Questions</span>
                                    <p className="font-black text-gray-900">{(TechnicalQuestions?.length || 0) + (BehavioralQuestions?.length || 0)}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Duration</span>
                                    <p className="font-black text-gray-900">7 Days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <button onClick={() => navigate('/')} className="w-full text-xs font-bold text-gray-400 hover:text-indigo-600 transition-colors py-2">
                        ← Back to Dashboard
                    </button>
                </div>
            </aside>

            {/* Middle Data Content Area */}
            <main className="main-content">
                <div className="mb-12 animate-fade">
                    <span className="text-xs font-black text-indigo-600 uppercase tracking-widest block mb-2">Report Content</span>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">{title || "Software Engineer Analysis"}</h1>
                    
                    <div className="premium-card p-8 bg-gradient-to-br from-white to-indigo-50/30 border-indigo-100/50">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex-1">
                                <h3 className="text-xl font-black text-gray-900 mb-2">Optimize Your Application</h3>
                                <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-xl">
                                    Our AI coach has analyzed your profile against the target role. You can now generate an **ATS-friendly resume** that strategically incorporates the keywords and quantifiable achievements identified in this analysis.
                                </p>
                            </div>
                            <button 
                                onClick={async () => {
                                    try {
                                        const blob = await generateResumePdf(id);
                                        const url = window.URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.setAttribute('download', 'ATS_Optimized_Resume.pdf');
                                        document.body.appendChild(link);
                                        link.click();
                                        link.parentNode.removeChild(link);
                                    } catch (err) {
                                        console.error("PDF download failed:", err);
                                    }
                                }}
                                disabled={loading}
                                className={`px-8 py-4 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-3 shrink-0 ${
                                    loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                {loading ? 'Building Resume...' : 'Generate ATS Resume'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="animate-fade">
                    {activeSection === 'technical' && (
                        <div className="space-y-6">
                            {TechnicalQuestions?.map((q, idx) => (
                                <QuestionCard key={idx} q={q} index={idx + 1} />
                            ))}
                        </div>
                    )}

                    {activeSection === 'behavioral' && (
                        <div className="space-y-6">
                            {BehavioralQuestions?.map((q, idx) => (
                                <QuestionCard key={idx} q={q} index={idx + 1} />
                            ))}
                        </div>
                    )}

                    {activeSection === 'skills' && (
                        <div className="grid grid-cols-1 gap-4">
                            {SkillsGap?.map((gap, idx) => (
                                <div key={idx} className="premium-card p-6 flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${
                                            gap.severity === 'high' ? 'bg-red-500' :
                                            gap.severity === 'medium' ? 'bg-orange-500' : 'bg-emerald-500'
                                        }`}></div>
                                        <h3 className="font-bold text-gray-900">{gap.skill}</h3>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                        gap.severity === 'high' ? 'bg-red-50 text-red-600' :
                                        gap.severity === 'medium' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'
                                    }`}>
                                        {gap.severity}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeSection === 'plan' && (
                        <div className="space-y-6">
                            {PreparationPlan?.map((day, idx) => (
                                <div key={idx} className="premium-card overflow-hidden">
                                    <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex items-center justify-between">
                                        <h3 className="font-black text-gray-900">Day {day.day}: {day.focus}</h3>
                                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">Milestone</span>
                                    </div>
                                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {day.tasks?.map((task, tidx) => (
                                            <div key={tidx} className="flex items-start gap-3 p-4 rounded-xl border border-gray-50 text-sm font-medium text-gray-600 leading-relaxed">
                                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                                {task}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const QuestionCard = ({ q, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="premium-card overflow-hidden transition-all duration-300">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-8 flex items-center justify-between gap-6 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-6">
                    <span className="text-sm font-black text-gray-300">{index < 10 ? `0${index}` : index}</span>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{q.question}</h3>
                </div>
                <span className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && (
                <div className="px-8 pb-8 space-y-6 animate-fade">
                    <div className="p-6 bg-gray-50 rounded-2xl">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Intention</p>
                        <p className="text-sm font-medium text-gray-600 italic">"{q.intention}"</p>
                    </div>
                    <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                        <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3">Recommended Approach</p>
                        <p className="text-sm font-bold text-gray-900 leading-relaxed">{q.answer}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Interview;