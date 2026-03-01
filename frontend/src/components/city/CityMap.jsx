import React, { useState } from 'react';
import { Scale, Landmark, Fingerprint, Building2, Shield, X, MapPin } from 'lucide-react';

const ROOMS = [
    {
        id: 'room_1',
        name: '1. Law Foundry',
        Icon: Scale,
        description: 'Legal challenges and constitutional puzzles',
        challenge: 'Decode laws, draft contracts, find loopholes',
        status: 'open',
        color: '#8b5cf6',
        height: 180,
        xPos: 8,
    },
    {
        id: 'room_2',
        name: '2. Treasury Mint',
        Icon: Landmark,
        description: 'Financial strategy and resource management',
        challenge: 'Budget allocation, crypto puzzles, trade wars',
        status: 'open',
        color: '#f59e0b',
        height: 220,
        xPos: 25,
    },
    {
        id: 'room_3',
        name: '3. Identity Bureau',
        Icon: Fingerprint,
        description: 'Citizen verification and identity challenges',
        challenge: 'Forensics, biometrics, identity fraud detection',
        status: 'open',
        color: '#06b6d4',
        height: 260,
        xPos: 42,
    },
    {
        id: 'room_4',
        name: '4. Council Chamber',
        Icon: Building2,
        description: 'Governance decisions and policy debates',
        challenge: 'Debates, voting systems, policy drafting',
        status: 'open',
        color: '#ec4899',
        height: 200,
        xPos: 59,
    },
    {
        id: 'room_5',
        name: '5. Control Center',
        Icon: Shield,
        description: 'Cybersecurity and system defense missions',
        challenge: 'Firewalls, encryption, threat neutralization',
        status: 'open',
        color: '#22c55e',
        height: 240,
        xPos: 76,
    },
];

const BuildingBlock = ({ room, isSelected, onClick }) => {
    const { Icon, height, xPos, color, name } = room;
    const [hovered, setHovered] = useState(false);
    const isActive = isSelected || hovered;

    return (
        <div
            className="absolute bottom-0 cursor-pointer transition-all duration-300"
            style={{
                left: `${xPos}%`,
                width: '15%',
                height: `${height}px`,
                transform: isActive ? 'translateY(-8px)' : 'translateY(0)',
                filter: isActive ? `drop-shadow(0 0 20px ${color}60)` : 'none',
            }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Building SVG */}
            <div className="relative w-full h-full">
                <svg
                    viewBox="0 0 100 200"
                    className="w-full h-full"
                    preserveAspectRatio="xMidYMax meet"
                >
                    {/* Building body */}
                    <rect
                        x="10"
                        y="20"
                        width="80"
                        height="180"
                        rx="4"
                        fill={isActive ? `${color}30` : '#1a1a2e'}
                        stroke={isActive ? color : '#333'}
                        strokeWidth={isActive ? 2 : 1}
                        className="transition-all duration-300"
                    />

                    {/* Windows */}
                    {[0, 1, 2, 3, 4, 5].map((row) =>
                        [0, 1, 2].map((col) => (
                            <rect
                                key={`${row}-${col}`}
                                x={20 + col * 24}
                                y={35 + row * 26}
                                width="16"
                                height="12"
                                rx="1"
                                fill={isActive ? `${color}50` : '#2a2a4a'}
                                className="transition-all duration-500"
                                style={{
                                    animationDelay: `${(row + col) * 0.1}s`,
                                }}
                            />
                        ))
                    )}

                    {/* Rooftop accent */}
                    <rect
                        x="10"
                        y="15"
                        width="80"
                        height="8"
                        rx="2"
                        fill={isActive ? color : '#2a2a4a'}
                        className="transition-all duration-300"
                    />

                    {/* Antenna */}
                    <line
                        x1="50"
                        y1="15"
                        x2="50"
                        y2="2"
                        stroke={isActive ? color : '#444'}
                        strokeWidth="2"
                    />
                    <circle
                        cx="50"
                        cy="2"
                        r="2"
                        fill={isActive ? color : '#555'}
                        className={isActive ? 'animate-pulse' : ''}
                    />
                </svg>

                {/* Label below building */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span
                        className="text-xs font-bold transition-colors duration-300"
                        style={{ color: isActive ? color : '#6b7280' }}
                    >
                        {name}
                    </span>
                </div>

                {/* Hover Tooltip */}
                {hovered && !isSelected && (
                    <div
                        className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white whitespace-nowrap z-30 border"
                        style={{ backgroundColor: `${color}20`, borderColor: `${color}60`, color }}
                    >
                        <MapPin size={10} className="inline mr-1" />
                        Click to explore
                    </div>
                )}
            </div>
        </div>
    );
};

const CityMap = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleBuildingClick = (room) => {
        setSelectedRoom(selectedRoom?.id === room.id ? null : room);
    };

    return (
        <section id="city-map" className="py-16 px-4 bg-secondary relative">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-white mb-3">
                    BlockCity Map
                </h2>
                <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
                    Explore the city. Click on any building to learn about its challenge.
                </p>

                {/* Skyline Container */}
                <div className="relative w-full h-[350px] mb-16">
                    {/* Ground Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-primary/50 to-transparent" />

                    {/* Buildings */}
                    {ROOMS.map((room) => (
                        <BuildingBlock
                            key={room.id}
                            room={room}
                            isSelected={selectedRoom?.id === room.id}
                            onClick={() => handleBuildingClick(room)}
                        />
                    ))}
                </div>

                {/* Selected Room Info Panel */}
                {selectedRoom && (
                    <div
                        className="max-w-2xl mx-auto rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300 animate-fadeIn"
                        style={{
                            backgroundColor: `${selectedRoom.color}08`,
                            borderColor: `${selectedRoom.color}30`,
                            boxShadow: `0 0 40px ${selectedRoom.color}10`,
                        }}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${selectedRoom.color}20`, border: `1px solid ${selectedRoom.color}40` }}
                                >
                                    <selectedRoom.Icon size={22} style={{ color: selectedRoom.color }} />
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
                                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-700/50 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-5">
                            <div className="bg-primary/60 rounded-lg p-3">
                                <p className="text-gray-500 text-xs uppercase tracking-wider">Challenge</p>
                                <p className="text-gray-300 text-sm mt-1">{selectedRoom.challenge}</p>
                            </div>
                            <div className="bg-primary/60 rounded-lg p-3">
                                <p className="text-gray-500 text-xs uppercase tracking-wider">Status</p>
                                <p className="mt-1">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${selectedRoom.status === 'open'
                                            ? 'bg-green-500/15 text-green-400 border-green-500/30'
                                            : 'bg-red-500/15 text-red-400 border-red-500/30'
                                        }`}>
                                        {selectedRoom.status === 'open' ? '● Open' : '● Closed'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CityMap;
