import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Loader, Zap, Plus, Minus, LogOut, ShieldCheck, Users, Home, Award, Layers } from 'lucide-react';
import API from '../../services/api';

const AdminDashboard = () => {
    const { logout, admin } = useAuth();

    // Bonus panel state
    const [citizenId, setCitizenId] = useState('');
    const [participant, setParticipant] = useState(null);
    const [searching, setSearching] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [selectedField, setSelectedField] = useState('bonusScore');
    const [points, setPoints] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        const queryId = (citizenId || '').trim().toUpperCase();
        if (!queryId) return;
        setSearching(true);
        setError('');
        setSuccess('');
        try {
            const res = await API.get(`/participants/${queryId}`);
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
            const delta = type === 'add' ? Number(points) : -Number(points);
            const targetId = participant.id || participant.citizenId;

            const res = await API.put(`/participants/${targetId}/score`, {
                field: selectedField,
                delta: delta
            });

            const newTotal = res.data.totalScore;
            const updatedFieldValue = res.data.newFieldValue;

            setSuccess(`${type === 'add' ? 'Added' : 'Subtracted'} ${Math.abs(delta)} points to ${selectedField}. New value: ${updatedFieldValue} (Total: ${newTotal})`);
            
            setParticipant(prev => ({
                ...prev,
                [selectedField]: updatedFieldValue,
                totalScore: newTotal,
                currentTier: res.data.participant?.currentTier || prev.currentTier
            }));
            setPoints('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update score. Please try again.');
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

    const roomsList = [
        { key: 'bonusScore', label: 'Bonus Score' },
        { key: 'room1', label: 'Room 1 (Law Foundry)' },
        { key: 'room2', label: 'Room 2 (Treasury Mint)' },
        { key: 'room3', label: 'Room 3 (Identity Bureau)' },
        { key: 'room4', label: 'Room 4 (Council Chamber)' },
        { key: 'room5', label: 'Room 5 (Control Center)' },
        { key: 'finalProjectScore', label: 'Final Project Score' }
    ];

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
                            Logged in as <span className="text-gray-300 font-mono">{admin?.email || 'Admin'}</span>
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

            <div className="max-w-3xl mx-auto px-4 py-10">
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
                            Manage Participant Scores
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">Add or subtract points for any room or bonus score in real-time</p>
                    </div>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="relative mb-6">
                    <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        value={citizenId}
                        onChange={(e) => setCitizenId(e.target.value.toUpperCase())}
                        placeholder="Enter Citizen ID / USN (e.g. UEC2025114 or UCE2022416)"
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

                {/* Participant Card + Controls */}
                {participant && (
                    <div
                        className="rounded-2xl overflow-hidden shadow-2xl"
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
                                <p className="text-sm font-mono mt-0.5" style={{ color: '#06b6d4' }}>{participant.id || participant.citizenId}</p>
                                {participant.team && (
                                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><Home size={11} /> {participant.team}</p>
                                )}
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Total Score</p>
                                <p className="text-3xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif", color: '#F9A24D' }}>
                                    {participant.totalScore || 0}
                                </p>
                                <p className="text-xs text-emerald-400 mt-0.5 font-semibold flex items-center justify-end gap-1">
                                    <Award size={12} /> {participant.currentTier || 'Explorer'}
                                </p>
                            </div>
                        </div>

                        {/* Detailed Room Scores Grid */}
                        <div className="px-6 py-4 grid grid-cols-3 sm:grid-cols-6 gap-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                            {[
                                { key: 'room1', label: 'Room 1', val: participant.room1 || 0 },
                                { key: 'room2', label: 'Room 2', val: participant.room2 || 0 },
                                { key: 'room3', label: 'Room 3', val: participant.room3 || 0 },
                                { key: 'room4', label: 'Room 4', val: participant.room4 || 0 },
                                { key: 'room5', label: 'Room 5', val: participant.room5 || 0 },
                                { key: 'bonusScore', label: 'Bonus', val: participant.bonusScore || 0, highlight: true },
                            ].map(({ key, label, val, highlight }) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setSelectedField(key)}
                                    className={`text-center rounded-xl p-2.5 transition-all ${selectedField === key ? 'ring-2 ring-cyan-400' : ''}`}
                                    style={{
                                        background: selectedField === key ? 'rgba(6,182,212,0.18)' : 'rgba(255,255,255,0.03)',
                                        border: `1px solid ${selectedField === key ? '#06b6d4' : 'rgba(255,255,255,0.06)'}`
                                    }}
                                >
                                    <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
                                    <p className={`font-bold text-lg ${highlight ? 'text-cyan-400' : 'text-emerald-400'}`}>{val}</p>
                                </button>
                            ))}
                        </div>

                        {/* Controls (Add & Subtract) */}
                        <div className="px-6 py-5">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                                    <Layers size={13} style={{ color: '#06b6d4' }} /> Target Category:
                                </p>
                                <select
                                    value={selectedField}
                                    onChange={(e) => setSelectedField(e.target.value)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 outline-none cursor-pointer"
                                    style={{ background: 'rgba(10,14,30,0.9)', border: '1px solid rgba(6,182,212,0.4)' }}
                                >
                                    {roomsList.map(item => (
                                        <option key={item.key} value={item.key} className="bg-slate-900 text-white">
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-3">
                                <input
                                    type="number"
                                    min="1"
                                    value={points}
                                    onChange={(e) => setPoints(e.target.value)}
                                    placeholder="Enter points (e.g. 5 or 10)"
                                    className="flex-1 px-4 py-3 rounded-xl text-white text-sm font-mono focus:outline-none transition-all"
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
                                    style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}
                                >
                                    <Plus size={16} /> Add
                                </button>
                                <button
                                    onClick={() => handleUpdatePoints('subtract')}
                                    disabled={actionLoading || !points}
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all hover:scale-105 disabled:opacity-40"
                                    style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' }}
                                >
                                    <Minus size={16} /> Subtract
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 pb-5">
                            <button
                                onClick={resetSearch}
                                className="w-full py-2.5 rounded-xl text-sm font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-all"
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
