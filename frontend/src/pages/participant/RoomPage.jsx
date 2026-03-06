import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft, FileText, ExternalLink, CheckCircle,
    Lock, Eye, EyeOff, Loader, AlertCircle, Gift,
    Palette, Landmark, Wrench, Scale, Briefcase,
    Trophy, Star, Sparkles, ArrowRight
} from 'lucide-react';
import { useParticipant } from '../../context/ParticipantContext';
import API from '../../services/api';

// ─── Room Data ────────────────────────────────────────────────────────────────
const ROOM_DATA = {
    room1: {
        id: 'room1',
        name: 'Law Foundry',
        subtitle: 'Smart Contract Basics & Solidity',
        icon: Scale,
        color: '#F9A24D',
        bg: '/room1.jpeg',
        about: `The Law Foundry is where BlockCity's legal backbone is written — in code. Smart contracts are self-executing programs that live on the blockchain. No lawyers, no middlemen. Once deployed, they run exactly as written, forever. In this room you will write your first Solidity contract, understand how ownership works on-chain, and learn why a single modifier can protect an entire system from misuse.`,
        docLink: 'https://docs.google.com/document/d/10AWgYaTumstXQezTeBq4s3Bau_iTAitcZvKU_GRDJnE/edit?usp=sharing',
        rewardLink: 'https://docs.google.com/document/d/1cLK6NeWhCf2992JW6aA6TEU4_dr_PvIu_jnjL7FHxq0/edit?usp=sharing',
        platformLink: 'https://remix.ethereum.org/?nomobileredirect',
        platformLabel: 'Open Remix IDE',
        entryPhrase: 'modifier',
        password: 'SmartContract',
    },
    room2: {
        id: 'room2',
        name: 'Treasury Mint',
        subtitle: 'ERC-20 Tokens & DeFi',
        icon: Briefcase,
        color: '#f59e0b',
        bg: '/room2.jpeg',
        about: `The Treasury Mint is where BlockCity's economy is born. Every city needs currency — and in Web3, you can mint your own in under 50 lines of code. ERC-20 is the universal token standard that makes all fungible tokens interoperable across wallets, exchanges, and dApps. You will deploy a live token contract, mint supply to your wallet, and transfer tokens to teammates — all on a real testnet.`,
        docLink: 'https://docs.google.com/document/d/1rDU63mRj_yq9IERtb-DDr2FPSSd37yE3v31CcHk-DKw/edit?usp=sharing',
        rewardLink: 'https://docs.google.com/document/d/1EEBsNf3yi8UYwtAIQgh4nfrck51xLlujC0KWP3vLE_0/edit?usp=sharing',
        platformLink: 'https://remix.ethereum.org/',
        platformLabel: 'Open Remix IDE',
        entryPhrase: 'ERC-20',
        password: 'Minting',
    },
    room3: {
        id: 'room3',
        name: 'Identity Bureau',
        subtitle: 'NFT Badges & Digital Identity',
        icon: Palette,
        color: '#06b6d4',
        bg: '/room3.jpeg',
        about: `The Citizen Identity Bureau is where digital identity meets blockchain permanence. In this room, you will explore Non-Fungible Tokens (NFTs) — unique digital assets that prove ownership on-chain. You'll learn how ERC-721 tokens work, how metadata is stored on IPFS, and how to mint your very own BlockCity Citizen Badge. Every badge is unique to your journey — no two are identical.`,
        docLink: 'https://docs.google.com/document/d/1cT7QxRUgrYU8SVooJvX7rOUhnrHgITk_p-uFp2QL87g/edit?usp=sharing',
        rewardLink: 'https://docs.google.com/document/d/1ZyRQNpfYDSKvVyMvWaZl3u9OZrGDur81h7JQXe9eWIo/edit?usp=sharing',
        platformLink: 'https://remix.ethereum.org/#lang=en&optimize&runs=200&evmVersion&version=soljson-v0.8.31+commit.fd3a2265.js',
        platformLabel: 'Open Remix IDE (pre-configured)',
        entryPhrase: 'tokenURI',
        password: 'Metadata',
    },
    room4: {
        id: 'room4',
        name: 'Council Chamber',
        subtitle: 'DAO Voting & Governance',
        icon: Landmark,
        color: '#c084fc',
        bg: '/room4.jpeg',
        about: `The City Council Chamber is where democracy meets the blockchain. This room covers Decentralised Autonomous Organisations (DAOs) — communities governed by code, not people. You will build an on-chain voting system where every vote is a real blockchain transaction, permanently recorded and tamper-proof. Learn how proposals are created, how votes are counted, and how quorum prevents minority capture of governance decisions.`,
        docLink: 'https://docs.google.com/document/d/1nf0oiJlKX9qq1d2LmlFn4EZ797dzaCT0JA_nc-UQZ2s/edit?usp=drivesdk',
        rewardLink: 'https://docs.google.com/document/d/1REPMo4PjTPjWneeSVrzHqKhYZfBz4bQdNVu0Xi0jjFs/edit?usp=drivesdk',
        platformLink: 'https://remix.ethereum.org/',
        platformLabel: 'Open Remix IDE',
        entryPhrase: 'quorum',
        password: 'Governance',
    },
    room5: {
        id: 'room5',
        name: 'Control Center',
        subtitle: 'Web3 Frontend Development',
        icon: Wrench,
        color: '#34d399',
        bg: '/room5.jpeg',
        about: `The City Control Center is your mission to connect everything together. This is where smart contracts meet the real world — through a browser interface. You will build a Web3 frontend using HTML, JavaScript, and the Ethers.js library. No frameworks, no install — just one file that talks to the blockchain. Think of it as building the remote control for your city — the website is the remote, the blockchain is the TV, and MetaMask is the battery.`,
        docLink: 'https://docs.google.com/document/d/1rH4LLuEFEdCm9kivsFMQo25avojoU76O9meSSRikrTI/edit?tab=t.0',
        rewardLink: 'https://docs.google.com/document/d/1rH4LLuEFEdCm9kivsFMQo25avojoU76O9meSSRikrTI/edit?usp=sharing',
        platformLink: 'https://remix.ethereum.org',
        platformLabel: 'Open Remix IDE',
        entryPhrase: 'provider',
        password: 'Signer',
    },
};

