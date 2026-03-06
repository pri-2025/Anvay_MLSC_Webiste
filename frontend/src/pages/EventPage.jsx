import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Building2, DoorOpen, Clock,
    Key, Lightbulb, CheckCircle,
} from 'lucide-react';

const EventPage = () => {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen"
            style={{ background: 'var(--color-primary, #0d0d1a)', fontFamily: 'Arial, sans-serif' }}
        >
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .event-animate { animation: slideUp 0.7s ease-out both; }
                .divider-line  { height: 1px; background: linear-gradient(to right, transparent, rgba(249,162,77,0.4), transparent); }
            `}</style>

            <div className="max-w-4xl mx-auto px-4 py-12">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 mb-10 text-sm uppercase tracking-widest font-bold transition-all duration-200 hover:gap-3"
                    style={{ color: 'rgba(249,162,77,0.7)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#F9A24D'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(249,162,77,0.7)'}
                >
                    <ChevronLeft size={16} /> Back to Home
                </button>

                {/* Hero */}
                <div className="text-center mb-16 event-animate" style={{ animationDelay: '0.1s' }}>
                    <p className="text-xs font-bold tracking-[0.5em] uppercase mb-4" style={{ color: '#F9A24D' }}>
                        MLSC PRESENTS
                    </p>
                    <h1
                        className="text-5xl md:text-7xl font-black mb-3 uppercase"
                        style={{
                            fontFamily: 'Arial Black, Arial, sans-serif',
                            background: 'linear-gradient(135deg, #fff 0%, #F9A24D 40%, #ff6b35 60%, #F9A24D 80%, #fff 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            letterSpacing: '0.08em',
                        }}
                    >
                        ANVAY
                    </h1>
                    <h2
                        className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase mb-6"
                        style={{ color: '#F9A24D', textShadow: '0 0 20px rgba(249,162,77,0.5)' }}
                    >
                        THE BLOCKCITY EDITION
                    </h2>
                    <p className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        A gamified Web3 hackathon + workshop. Explore 5 independent rooms, build real smart contracts,
                        earn points, and integrate everything into a working dApp.
                    </p>
                </div>

                {/* About the Event */}
                <section className="mb-14 event-animate" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-xs font-bold tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(249,162,77,0.6)' }}>
                        About the Event
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { Icon: Building2, label: 'Format', value: 'Gamified Web3 Workshop' },
                            { Icon: DoorOpen, label: 'Rooms', value: '5 Independent Rooms' },
                            { Icon: Clock, label: 'Duration', value: '7.5 – 11 hours total' },
                        ].map(item => (
                            <div
                                key={item.label}
                                className="px-5 py-4 rounded-2xl text-center"
                                style={{ background: 'rgba(249,162,77,0.06)', border: '1px solid rgba(249,162,77,0.15)' }}
                            >
                                <div className="flex justify-center mb-2">
                                    <item.Icon size={24} color="#F9A24D" />
                                </div>
                                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(249,162,77,0.6)' }}>{item.label}</p>
                                <p className="font-bold text-sm text-white">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="divider-line mb-14" />

                {/* How to Play */}
                <section className="mb-14 event-animate" style={{ animationDelay: '0.3s' }}>
                    <h2 className="text-xs font-bold tracking-[0.4em] uppercase mb-8" style={{ color: 'rgba(249,162,77,0.6)' }}>
                        How to Play
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                step: '01',
                                title: 'Log in with your University Number',
                                desc: 'Access the participant dashboard using your UN number. Your profile, room progress, and score are all tied to it.',
                            },
                            {
                                step: '02',
                                title: 'Complete the Room Tasks',
                                desc: 'Each room has a set of tasks to build, deploy, and demonstrate on-chain. Complete the core tasks and optionally go for bonus tasks to earn extra points.',
                            },
                            {
                                step: '03',
                                title: 'Enter the Secret Code Given by the Admin',
                                desc: 'Once your work is verified, the room admin provides a secret code. Go to your dashboard, open the room, click "Mark as Complete", and enter the code to unlock your points.',
                            },
                            {
                                step: '04',
                                title: 'Get Your Reward Code',
                                desc: 'After entering the correct code, a reward code snippet is unlocked. Save it — you will need it later for the Final Integration challenge.',
                            },
                            {
                                step: '05',
                                title: 'Complete All 5 Rooms, Then Enter the Final Integration Room',
                                desc: 'After finishing all 5 rooms, the Final Integration room unlocks. Fork the BlockCity Hub repository, connect all your contracts into one unified dApp, and submit your live app to the admin team.',
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex gap-5 px-6 py-5 rounded-2xl"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(249,162,77,0.12)' }}
                            >
                                <span
                                    className="text-2xl font-black flex-shrink-0 mt-0.5"
                                    style={{ fontFamily: 'Arial Black, Arial, sans-serif', color: 'rgba(249,162,77,0.25)', minWidth: '36px' }}
                                >
                                    {item.step}
                                </span>
                                <div>
                                    <p className="font-bold text-white mb-1" style={{ fontSize: '15px' }}>{item.title}</p>
                                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="divider-line mb-14" />

                {/* Scoring System */}
                <section className="mb-14 event-animate" style={{ animationDelay: '0.4s' }}>
                    <h2 className="text-xs font-bold tracking-[0.4em] uppercase mb-8" style={{ color: 'rgba(249,162,77,0.6)' }}>
                        Scoring System
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: 'Room Completion (× 5 rooms)', pts: '10 pts each', sub: '50 pts max', highlight: true },
                            { label: 'Final Integration — Working dApp', pts: '20 pts', sub: 'After all 5 rooms', highlight: false },
                            { label: 'Bonus Points', pts: 'Admin-awarded', sub: 'For extra / Builder / Architect tasks', highlight: false },
                        ].map(row => (
                            <div
                                key={row.label}
                                className="px-5 py-4 rounded-2xl flex items-center justify-between gap-4"
                                style={{
                                    background: row.highlight ? 'rgba(249,162,77,0.08)' : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${row.highlight ? 'rgba(249,162,77,0.35)' : 'rgba(249,162,77,0.12)'}`,
                                }}
                            >
                                <div>
                                    <p className="font-bold text-white text-sm">{row.label}</p>
                                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{row.sub}</p>
                                </div>
                                <span
                                    className="text-sm font-black flex-shrink-0"
                                    style={{ fontFamily: 'Arial Black, Arial, sans-serif', color: '#F9A24D' }}
                                >
                                    {row.pts}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="divider-line mb-14" />

                {/* Tools */}
                <section className="mb-16 event-animate" style={{ animationDelay: '0.5s' }}>
                    <h2 className="text-xs font-bold tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(249,162,77,0.6)' }}>
                        Tools You'll Use
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                            { name: 'Remix IDE', desc: 'Browser Solidity IDE' },
                            { name: 'MetaMask', desc: 'Browser wallet' },
                            { name: 'Polygon Amoy', desc: 'Testnet faucet' },
                            { name: 'Etherscan (Sepolia)', desc: 'Block explorer' },
                            { name: 'nft.storage', desc: 'Free IPFS uploads' },
                            { name: 'Ethers.js v6', desc: 'Web3 JS library' },
                        ].map(tool => (
                            <div
                                key={tool.name}
                                className="px-4 py-3 rounded-xl"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(249,162,77,0.12)' }}
                            >
                                <p className="font-bold text-white text-sm mb-0.5">{tool.name}</p>
                                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{tool.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs mt-4 flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        <CheckCircle size={13} color="#34d399" />
                        Zero setup required — everything runs in the browser. You only need: Chrome + MetaMask + internet.
                    </p>
                </section>

                {/* Footer CTA */}
                <div
                    className="text-center py-10 rounded-3xl event-animate"
                    style={{
                        animationDelay: '0.6s',
                        background: 'rgba(249,162,77,0.05)',
                        border: '1px solid rgba(249,162,77,0.2)',
                    }}
                >
                    <p
                        className="text-2xl md:text-3xl font-black uppercase mb-2"
                        style={{ fontFamily: 'Arial Black, Arial, sans-serif', color: '#F9A24D', letterSpacing: '0.08em' }}
                    >
                        Your City. Your Code.
                    </p>
                    <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        Start building. BlockCity awaits.
                    </p>
                    <button
                        onClick={() => {
                            navigate('/');
                            setTimeout(() => {
                                document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                        }}
                        className="px-10 py-4 font-bold rounded-xl text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
                        style={{ border: '2px solid rgba(249,162,77,0.4)', color: '#F9A24D', background: 'transparent', cursor: 'pointer' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#F9A24D'; e.currentTarget.style.backgroundColor = 'rgba(249,162,77,0.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(249,162,77,0.4)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                        View Leaderboard
                    </button>
                </div>

            </div>
        </div>
    );
};

export default EventPage;