import React, { useState } from 'react';
import { Search, Loader, Zap } from 'lucide-react';
import API from '../../services/api';

const BonusPointsModal = ({ onClose }) => {
    const [citizenId, setCitizenId] = useState('');
    const [participant, setParticipant] = useState(null);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [points, setPoints] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!citizenId.trim()) return;

        setLoading(true);
        setError('');
        setSuccess('');
        setParticipant(null);

        try {
            const res = await API.get(`/participants/${citizenId.trim()}`);
            if (res.data) {
                setParticipant(res.data);
            } else {
                setError('User does not exist, enter correct citizen id');
            }
        } catch (err) {
            setError('User does not exist, enter correct citizen id');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePoints = async (type) => { // type: 'add' or 'subtract'
        if (!points || isNaN(points) || Number(points) <= 0) {
            setError('Please enter a valid positive number');
            return;
        }

        setActionLoading(true);
        setError('');
        setSuccess('');

        try {
            const currentBonus = participant.bonusScore || 0;
            const change = Number(points);
            const newBonus = type === 'add' ? currentBonus + change : currentBonus - change;

            const res = await API.put(`/participants/${participant.id}/bonus`, {
                bonusScore: newBonus
            });

            setSuccess(`Successfully ${type === 'add' ? 'added' : 'subtracted'} ${change} points. New bonus: ${newBonus}`);
            setParticipant({ ...participant, bonusScore: newBonus });
            setPoints('');
        } catch (err) {
            setError('Failed to update bonus points');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="bg-[#0f1428] border border-cyan-500/30 w-full max-w-md rounded-2xl p-6 shadow-[0_0_40px_rgba(6,182,212,0.15)]">

                <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                        <Zap size={20} className="text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-widest uppercase font-['Orbitron']">
                            Bonus Points
                        </h2>
                        <p className="text-xs text-gray-400 font-['Rajdhani'] uppercase tracking-wider">
                            Manage citizen bonus scores
                        </p>
                    </div>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-6 relative">
                    <input
                        type="text"
                        value={citizenId}
                        onChange={(e) => setCitizenId(e.target.value.toUpperCase())}
                        placeholder="ENTER CITIZEN ID (e.g. UCE-1234)"
                        className="w-full bg-[#0a0e1e] border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors uppercase font-['Rajdhani'] tracking-wider text-sm pr-12"
                    />
                    <button
                        type="submit"
                        disabled={loading || !citizenId.trim()}
                        className="absolute right-2 top-2 bottom-2 aspect-square bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center hover:bg-cyan-500/20 disabled:opacity-50 transition-colors"
                    >
                        {loading ? <Loader size={16} className="animate-spin" /> : <Search size={16} />}
                    </button>
                </form>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-sm p-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm p-3 rounded-lg mb-4 text-center">
                        {success}
                    </div>
                )}

                {/* Participant Details & Action Form */}
                {participant && (
                    <div className="bg-[#0a0e1e]/50 border border-gray-800 rounded-xl p-4 animate-fadeIn">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Found Citizen</p>
                                <p className="text-lg font-bold text-white font-['Orbitron']">{participant.name}</p>
                                <p className="text-sm text-gray-400">{participant.id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Current Bonus</p>
                                <p className="text-xl font-bold text-cyan-400">{participant.bonusScore || 0}</p>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-gray-800">
                            <input
                                type="number"
                                value={points}
                                onChange={(e) => setPoints(e.target.value)}
                                placeholder="ENTER POINTS TO ADD/SUBTRACT"
                                className="w-full bg-[#0a0e1e] border border-gray-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors font-['Rajdhani'] text-sm"
                            />

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleUpdatePoints('add')}
                                    disabled={actionLoading || !points}
                                    className="flex-1 bg-green-500/10 text-green-400 border border-green-500/30 py-2.5 rounded-lg font-bold text-sm tracking-wider uppercase hover:bg-green-500/20 disabled:opacity-50 transition-colors"
                                >
                                    + Add
                                </button>
                                <button
                                    onClick={() => handleUpdatePoints('subtract')}
                                    disabled={actionLoading || !points}
                                    className="flex-1 bg-red-500/10 text-red-400 border border-red-500/30 py-2.5 rounded-lg font-bold text-sm tracking-wider uppercase hover:bg-red-500/20 disabled:opacity-50 transition-colors"
                                >
                                    - Subtract
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="w-full mt-6 py-3 border border-gray-700 text-gray-400 rounded-xl hover:bg-gray-800 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default BonusPointsModal;
