import React, { useState, useEffect } from 'react';
import { Scale, Landmark, Fingerprint, Building2, Shield, X, Cloud } from 'lucide-react';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return isMobile;
};

const ROOMS = [
    {
        id: 'room_1',
        name: '1. Law Foundry',
        Icon: Scale,
        description: 'Legal challenges and constitutional puzzles',
        challenge: 'Decode laws, draft contracts, find loopholes',
        status: 'open',
        color: '#ff5500ff',
        x: 13, y: 52,
    },
    {
        id: 'room_2',
        name: '2. Treasury Mint',
        Icon: Landmark,
        description: 'Financial strategy and resource management',
        challenge: 'Budget allocation, crypto puzzles, trade wars',
        status: 'open',
        color: '#83f40bff',
        x: 31, y: 39,
    },
    {
        id: 'room_3',
        name: '3. Identity Bureau',
        Icon: Fingerprint,
        description: 'Citizen verification and identity challenges',
        challenge: 'Forensics, biometrics, identity fraud detection',
        status: 'open',
        color: '#06b6d4',
        x: 48, y: 52,
    },
    {
        id: 'room_4',
        name: '4. Council Chamber',
        Icon: Building2,
        description: 'Governance decisions and policy debates',
        challenge: 'Debates, voting systems, policy drafting',
        status: 'open',
        color: '#fbd83cff',
        x: 66, y: 40,
    },
    {
        id: 'room_5',
        name: '5. Control Center',
        Icon: Shield,
        description: 'Cybersecurity and system defense missions',
        challenge: 'Firewalls, encryption, threat neutralization',
        status: 'open',
        color: '#34d399',
        x: 86, y: 55,
    },
];

const CONNECTIONS = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 0, to: 2 },
    { from: 2, to: 4 },
];

