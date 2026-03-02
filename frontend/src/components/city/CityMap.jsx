import React, { useState } from 'react';
import { Scale, Landmark, Fingerprint, Building2, Shield, X, Cloud } from 'lucide-react';

const ROOMS = [
    {
        id: 'room_1',
        name: '1. Law Foundry',
        Icon: Scale,
        description: 'Legal challenges and constitutional puzzles',
        challenge: 'Decode laws, draft contracts, find loopholes',
        status: 'open',
        color: '#ff5500ff',
        // On the blue cloud above left building
        x: 16, y: 57,
    },
    {
        id: 'room_2',
        name: '2. Treasury Mint',
        Icon: Landmark,
        description: 'Financial strategy and resource management',
        challenge: 'Budget allocation, crypto puzzles, trade wars',
        status: 'open',
        color: '#83f40bff',
        // On the blue cloud above center-left tower
        x: 33, y: 45,
    },
    {
        id: 'room_3',
        name: '3. Identity Bureau',
        Icon: Fingerprint,
        description: 'Citizen verification and identity challenges',
        challenge: 'Forensics, biometrics, identity fraud detection',
        status: 'open',
        color: '#06b6d4',
        // On the blue cloud above center main building
        x: 51, y: 55,
    },
    {
        id: 'room_4',
        name: '4. Council Chamber',
        Icon: Building2,
        description: 'Governance decisions and policy debates',
        challenge: 'Debates, voting systems, policy drafting',
        status: 'open',
        color: '#fbd83cff',
        // On the blue cloud above right building
        x: 68, y: 45,
    },
    {
        id: 'room_5',
        name: '5. Control Center',
        Icon: Shield,
        description: 'Cybersecurity and system defense missions',
        challenge: 'Firewalls, encryption, threat neutralization',
        status: 'open',
        color: '#34d399',
        // On the blue cloud above far-right building
        x: 88, y: 59,
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

const CityNode = ({ room, isSelected, onClick, connections }) => {
    const [hovered, setHovered] = useState(false);
    const { Icon, color, x, y, name } = room;
    const active = isSelected || hovered;
    const showAbove = y > 45; // Show card above if node is in the lower half

    return (
        <div
            className="absolute cursor-pointer transition-all duration-500 z-20 animate-float-node"
            style={{
                left: `${x}%`,
                top: `${y}%`,
            }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Outer pulse ring */}
            <div
                className="absolute rounded-full animate-ping"
                style={{
                    width: '90px',
                    height: '90px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `2px solid ${color}`,
                    opacity: active ? 0.8 : 0.4,
                    animationDuration: active ? '1.5s' : '3s',
                }}
            />

            {/* Second ring */}
            <div
                className="absolute rounded-full"
                style={{
                    width: '110px',
                    height: '110px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `1px solid ${active ? `${color}` : `${color}40`}`,
                    transition: 'all 0.5s',
                    boxShadow: `inset 0 0 20px ${color}20`,
                }}
            />

            {/* Holographic ring */}
            <div
                className="absolute rounded-full transition-all duration-500"
                style={{
                    width: '76px',
                    height: '76px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `3px solid ${active ? color : `${color}80`}`,
                    boxShadow: active
                        ? `0 0 40px ${color}, inset 0 0 40px ${color}60`
                        : `0 0 20px ${color}60, inset 0 0 10px ${color}30`,
                }}
            />

            {/* Main node */}
            <div
                className="relative rounded-full flex items-center justify-center transition-all duration-500"
                style={{
                    width: '60px',
                    height: '60px',
                    background: active
                        ? `radial-gradient(circle, ${color}90, ${color}40, transparent)`
                        : `radial-gradient(circle, ${color}60, ${color}20, transparent)`,
                    border: `2px solid ${color}`,
                    boxShadow: active
                        ? `0 0 50px ${color}, 0 0 100px ${color}`
                        : `0 0 30px ${color}80`,
                    backdropFilter: 'blur(12px)',
                }}
            >
                <Icon
                    size={active ? 28 : 24}
                    style={{ color: '#fff' }}
                    className="transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                />
            </div>

            {/* Floating cloud icon above */}
            <div
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-500"
                style={{
                    top: '-30px',
                    opacity: active ? 1 : 0.35,
                }}
            >
                <Cloud
                    size={16}
                    style={{ color }}
                    className={active ? 'animate-pulse' : ''}
                    fill={active ? `${color}40` : 'none'}
                />
            </div>

            {/* Label */}
            {!isSelected && (
                <div
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-all duration-300"
                    style={{ top: '70px' }}
                >
                    <p
                        className="text-xs font-bold tracking-wide"
                        style={{
                            color: active ? '#fff' : '#e2e8f0',
                            textShadow: `0 0 12px ${active ? color : 'rgba(0,0,0,0.9)'}, 0 2px 4px rgba(0,0,0,0.8)`,
                        }}
                    >
                        {name}
                    </p>
                    {active && (
                        <p className="text-[10px] text-gray-300 mt-0.5" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                            Click to explore
                        </p>
                    )}
                </div>
            )}

            {/* Inline Info Card — appears above or below node */}
            {isSelected && (
                <div
                    className="absolute z-50 animate-fadeIn"
                    style={{
                        width: '280px',
                        left: x > 70 ? 'auto' : x < 30 ? '0' : '50%',
                        right: x > 70 ? '0' : 'auto',
                        transform: x >= 30 && x <= 70 ? 'translateX(-50%)' : 'none',
                        ...(showAbove
                            ? { bottom: '90px' }
                            : { top: '90px' }),
                    }}
                >
                    <div
                        className="rounded-xl p-4 border backdrop-blur-xl relative overflow-hidden"
                        style={{
                            backgroundColor: 'rgba(10, 10, 26, 0.95)',
                            borderColor: `${color}40`,
                            boxShadow: `0 0 40px ${color}20, 0 8px 32px rgba(0,0,0,0.6)`,
                        }}
                    >
                        {/* Scan lines */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-5"
                            style={{
                                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${color}15 2px, ${color}15 4px)`,
                            }}
                        />

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2.5">
                                    <div
                                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                                        style={{
                                            backgroundColor: `${color}15`,
                                            border: `1.5px solid ${color}40`,
                                        }}
                                    >
                                        <Icon size={16} style={{ color }} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white leading-tight">{name}</h4>
                                        <p className="text-[10px] text-gray-400">{room.description}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onClick(); }}
                                    className="p-1 rounded text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="space-y-2">
                                <div className="bg-black/40 rounded-lg px-3 py-2 border border-white/5">
                                    <p className="text-gray-500 text-[9px] uppercase tracking-widest">Challenge</p>
                                    <p className="text-gray-300 text-xs mt-0.5">{room.challenge}</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1 bg-black/40 rounded-lg px-3 py-2 border border-white/5">
                                        <p className="text-gray-500 text-[9px] uppercase tracking-widest">Status</p>
                                        <span className={`text-xs font-bold ${room.status === 'open' ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {room.status === 'open' ? '● Active' : '● Offline'}
                                        </span>
                                    </div>
                                    <div className="flex-1 bg-black/40 rounded-lg px-3 py-2 border border-white/5">
                                        <p className="text-gray-500 text-[9px] uppercase tracking-widest">Network</p>
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
                        Explore the city network. Click on any building to discover its mission.
                    </p>
                </div>

                {/* Map Container */}
                <div className="relative w-full rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)] aspect-square md:aspect-video"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden"
                        style={{ backgroundImage: "url('/neon-city-bg.png')" }}
                    />
                    {/* Subtle dark overlay for node readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/40 via-transparent to-[#0a0a1a]/20 rounded-2xl overflow-hidden pointer-events-none" />

                    {/* Connection lines */}
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-10 pointer-events-none">
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

                            // Curved path (using 0-100 coordinates equivalent to percentages)
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
                                        style={{
                                            strokeDasharray: isActive ? 'none' : '1 1',
                                        }}
                                    />
                                </g>
                            );
                        })}

                        {/* Traveling dots */}
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

                    {/* Building Nodes */}
                    {ROOMS.map((room) => (
                        <CityNode
                            key={room.id}
                            room={room}
                            isSelected={selectedRoom?.id === room.id}
                            onClick={() => handleNodeClick(room)}
                            connections={CONNECTIONS.filter(c =>
                                ROOMS[c.from].id === room.id || ROOMS[c.to].id === room.id
                            ).length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CityMap;
