import React, { useState } from 'react';

// --- SVG Icons (Strictly No Emojis) ---
const ChevronDownIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const RefreshIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 1 0 2.81-6.55L21 8"></path></svg>
);
const BuildingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
);

// --- Data Models ---
const buildings = [
    { id: 1, name: 'Law Foundry', desc: 'Establish the rules of the chain.', diff: 2, duration: '15m', top: '20%', left: '30%' },
    { id: 2, name: 'Treasury Mint', desc: 'Secure the vault algorithms.', diff: 3, duration: '30m', top: '45%', left: '60%' },
    { id: 3, name: 'Identity Bureau', desc: 'Verify citizen nodes.', diff: 1, duration: '10m', top: '65%', left: '20%' },
    { id: 4, name: 'Council Chamber', desc: 'Propose and execute governance.', diff: 2, duration: '20m', top: '70%', left: '75%' },
    { id: 5, name: 'Control Center', desc: 'Master the core network logic.', diff: 3, duration: '45m', top: '35%', left: '80%' },
];

const leaderboardData = [
    { rank: 1, id: 'CTX-9901', name: '0xCipher', points: 14500, tier: 'Architect' },
    { rank: 2, id: 'CTX-8822', name: 'NeonVoid', points: 13200, tier: 'Architect' },
    { rank: 3, id: 'CTX-7734', name: 'BlockSniper', points: 12150, tier: 'Builder' },
    { rank: 4, id: 'CTX-4451', name: 'NodeRunner', points: 9800, tier: 'Builder' },
    { rank: 5, id: 'CTX-1129', name: 'HashQueen', points: 8400, tier: 'Explorer' },
];

