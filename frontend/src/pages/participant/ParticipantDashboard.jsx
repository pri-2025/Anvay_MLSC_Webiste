import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trophy, Target, TrendingUp, MapPin, LogOut, CheckCircle, User } from 'lucide-react';
import { useParticipant } from '../../context/ParticipantContext';

// ─── Constants ────────────────────────────────────────────────────────────────
const TIER_ORDER = ['Explorer', 'Builder', 'Architect'];
const TIER_COLORS = { Explorer: '#34d399', Builder: '#F9A24D', Architect: '#ef4444', '—': '#6b7280' };
const ROLE_COLORS = { Auditor: '#06b6d4', Miner: '#f59e0b', Investor: '#10b981', Governor: '#8b5cf6', Ambassador: '#f472b6', '—': '#6b7280' };
const ROOM_ICONS = { 'Law Foundry': '⚖️', 'Treasury Mint': '💼', 'Identity Bureau': '🎨', 'Council Chamber': '🏛️', 'Control Center': '🔧' };

// 5 rooms × 10 base pts + 5 rooms × 5 bonus pts = 75 pts max
const MAX_SCORE = 75;
const getOverallProgress = (score) => Math.min(100, Math.round((score / MAX_SCORE) * 100));

// Tier thresholds based on 75pt scale
// Explorer: 0–24, Builder: 25–49, Architect: 50–75
const deriveTier = (score) => {
    if (score >= 50) return 'Architect';
    if (score >= 25) return 'Builder';
    return 'Explorer';
};

const ROOM_ROUTE_MAP = {
    'Law Foundry': 'room1',
    'Treasury Mint': 'room2',
    'Identity Bureau': 'room3',
    'Council Chamber': 'room4',
    'Control Center': 'room5',
};

