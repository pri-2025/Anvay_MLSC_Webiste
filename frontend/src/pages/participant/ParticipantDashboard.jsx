import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trophy, Target, TrendingUp, MapPin, LogOut, CheckCircle, User } from 'lucide-react';
import { useParticipant } from '../../context/ParticipantContext';

const TIER_ORDER = ['Explorer', 'Builder', 'Architect'];
const TIER_COLORS = { Explorer: '#34d399', Builder: '#F9A24D', Architect: '#ef4444', '—': '#6b7280' };
const ROLE_COLORS = { Auditor: '#06b6d4', Miner: '#f59e0b', Investor: '#10b981', Governor: '#8b5cf6', Ambassador: '#f472b6', '—': '#6b7280' };
const ROOM_ICONS = { 'Law Foundry': '⚖️', 'Treasury Mint': '💼', 'Identity Bureau': '🎨', 'Council Chamber': '🏛️', 'Control Center': '🔧' };

const getTierPercent = (tier) => {
    const idx = TIER_ORDER.indexOf(tier);
    return idx === -1 ? 0 : Math.round(((idx + 1) / TIER_ORDER.length) * 100);
};

const StatCard = ({ icon: Icon, label, value, iconColor, valueColor }) => (
    <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: 'rgba(15,52,96,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2">
            <Icon size={18} style={{ color: iconColor }} />
            <span className="text-xs text-gray-400 uppercase tracking-widest">{label}</span>
        </div>
        <p className="text-3xl font-heading font-bold" style={{ color: valueColor || '#fff' }}>{value}</p>
    </div>
);

const ROOM_ROUTE_MAP = {
    'Law Foundry': 'room1',
    'Treasury Mint': 'room2',
    'Identity Bureau': 'room3',
    'Council Chamber': 'room4',
    'Control Center': 'room5',
};

const RoomCard = ({ room }) => {
    const navigate = useNavigate();
    // completed = done; anything else = accessible (no sequential lock)
    const isCompleted = !!room.completed;
    const accentColor = isCompleted ? '#34d399' : '#F9A24D';
    const borderColor = isCompleted ? 'rgba(52,211,153,0.3)' : 'rgba(249,162,77,0.25)';
    const progress = room.progress ?? (isCompleted ? 100 : 0);

    const handleAccess = () => {
        const routeId = ROOM_ROUTE_MAP[room.name];
        if (routeId) navigate(`/participant/room/${routeId}`);
    };

    return (
        <div
            className="rounded-2xl p-5 transition-all hover:scale-[1.01]"
            style={{ background: 'rgba(15,52,96,0.4)', border: `1px solid ${borderColor}` }}
        >
            <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-xl">{ROOM_ICONS[room.name] || '🏛️'}</span>
                    <div>
                        <h3 className="text-base font-heading font-bold text-white">{room.name}</h3>
                        <p className="text-xs text-gray-500">{room.points ?? 100} Points</p>
                    </div>
                </div>
                <span
                    className="text-[9px] font-bold tracking-wider px-2 py-1 rounded-full flex-shrink-0"
                    style={{
                        background: isCompleted ? 'rgba(52,211,153,0.12)' : 'rgba(249,162,77,0.1)',
                        color: accentColor,
                        border: `1px solid ${borderColor}`,
                    }}
                >
                    {isCompleted ? 'COMPLETED' : 'AVAILABLE'}
                </span>
            </div>

            <p className="text-gray-400 text-xs mb-3 leading-relaxed">{room.description}</p>

            <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-gray-500">Progress</span>
                <span className="text-[10px] font-bold text-white">{progress}/{room.maxProgress ?? 100}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                        width: `${Math.min(progress, 100)}%`,
                        background: isCompleted
                            ? 'linear-gradient(90deg,#34d399,#06b6d4)'
                            : 'linear-gradient(90deg,#F9A24D,#ff6b35)',
                        boxShadow: `0 0 8px ${accentColor}40`,
                    }}
                />
            </div>

            {isCompleted ? (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <CheckCircle size={12} style={{ color: '#34d399' }} />
                        <span className="text-xs font-bold" style={{ color: '#34d399' }}>Completed</span>
                    </div>
                    <button
                        onClick={handleAccess}
                        className="text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                        style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }}
                    >
                        Review Room
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleAccess}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
                    style={{
                        background: 'linear-gradient(135deg,#F9A24D,#ff6b35)',
                        color: '#0a0a1a',
                        boxShadow: '0 0 15px rgba(249,162,77,0.25)',
                    }}
                >
                    Access Room →
                </button>
            )}
        </div>
    );
};