// ─── localStorage helpers ─────────────────────────────────────────────────────
const STORAGE_KEY = (roomId) => `anvaya_reward_unlocked_${roomId}`;
const isRewardUnlocked = (roomId) => { try { return localStorage.getItem(STORAGE_KEY(roomId)) === 'true'; } catch { return false; } };
const unlockReward = (roomId) => { try { localStorage.setItem(STORAGE_KEY(roomId), 'true'); } catch { } };

// ─── Reward Card ──────────────────────────────────────────────────────────────
const RewardCard = ({ room }) => (
    <a
        href={room.rewardLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between px-5 py-4 rounded-xl transition-all hover:scale-[1.01]"
        style={{
            background: `linear-gradient(135deg, ${room.color}14, rgba(10,14,30,0.85))`,
            border: `1px solid ${room.color}40`,
            backdropFilter: 'blur(10px)',
            boxShadow: `0 0 25px ${room.color}15`,
        }}
    >
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${room.color}20`, border: `1px solid ${room.color}45` }}>
                <Gift size={18} style={{ color: room.color }} />
            </div>
            <div>
                <p className="font-bold" style={{ color: '#fff', fontFamily: "'Orbitron', sans-serif", fontSize: '12px', letterSpacing: '0.05em' }}>
                    Reward Code Snippet
                </p>
                <p className="text-gray-500 text-xs mt-0.5" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    Your bonus reference code — click to open
                </p>
            </div>
        </div>
        <ExternalLink size={15} style={{ color: room.color, flexShrink: 0 }} />
    </a>
);

// ─── Complete Modal ───────────────────────────────────────────────────────────
const CompleteModal = ({ room, citizenId, onClose, onSuccess }) => {
    const [code, setCode] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [done, setDone] = useState(false);

    const handleSubmit = async () => {
        if (!code.trim()) { setError('Please enter the secret code.'); return; }
        if (code.trim() !== room.password) { setError('Incorrect password. Check with your room mentor.'); return; }
        setLoading(true);
        setError('');
        try {
            await API.put(`/participants/${citizenId}/complete-room`, { roomId: room.id });
            unlockReward(room.id);
            setDone(true);
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to update score. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(14px)' }}
            onClick={e => !done && e.target === e.currentTarget && onClose()}
        >
            <div className="w-full max-w-md rounded-2xl p-6"
                style={{ background: 'rgba(12,16,36,0.98)', border: `1px solid ${room.color}30`, boxShadow: `0 0 60px ${room.color}20` }}>

                {!done ? (
                    <>
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                            style={{ background: `${room.color}15`, border: `1.5px solid ${room.color}40` }}>
                            <Lock size={24} style={{ color: room.color }} />
                        </div>
                        <h2 className="text-xl font-bold text-white text-center mb-1"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}>
                            Mark Room as Complete
                        </h2>
                        <p className="text-gray-500 text-sm text-center mb-6"
                            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                            Enter the secret code provided by your room mentor
                        </p>

                        <div className="relative mb-4">
                            <input
                                type={show ? 'text' : 'password'}
                                value={code}
                                onChange={e => { setCode(e.target.value); setError(''); }}
                                placeholder="Enter secret code..."
                                className="w-full px-4 py-3 rounded-xl font-mono text-white placeholder-gray-600 outline-none pr-12"
                                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${error ? '#ef4444' : 'rgba(255,255,255,0.1)'}` }}
                                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                                autoFocus
                            />
                            <button onClick={() => setShow(s => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                                {show ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4 text-sm"
                                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}>
                                <AlertCircle size={14} /> {error}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button onClick={onClose}
                                className="flex-1 py-3 rounded-xl text-sm font-bold"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280', fontFamily: "'Rajdhani', sans-serif" }}>
                                Cancel
                            </button>
                            <button onClick={handleSubmit} disabled={loading || !code.trim()}
                                className="flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-wider disabled:opacity-40 flex items-center justify-center gap-2"
                                style={{ background: `linear-gradient(135deg, ${room.color}, ${room.color}99)`, color: '#0a0a1a', fontFamily: "'Orbitron', sans-serif", fontSize: '11px' }}>
                                {loading ? <Loader size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </>
                ) : (
                    /* ── Success state ── */
                    <>
                        {/* Animated success ring */}
                        <div className="relative w-24 h-24 mx-auto mb-6">
                            <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                                style={{ background: room.color }} />
                            <div className="w-24 h-24 rounded-full flex items-center justify-center"
                                style={{ background: `${room.color}20`, border: `2px solid ${room.color}`, boxShadow: `0 0 40px ${room.color}60` }}>
                                <CheckCircle size={44} style={{ color: room.color }} />
                            </div>
                        </div>

                        {/* Main heading */}
                        <h2 className="text-center mb-1 font-black uppercase tracking-widest"
                            style={{
                                fontFamily: "'Orbitron', sans-serif",
                                fontSize: '22px',
                                color: '#fff',
                                textShadow: `0 0 30px ${room.color}60`,
                                letterSpacing: '0.12em',
                            }}>
                            Room Complete!
                        </h2>

                        {/* Points line */}
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Star size={13} style={{ color: '#F9A24D' }} />
                            <p className="font-bold text-center"
                                style={{
                                    fontFamily: "'Rajdhani', sans-serif",
                                    fontSize: '17px',
                                    color: '#F9A24D',
                                    letterSpacing: '0.04em',
                                }}>
                                +10 pts added
                            </p>
                            <Star size={13} style={{ color: '#F9A24D' }} />
                        </div>


                        {/* Reward snippet */}
                        <div className="mb-5">
                            <div className="flex items-center gap-2 justify-center mb-3">
                                <Gift size={15} style={{ color: room.color }} />
                                <p className="uppercase tracking-widest font-black"
                                    style={{
                                        color: room.color,
                                        fontFamily: "'Orbitron', sans-serif",
                                        fontSize: '11px',
                                        letterSpacing: '0.2em',
                                    }}>
                                    Your Reward Code Snippet
                                </p>
                            </div>
                            <a href={room.rewardLink} target="_blank" rel="noreferrer"
                                className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all hover:scale-[1.01]"
                                style={{ background: `${room.color}15`, border: `1px solid ${room.color}50`, boxShadow: `0 0 20px ${room.color}15` }}>
                                <div className="flex items-center gap-2.5">
                                    <Trophy size={17} style={{ color: room.color }} />
                                    <span className="font-bold text-white"
                                        style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '16px', letterSpacing: '0.04em' }}>
                                        Open Reward Snippet
                                    </span>
                                </div>
                                <ArrowRight size={15} style={{ color: room.color }} />
                            </a>
                            <p className="text-center mt-2"
                                style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '11px', color: '#4b5563' }}>
                                Also accessible anytime from this room page
                            </p>
                        </div>

                        <button onClick={onSuccess}
                            className="w-full py-3.5 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2"
                            style={{
                                background: `linear-gradient(135deg, ${room.color}, ${room.color}99)`,
                                color: '#0a0a1a',
                                fontFamily: "'Orbitron', sans-serif",
                                fontSize: '12px',
                                letterSpacing: '0.15em',
                                boxShadow: `0 0 20px ${room.color}40`,
                            }}>
                            <ArrowRight size={15} /> Back to Dashboard
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const RoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { participant, citizenId, loginByCitizenId } = useParticipant();

    const [showModal, setShowModal] = useState(false);
    // justCompleted = optimistic flag — set immediately on success, no re-fetch needed
    const [justCompleted, setJustCompleted] = useState(false);

    const room = ROOM_DATA[roomId];
    const RoomIcon = room?.icon;

    // Room completed = either backend says so OR we just completed it this session
    const backendCompleted = participant?.rooms?.find(r => r.name === room?.name)?.completed ?? false;
    const roomCompleted = backendCompleted || justCompleted;
    const rewardUnlocked = isRewardUnlocked(roomId) || roomCompleted;

    useEffect(() => {
        if (!participant) navigate('/participant');
    }, [participant, navigate]);

    useEffect(() => { window.scrollTo(0, 0); }, [roomId]);

    // On success: set optimistic flag immediately, then re-fetch in background
    const handleSuccess = () => {
        setJustCompleted(true);   // instant UI update — no refresh needed
        setShowModal(false);
        // Background re-fetch to sync score/tier on dashboard
        if (citizenId) loginByCitizenId(citizenId).catch(() => { });
    };

    if (!participant || !room) return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a1a' }}>
            <div className="text-center">
                <p className="text-gray-500 mb-4">Room not found.</p>
                <button onClick={() => navigate('/participant/dashboard')}
                    className="text-sm px-4 py-2 rounded-lg"
                    style={{ background: 'rgba(249,162,77,0.1)', color: '#F9A24D', border: '1px solid rgba(249,162,77,0.3)' }}>
                    Back to Dashboard
                </button>
            </div>
        </div>
    );

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap');
                .room-section-label { font-family: 'Orbitron', sans-serif; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; }
            `}</style>

            <div className="relative min-h-screen">

                {/* ── Background ───────────────────────────────────── */}
                <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${room.bg}')`, filter: 'brightness(0.22) saturate(0.7)' }} />
                <div className="fixed inset-0 z-0"
                    style={{ background: `linear-gradient(135deg, ${room.color}12 0%, rgba(10,10,26,0.55) 50%, rgba(10,10,26,0.75) 100%)` }} />

                <div className="relative z-10 min-h-screen">

                    {/* ── Hero ─────────────────────────────────────── */}
                    <div className="relative h-[58vh] min-h-[380px] flex flex-col justify-end">
                        <div className="absolute inset-0 pointer-events-none"
                            style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(10,10,26,0.85) 100%)' }} />

                        {/* Back */}
                        <div className="absolute top-6 left-4 z-20">
                            <button onClick={() => navigate('/participant/dashboard')}
                                className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all hover:scale-105"
                                style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', color: '#e5e7eb', fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
                                <ChevronLeft size={16} /> Dashboard
                            </button>
                        </div>

                        {/* Completed badge */}
                        {roomCompleted && (
                            <div className="absolute top-6 right-4 z-20">
                                <span className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full"
                                    style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.4)', color: '#34d399', fontFamily: "'Orbitron', sans-serif" }}>
                                    <CheckCircle size={12} /> COMPLETED
                                </span>
                            </div>
                        )}

                        {/* Title */}
                        <div className="relative z-10 px-4 pb-10 max-w-3xl mx-auto w-full">
                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                <span className="text-[9px] font-bold tracking-[0.35em] uppercase px-3 py-1.5 rounded-full"
                                    style={{ background: `${room.color}18`, border: `1px solid ${room.color}50`, color: room.color, fontFamily: "'Orbitron', sans-serif" }}>
                                    Room {roomId.replace('room', '')}
                                </span>
                                <span className="text-[9px] px-3 py-1.5 rounded-full font-mono"
                                    style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.15)', color: '#9ca3af' }}>
                                    Entry: "{room.entryPhrase}"
                                </span>
                            </div>

                            <div className="flex items-end gap-5">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 mb-1"
                                    style={{ background: `${room.color}18`, border: `2px solid ${room.color}55`, backdropFilter: 'blur(12px)', boxShadow: `0 0 30px ${room.color}35` }}>
                                    <RoomIcon size={28} style={{ color: room.color }} />
                                </div>
                                <div>
                                    <h1 className="text-5xl md:text-6xl font-bold text-white leading-none mb-1"
                                        style={{ fontFamily: "'Orbitron', sans-serif", textShadow: `0 2px 30px rgba(0,0,0,0.9)`, letterSpacing: '0.03em' }}>
                                        {room.name}
                                    </h1>
                                    <p className="text-base font-semibold uppercase tracking-widest"
                                        style={{ color: `${room.color}cc`, fontFamily: "'Rajdhani', sans-serif" }}>
                                        {room.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Content ──────────────────────────────────── */}
                    <div className="max-w-3xl mx-auto px-4 pb-36 space-y-6">

                        {/* About */}
                        <section>
                            <p className="room-section-label mb-3" style={{ color: room.color }}>About This Room</p>
                            <div className="rounded-2xl p-6"
                                style={{ background: 'rgba(10,14,30,0.75)', border: `1px solid ${room.color}18`, backdropFilter: 'blur(12px)' }}>
                                <p className="text-gray-300 leading-relaxed"
                                    style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '16px' }}>
                                    {room.about}
                                </p>
                            </div>
                        </section>

                        {/* Resource Document */}
                        <section>
                            <p className="room-section-label mb-3" style={{ color: room.color }}>Resource Document</p>
                            <a href={room.docLink} target="_blank" rel="noreferrer"
                                className="flex items-center justify-between px-5 py-4 rounded-xl transition-all hover:scale-[1.01] group"
                                style={{ background: 'rgba(10,14,30,0.7)', border: `1px solid ${room.color}25`, backdropFilter: 'blur(10px)' }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: `${room.color}18`, border: `1px solid ${room.color}35` }}>
                                        <FileText size={18} style={{ color: room.color }} />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold"
                                            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '16px' }}>
                                            Room {roomId.replace('room', '')} — Resource Document
                                        </p>
                                        <p className="text-gray-600 text-xs">Click to open in new tab</p>
                                    </div>
                                </div>
                                <ExternalLink size={15} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                            </a>
                        </section>

                        {/* Platform */}
                        <section>
                            <p className="room-section-label mb-3" style={{ color: room.color }}>Platform</p>
                            <a href={room.platformLink} target="_blank" rel="noreferrer"
                                className="flex items-center justify-between px-5 py-4 rounded-xl transition-all hover:scale-[1.01]"
                                style={{ background: `linear-gradient(135deg, ${room.color}18, rgba(10,14,30,0.8))`, border: `1px solid ${room.color}40`, backdropFilter: 'blur(10px)', boxShadow: `0 0 25px ${room.color}12` }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: `${room.color}22`, border: `1px solid ${room.color}45` }}>
                                        <ExternalLink size={18} style={{ color: room.color }} />
                                    </div>
                                    <div>
                                        <p className="font-bold"
                                            style={{ color: '#fff', fontFamily: "'Orbitron', sans-serif", fontSize: '13px', letterSpacing: '0.05em' }}>
                                            {room.platformLabel}
                                        </p>
                                        <p className="text-gray-500 text-xs font-mono mt-0.5">{room.platformLink}</p>
                                    </div>
                                </div>
                                <ExternalLink size={15} style={{ color: room.color }} />
                            </a>
                        </section>

                        {/* Reward snippet — visible once completed */}
                        {rewardUnlocked && (
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <Gift size={12} style={{ color: '#F9A24D' }} />
                                    <p className="room-section-label" style={{ color: '#F9A24D' }}>Reward Code Snippet</p>
                                </div>
                                <RewardCard room={room} />
                            </section>
                        )}

                    </div>
                </div>

                {/* ── Sticky CTA ───────────────────────────────────── */}
                <div className="fixed bottom-0 left-0 right-0 z-30 px-4 py-4"
                    style={{ background: 'rgba(6,8,20,0.92)', backdropFilter: 'blur(20px)', borderTop: `1px solid ${room.color}25`, boxShadow: '0 -4px 30px rgba(0,0,0,0.6)' }}>
                    <div className="max-w-3xl mx-auto">
                        {roomCompleted ? (
                            <div className="flex items-center justify-center gap-2 py-3"
                                style={{ background: 'rgba(52,211,153,0.06)', borderRadius: '1rem', border: '1px solid rgba(52,211,153,0.2)' }}>
                                <CheckCircle size={18} style={{ color: '#34d399' }} />
                                <span className="font-bold text-sm"
                                    style={{ color: '#34d399', fontFamily: "'Orbitron', sans-serif", letterSpacing: '0.1em' }}>
                                    ROOM COMPLETED
                                </span>
                                <Trophy size={16} style={{ color: '#F9A24D' }} />
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowModal(true)}
                                className="w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
                                style={{ background: `linear-gradient(135deg, ${room.color}, ${room.color}bb)`, color: '#050810', fontFamily: "'Orbitron', sans-serif", fontSize: '13px', letterSpacing: '0.15em', boxShadow: `0 0 35px ${room.color}40` }}>
                                <CheckCircle size={20} /> Mark as Complete
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <CompleteModal
                    room={room}
                    citizenId={citizenId}
                    onClose={() => setShowModal(false)}
                    onSuccess={handleSuccess}
                />
            )}
        </>
    );
};

export default RoomPage;