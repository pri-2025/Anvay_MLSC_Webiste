import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft, FileText, ExternalLink, CheckCircle,
    Lock, Eye, EyeOff, Loader, AlertCircle,
    Palette, Landmark, Wrench, Scale, Briefcase
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
        tasks: [
            'Set up Remix IDE and create your first .sol file with the correct SPDX header and pragma version',
            'Write a CityLaw contract with a string public cityName and an address public owner',
            'Add a constructor() that sets cityName and assigns msg.sender as owner',
            'Implement an onlyOwner modifier using require() to restrict sensitive functions',
            'Add an addLaw() function that emits a LawAdded event — deploy and test in Remix VM',
        ],
        docLink: 'https://docs.google.com/document/d/10AWgYaTumstXQezTeBq4s3Bau_iTAitcZvKU_GRDJnE/edit?tab=t.0',
        platformLink: 'https://remix.ethereum.org/?nomobileredirect',
        platformLabel: 'Open Remix IDE',
        entryPhrase: 'modifier',
    },
    room2: {
        id: 'room2',
        name: 'Treasury Mint',
        subtitle: 'ERC-20 Tokens & DeFi',
        icon: Briefcase,
        color: '#f59e0b',
        bg: '/room2.jpeg',
        about: `The Treasury Mint is where BlockCity's economy is born. Every city needs currency — and in Web3, you can mint your own in under 50 lines of code. ERC-20 is the universal token standard that makes all fungible tokens interoperable across wallets, exchanges, and dApps. You will deploy a live token contract, mint supply to your wallet, and transfer tokens to teammates — all on a real testnet.`,
        tasks: [
            'Understand fungibility — why 1 CTK always equals 1 CTK (unlike NFTs)',
            'Import OpenZeppelin ERC20.sol and Ownable.sol via the @ import path in Remix',
            'Deploy CityToken with name "CityToken" and symbol "CTK" — mint 1000 tokens to yourself',
            'Call readableBalance() to verify your balance, then transfer 50 CTK to a teammate',
            'Copy the transaction hash and verify it on Polygonscan Amoy testnet explorer',
        ],
        docLink: 'https://docs.google.com/document/d/1rDU63mRj_yq9IERtb-DDr2FPSSd37yE3v31CcHk-DKw/edit?usp=sharing',
        platformLink: 'https://remix.ethereum.org/',
        platformLabel: 'Open Remix IDE',
        entryPhrase: 'ERC-20',
    },
    room3: {
        id: 'room3',
        name: 'Identity Bureau',
        subtitle: 'NFT Badges & Digital Identity',
        icon: Palette,
        color: '#06b6d4',
        bg: '/room3.jpeg',
        about: `The Citizen Identity Bureau is where digital identity meets blockchain permanence. In this room, you will explore Non-Fungible Tokens (NFTs) — unique digital assets that prove ownership on-chain. You'll learn how ERC-721 tokens work, how metadata is stored on IPFS, and how to mint your very own BlockCity Citizen Badge. Every badge is unique to your journey — no two are identical.`,
        tasks: [
            'Understand the difference between ERC-20 (fungible) and ERC-721 (non-fungible) tokens',
            'Write and deploy a CitizenBadge smart contract using OpenZeppelin ERC-721',
            'Create your personalised NFT metadata JSON with your role, rooms, and tier',
            'Upload metadata to IPFS using nft.storage',
            'Mint your badge NFT and verify ownership via ownerOf()',
        ],
        docLink: 'https://placeholder-doc-link.com/room3',
        platformLink: 'https://remix.ethereum.org/#lang=en&optimize&runs=200&evmVersion&version=soljson-v0.8.31+commit.fd3a2265.js',
        platformLabel: 'Open Remix IDE (pre-configured)',
        entryPhrase: 'tokenURI',
    },
    room4: {
        id: 'room4',
        name: 'Council Chamber',
        subtitle: 'DAO Voting & Governance',
        icon: Landmark,
        color: '#c084fc',
        bg: '/room4.jpeg',
        about: `The City Council Chamber is where democracy meets the blockchain. This room covers Decentralised Autonomous Organisations (DAOs) — communities governed by code, not people. You will build an on-chain voting system where every vote is a real blockchain transaction, permanently recorded and tamper-proof. Learn how proposals are created, how votes are counted, and how quorum prevents minority capture of governance decisions.`,
        tasks: [
            'Understand the DAO model — rules encoded in contracts, enforced by code',
            'Build a CityVoting contract with createProposal(), vote(), and executeProposal()',
            'Implement double-vote prevention using nested mapping(uint => mapping(address => bool))',
            'Deploy to testnet and create a live 10-minute proposal',
            'Cast votes from multiple wallet addresses and execute the result',
        ],
        docLink: 'https://docs.google.com/document/d/1lr9zT55r-jPxEjz4raodZfIfyTYXbd2S6PqALyj9xn0/edit?usp=sharing',
        platformLink: 'https://remix.ethereum.org/',
        platformLabel: 'Open Remix IDE',
        entryPhrase: 'quorum',
    },
    room5: {
        id: 'room5',
        name: 'Control Center',
        subtitle: 'Web3 Frontend Development',
        icon: Wrench,
        color: '#34d399',
        bg: '/room5.jpeg',
        about: `The City Control Center is your mission to connect everything together. This is where smart contracts meet the real world — through a browser interface. You will build a Web3 frontend using HTML, JavaScript, and the Ethers.js library. No frameworks, no install — just one file that talks to the blockchain. Think of it as building the remote control for your city — the website is the remote, the blockchain is the TV, and MetaMask is the battery.`,
        tasks: [
            'Set up Ethers.js via CDN — no npm, no install, works in any browser',
            'Connect MetaMask using window.ethereum and eth_requestAccounts',
            'Read live data from your deployed CityLaw contract using a Provider',
            'Send write transactions using a Signer and handle MetaMask confirmations',
            'Build a full BlockCity Hub connecting all 4 contracts simultaneously',
        ],
        docLink: 'https://placeholder-doc-link.com/room5',
        platformLink: 'https://remix.ethereum.org',
        platformLabel: 'Open Remix IDE',
        entryPhrase: 'provider',
    },
};

