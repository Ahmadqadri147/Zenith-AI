import React, { useEffect } from 'react';
import { useInterview } from '../hooks/useInterview';
import { useNavigate } from 'react-router';

const ReportHistoryDrawer = ({ isOpen, onClose }) => {
    const { getallreports, reports, loading } = useInterview();
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            getallreports();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <div className="w-screen max-w-md animate-slide-in">
                    <div className="h-full flex flex-col bg-white shadow-2xl">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-black text-gray-900">Recent Reports</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Your preparation history</p>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {loading && !reports.length ? (
                                <div className="flex flex-col items-center justify-center h-40 space-y-3">
                                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-sm font-bold text-gray-500">Loading your history...</p>
                                </div>
                            ) : reports.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-60 text-center space-y-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">No reports yet</p>
                                        <p className="text-xs text-gray-400 mt-1">Your generated reports will appear here.</p>
                                    </div>
                                </div>
                            ) : (
                                reports.map((report) => (
                                    <div 
                                        key={report._id}
                                        onClick={() => {
                                            navigate(`/interview/${report._id}`);
                                            onClose();
                                        }}
                                        className="group p-4 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{report.title}</h3>
                                            <span className="text-[10px] font-black bg-indigo-100 text-indigo-600 px-2 py-1 rounded-lg uppercase">
                                                {report.MatchScore}% Match
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {new Date(report.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                            <p className="text-[10px] text-center font-bold text-gray-400 uppercase tracking-widest">
                                Zenith AI • Secure preparation
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportHistoryDrawer;