const ParticipantDashboard = () => {
    const navigate = useNavigate();
    const { participant, citizenId, loading, logout, totalScore, roomsCompleted, currentTier, currentRoom, role, badges, rooms, name, team } = useParticipant();

    // ✅ navigate inside useEffect — not during render
    useEffect(() => {
        if (!loading && !participant) navigate('/participant');
    }, [participant, loading, navigate]);

    // Loading spinner
    if (loading || !participant) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a1a' }}>
                <div className="text-center">
                    <div className="w-8 h-8 rounded-full border-2 animate-spin mx-auto mb-3"
                        style={{ borderColor: '#F9A24D', borderTopColor: 'transparent' }} />
                    <p className="text-gray-500 text-sm">Loading your city pass...</p>
                </div>
            </div>
        );
    }

    const tierPercent = getTierPercent(currentTier);
    const tierColor = TIER_COLORS[currentTier] || '#6b7280';
    const roleColor = ROLE_COLORS[role] || '#6b7280';

    return (
        <div className="min-h-screen pb-16" style={{ background: '#0a0a1a' }}>
            {/* Top bar */}
            <div className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
                style={{ background: 'rgba(10,10,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#F9A24D' }}>
                    ANVAY — BlockCity Edition
                </p>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-mono hidden sm:block" style={{ color: '#06b6d4' }}>{citizenId}</span>
                    <div className="flex items-center gap-1.5">
                        <Trophy size={14} style={{ color: '#F9A24D' }} />
                        <span className="text-sm font-heading font-bold text-white">{totalScore}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase"
                        style={{ background: `${roleColor}18`, color: roleColor, border: `1px solid ${roleColor}40` }}>
                        {role}
                    </span>
                    <Link to="/participant/profile" className="p-1.5 rounded-lg transition-colors hover:bg-white/5">
                        <User size={15} className="text-gray-500 hover:text-white" />
                    </Link>
                    <button onClick={() => { logout(); navigate('/participant'); }} className="p-1.5 rounded-lg transition-colors hover:bg-white/5">
                        <LogOut size={15} className="text-gray-500 hover:text-white" />
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 mt-8 space-y-8">
                {/* Greeting */}
                <div>
                    <h1 className="text-2xl font-heading font-bold text-white">
                        Welcome back, <span style={{ color: '#F9A24D' }}>{name || citizenId}</span>
                    </h1>
                    {team && <p className="text-gray-500 text-sm mt-1">🏘️ {team}</p>}
                </div>

                {/* 4 stat cards */}
                <div className="grid grid-cols-2 gap-4">
                    <StatCard icon={Trophy} label="Total Score" value={totalScore} iconColor="#F9A24D" valueColor="#F9A24D" />
                    <StatCard icon={Target} label="Rooms Completed" value={`${roomsCompleted}/5`} iconColor="#34d399" />
                    <StatCard icon={TrendingUp} label="Current Tier" value={currentTier} iconColor="#c084fc" valueColor={tierColor} />
                    <StatCard icon={MapPin} label="Current Room" value={currentRoom} iconColor="#06b6d4" />
                </div>

                {/* Tier progress */}
                <div className="rounded-2xl p-5" style={{ background: 'rgba(15,52,96,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Tier Progress</p>
                        <span className="text-xs font-bold" style={{ color: tierColor }}>{tierPercent}%</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase mb-3 inline-block"
                        style={{ background: `${tierColor}20`, color: tierColor, border: `1px solid ${tierColor}40` }}>
                        {currentTier}
                    </span>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-full rounded-full transition-all duration-1000" style={{
                            width: `${tierPercent}%`,
                            background: `linear-gradient(90deg, ${tierColor}, ${tierColor}99)`,
                            boxShadow: `0 0 10px ${tierColor}50`,
                        }} />
                    </div>
                    <div className="flex justify-between mt-2">
                        {TIER_ORDER.map(t => (
                            <span key={t} className="text-[9px] uppercase tracking-widest font-bold"
                                style={{ color: TIER_ORDER.indexOf(t) <= TIER_ORDER.indexOf(currentTier) ? TIER_COLORS[t] : '#374151' }}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Badges */}
                {badges.length > 0 && (
                    <div>
                        <h2 className="text-lg font-heading font-bold text-white mb-4">Your Badges</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {badges.map((badge, i) => (
                                <div key={i} className="rounded-2xl p-5 flex flex-col items-center justify-center gap-3 text-center"
                                    style={{ background: 'linear-gradient(135deg,rgba(249,162,77,0.1),rgba(255,107,53,0.06))', border: '1px solid rgba(249,162,77,0.2)' }}>
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                                        style={{ background: 'rgba(249,162,77,0.15)', border: '2px solid rgba(249,162,77,0.3)' }}>
                                        <span className="text-2xl">{badge.icon || '🏅'}</span>
                                    </div>
                                    <p className="text-sm font-heading font-bold text-white">{badge.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Room Tracker */}
                <div>
                    <h2 className="text-lg font-heading font-bold text-white mb-4">Room Tracker</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {rooms.map((room, i) => <RoomCard key={i} room={room} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParticipantDashboard;