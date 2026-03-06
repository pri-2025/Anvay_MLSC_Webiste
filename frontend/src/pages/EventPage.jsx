import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

const rooms = [
    {
        id: 1,
        number: 'ROOM 01',
        name: 'The City Law Foundry',
        persona: '⚖️ The City Judge',
        tag: 'Smart Contracts',
        entryPhrase: 'modifier',
        color: '#F9A24D',
        description:
            'Build the legal foundation of BlockCity. Write and deploy your first smart contract — immutable rules stored permanently on the blockchain.',
        tasks: [
            'Understand state variables, functions, events, and modifiers',
            'Write and deploy CityLaw.sol to testnet',
            'Call setCity() and getCityName() live',
            'Debug a broken contract — find & fix 2 bugs',
        ],
        extra: [
            '🟡 Builder: Add pause()/unpause() with a pausable modifier',
            '🔴 Architect: Multi-owner contract with addOwner()/removeOwner()',
        ],
    },
    {
        id: 2,
        number: 'ROOM 02',
        name: 'The City Treasury Mint',
        persona: '💼 The Treasurer',
        tag: 'ERC-20 Tokens',
        entryPhrase: 'ERC-20',
        color: '#ff6b35',
        description:
            'Print the city\'s currency. Build an ERC-20 token contract, mint tokens, and transfer them on-chain — your first digital ledger.',
        tasks: [
            'Understand mapping(address → uint256) token balances',
            'Deploy CityToken.sol using OpenZeppelin',
            'Mint 100 tokens to your wallet and verify with balanceOf()',
            'Transfer 50 tokens to a teammate — show tx hash to mentor',
        ],
        extra: [
            '🟡 Builder: Add burn(uint256 amount) to destroy tokens',
            '🔴 Architect: Build a staking system with time-based rewards',
        ],
    },
    {
        id: 3,
        number: 'ROOM 03',
        name: 'The Citizen Identity Bureau',
        persona: '🎨 The Identity Minister',
        tag: 'NFT Badges',
        entryPhrase: 'tokenURI',
        color: '#e8a045',
        description:
            'Issue unique digital identities. Each NFT is a provable deed — no two are alike. Your badge reflects your BlockCity journey.',
        tasks: [
            'Understand ERC-721, tokenId, ownerOf(), and tokenURI()',
            'Write personalised Block Badge metadata JSON',
            'Deploy CitizenBadge.sol and mint token #0 to yourself',
            'Verify ownership via ownerOf() and metadata via tokenURI()',
        ],
        extra: [
            '🟡 Builder: batchMintBadge() — mint to multiple addresses at once',
            '🔴 Architect: On-chain pseudo-random rarity score per token',
        ],
    },
    {
        id: 4,
        number: 'ROOM 04',
        name: 'The City Council Chamber',
        persona: '🏛 The Council Speaker',
        tag: 'DAO Voting',
        entryPhrase: 'quorum',
        color: '#c97b3a',
        description:
            'Govern BlockCity by code. Create proposals, cast votes, and execute decisions — all on-chain, transparent and tamper-proof forever.',
        tasks: [
            'Understand Proposal struct, block.timestamp deadlines, and hasVoted mapping',
            'Deploy CityVoting.sol with createProposal() and vote()',
            'Run a live governance simulation with 3 accounts voting',
            'Execute a passed proposal after deadline — verify in Remix logs',
        ],
        extra: [
            '🟡 Builder: Add quorum requirement to execute()',
            '🔴 Architect: Token-weighted voting using Room 2 token balances',
        ],
    },
    {
        id: 5,
        number: 'ROOM 05',
        name: 'The City Control Center',
        persona: '🔧 The City Engineer',
        tag: 'Web3 Frontend',
        entryPhrase: 'provider',
        color: '#F9A24D',
        description:
            'Build the city\'s interface. One HTML file connects your MetaMask wallet to the blockchain — no frameworks, no install required.',
        tasks: [
            'Understand window.ethereum, ethers.BrowserProvider, and ABI',
            'Connect MetaMask wallet — display address on screen',
            'Read city name from deployed contract via getCityName()',
            'Submit a write transaction and confirm it on Etherscan',
        ],
        extra: [
            '🟡 Builder: Add real-time contract.on() event listener',
            '🔴 Architect: Full dashboard showing all 4 contract states simultaneously',
        ],
    },
];

