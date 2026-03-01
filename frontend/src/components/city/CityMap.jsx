import React, { useState } from 'react';
import { Scale, Landmark, Fingerprint, Building2, Shield, X, Wifi } from 'lucide-react';

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

// Connection paths between buildings
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
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                    width: `${nodeSize + 30}px`,
                    height: `${nodeSize + 30}px`,
                    left: `50%`,
                    top: `50%`,
                    transform: 'translate(-50%, -50%)',
                    border: `1px solid ${color}`,
                    opacity: active ? 0.3 : 0.1,
                    animationDuration: '3s',
                }}
            />

            {/* Holographic ring */}
            <div
                className="absolute rounded-full transition-all duration-500"
                style={{
                    width: `${nodeSize + 16}px`,
                    height: `${nodeSize + 16}px`,
                    left: `50%`,
                    top: `50%`,
                    transform: 'translate(-50%, -50%)',
                    border: `2px solid ${active ? color : `${color}30`}`,
                    boxShadow: active ? `0 0 20px ${color}40, inset 0 0 20px ${color}10` : 'none',
                }}
            />

            {/* Main node */}
            <div
                className="relative rounded-full flex items-center justify-center transition-all duration-500"
                style={{
                    width: `${nodeSize}px`,
                    height: `${nodeSize}px`,
                    background: active
                        ? `radial-gradient(circle, ${color}30, ${color}10, transparent)`
                        : `radial-gradient(circle, ${color}15, transparent)`,
                    border: `2px solid ${active ? color : `${color}40`}`,
                    boxShadow: active
                        ? `0 0 30px ${color}50, 0 0 60px ${color}20`
                        : `0 0 15px ${color}15`,
                }}
            >
                <Icon
                    size={active ? 26 : 22}
                    style={{ color: active ? color : `${color}99` }}
                    className="transition-all duration-300"
                />
            </div>

            {/* Floating icon above */}
            <div
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-500"
                style={{
                    top: '-28px',
                    opacity: active ? 1 : 0.4,
                }}
            >
                <Wifi
                    size={14}
                    style={{ color }}
                    className={active ? 'animate-pulse' : ''}
                />
            </div>

            {/* Label */}
            <div
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-all duration-300"
                style={{ top: `${nodeSize + 8}px` }}
            >
                <p
                    className="text-xs font-bold tracking-wide"
                    style={{ color: active ? color : '#6b7280' }}
                >
                    {name}
                </p>
                {active && (
                    <p className="text-[10px] text-gray-500 mt-0.5">Click to explore</p>
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
        <section id="city-map" className="py-16 px-4 bg-secondary relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl top-1/4 left-1/4" />
                <div className="absolute w-72 h-72 rounded-full bg-purple-500/5 blur-3xl bottom-1/4 right-1/4" />
            </div>

            <div className="max-w-6xl mx-auto relative">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-white mb-3">
                    BlockCity Map
                </h2>
                <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
                    Explore the city network. Click on any node to discover its mission.
                </p>

                {/* Map Container */}
                <div className="relative w-full h-[500px] rounded-2xl border border-gray-700/30 bg-primary/40 backdrop-blur-sm overflow-hidden">
                    {/* Grid pattern background */}
                    <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4a5568" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>

                    {/* Connection lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                        <defs>
                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
                            </linearGradient>

                            {/* Animated dash */}
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {CONNECTIONS.map((conn, i) => {
                            const fromRoom = ROOMS[conn.from];
                            const toRoom = ROOMS[conn.to];
                            const isActive =
                                selectedRoom?.id === fromRoom.id || selectedRoom?.id === toRoom.id;

                            return (
                                <g key={i}>
                                    {/* Glow line */}
                                    <line
                                        x1={`${fromRoom.x}%`}
                                        y1={`${fromRoom.y}%`}
                                        x2={`${toRoom.x}%`}
                                        y2={`${toRoom.y}%`}
                                        stroke={isActive ? '#06b6d4' : '#1e3a5f'}
                                        strokeWidth={isActive ? 2 : 1}
                                        opacity={isActive ? 0.8 : 0.3}
                                        filter={isActive ? 'url(#glow)' : ''}
                                        className="transition-all duration-500"
                                    />
                                    {/* Animated dot traveling along line */}
                                    {isActive && (
                                        <circle r="3" fill="#06b6d4" filter="url(#glow)">
                                            <animateMotion
                                                dur={`${2 + i * 0.5}s`}
                                                repeatCount="indefinite"
                                                path={`M ${fromRoom.x * 10.8},${fromRoom.y * 5} L ${toRoom.x * 10.8},${toRoom.y * 5}`}
                                            />
                                        </circle>
                                    )}
                                </g>
                            );
                        })}

                        {/* Static traveling dots on all lines */}
                        {CONNECTIONS.map((conn, i) => {
                            const fromRoom = ROOMS[conn.from];
                            const toRoom = ROOMS[conn.to];
                            return (
                                <circle
                                    key={`dot-${i}`}
                                    r="1.5"
                                    fill="#06b6d4"
                                    opacity="0.4"
                                >
                                    <animateMotion
                                        dur={`${4 + i}s`}
                                        repeatCount="indefinite"
                                        path={`M ${fromRoom.x * 10.8},${fromRoom.y * 5} L ${toRoom.x * 10.8},${toRoom.y * 5}`}
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
                            backgroundColor: `${selectedRoom.color}08`,
                            borderColor: `${selectedRoom.color}30`,
                            boxShadow: `0 0 60px ${selectedRoom.color}15, inset 0 0 40px ${selectedRoom.color}05`,
                        }}
                    >
                        {/* Scan line effect */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-10"
                            style={{
                                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${selectedRoom.color}10 2px, ${selectedRoom.color}10 4px)`,
                            }}
                        />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center relative"
                                        style={{
                                            backgroundColor: `${selectedRoom.color}15`,
                                            border: `2px solid ${selectedRoom.color}40`,
                                            boxShadow: `0 0 20px ${selectedRoom.color}20`,
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
