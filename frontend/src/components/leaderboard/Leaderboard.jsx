import React, { useState, useEffect } from 'react';
import { RefreshCw, Loader, Medal } from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../../services/api';

// Tier thresholds match the backend: Architect ≥50, Builder ≥25, Explorer otherwise
const deriveTier = (score) => {
    if (score >= 50) return 'Architect';
    if (score >= 25) return 'Builder';
    return 'Explorer';
};

// Tier colours match the rest of the app
const TIER_STYLES = {
    Architect: { color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', bgColor: 'rgba(239,68,68,0.1)' },
    Builder: { color: '#F9A24D', borderColor: 'rgba(249,162,77,0.3)', bgColor: 'rgba(249,162,77,0.1)' },
    Explorer: { color: '#34d399', borderColor: 'rgba(52,211,153,0.3)', bgColor: 'rgba(52,211,153,0.1)' },
};

const DEFAULT_TIER = { color: '#6b7280', borderColor: 'rgba(107,114,128,0.3)', bgColor: 'rgba(107,114,128,0.1)' };

const getTierStyle = (tierName) => TIER_STYLES[tierName] || DEFAULT_TIER;

// Medal colours for rank 1/2/3
const MEDAL_COLORS = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' };

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            const res = await API.get('/participants');
            const sorted = [...res.data].sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
            setLeaderboard(sorted);
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLeaderboard(); }, []);

    const nonZeroLeaderboard = leaderboard.filter(p => (p.totalScore || 0) > 0);
    const displayEntries = nonZeroLeaderboard.slice(0, 25);
    const allZeroScore = leaderboard.length > 0 && nonZeroLeaderboard.length === 0;

    return (
        <section id="leaderboard" className="py-20 px-4 bg-[#0a0a1a] overflow-hidden">
            <motion.div
                className="max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <h2
                            className="text-4xl md:text-5xl font-bold uppercase tracking-wider"
                            style={{
                                fontFamily: "'Orbitron', sans-serif",
                                color: '#F9A24D',
                                textShadow: '0 0 30px rgba(249,162,77,0.3)',
                            }}
                        >
                            LIVE LEADERBOARD
                        </h2>
                        <button onClick={fetchLeaderboard} disabled={loading} className="focus:outline-none">
                            <RefreshCw
                                size={24}
                                className={`text-[#F9A24D] ${loading ? 'animate-spin' : 'hover:rotate-180 transition-transform duration-500'}`}
                            />
                        </button>
                    </div>
                    <p className="text-gray-400">Top citizens competing for BlockCity dominance</p>
                </div>

                {/* Table */}
                <div
                    className="rounded-2xl border"
                    style={{
                        backgroundColor: 'rgba(15, 18, 35, 0.8)',
                        borderColor: 'rgba(255,255,255,0.06)',
                        boxShadow: '0 0 60px rgba(0,0,0,0.5)',
                    }}
                >
                    <div className="w-full">
                        {/* Table Header — hidden on mobile */}
                        <div className="hidden md:grid grid-cols-9 gap-4 px-6 py-4 border-b border-white/5">
                            <span className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">Rank</span>
                            <span className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">Name</span>
                            <span className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">Points</span>
                            <span className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-widest text-right">Tier</span>
                        </div>

                        {/* Rows */}
                        <div className="max-h-[500px] overflow-y-auto">
                            {!allZeroScore && displayEntries.map((entry, index) => {
                                const rank = index + 1;
                                const isTopThree = rank <= 3;
                                const medalColor = MEDAL_COLORS[rank];
                                // currentTier may not be stored in Firestore — derive it from score as fallback
                                const tierName = entry.currentTier || deriveTier(entry.totalScore || 0);
                                const tierStyle = getTierStyle(tierName);

                                return (
                                    <div
                                        key={entry.citizenId || entry.id || index}
                                        className="border-b transition-colors hover:bg-white/[0.03]"
                                        style={{
                                            borderColor: isTopThree ? 'rgba(249,162,77,0.15)' : 'rgba(255,255,255,0.03)',
                                            backgroundColor: isTopThree ? 'rgba(249,162,77,0.03)' : 'transparent',
                                        }}
                                    >
                                        {/* Desktop layout */}
                                        <div className="hidden md:grid grid-cols-9 gap-4 items-center px-6 py-4">
                                            {/* Rank — medal icon for top 3 */}
                                            <div className="col-span-2 flex items-center gap-2">
                                                {isTopThree ? (
                                                    <Medal
                                                        size={20}
                                                        style={{ color: medalColor, filter: `drop-shadow(0 0 6px ${medalColor})` }}
                                                    />
                                                ) : null}
                                                <span
                                                    className="text-lg font-bold"
                                                    style={{
                                                        fontFamily: "'Orbitron', sans-serif",
                                                        color: isTopThree ? medalColor : '#6b7280',
                                                        textShadow: isTopThree ? `0 0 15px ${medalColor}60` : 'none',
                                                    }}
                                                >
                                                    #{rank}
                                                </span>
                                            </div>
                                            <div className="col-span-3">
                                                <span className={`font-semibold ${isTopThree ? 'text-white' : 'text-gray-300'}`}>
                                                    {entry.name || entry.citizenId || '—'}
                                                </span>
                                            </div>
                                            <div className="col-span-2">
                                                <span className="font-bold" style={{ fontFamily: "'Orbitron', sans-serif", color: '#F9A24D', fontSize: '0.9rem' }}>
                                                    {(entry.totalScore || 0).toLocaleString()}
                                                </span>
                                                <span className="text-gray-500 text-xs ml-1">pts</span>
                                            </div>
                                            <div className="col-span-2 text-right">
                                                <span className="px-3 py-1 rounded-full text-xs font-bold border" style={{ color: tierStyle.color, borderColor: tierStyle.borderColor, backgroundColor: tierStyle.bgColor }}>
                                                    {tierName}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Mobile layout */}
                                        <div className="flex md:hidden items-center gap-3 px-4 py-3">
                                            {/* Rank */}
                                            <div className="flex items-center gap-1 w-10 flex-shrink-0">
                                                {isTopThree ? (
                                                    <Medal size={16} style={{ color: medalColor, filter: `drop-shadow(0 0 4px ${medalColor})` }} />
                                                ) : null}
                                                <span
                                                    className="text-sm font-bold"
                                                    style={{
                                                        fontFamily: "'Orbitron', sans-serif",
                                                        color: isTopThree ? medalColor : '#6b7280',
                                                    }}
                                                >
                                                    #{rank}
                                                </span>
                                            </div>
                                            {/* Name */}
                                            <div className="flex-1 min-w-0">
                                                <span className={`font-semibold text-sm truncate block ${isTopThree ? 'text-white' : 'text-gray-300'}`}>
                                                    {entry.name || entry.citizenId || '—'}
                                                </span>
                                            </div>
                                            {/* Points */}
                                            <div className="flex-shrink-0 text-right">
                                                <span className="font-bold text-sm" style={{ fontFamily: "'Orbitron', sans-serif", color: '#F9A24D' }}>
                                                    {(entry.totalScore || 0).toLocaleString()}
                                                </span>
                                                <span className="text-gray-500 text-xs ml-0.5">pts</span>
                                            </div>
                                            {/* Tier */}
                                            <div className="flex-shrink-0">
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border" style={{ color: tierStyle.color, borderColor: tierStyle.borderColor, backgroundColor: tierStyle.bgColor }}>
                                                    {tierName}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader size={48} className="text-[#F9A24D] animate-spin" />
                    </div>
                ) : allZeroScore ? (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-lg text-white" style={{ fontFamily: "'Orbitron', sans-serif", color: '#F9A24D' }}>
                            Complete missions to win!
                        </p>
                        <p className="text-sm mt-3 text-gray-400">
                            The leaderboard is waiting for the first points to be scored.
                        </p>
                    </div>
                ) : leaderboard.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>No entries yet</p>
                        <p className="text-sm mt-2">The competition hasn't started!</p>
                    </div>
                ) : null}

            </motion.div>
        </section>
    );
};

export default Leaderboard;
