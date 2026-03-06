import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Loader, Zap, Plus, Minus, LogOut, ShieldCheck, Users, Home } from 'lucide-react';
import API from '../../services/api';

const AdminDashboard = () => {
    const { logout, admin } = useAuth();

    // Bonus panel state
    const [citizenId, setCitizenId] = useState('');
    const [participant, setParticipant] = useState(null);
    const [searching, setSearching] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [points, setPoints] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!citizenId.trim()) return;
        setSearching(true);
        setError('');
        setSuccess('');
        setParticipant(null);
        try {
            const res = await API.get(`/participants/${citizenId.trim().toUpperCase()}`);
            if (res.data) {
                setParticipant(res.data);
            } else {
                setError('Citizen not found. Check the ID and try again.');
            }
        } catch {
            setError('Citizen not found. Check the ID and try again.');
        } finally {
            setSearching(false);
        }
    };

    const handleUpdatePoints = async (type) => {
        if (!points || isNaN(points) || Number(points) <= 0) {
            setError('Please enter a valid positive number.');
            return;
        }
        setActionLoading(true);
        setError('');
        setSuccess('');
        try {
            const currentBonus = participant.bonusScore || 0;
            const change = Number(points);
            const newBonus = type === 'add' ? currentBonus + change : currentBonus - change;
            await API.put(`/participants/${participant.id}/bonus`, { bonusScore: newBonus });
            setSuccess(`${type === 'add' ? 'Added' : 'Subtracted'} ${change} points. New bonus: ${newBonus}`);
            setParticipant({ ...participant, bonusScore: newBonus, totalScore: (participant.totalScore || 0) + (type === 'add' ? change : -change) });
            setPoints('');
        } catch {
            setError('Failed to update bonus points. Please try again.');
        } finally {
            setActionLoading(false);
        }
    };

    const resetSearch = () => {
        setCitizenId('');
        setParticipant(null);
        setError('');
        setSuccess('');
        setPoints('');
    };

    return (
        <div className="min-h-screen" style={{ background: '#0a0a1a' }}>
            {/* Top Bar */}
            <div
                className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b"
                style={{ background: 'rgba(10,10,26,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(249,162,77,0.12)', border: '1px solid rgba(249,162,77,0.3)' }}
                    >
                        <ShieldCheck size={18} style={{ color: '#F9A24D' }} />
                    </div>
                    <div>
                        <h1
                            className="text-base font-bold uppercase tracking-widest"
                            style={{ fontFamily: "'Orbitron', sans-serif", color: '#F9A24D' }}
                        >
                            Admin Dashboard
                        </h1>
                        <p className="text-xs text-gray-500">
                            Welcome back, <span className="text-gray-300">{admin?.name || 'Admin'}</span>
                        </p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <LogOut size={15} /> Logout
                </button>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-10">
                {/* Section heading */}
                <div className="flex items-center gap-3 mb-8">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)' }}
                    >
                        <Zap size={20} style={{ color: '#06b6d4' }} />
                    </div>
                    <div>
                        <h2
                            className="text-xl font-bold uppercase tracking-widest"
                            style={{ fontFamily: "'Orbitron', sans-serif", color: '#fff' }}
                        >
                            Manage Bonus Points
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">Search a citizen and adjust their bonus score</p>
                    </div>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="relative mb-6">
                    <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        value={citizenId}
                        onChange={(e) => setCitizenId(e.target.value.toUpperCase())}
                        placeholder="Enter Citizen ID (e.g. BC2025001)"
                        className="w-full pl-10 pr-14 py-3.5 rounded-xl text-white uppercase text-sm font-mono tracking-wider focus:outline-none transition-all"
                        style={{
                            background: 'rgba(15,20,40,0.8)',
                            border: '1px solid rgba(6,182,212,0.25)',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(6,182,212,0.6)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(6,182,212,0.25)'}
                    />
                    <button
                        type="submit"
                        disabled={searching || !citizenId.trim()}
                        className="absolute right-2 top-2 bottom-2 aspect-square rounded-lg flex items-center justify-center transition-all hover:scale-105 disabled:opacity-40"
                        style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)' }}
                    >
                        {searching ? <Loader size={16} className="animate-spin" /> : <Search size={16} />}
                    </button>
                </form>

                {/* Feedback Messages */}
                {error && (
                    <div
                        className="mb-5 px-4 py-3 rounded-xl text-sm text-center"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}
                    >
                        {error}
                    </div>
                )}
                {success && (
                    <div
                        className="mb-5 px-4 py-3 rounded-xl text-sm text-center"
                        style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)', color: '#34d399' }}
                    >
                        {success}
                    </div>
                )}

                {/* Participant Card + Controls (shown inline, no modal) */}
                {participant && (
                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{ background: 'rgba(15,20,40,0.8)', border: '1px solid rgba(6,182,212,0.2)' }}
                    >
                        {/* Participant Header */}
                        <div
                            className="px-6 py-5 flex items-start justify-between gap-4"
                            style={{ background: 'rgba(6,182,212,0.05)', borderBottom: '1px solid rgba(6,182,212,0.12)' }}
                        >
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Citizen Found</p>
                                <p className="text-xl font-bold text-white">{participant.name || '—'}</p>
                                <p className="text-sm font-mono mt-0.5" style={{ color: '#06b6d4' }}>{participant.id}</p>
                                {participant.team && (
                                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Home size={11} /> {participant.team}</p>
                                )}
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Total Score</p>
                                <p className="text-3xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif", color: '#F9A24D' }}>
                                    {participant.totalScore || 0}
                                </p>
                                <p className="text-xs text-gray-600 mt-0.5">/ 140 pts</p>
                            </div>
                        </div>

                        {/* Scores Grid */}
                        <div className="px-6 py-4 grid grid-cols-3 gap-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                            {[
                                { label: 'Room Points', value: (participant.room1 || 0) + (participant.room2 || 0) + (participant.room3 || 0) + (participant.room4 || 0) + (participant.room5 || 0), color: '#34d399' },
                                { label: 'Bonus Score', value: participant.bonusScore || 0, color: '#06b6d4' },
                                { label: 'Current Tier', value: participant.currentTier || 'Explorer', color: '#F9A24D', isText: true },
                            ].map(({ label, value, color, isText }) => (
                                <div key={label} className="text-center rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">{label}</p>
                                    <p className={`font-bold ${isText ? 'text-sm' : 'text-2xl'}`} style={{ color }}>{value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Bonus Controls */}
                        <div className="px-6 py-5">
                            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Adjust Bonus Points</p>
                            <div className="flex gap-3">
                                <input
                                    type="number"
                                    min="1"
                                    value={points}
                                    onChange={(e) => setPoints(e.target.value)}
                                    placeholder="Points amount"
                                    className="flex-1 px-4 py-3 rounded-xl text-white text-sm focus:outline-none transition-all"
                                    style={{
                                        background: 'rgba(10,14,30,0.8)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'rgba(6,182,212,0.5)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                                <button
                                    onClick={() => handleUpdatePoints('add')}
                                    disabled={actionLoading || !points}
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all hover:scale-105 disabled:opacity-40"
                                    style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}
                                >
                                    <Plus size={16} /> Add
                                </button>
                                <button
                                    onClick={() => handleUpdatePoints('subtract')}
                                    disabled={actionLoading || !points}
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all hover:scale-105 disabled:opacity-40"
                                    style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' }}
                                >
                                    <Minus size={16} /> Remove
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 pb-5">
                            <button
                                onClick={resetSearch}
                                className="w-full py-2.5 rounded-xl text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-white transition-all"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                                Search Another Citizen
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