// ─── StatCard ─────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, iconColor, valueColor }) => (
    <div className="rounded-2xl p-5 flex flex-col gap-3"
        style={{ background: 'rgba(15,52,96,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2">
            <Icon size={18} style={{ color: iconColor }} />
            <span className="text-xs text-gray-400 uppercase tracking-widest">{label}</span>
        </div>
        <p className="text-3xl font-heading font-bold" style={{ color: valueColor || '#fff' }}>{value}</p>
    </div>
);

// ─── RoomCard ─────────────────────────────────────────────────────────────────
const RoomCard = ({ room }) => {
    const navigate = useNavigate();
    const isCompleted = !!room.completed;
    const accentColor = isCompleted ? '#34d399' : '#F9A24D';
    const borderColor = isCompleted ? 'rgba(52,211,153,0.3)' : 'rgba(249,162,77,0.25)';
    const roomScore = room.score ?? room.points ?? null;

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
                        {isCompleted && roomScore !== null && (
                            <p className="text-xs font-bold" style={{ color: '#34d399' }}>+{roomScore} pts earned</p>
                        )}
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

            <p className="text-gray-400 text-xs mb-4 leading-relaxed">{room.description}</p>

            {isCompleted ? (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <CheckCircle size={14} style={{ color: '#34d399' }} />
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

// ─── ScoreProgressBar ─────────────────────────────────────────────────────────
const ScoreProgressBar = ({ totalScore, currentTier }) => {
    const activeTier = (currentTier && currentTier !== '—') ? currentTier : deriveTier(totalScore);
    const tierColor = TIER_COLORS[activeTier] || '#6b7280';
    const pct = getOverallProgress(totalScore);
    const ptsLeft = Math.max(0, MAX_SCORE - totalScore);

    // Milestone positions as % of 75
    const milestones = [
        { label: 'Explorer', score: 0, tier: 'Explorer' },
        { label: 'Builder', score: 25, tier: 'Builder' },
        { label: 'Architect', score: 50, tier: 'Architect' },
        { label: 'Max', score: 75, tier: null },
    ];

    return (
        <div className="rounded-2xl p-5"
            style={{ background: 'rgba(15,52,96,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>

            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-400 uppercase tracking-widest">Score Progress</p>
                <div className="flex items-center gap-2">
                    <span
                        className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase"
                        style={{ background: `${tierColor}20`, color: tierColor, border: `1px solid ${tierColor}40` }}
                    >
                        {activeTier}
                    </span>
                    <span className="text-xs font-bold" style={{ color: tierColor }}>
                        {totalScore} / {MAX_SCORE} pts
                    </span>
                </div>
            </div>

            {/* Hint text */}
            <p className="text-[10px] text-gray-600 mb-3">
                {ptsLeft === 0
                    ? '🏆 Maximum score achieved!'
                    : `${ptsLeft} pts remaining to max score`}
            </p>

            {/* Bar + milestone markers */}
            <div className="relative">
                {/* Milestone tick marks above bar */}
                <div className="relative h-4 mb-1">
                    {milestones.map(({ score, tier, label }) => {
                        const pos = (score / MAX_SCORE) * 100;
                        const reached = totalScore >= score;
                        const color = tier ? TIER_COLORS[tier] : '#6b7280';
                        return (
                            <div
                                key={label}
                                className="absolute flex flex-col items-center"
                                style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
                            >
                                <div
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                        background: reached ? color : '#374151',
                                        boxShadow: reached ? `0 0 5px ${color}` : 'none',
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* The bar itself */}
                <div className="h-3 rounded-full overflow-hidden relative"
                    style={{ background: 'rgba(255,255,255,0.06)' }}>

                    {/* Segment colouring: green → orange → red as tiers fill */}
                    <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                            width: `${pct}%`,
                            background: pct >= 67
                                ? 'linear-gradient(90deg,#34d399,#F9A24D,#ef4444)'
                                : pct >= 33
                                    ? 'linear-gradient(90deg,#34d399,#F9A24D)'
                                    : 'linear-gradient(90deg,#34d399,#34d39999)',
                            boxShadow: `0 0 12px ${tierColor}60`,
                        }}
                    />

                    {/* Milestone divider lines */}
                    {milestones.slice(1, -1).map(({ score, tier }) => (
                        <div
                            key={score}
                            className="absolute top-0 bottom-0 w-px"
                            style={{
                                left: `${(score / MAX_SCORE) * 100}%`,
                                background: 'rgba(255,255,255,0.12)',
                            }}
                        />
                    ))}
                </div>

                {/* Labels below bar */}
                <div className="relative h-5 mt-1">
                    {milestones.map(({ score, tier, label }) => {
                        const pos = (score / MAX_SCORE) * 100;
                        const reached = totalScore >= score;
                        const color = tier ? TIER_COLORS[tier] : '#6b7280';
                        const align = score === 0 ? 'left-0 translate-x-0' : score === MAX_SCORE ? 'right-0 translate-x-0' : '';
                        return (
                            <div
                                key={label}
                                className={`absolute flex flex-col items-center ${align}`}
                                style={
                                    score > 0 && score < MAX_SCORE
                                        ? { left: `${pos}%`, transform: 'translateX(-50%)' }
                                        : {}
                                }
                            >
                                <span
                                    className="text-[9px] font-bold uppercase tracking-wide whitespace-nowrap"
                                    style={{ color: reached ? color : '#374151' }}
                                >
                                    {score === 0 ? label : `${score}+`}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// ─── ParticipantDashboard ─────────────────────────────────────────────────────
const ParticipantDashboard = () => {
    const navigate = useNavigate();
    const {
        participant, citizenId, loading, logout,
        totalScore, roomsCompleted, currentTier,
        currentRoom, role, rooms, name, team,
    } = useParticipant();

    useEffect(() => {
        if (!loading && !participant) navigate('/participant');
    }, [participant, loading, navigate]);

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

    const activeTier = (currentTier && currentTier !== '—') ? currentTier : deriveTier(totalScore);
    const tierColor = TIER_COLORS[activeTier] || '#6b7280';
    const roleColor = ROLE_COLORS[role] || '#6b7280';

    return (
        <div className="min-h-screen pb-16" style={{ background: '#0a0a1a' }}>

            {/* ── Top bar ────────────────────────────────────────── */}
            <div className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
                style={{ background: 'rgba(10,10,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#F9A24D' }}>
                    ANVAYA — BlockCity Edition
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
                    <button onClick={() => { logout(); navigate('/participant'); }}
                        className="p-1.5 rounded-lg transition-colors hover:bg-white/5">
                        <LogOut size={15} className="text-gray-500 hover:text-white" />
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 mt-8 space-y-8">

                {/* ── Greeting ───────────────────────────────────── */}
                <div>
                    <h1 className="text-2xl font-heading font-bold text-white">
                        Welcome back, <span style={{ color: '#F9A24D' }}>{name || citizenId}</span>
                    </h1>
                    {team && <p className="text-gray-500 text-sm mt-1">🏘️ {team}</p>}
                </div>

                {/* ── Stat cards ─────────────────────────────────── */}
                <div className="grid grid-cols-2 gap-4">
                    <StatCard icon={Trophy} label="Total Score" value={totalScore} iconColor="#F9A24D" valueColor="#F9A24D" />
                    <StatCard icon={Target} label="Rooms Done" value={`${roomsCompleted}/5`} iconColor="#34d399" />
                    <StatCard icon={TrendingUp} label="Current Tier" value={activeTier} iconColor="#c084fc" valueColor={tierColor} />
                    <StatCard icon={MapPin} label="Current Room" value={currentRoom} iconColor="#06b6d4" />
                </div>

                {/* ── Score progress bar ─────────────────────────── */}
                <ScoreProgressBar totalScore={totalScore} currentTier={currentTier} />

                {/* ── Room Tracker ───────────────────────────────── */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-heading font-bold text-white">Room Tracker</h2>
                        <span className="text-xs text-gray-500">{roomsCompleted} of 5 complete</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {rooms.map((room, i) => <RoomCard key={i} room={room} />)}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ParticipantDashboard;