const CityNode = ({ room, onClick, connections, isMobile }) => {
    const [hovered, setHovered] = useState(false);
    const { Icon, color, x, y, name } = room;
    const showAbove = y > 45;

    return (
        <div
            className="absolute cursor-pointer transition-all duration-500 z-20"
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Outer pulse ring */}
            <div
                className="absolute rounded-full animate-ping"
                style={{
                    width: isMobile ? '52px' : '90px', height: isMobile ? '52px' : '90px',
                    left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `2px solid ${color}`,
                    opacity: hovered ? 0.8 : 0.4,
                    animationDuration: hovered ? '1.5s' : '3s',
                }}
            />

            {/* Second ring */}
            <div
                className="absolute rounded-full"
                style={{
                    width: isMobile ? '64px' : '110px', height: isMobile ? '64px' : '110px',
                    left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `1px solid ${hovered ? color : `${color}40`}`,
                    transition: 'all 0.5s',
                    boxShadow: `inset 0 0 20px ${color}20`,
                }}
            />

            {/* Holographic ring */}
            <div
                className="absolute rounded-full transition-all duration-500"
                style={{
                    width: isMobile ? '44px' : '76px', height: isMobile ? '44px' : '76px',
                    left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `3px solid ${hovered ? color : `${color}80`}`,
                    boxShadow: hovered
                        ? `0 0 40px ${color}, inset 0 0 40px ${color}60`
                        : `0 0 20px ${color}60, inset 0 0 10px ${color}30`,
                }}
            />

            {/* Main node */}
            <div
                className="relative rounded-full flex items-center justify-center transition-all duration-500"
                style={{
                    width: isMobile ? '34px' : '60px', height: isMobile ? '34px' : '60px',
                    background: hovered
                        ? `radial-gradient(circle, ${color}90, ${color}40, transparent)`
                        : `radial-gradient(circle, ${color}60, ${color}20, transparent)`,
                    border: `2px solid ${color}`,
                    boxShadow: hovered
                        ? `0 0 50px ${color}, 0 0 100px ${color}`
                        : `0 0 30px ${color}80`,
                    backdropFilter: 'blur(12px)',
                }}
            >
                <Icon
                    size={isMobile ? (hovered ? 16 : 13) : (hovered ? 28 : 24)}
                    style={{ color: '#fff' }}
                    className="transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                />
            </div>

            {/* Floating cloud icon above */}
            {!isMobile && (
                <div
                    className="absolute left-1/2 -translate-x-1/2 transition-all duration-500"
                    style={{ top: '-30px', opacity: hovered ? 1 : 0.35 }}
                >
                    <Cloud
                        size={16}
                        style={{ color }}
                        className={hovered ? 'animate-pulse' : ''}
                        fill={hovered ? `${color}40` : 'none'}
                    />
                </div>
            )}

            {/* Label — always visible, hides when card is showing */}
            {!hovered && (
                <div
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-all duration-300"
                    style={{ top: isMobile ? '38px' : '70px' }}
                >
                    <p
                        className="font-bold tracking-wide"
                        style={{
                            fontSize: isMobile ? '7px' : '12px',
                            color: '#e2e8f0',
                            textShadow: `0 0 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)`,
                        }}
                    >
                        {name}
                    </p>
                </div>
            )}

            {/* ── Hover Detail Card ─────────────────────────────────── */}
            {hovered && (
                <div
                    className="absolute z-50"
                    style={{
                        width: '280px',
                        // horizontal: anchor left for rightmost nodes, right for leftmost, center otherwise
                        left: x > 70 ? 'auto' : x < 30 ? '0' : '50%',
                        right: x > 70 ? '0' : 'auto',
                        transform: (x >= 30 && x <= 70) ? 'translateX(-50%)' : 'none',
                        // vertical: above node if in lower half, below if in upper half
                        ...(showAbove ? { bottom: '90px' } : { top: '90px' }),
                    }}
                >
                    <div
                        className="rounded-xl p-4 border backdrop-blur-xl relative overflow-hidden"
                        style={{
                            backgroundColor: 'rgba(10,10,26,0.95)',
                            borderColor: `${color}40`,
                            boxShadow: `0 0 40px ${color}20, 0 8px 32px rgba(0,0,0,0.6)`,
                        }}
                    >
                        {/* Scan lines overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-5"
                            style={{
                                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${color}15 2px, ${color}15 4px)`,
                            }}
                        />

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-center gap-2.5 mb-3">
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${color}15`, border: `1.5px solid ${color}40` }}
                                >
                                    <Icon size={16} style={{ color }} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white leading-tight">{name}</h4>
                                    <p className="text-[10px] text-gray-400">{room.description}</p>
                                </div>
                            </div>

                            {/* Challenge */}
                            <div className="space-y-2">
                                <div className="bg-black/40 rounded-lg px-3 py-2 border border-white/5">
                                    <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-0.5">Challenge</p>
                                    <p className="text-gray-300 text-xs">{room.challenge}</p>
                                </div>

                                <div className="flex gap-2">
                                    {/* Status */}
                                    <div className="flex-1 bg-black/40 rounded-lg px-3 py-2 border border-white/5">
                                        <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-0.5">Status</p>
                                        <span className={`text-xs font-bold ${room.status === 'open' ? 'text-green-400' : 'text-red-400'}`}>
                                            {room.status === 'open' ? '● Active' : '● Offline'}
                                        </span>
                                    </div>
                                    {/* Network links */}
                                    <div className="flex-1 bg-black/40 rounded-lg px-3 py-2 border border-white/5">
                                        <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-0.5">Network</p>
                                        <p className="text-xs font-medium" style={{ color }}>
                                            {connections} links
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const CityMap = () => {
    const isMobile = useIsMobile();
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleNodeClick = (room) => {
        setSelectedRoom(selectedRoom?.id === room.id ? null : room);
    };

    return (
        <section id="city-map" className="py-16 px-4 relative overflow-hidden bg-transparent">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-10">
                    <h2
                        className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-3"
                        style={{
                            fontFamily: "'Orbitron', sans-serif",
                            color: '#F9A24D',
                            textShadow: '0 0 30px rgba(249,162,77,0.3)',
                        }}
                    >
                        BlockCity Map
                    </h2>
                    <p
                        className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto uppercase tracking-widest"
                        style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                        Explore the city network. Hover over any building to discover its mission.
                    </p>
                </div>

                {/* Map Container */}
                <div className="relative w-full rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)] aspect-square md:aspect-video">

                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden"
                        style={{ backgroundImage: "url('/neon-city-bg.png')" }}
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/40 via-transparent to-[#0a0a1a]/20 rounded-2xl overflow-hidden pointer-events-none" />

                    {/* Connection lines SVG */}
                    <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                    >
                        <defs>
                            <filter id="lineGlow">
                                <feGaussianBlur stdDeviation="0.4" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {CONNECTIONS.map((conn, i) => {
                            const fromRoom = ROOMS[conn.from];
                            const toRoom = ROOMS[conn.to];
                            const isActive = selectedRoom?.id === fromRoom.id || selectedRoom?.id === toRoom.id;
                            const mx = (fromRoom.x + toRoom.x) / 2;
                            const my = Math.min(fromRoom.y, toRoom.y) - 8;
                            const pathData = `M ${fromRoom.x} ${fromRoom.y} Q ${mx} ${my} ${toRoom.x} ${toRoom.y}`;

                            return (
                                <g key={i}>
                                    <path
                                        d={pathData}
                                        fill="none"
                                        stroke={isActive ? '#f472b6' : 'rgba(244,114,182,0.2)'}
                                        strokeWidth={isActive ? 0.3 : 0.1}
                                        vectorEffect="non-scaling-stroke"
                                        opacity={isActive ? 0.9 : 0.35}
                                        filter={isActive ? 'url(#lineGlow)' : ''}
                                        className="transition-all duration-500"
                                        style={{ strokeDasharray: isActive ? 'none' : '1 1' }}
                                    />
                                </g>
                            );
                        })}

                        {/* Travelling dots */}
                        {CONNECTIONS.map((conn, i) => {
                            const fromRoom = ROOMS[conn.from];
                            const toRoom = ROOMS[conn.to];
                            const isActive = selectedRoom?.id === fromRoom.id || selectedRoom?.id === toRoom.id;
                            const mx = (fromRoom.x + toRoom.x) / 2;
                            const my = Math.min(fromRoom.y, toRoom.y) - 8;
                            const pathData = `M ${fromRoom.x} ${fromRoom.y} Q ${mx} ${my} ${toRoom.x} ${toRoom.y}`;

                            return (
                                <circle
                                    key={`dot-${i}`}
                                    r={isActive ? 0.4 : 0.25}
                                    fill={isActive ? '#f472b6' : '#06b6d4'}
                                    opacity={isActive ? 1 : 0.4}
                                    filter={isActive ? 'url(#lineGlow)' : ''}
                                >
                                    <animateMotion
                                        dur={`${2.5 + i * 0.5}s`}
                                        repeatCount="indefinite"
                                        path={pathData}
                                    />
                                </circle>
                            );
                        })}
                    </svg>

                    {/* Room Nodes */}
                    {ROOMS.map((room) => (
                        <CityNode
                            key={room.id}
                            room={room}
                            onClick={() => handleNodeClick(room)}
                            isMobile={isMobile}
                            connections={
                                CONNECTIONS.filter(c =>
                                    ROOMS[c.from].id === room.id || ROOMS[c.to].id === room.id
                                ).length
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CityMap;