export default function AnvayaLanding() {
    const [activeBuilding, setActiveBuilding] = useState(null);

    return (
        <div className="min-h-screen bg-[#0F1020] text-white font-sans selection:bg-[#F9A24D] selection:text-black">

            {/* SECTION 1 — HERO */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Background Layer */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/sunset-skyline.jpg')" }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#0F1020]/90" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-8">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-widest uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                        ANVAYA
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-light tracking-wide text-[#F9A24D]">
                        The BlockCity Edition
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
                        Navigate through rooms, solve challenges, earn points, and rise through the tiers to become BlockCity's top citizen.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 pt-8">
                        <button className="px-8 py-4 bg-transparent border border-[#F9A24D] text-[#F9A24D] font-bold tracking-wider rounded-xl shadow-[0_0_25px_rgba(249,162,77,0.25)] hover:shadow-[0_0_35px_rgba(249,162,77,0.4)] hover:scale-105 transition-all duration-300">
                            VIEW LEADERBOARD
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold tracking-wider rounded-xl hover:bg-white/5 hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300">
                            FIND YOUR BADGE
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 animate-bounce text-white/50">
                    <ChevronDownIcon />
                </div>
            </section>

            {/* SECTION 2 — CITY MAP */}
            <section className="relative min-h-screen py-24 flex flex-col items-center border-t border-white/5 bg-[#0F1020]">
                <div className="text-center mb-12 relative z-10">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-wide uppercase text-white drop-shadow-lg">City Map</h3>
                    <p className="text-[#F9A24D] mt-2">Select a sector to begin your trial</p>
                </div>

                {/* Map Container */}
                <div className="relative w-full max-w-6xl h-[600px] md:h-[800px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#1A1A2E]">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                        style={{ backgroundImage: "url('/neon-network.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-[#0F1020]/40" />

                    {/* Map Markers */}
                    {buildings.map((b) => (
                        <div
                            key={b.id}
                            className="absolute group cursor-pointer"
                            style={{ top: b.top, left: b.left }}
                            onMouseEnter={() => setActiveBuilding(b.id)}
                            onMouseLeave={() => setActiveBuilding(null)}
                        >
                            {/* Marker Core */}
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#161B2F]/80 border border-[#00d2ff]/50 shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,210,255,0.8)]">
                                <div className="w-4 h-4 rounded-full bg-[#00d2ff] animate-pulse" />
                            </div>

                            {/* Floating Info Card (Hover) */}
                            <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-64 p-4 rounded-xl bg-[#161B2F]/95 backdrop-blur-md border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.8)] transition-all duration-300 ${activeBuilding === b.id ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'}`}>
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="text-[#00d2ff]"><BuildingIcon /></div>
                                    <h4 className="font-bold text-lg text-white">{b.name}</h4>
                                </div>
                                <p className="text-sm text-gray-400 mb-3">{b.desc}</p>
                                <div className="flex items-center justify-between text-xs font-mono text-[#F9A24D]">
                                    <span>Difficulty: {'●'.repeat(b.diff)}{'○'.repeat(3 - b.diff)}</span>
                                    <span>{b.duration}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 3 — LIVE LEADERBOARD PREVIEW */}
            <section className="relative py-24 px-4 bg-[#0F1020] flex flex-col items-center">
                <div className="w-full max-w-4xl bg-[#161B2F]/60 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">Live Leaderboard</h3>
                        <button className="text-gray-400 hover:text-white transition-colors"><RefreshIcon /></button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs font-mono text-gray-400 uppercase border-b border-white/5">
                                    <th className="py-4 px-4">Rank</th>
                                    <th className="py-4 px-4">Citizen ID</th>
                                    <th className="py-4 px-4">Name</th>
                                    <th className="py-4 px-4">Points</th>
                                    <th className="py-4 px-4 text-right">Tier Badge</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardData.map((row, index) => (
                                    <tr key={row.id} className={`border-b border-white/5 transition-colors hover:bg-white/5 ${index < 3 ? 'text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]' : 'text-gray-300'}`}>
                                        <td className="py-4 px-4 font-bold">{row.rank}</td>
                                        <td className="py-4 px-4 font-mono text-sm opacity-80">{row.id}</td>
                                        <td className="py-4 px-4 font-medium">{row.name}</td>
                                        <td className="py-4 px-4 font-mono">{row.points.toLocaleString()}</td>
                                        <td className="py-4 px-4 text-right">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${row.tier === 'Architect' ? 'border-[#F44336] text-[#F44336]' : row.tier === 'Builder' ? 'border-[#FFC107] text-[#FFC107]' : 'border-[#4CAF50] text-[#4CAF50]'}`}>
                                                {row.tier}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button className="px-6 py-3 text-sm tracking-widest text-white/70 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                            VIEW FULL LEADERBOARD
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION 4 — BADGE LOOKUP */}
            <section className="relative py-24 px-4 bg-[#1A1A2E]/50 border-t border-white/5 flex flex-col items-center">
                <div className="w-full max-w-3xl flex flex-col items-center space-y-12">

                    <div className="text-center space-y-4">
                        <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">Find Your Badge</h3>
                        <div className="flex items-center w-full max-w-md mx-auto relative">
                            <input
                                type="text"
                                placeholder="Enter Citizen ID (e.g., CTX-9901)"
                                className="w-full bg-[#161B2F] border border-white/20 rounded-xl py-4 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-[#F9A24D] focus:shadow-[0_0_15px_rgba(249,162,77,0.2)] transition-all font-mono"
                            />
                            <button className="absolute right-4 text-[#F9A24D] hover:scale-110 transition-transform">
                                <SearchIcon />
                            </button>
                        </div>
                    </div>

                    {/* Mock Badge Preview */}
                    <div className="w-full max-w-md bg-gradient-to-br from-[#161B2F] to-[#0F1020] border border-[#F44336]/30 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(244,67,54,0.15)]">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F44336]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">Citizen Record</p>
                                <h4 className="text-2xl font-bold text-white">0xCipher</h4>
                                <p className="text-[#F9A24D] font-mono text-sm mt-1">ID: CTX-9901</p>
                            </div>
                            <div className="w-16 h-16 rounded-full border-4 border-[#F44336] shadow-[0_0_15px_rgba(244,67,54,0.4)] flex items-center justify-center bg-[#1A1A2E]">
                                <span className="text-[#F44336] font-bold text-xs">TOP 1%</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                            <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                                <p className="text-xs text-gray-400 mb-1">Rooms Cleared</p>
                                <p className="text-xl font-mono text-white">5 / 5</p>
                            </div>
                            <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                                <p className="text-xs text-gray-400 mb-1">Total Points</p>
                                <p className="text-xl font-mono text-white">14,500</p>
                            </div>
                        </div>

                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative z-10">
                            <div className="w-full h-full bg-[#F44336] shadow-[0_0_10px_rgba(244,67,54,1)]" />
                        </div>
                        <p className="text-center text-xs text-[#F44336] font-bold tracking-widest uppercase mt-4 relative z-10">Architect Tier Reached</p>
                    </div>

                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-[#0F1020] border-t border-white/10 pt-16 pb-8 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    <div>
                        <h4 className="text-xl font-bold tracking-widest uppercase mb-4 text-white">ANVAYA</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            The BlockCity Edition is a premier Web3 challenge. Navigate the smart city, decode the algorithms, and claim your tier in the digital hierarchy.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold tracking-widest uppercase mb-4 text-gray-500">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-300 font-mono">
                            <li><a href="#" className="hover:text-[#F9A24D] transition-colors">/ Leaderboard</a></li>
                            <li><a href="#" className="hover:text-[#F9A24D] transition-colors">/ City Map</a></li>
                            <li><a href="#" className="hover:text-[#F9A24D] transition-colors">/ Find Badge</a></li>
                            <li><a href="#" className="hover:text-[#E06C75] transition-colors">/ Admin Access</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold tracking-widest uppercase mb-4 text-gray-500">Comms Network</h4>
                        <ul className="space-y-2 text-sm text-gray-300 font-mono">
                            <li>SYS.EMAIL: connect@blockcity.io</li>
                            <li>SYS.COMMS: +1 (800) 555-0199</li>
                        </ul>
                    </div>

                </div>

                <div className="max-w-6xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
                    <p>© 2026 ANVAYA. All nodes secured.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {/* Simple SVG placeholders for social icons */}
                        <a href="#" className="hover:text-white transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a>
                        <a href="#" className="hover:text-white transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                    </div>
                </div>
            </footer>

        </div>
    );
}