// ─── Complete Modal ───────────────────────────────────────────────────────────
const CompleteModal = ({ room, citizenId, onClose, onSuccess }) => {
    const [code, setCode] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!code.trim()) { setError('Please enter the secret code.'); return; }
        setLoading(true);
        setError('');
        try {
            await API.post('/participants/stamp', {
                citizenId,
                roomId: room.id,
                roomName: room.name,
                secretCode: code.trim(),
            });
            onSuccess();
        } catch (err) {
            setError(err?.response?.data?.message || 'Invalid code or submission failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <div
                className="w-full max-w-md rounded-2xl p-6"
                style={{
                    background: 'rgba(15,20,40,0.98)',
                    border: `1px solid ${room.color}30`,
                    boxShadow: `0 0 60px ${room.color}20`,
                }}
            >
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                    style={{ background: `${room.color}15`, border: `1.5px solid ${room.color}40` }}
                >
                    <Lock size={24} style={{ color: room.color }} />
                </div>
                <h2
                    className="text-xl font-bold text-white text-center mb-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                    Mark Room as Complete
                </h2>
                <p
                    className="text-gray-500 text-sm text-center mb-6"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                    Enter the secret code provided by your room mentor
                </p>

                <div className="relative mb-4">
                    <input
                        type={show ? 'text' : 'password'}
                        value={code}
                        onChange={e => { setCode(e.target.value); setError(''); }}
                        placeholder="Enter secret code..."
                        className="w-full px-4 py-3 rounded-xl font-mono text-white placeholder-gray-600 outline-none pr-12"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: `1px solid ${error ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                        }}
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    />
                    <button
                        onClick={() => setShow(s => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                        {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>

                {error && (
                    <div
                        className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4 text-sm"
                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}
                    >
                        <AlertCircle size={14} /> {error}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl text-sm font-bold"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#6b7280',
                            fontFamily: "'Rajdhani', sans-serif",
                            letterSpacing: '0.05em',
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !code.trim()}
                        className="flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-wider disabled:opacity-40 flex items-center justify-center gap-2"
                        style={{
                            background: `linear-gradient(135deg, ${room.color}, ${room.color}99)`,
                            color: '#0a0a1a',
                            fontFamily: "'Orbitron', sans-serif",
                            fontSize: '11px',
                        }}
                    >
                        {loading ? <Loader size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Success Banner ───────────────────────────────────────────────────────────
const SuccessBanner = ({ room, onBack }) => (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)' }}
    >
        <div className="text-center max-w-sm">
            <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                    background: `${room.color}20`,
                    border: `2px solid ${room.color}`,
                    boxShadow: `0 0 40px ${room.color}40`,
                }}
            >
                <CheckCircle size={40} style={{ color: room.color }} />
            </div>
            <h2
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
                Submitted!
            </h2>
            <p
                className="text-gray-400 mb-2"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '16px' }}
            >
                Your completion for{' '}
                <span style={{ color: room.color }}>{room.name}</span> is in the admin queue.
            </p>
            <p
                className="text-gray-600 text-xs mb-8"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
                Default 10 points will be added. Top performers may receive bonus points from the admin.
            </p>
            <button
                onClick={onBack}
                className="px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all"
                style={{
                    background: `linear-gradient(135deg, ${room.color}, ${room.color}99)`,
                    color: '#0a0a1a',
                    fontFamily: "'Orbitron', sans-serif",
                    boxShadow: `0 0 25px ${room.color}40`,
                }}
            >
                Back to Dashboard
            </button>
        </div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const RoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { participant, citizenId } = useParticipant();
    const [showModal, setShowModal] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const room = ROOM_DATA[roomId];
    const RoomIcon = room?.icon;

    useEffect(() => {
        if (!participant) navigate('/participant');
    }, [participant, navigate]);

    useEffect(() => { window.scrollTo(0, 0); }, [roomId]);

    if (!participant || !room) return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a1a' }}>
            <div className="text-center">
                <p className="text-gray-500 mb-4">Room not found.</p>
                <button
                    onClick={() => navigate('/participant/dashboard')}
                    className="text-sm px-4 py-2 rounded-lg"
                    style={{ background: 'rgba(249,162,77,0.1)', color: '#F9A24D', border: '1px solid rgba(249,162,77,0.3)' }}
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* ── Fonts ────────────────────────────────────────────────── */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap');
                .room-section-label {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 10px;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                }
            `}</style>

            <div className="relative min-h-screen">

                {/* ── Fixed full-page background image ─────────────────── */}
                <div
                    className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${room.bg}')`,
                        filter: 'brightness(0.22) saturate(0.7)',
                    }}
                />

                {/* Fixed room-colour tint overlay */}
                <div
                    className="fixed inset-0 z-0"
                    style={{
                        background: `linear-gradient(135deg, ${room.color}12 0%, rgba(10,10,26,0.55) 50%, rgba(10,10,26,0.75) 100%)`,
                    }}
                />

                {/* ── All scrollable content ───────────────────────────── */}
                <div className="relative z-10 min-h-screen">

                    {/* ── Hero ─────────────────────────────────────────── */}
                    <div className="relative h-[58vh] min-h-[380px] flex flex-col justify-end">

                        {/* Bottom fade into content */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(10,10,26,0.85) 100%)' }}
                        />

                        {/* Back button */}
                        <div className="absolute top-6 left-4 z-20">
                            <button
                                onClick={() => navigate('/participant/dashboard')}
                                className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all hover:scale-105"
                                style={{
                                    background: 'rgba(0,0,0,0.45)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    color: '#e5e7eb',
                                    fontFamily: "'Rajdhani', sans-serif",
                                    fontWeight: 600,
                                    letterSpacing: '0.05em',
                                }}
                            >
                                <ChevronLeft size={16} /> Dashboard
                            </button>
                        </div>

                        {/* Title area */}
                        <div className="relative z-10 px-4 pb-10 max-w-3xl mx-auto w-full">

                            {/* Pills */}
                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                <span
                                    className="text-[9px] font-bold tracking-[0.35em] uppercase px-3 py-1.5 rounded-full"
                                    style={{
                                        background: `${room.color}18`,
                                        border: `1px solid ${room.color}50`,
                                        color: room.color,
                                        backdropFilter: 'blur(8px)',
                                        fontFamily: "'Orbitron', sans-serif",
                                    }}
                                >
                                    Room {roomId.replace('room', '')}
                                </span>
                                <span
                                    className="text-[9px] px-3 py-1.5 rounded-full font-mono"
                                    style={{
                                        background: 'rgba(0,0,0,0.45)',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        color: '#9ca3af',
                                        backdropFilter: 'blur(8px)',
                                    }}
                                >
                                    Entry: "{room.entryPhrase}"
                                </span>
                            </div>

                            {/* Icon + name */}
                            <div className="flex items-end gap-5">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 mb-1"
                                    style={{
                                        background: `${room.color}18`,
                                        border: `2px solid ${room.color}55`,
                                        backdropFilter: 'blur(12px)',
                                        boxShadow: `0 0 30px ${room.color}35`,
                                    }}
                                >
                                    <RoomIcon size={28} style={{ color: room.color }} />
                                </div>
                                <div>
                                    <h1
                                        className="text-5xl md:text-6xl font-bold text-white leading-none mb-1"
                                        style={{
                                            fontFamily: "'Orbitron', sans-serif",
                                            textShadow: `0 2px 30px rgba(0,0,0,0.9), 0 0 40px ${room.color}20`,
                                            letterSpacing: '0.03em',
                                        }}
                                    >
                                        {room.name}
                                    </h1>
                                    <p
                                        className="text-base font-semibold"
                                        style={{
                                            color: `${room.color}cc`,
                                            fontFamily: "'Rajdhani', sans-serif",
                                            letterSpacing: '0.12em',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {room.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Content ──────────────────────────────────────── */}
                    <div className="max-w-3xl mx-auto px-4 pb-36 space-y-6">

                        {/* About */}
                        <section>
                            <p className="room-section-label mb-3" style={{ color: room.color }}>
                                About This Room
                            </p>
                            <div
                                className="rounded-2xl p-6"
                                style={{
                                    background: 'rgba(10,14,30,0.75)',
                                    border: `1px solid ${room.color}18`,
                                    backdropFilter: 'blur(12px)',
                                    boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
                                }}
                            >
                                <p
                                    className="text-gray-300 leading-relaxed"
                                    style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '16px' }}
                                >
                                    {room.about}
                                </p>
                            </div>
                        </section>

                        {/* Tasks */}
                        <section>
                            <p className="room-section-label mb-3" style={{ color: room.color }}>
                                Your Tasks
                            </p>
                            <div className="space-y-2">
                                {room.tasks.map((task, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3 rounded-xl px-4 py-3"
                                        style={{
                                            background: 'rgba(10,14,30,0.65)',
                                            border: `1px solid ${room.color}12`,
                                            backdropFilter: 'blur(10px)',
                                        }}
                                    >
                                        <span
                                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                                            style={{
                                                background: `${room.color}20`,
                                                color: room.color,
                                                border: `1px solid ${room.color}45`,
                                                fontFamily: "'Orbitron', sans-serif",
                                            }}
                                        >
                                            {i + 1}
                                        </span>
                                        <p
                                            className="text-gray-300 leading-relaxed"
                                            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '15px' }}
                                        >
                                            {task}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Resource Document */}
                        <section>
                            <p className="room-section-label mb-3" style={{ color: room.color }}>
                                Resource Document
                            </p>
                            <a
                                href={room.docLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between px-5 py-4 rounded-xl transition-all hover:scale-[1.01] group"
                                style={{
                                    background: 'rgba(10,14,30,0.7)',
                                    border: `1px solid ${room.color}25`,
                                    backdropFilter: 'blur(10px)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = `${room.color}60`;
                                    e.currentTarget.style.background = 'rgba(10,14,30,0.85)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = `${room.color}25`;
                                    e.currentTarget.style.background = 'rgba(10,14,30,0.7)';
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: `${room.color}18`, border: `1px solid ${room.color}35` }}
                                    >
                                        <FileText size={18} style={{ color: room.color }} />
                                    </div>
                                    <div>
                                        <p
                                            className="text-white font-semibold"
                                            style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '16px' }}
                                        >
                                            Room {roomId.replace('room', '')} — Resource Document
                                        </p>
                                        <p className="text-gray-600 text-xs">Click to open in new tab</p>
                                    </div>
                                </div>
                                <ExternalLink size={15} className="text-gray-500 group-hover:text-gray-300 transition-colors flex-shrink-0" />
                            </a>
                        </section>

                        {/* Platform */}
                        <section>
                            <p className="room-section-label mb-3" style={{ color: room.color }}>
                                Platform
                            </p>
                            <a
                                href={room.platformLink}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between px-5 py-4 rounded-xl transition-all hover:scale-[1.01]"
                                style={{
                                    background: `linear-gradient(135deg, ${room.color}18, rgba(10,14,30,0.8))`,
                                    border: `1px solid ${room.color}40`,
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: `0 0 25px ${room.color}12`,
                                }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 40px ${room.color}28`}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 25px ${room.color}12`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: `${room.color}22`, border: `1px solid ${room.color}45` }}
                                    >
                                        <ExternalLink size={18} style={{ color: room.color }} />
                                    </div>
                                    <div>
                                        <p
                                            className="font-bold"
                                            style={{
                                                color: '#fff',
                                                fontFamily: "'Orbitron', sans-serif",
                                                fontSize: '13px',
                                                letterSpacing: '0.05em',
                                            }}
                                        >
                                            {room.platformLabel}
                                        </p>
                                        <p className="text-gray-500 text-xs font-mono mt-0.5">{room.platformLink}</p>
                                    </div>
                                </div>
                                <ExternalLink size={15} style={{ color: room.color, flexShrink: 0 }} />
                            </a>
                        </section>

                    </div>
                </div>

                {/* ── Sticky Mark as Complete ───────────────────────────── */}
                <div
                    className="fixed bottom-0 left-0 right-0 z-30 px-4 py-4"
                    style={{
                        background: 'rgba(6,8,20,0.92)',
                        backdropFilter: 'blur(20px)',
                        borderTop: `1px solid ${room.color}25`,
                        boxShadow: `0 -4px 30px rgba(0,0,0,0.6), 0 -1px 0 ${room.color}15`,
                    }}
                >
                    <div className="max-w-3xl mx-auto">
                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
                            style={{
                                background: `linear-gradient(135deg, ${room.color}, ${room.color}bb)`,
                                color: '#050810',
                                fontFamily: "'Orbitron', sans-serif",
                                fontSize: '13px',
                                letterSpacing: '0.15em',
                                boxShadow: `0 0 35px ${room.color}40`,
                            }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 55px ${room.color}60`}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 35px ${room.color}40`}
                        >
                            <CheckCircle size={20} />
                            Mark as Complete
                        </button>
                    </div>
                </div>

            </div>

            {/* Modal */}
            {showModal && !submitted && (
                <CompleteModal
                    room={room}
                    citizenId={citizenId}
                    onClose={() => setShowModal(false)}
                    onSuccess={() => { setShowModal(false); setSubmitted(true); }}
                />
            )}

            {/* Success */}
            {submitted && (
                <SuccessBanner room={room} onBack={() => navigate('/participant/dashboard')} />
            )}
        </>
    );
};

export default RoomPage;