const RoomCard = ({ room }) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                border: `1px solid rgba(249,162,77,0.2)`,
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.03)',
                overflow: 'hidden',
                transition: 'border-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,162,77,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(249,162,77,0.2)')}
        >
            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
                <div className="flex items-center gap-4 flex-wrap">
                    <span
                        className="text-xs font-bold tracking-[0.25em] uppercase"
                        style={{ color: room.color, fontFamily: "'Orbitron', monospace", minWidth: '80px' }}
                    >
                        {room.number}
                    </span>
                    <div>
                        <p className="text-white font-bold text-base md:text-lg" style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.05em' }}>
                            {room.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(249,162,77,0.7)' }}>
                            {room.persona} · {room.tag}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                        className="text-xs font-bold px-3 py-1 rounded-full hidden sm:block"
                        style={{ background: 'rgba(249,162,77,0.1)', color: '#F9A24D', border: '1px solid rgba(249,162,77,0.3)' }}
                    >
                        10 pts
                    </span>
                    {open ? <ChevronUp size={18} color="#F9A24D" /> : <ChevronDown size={18} color="#F9A24D" />}
                </div>
            </button>

            {/* Expanded */}
            {open && (
                <div className="px-6 pb-6 space-y-5">
                    <div
                        style={{
                            height: '1px',
                            background: 'linear-gradient(to right, transparent, rgba(249,162,77,0.3), transparent)',
                            marginBottom: '20px',
                        }}
                    />

                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        {room.description}
                    </p>

                    {/* Entry Phrase */}
                    <div
                        className="flex items-center gap-3 px-4 py-3 rounded-xl"
                        style={{ background: 'rgba(249,162,77,0.07)', border: '1px solid rgba(249,162,77,0.2)' }}
                    >
                        <span className="text-lg">🔑</span>
                        <div>
                            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(249,162,77,0.6)' }}>Room Entry Phrase</p>
                            <p className="font-bold text-sm" style={{ color: '#F9A24D', fontFamily: "'Orbitron', monospace" }}>
                                "{room.entryPhrase}"
                            </p>
                        </div>
                    </div>

                    {/* Tasks */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(249,162,77,0.6)' }}>
                            Tasks to Complete
                        </p>
                        <ul className="space-y-2">
                            {room.tasks.map((task, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                    <span style={{ color: '#F9A24D', marginTop: '2px', flexShrink: 0 }}>▸</span>
                                    {task}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Extra Tasks */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(249,162,77,0.6)' }}>
                            Extra Tasks (Bonus Points)
                        </p>
                        <ul className="space-y-2">
                            {room.extra.map((task, i) => (
                                <li key={i} className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                                    {task}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

const EventPage = () => {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen"
            style={{ background: 'var(--color-primary, #0d0d1a)', fontFamily: "'Rajdhani', sans-serif" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600;700&display=swap');

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .event-animate { animation: slideUp 0.7s ease-out both; }
                .divider-line {
                    height: 1px;
                    background: linear-gradient(to right, transparent, rgba(249,162,77,0.4), transparent);
                }
            `}</style>

            <div className="max-w-4xl mx-auto px-4 py-12">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 mb-10 text-sm uppercase tracking-widest font-bold transition-all duration-200 hover:gap-3"
                    style={{ color: 'rgba(249,162,77,0.7)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F9A24D')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(249,162,77,0.7)')}
                >
                    <ChevronLeft size={16} />
                    Back to Home
                </button>

                {/* Hero */}
                <div className="text-center mb-16 event-animate" style={{ animationDelay: '0.1s' }}>
                    <p className="text-xs font-bold tracking-[0.5em] uppercase mb-4" style={{ color: '#F9A24D' }}>
                        MLSC PRESENTS
                    </p>
                    <h1
                        className="text-5xl md:text-7xl font-black mb-3 uppercase"
                        style={{
                            fontFamily: "'Orbitron', monospace",
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

                {/* What is BlockCity */}
                <section className="mb-14 event-animate" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-xs font-bold tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(249,162,77,0.6)' }}>
                        About the Event
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { icon: '🏙', label: 'Format', value: 'Gamified Web3 Workshop' },
                            { icon: '🚪', label: 'Rooms', value: '5 Independent Rooms' },
                            { icon: '⏱️', label: 'Duration', value: '7.5 – 11 hours total' },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="px-5 py-4 rounded-2xl text-center"
                                style={{ background: 'rgba(249,162,77,0.06)', border: '1px solid rgba(249,162,77,0.15)' }}
                            >
                                <div className="text-2xl mb-2">{item.icon}</div>
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
                                title: 'Say the Entry Phrase',
                                desc: 'Each room has a secret Web3 keyword. Say it to the room\'s persona mentor to enter. The phrase is revealed when you click on each room below.',
                            },
                            {
                                step: '03',
                                title: 'Complete the Room Tasks',
                                desc: 'Build, deploy, and demonstrate your work. Each room has core tasks and optional extra tasks for bonus points.',
                            },
                            {
                                step: '04',
                                title: 'Get Admin Approval & Enter Secret Code',
                                desc: 'Once your work is verified by the room admin, they provide a secret code. Go to your dashboard, select the room, click "Mark as Complete", and enter the code.',
                            },
                            {
                                step: '05',
                                title: 'Score Updates Automatically',
                                desc: 'Your score is updated instantly on the leaderboard. Bonus points awarded by the admin for extra tasks will also appear in your account.',
                            },
                            {
                                step: '06',
                                title: 'Complete All 5 Rooms',
                                desc: 'After finishing all 5 rooms, head to the Final Integration Session — build a unified BlockCity Hub dApp using all your code snippets.',
                            },
                            {
                                step: '07',
                                title: 'Tiebreaker Round',
                                desc: 'If scores are tied at the end, a special Tiebreaker Round determines the final ranking. Stay ready!',
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex gap-5 px-6 py-5 rounded-2xl"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(249,162,77,0.12)' }}
                            >
                                <span
                                    className="text-2xl font-black flex-shrink-0 mt-0.5"
                                    style={{ fontFamily: "'Orbitron', monospace", color: 'rgba(249,162,77,0.25)', minWidth: '36px' }}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {[
                            { label: 'Room Completion (× 5 rooms)', pts: '10 pts each', sub: '50 pts max', highlight: true },
                            { label: 'Final Integration — Working dApp', pts: '20 pts', sub: 'After all 5 rooms', highlight: false },
                            { label: 'Bonus Points', pts: 'Admin-awarded', sub: 'For extra/Builder/Architect tasks', highlight: false },
                            { label: 'Tiebreaker Round', pts: 'Special round', sub: 'Only if scores are tied', highlight: false },
                        ].map((row) => (
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
                                    style={{ fontFamily: "'Orbitron', monospace", color: '#F9A24D' }}
                                >
                                    {row.pts}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Bonus note */}
                    <div
                        className="px-5 py-4 rounded-2xl flex items-start gap-3"
                        style={{ background: 'rgba(249,162,77,0.05)', border: '1px solid rgba(249,162,77,0.2)' }}
                    >
                        <span className="text-lg flex-shrink-0">💡</span>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                            Bonus points are awarded at the admin's discretion for completing Builder (🟡) or Architect (🔴) extra tasks in any room.
                            These are reflected in your score automatically once the admin grants them.
                        </p>
                    </div>
                </section>

                <div className="divider-line mb-14" />

                {/* The 5 Rooms */}
                <section className="mb-14 event-animate" style={{ animationDelay: '0.5s' }}>
                    <h2 className="text-xs font-bold tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(249,162,77,0.6)' }}>
                        The 5 Rooms
                    </h2>
                    <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Rooms are independent — explore in any order. Click to expand details.
                    </p>
                    <div className="space-y-3">
                        {rooms.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </div>
                </section>

                <div className="divider-line mb-14" />

                {/* Tools */}
                <section className="mb-16 event-animate" style={{ animationDelay: '0.6s' }}>
                    <h2 className="text-xs font-bold tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(249,162,77,0.6)' }}>
                        Tools You'll Use
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                            { name: 'Remix IDE', desc: 'Browser Solidity IDE', url: 'remix.ethereum.org' },
                            { name: 'MetaMask', desc: 'Browser wallet', url: 'metamask.io' },
                            { name: 'Polygon Amoy', desc: 'Testnet faucet', url: 'faucet.polygon.technology' },
                            { name: 'Etherscan (Sepolia)', desc: 'Block explorer', url: 'sepolia.etherscan.io' },
                            { name: 'nft.storage', desc: 'Free IPFS uploads', url: 'nft.storage' },
                            { name: 'Ethers.js v6', desc: 'Web3 JS library', url: 'cdn.jsdelivr.net' },
                        ].map((tool) => (
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
                    <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        ✅ Zero setup required — everything runs in the browser. You only need: Chrome + MetaMask + internet.
                    </p>
                </section>

                {/* Footer CTA */}
                <div
                    className="text-center py-10 rounded-3xl event-animate"
                    style={{
                        animationDelay: '0.7s',
                        background: 'rgba(249,162,77,0.05)',
                        border: '1px solid rgba(249,162,77,0.2)',
                    }}
                >
                    <p
                        className="text-2xl md:text-3xl font-black uppercase mb-2"
                        style={{ fontFamily: "'Orbitron', monospace", color: '#F9A24D', letterSpacing: '0.08em' }}
                    >
                        Your City. Your Code.
                    </p>
                    <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        Start building. BlockCity awaits.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-10 py-4 font-bold rounded-xl text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
                        style={{
                            border: '2px solid rgba(249,162,77,0.4)',
                            color: '#F9A24D',
                            background: 'transparent',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#F9A24D';
                            e.currentTarget.style.backgroundColor = 'rgba(249,162,77,0.08)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(249,162,77,0.4)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        View Leaderboard
                    </button>
                </div>

            </div>
        </div>
    );
};

export default EventPage;