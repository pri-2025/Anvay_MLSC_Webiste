import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, GitBranch, ExternalLink, Lock, CheckCircle, Zap } from 'lucide-react';
import { useParticipant } from '../../context/ParticipantContext';

const ROOM_COLOR = '#a78bfa';
const GITHUB_LINK = 'https://github.com/Dkhatke/BlockCity_Hub';

const TABS = [
    { id: 'challenge', label: 'Challenge', icon: Zap },
    { id: 'gitrepo', label: 'Git Repo', icon: GitBranch },
];

const FinalIntegrationRoom = () => {
    const navigate = useNavigate();
    const { participant, rooms, roomsCompleted } = useParticipant();
    const [tab, setTab] = useState('challenge');
    const allRoomsComplete = roomsCompleted >= 5;

    useEffect(() => {
        if (!participant) navigate('/participant');
    }, [participant, navigate]);

    if (!participant) return null;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap');
                .room-section-label { font-family: 'Orbitron', sans-serif; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; }
            `}</style>

            <div className="relative min-h-screen">

                {/* ── Background ───────────────────────────────────── */}
                <div className="fixed inset-0 z-0"
                    style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0d0820 50%, #0a0a1a 100%)' }} />
                <div className="fixed inset-0 z-0 opacity-30"
                    style={{ background: `radial-gradient(ellipse at 30% 20%, ${ROOM_COLOR}18 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, ${ROOM_COLOR}10 0%, transparent 60%)` }} />

                <div className="relative z-10 min-h-screen pb-16">

                    {/* ── Header ───────────────────────────────────── */}
                    <div className="px-4 pt-6 pb-8 border-b" style={{ borderColor: `${ROOM_COLOR}20` }}>
                        <div className="max-w-3xl mx-auto">
                            <button onClick={() => navigate('/participant/dashboard')}
                                className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-sm mb-6"
                                style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                                <ChevronLeft size={16} /> Back to Dashboard
                            </button>

                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[9px] font-bold tracking-[0.35em] uppercase px-3 py-1.5 rounded-full"
                                    style={{ background: `${ROOM_COLOR}18`, border: `1px solid ${ROOM_COLOR}50`, color: ROOM_COLOR, fontFamily: "'Orbitron', sans-serif" }}>
                                    Room 6
                                </span>
                                <span className="text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                                    style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399', fontFamily: "'Orbitron', sans-serif" }}>
                                    Final Integration
                                </span>
                            </div>

                            <div className="flex items-end gap-4">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${ROOM_COLOR}15`, border: `2px solid ${ROOM_COLOR}50`, boxShadow: `0 0 30px ${ROOM_COLOR}25` }}>
                                    <GitBranch size={28} style={{ color: ROOM_COLOR }} />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-none mb-1"
                                        style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.03em', textShadow: `0 0 40px ${ROOM_COLOR}20` }}>
                                        BlockCity
                                    </h1>
                                    <p className="text-base font-semibold uppercase tracking-widest"
                                        style={{ color: `${ROOM_COLOR}cc`, fontFamily: "'Rajdhani', sans-serif" }}>
                                        Final Integration Challenge
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto px-4 mt-6 space-y-6">

                        {/* ── Tab switcher ─────────────────────────── */}
                        <div
                            className="flex gap-1 p-1 rounded-xl"
                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            {TABS.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setTab(id)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
                                    style={{
                                        background: tab === id ? `${ROOM_COLOR}18` : 'transparent',
                                        color: tab === id ? ROOM_COLOR : '#6b7280',
                                        border: tab === id ? `1px solid ${ROOM_COLOR}30` : '1px solid transparent',
                                        fontFamily: "'Rajdhani', sans-serif",
                                        fontWeight: 700,
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    <Icon size={14} />
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* ══════════════ TAB: CHALLENGE ══════════════ */}
                        {tab === 'challenge' && (
                            <>
                                {/* About */}
                                <section>
                                    <p className="room-section-label mb-3" style={{ color: ROOM_COLOR }}>The Final Challenge</p>
                                    <div className="rounded-2xl p-6"
                                        style={{ background: 'rgba(10,14,30,0.8)', border: `1px solid ${ROOM_COLOR}18`, backdropFilter: 'blur(12px)' }}>
                                        <p className="text-gray-300 leading-relaxed"
                                            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '16px' }}>
                                            You have built the laws, minted the currency, issued the identities, governed the council, and wired up the frontend. Now it's time to integrate them all into one cohesive BlockCity application.
                                        </p>
                                        <p className="text-gray-400 leading-relaxed mt-3"
                                            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '15px' }}>
                                            Fork the GitHub repository, connect all five contracts through a unified frontend, and demonstrate the complete BlockCity ecosystem working together. Your submission will be reviewed by the admin team.
                                        </p>
                                    </div>
                                </section>

                                {/* What to build */}
                                <section>
                                    <p className="room-section-label mb-3" style={{ color: ROOM_COLOR }}>What You Need to Build</p>
                                    <div className="space-y-2">
                                        {[
                                            { num: '01', text: 'Connect all 5 room contracts to a single Ethers.js frontend' },
                                            { num: '02', text: 'Implement wallet connection via MetaMask' },
                                            { num: '03', text: 'Display live on-chain data from each contract' },
                                            { num: '04', text: 'Allow at least one write interaction per contract' },
                                            { num: '05', text: 'Deploy your frontend and submit the live link' },
                                        ].map(({ num, text }) => (
                                            <div key={num} className="flex items-start gap-4 rounded-xl px-4 py-3"
                                                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                <span className="text-xs font-bold flex-shrink-0 mt-0.5"
                                                    style={{ color: ROOM_COLOR, fontFamily: "'Orbitron', sans-serif" }}>
                                                    {num}
                                                </span>
                                                <p className="text-gray-300 text-sm"
                                                    style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '15px' }}>
                                                    {text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Scoring */}
                                <section>
                                    <div className="rounded-xl px-5 py-4"
                                        style={{ background: `${ROOM_COLOR}08`, border: `1px solid ${ROOM_COLOR}25` }}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Zap size={14} style={{ color: ROOM_COLOR }} />
                                            <p className="text-[10px] uppercase tracking-widest font-bold"
                                                style={{ color: ROOM_COLOR, fontFamily: "'Orbitron', sans-serif" }}>
                                                Scoring
                                            </p>
                                        </div>
                                        <p className="text-gray-400 text-sm"
                                            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '15px' }}>
                                            This challenge is evaluated and scored by the admin team. Points are awarded based on completeness, quality, and creativity of your integration. Top submissions may receive special recognition.
                                        </p>
                                    </div>
                                </section>
                            </>
                        )}

                        {/* ══════════════ TAB: GIT REPO ══════════════ */}
                        {tab === 'gitrepo' && (
                            <section>
                                <p className="room-section-label mb-3" style={{ color: ROOM_COLOR }}>GitHub Repository</p>

                                {allRoomsComplete ? (
                                    <>
                                        <a href={GITHUB_LINK} target="_blank" rel="noreferrer"
                                            className="flex items-center justify-between px-5 py-4 rounded-xl transition-all hover:scale-[1.01]"
                                            style={{ background: `linear-gradient(135deg, ${ROOM_COLOR}15, rgba(10,14,30,0.85))`, border: `1px solid ${ROOM_COLOR}40`, backdropFilter: 'blur(10px)', boxShadow: `0 0 25px ${ROOM_COLOR}15` }}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                                    style={{ background: `${ROOM_COLOR}20`, border: `1px solid ${ROOM_COLOR}45` }}>
                                                    <GitBranch size={18} style={{ color: ROOM_COLOR }} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white"
                                                        style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '12px', letterSpacing: '0.05em' }}>
                                                        BlockCity_Hub
                                                    </p>
                                                    <p className="text-gray-500 text-xs mt-0.5 font-mono">github.com/Dkhatke/BlockCity_Hub</p>
                                                </div>
                                            </div>
                                            <ExternalLink size={15} style={{ color: ROOM_COLOR, flexShrink: 0 }} />
                                        </a>

                                        <div className="mt-4 rounded-xl px-5 py-4 space-y-3"
                                            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500"
                                                style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                                How to submit
                                            </p>
                                            {[
                                                'Fork the repository to your own GitHub account',
                                                'Build your integration following the challenge requirements',
                                                'Deploy your frontend (Vercel, Netlify, or GitHub Pages)',
                                                'Share your fork link + live URL with the admin team',
                                            ].map((step, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold mt-0.5"
                                                        style={{ background: `${ROOM_COLOR}20`, color: ROOM_COLOR, border: `1px solid ${ROOM_COLOR}40`, fontFamily: "'Orbitron', sans-serif" }}>
                                                        {i + 1}
                                                    </span>
                                                    <p className="text-gray-400 text-sm"
                                                        style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '14px' }}>
                                                        {step}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    /* Locked */
                                    <div className="rounded-xl px-5 py-5"
                                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                                <Lock size={18} className="text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-500"
                                                    style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '12px', letterSpacing: '0.05em' }}>
                                                    Repository Locked
                                                </p>
                                                <p className="text-gray-700 text-xs mt-0.5">Complete all 5 rooms to unlock</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] text-gray-600 uppercase tracking-widest">Room completion</span>
                                                <span className="text-[10px] font-bold text-gray-500">{roomsCompleted}/5</span>
                                            </div>
                                            <div className="h-1.5 rounded-full overflow-hidden"
                                                style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                <div className="h-full rounded-full transition-all duration-700"
                                                    style={{ width: `${(roomsCompleted / 5) * 100}%`, background: `linear-gradient(90deg, ${ROOM_COLOR}, ${ROOM_COLOR}80)` }} />
                                            </div>
                                            <div className="flex gap-1.5 mt-3 flex-wrap">
                                                {(rooms || []).map((room, i) => (
                                                    <div key={i} className="flex items-center gap-1 text-[9px] px-2 py-1 rounded-full"
                                                        style={{
                                                            background: room.completed ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.03)',
                                                            border: room.completed ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(255,255,255,0.05)',
                                                            color: room.completed ? '#34d399' : '#4b5563',
                                                            fontFamily: "'Rajdhani', sans-serif",
                                                        }}>
                                                        {room.completed ? <CheckCircle size={9} /> : <Lock size={9} />}
                                                        {room.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default FinalIntegrationRoom;