import React, { useState } from 'react';
import { Scale, Landmark, Fingerprint, Building2, Shield, X, Wifi, Cloud } from 'lucide-react';

const ROOMS = [
    {
        id: 'room_1',
        name: '1. Law Foundry',
        Icon: Scale,
        description: 'Legal challenges and constitutional puzzles',
        challenge: 'Decode laws, draft contracts, find loopholes',
        status: 'open',
        color: '#8b5cf6',
        x: 12, y: 68,
    },
    {
        id: 'room_2',
        name: '2. Treasury Mint',
        Icon: Landmark,
        description: 'Financial strategy and resource management',
        challenge: 'Budget allocation, crypto puzzles, trade wars',
        status: 'open',
        color: '#f59e0b',
        x: 32, y: 42,
    },
    {
        id: 'room_3',
        name: '3. Identity Bureau',
        Icon: Fingerprint,
        description: 'Citizen verification and identity challenges',
        challenge: 'Forensics, biometrics, identity fraud detection',
        status: 'open',
        color: '#06b6d4',
        x: 50, y: 28,
    },
    {
        id: 'room_4',
        name: '4. Council Chamber',
        Icon: Building2,
        description: 'Governance decisions and policy debates',
        challenge: 'Debates, voting systems, policy drafting',
        status: 'open',
        color: '#ec4899',
        x: 68, y: 48,
    },
    {
        id: 'room_5',
        name: '5. Control Center',
        Icon: Shield,
        description: 'Cybersecurity and system defense missions',
        challenge: 'Firewalls, encryption, threat neutralization',
        status: 'open',
        color: '#22c55e',
        x: 85, y: 62,
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

const CityNode = ({ room, isSelected, onClick }) => {
    const [hovered, setHovered] = useState(false);
    const { Icon, color, x, y, name } = room;
    const active = isSelected || hovered;
    const nodeSize = active ? 72 : 64;

    return (
        <div
            className="absolute cursor-pointer transition-all duration-500 z-20"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%)`,
            }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Outer pulse ring */}
            <div
                className="absolute rounded-full animate-ping"
                style={{
                    width: `${nodeSize + 30}px`,
                    height: `${nodeSize + 30}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `1px solid ${color}`,
                    opacity: active ? 0.4 : 0.1,
                    animationDuration: '3s',
                }}
            />

            {/* Holographic ring */}
            <div
                className="absolute rounded-full transition-all duration-500"
                style={{
                    width: `${nodeSize + 16}px`,
                    height: `${nodeSize + 16}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `2px solid ${active ? color : `${color}30`}`,
                    boxShadow: active ? `0 0 25px ${color}50, inset 0 0 25px ${color}15` : 'none',
                }}
            />

            {/* Main node */}
            <div
                className="relative rounded-full flex items-center justify-center transition-all duration-500"
                style={{
                    width: `${nodeSize}px`,
                    height: `${nodeSize}px`,
                    background: active
                        ? `radial-gradient(circle, ${color}35, ${color}12, transparent)`
                        : `radial-gradient(circle, ${color}18, transparent)`,
                    border: `2px solid ${active ? color : `${color}40`}`,
                    boxShadow: active
                        ? `0 0 40px ${color}50, 0 0 80px ${color}20`
                        : `0 0 20px ${color}15`,
                    backdropFilter: 'blur(8px)',
                }}
            >
                <Icon
                    size={active ? 26 : 22}
                    style={{ color: active ? '#fff' : `${color}cc` }}
                    className="transition-all duration-300 drop-shadow-lg"
                />
            </div>

            {/* Floating cloud/wifi icon above */}
            <div
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-500"
                style={{
                    top: '-32px',
                    opacity: active ? 1 : 0.4,
                }}
            >
                <Cloud
                    size={16}
                    style={{ color }}
                    className={active ? 'animate-pulse' : ''}
                    fill={active ? `${color}30` : 'none'}
                />
            </div>

            {/* Label */}
            <div
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-all duration-300"
                style={{ top: `${nodeSize + 8}px` }}
            >
                <p
                    className="text-xs font-bold tracking-wide drop-shadow-md"
                    style={{ color: active ? '#fff' : '#d1d5db', textShadow: active ? `0 0 10px ${color}` : '0 1px 3px rgba(0,0,0,0.8)' }}
                >
                    {name}
                </p>
                {active && (
                    <p className="text-[10px] text-gray-300 mt-0.5" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>Click to explore</p>
                )}
            </div>
        </div>
    );
};

const CityMap = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleNodeClick = (room) => {
        setSelectedRoom(selectedRoom?.id === room.id ? null : room);
    };

    return (
        <section id="city-map" className="py-16 px-4 relative overflow-hidden">
            {/* Full background image — same as hero */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/blockcity-bg.png')" }}
            />
            {/* Overlay to darken and blend */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary via-primary/70 to-primary" />

            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-white mb-3 drop-shadow-lg">
                    BlockCity Map
                </h2>
                <p className="text-gray-300 text-center mb-12 max-w-xl mx-auto drop-shadow-md">
                    Explore the city network. Click on any node to discover its mission.
                </p>

                {/* Map Container */}
                <div className="relative w-full h-[550px] rounded-2xl border border-gray-600/20 overflow-hidden">
                    {/* Inner background — city image with stronger visibility */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: "url('/blockcity-bg.png')" }}
                    />
                    {/* Dark overlay so nodes are visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/90 via-[#0a0a1a]/60 to-[#1a1030]/70" />

                    {/* SVG Skyline Silhouette */}
                    <svg className="absolute bottom-0 left-0 w-full h-48 z-[5] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 200">
                        <defs>
                            <linearGradient id="skylineGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#1a1030" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#0a0a1a" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                        {/* Buildings silhouette */}
                        <path
                            d="M0,200 L0,180 L30,180 L30,140 L50,140 L50,160 L70,160 L70,120 L85,120 L85,100 L95,100 L95,120 L110,120 L110,150 L130,150 L130,130 L145,130 L145,90 L155,90 L155,85 L160,80 L165,85 L165,90 L175,90 L175,130 L190,130 L190,155 L210,155 L210,110 L225,110 L225,70 L235,70 L235,60 L240,55 L245,60 L245,70 L255,70 L255,110 L270,110 L270,145 L290,145 L290,125 L310,125 L310,95 L320,95 L320,80 L325,75 L330,80 L330,95 L340,95 L340,125 L360,125 L360,155 L380,155 L380,135 L400,135 L400,105 L415,105 L415,75 L425,75 L425,65 L430,60 L435,65 L435,75 L445,75 L445,105 L460,105 L460,140 L480,140 L480,160 L510,160 L510,130 L530,130 L530,100 L540,100 L540,70 L545,65 L550,70 L550,100 L560,100 L560,130 L580,130 L580,145 L600,145 L600,120 L620,120 L620,90 L635,90 L635,60 L640,55 L645,60 L645,90 L660,90 L660,120 L680,120 L680,150 L700,150 L700,135 L720,135 L720,110 L740,110 L740,80 L750,80 L750,65 L755,60 L760,65 L760,80 L770,80 L770,110 L790,110 L790,140 L810,140 L810,155 L830,155 L830,130 L850,130 L850,100 L865,100 L865,85 L870,80 L875,85 L875,100 L890,100 L890,130 L910,130 L910,150 L940,150 L940,125 L960,125 L960,105 L975,105 L975,140 L1000,140 L1000,160 L1020,160 L1020,135 L1040,135 L1040,155 L1060,155 L1060,170 L1080,170 L1080,145 L1100,145 L1100,160 L1130,160 L1130,175 L1160,175 L1160,165 L1180,165 L1180,180 L1200,180 L1200,200 Z"
                            fill="url(#skylineGrad)"
                        />
                        {/* Window lights */}
                        {[92, 158, 238, 328, 430, 545, 640, 755, 870].map((bx, i) => (
                            <g key={i}>
                                <rect x={bx - 3} y={75 + (i % 3) * 12} width="4" height="3" fill="#f59e0b" opacity={0.3 + (i % 3) * 0.15} className="animate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
                                <rect x={bx + 3} y={82 + (i % 2) * 10} width="4" height="3" fill="#f59e0b" opacity={0.2 + (i % 2) * 0.2} className="animate-pulse" style={{ animationDelay: `${i * 0.6}s` }} />
                            </g>
                        ))}
                    </svg>

                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="blur" />
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

                            return (
                                <g key={i}>
                                    <line
                                        x1={`${fromRoom.x}%`}
                                        y1={`${fromRoom.y}%`}
                                        x2={`${toRoom.x}%`}
                                        y2={`${toRoom.y}%`}
                                        stroke={isActive ? '#06b6d4' : '#1e3a5f'}
                                        strokeWidth={isActive ? 2.5 : 1}
                                        opacity={isActive ? 0.9 : 0.25}
                                        filter={isActive ? 'url(#glow)' : ''}
                                        className="transition-all duration-500"
                                    />
                                </g>
                            );
                        })}

                        {/* Traveling dots */}
                        {CONNECTIONS.map((conn, i) => {
                            const fromRoom = ROOMS[conn.from];
                            const toRoom = ROOMS[conn.to];
                            const isActive = selectedRoom?.id === fromRoom.id || selectedRoom?.id === toRoom.id;
                            return (
                                <circle
                                    key={`dot-${i}`}
                                    r={isActive ? 2.5 : 1.5}
                                    fill={isActive ? '#06b6d4' : '#1e3a5f'}
                                    opacity={isActive ? 0.9 : 0.3}
                                    filter={isActive ? 'url(#glow)' : ''}
                                >
                                    <animateMotion
                                        dur={`${3 + i}s`}
                                        repeatCount="indefinite"
                                        path={`M ${fromRoom.x * 10.8},${fromRoom.y * 5.5} L ${toRoom.x * 10.8},${toRoom.y * 5.5}`}
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
                        />
                    ))}
                </div>

                {/* Selected Room Info Panel */}
                {selectedRoom && (
                    <div
                        className="max-w-2xl mx-auto mt-6 rounded-2xl p-6 border backdrop-blur-xl animate-fadeIn relative overflow-hidden"
                        style={{
                            backgroundColor: `${selectedRoom.color}0a`,
                            borderColor: `${selectedRoom.color}30`,
                            boxShadow: `0 0 60px ${selectedRoom.color}15, inset 0 0 40px ${selectedRoom.color}05`,
                        }}
                    >
                        {/* Scan line effect */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-5"
                            style={{
                                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${selectedRoom.color}15 2px, ${selectedRoom.color}15 4px)`,
                            }}
                        />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                                        style={{
                                            backgroundColor: `${selectedRoom.color}15`,
                                            border: `2px solid ${selectedRoom.color}40`,
                                            boxShadow: `0 0 25px ${selectedRoom.color}25`,
                                        }}
                                    >
                                        <selectedRoom.Icon size={24} style={{ color: selectedRoom.color }} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-heading font-bold text-white">
                                            {selectedRoom.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm">{selectedRoom.description}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedRoom(null)}
                                    className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-gray-700/50 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                                <div className="bg-primary/60 rounded-lg p-3 border border-gray-700/30">
                                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">Challenge</p>
                                    <p className="text-gray-300 text-sm mt-1">{selectedRoom.challenge}</p>
                                </div>
                                <div className="bg-primary/60 rounded-lg p-3 border border-gray-700/30">
                                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">Status</p>
                                    <p className="mt-1">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${selectedRoom.status === 'open'
                                                ? 'bg-green-500/15 text-green-400 border-green-500/30'
                                                : 'bg-red-500/15 text-red-400 border-red-500/30'
                                            }`}>
                                            {selectedRoom.status === 'open' ? '● Active' : '● Offline'}
                                        </span>
                                    </p>
                                </div>
                                <div className="bg-primary/60 rounded-lg p-3 border border-gray-700/30">
                                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">Network</p>
                                    <p className="text-cyan-400 text-sm mt-1 font-medium">Connected to {
                                        CONNECTIONS.filter(c =>
                                            ROOMS[c.from].id === selectedRoom.id || ROOMS[c.to].id === selectedRoom.id
                                        ).length
                                    } nodes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CityMap;
