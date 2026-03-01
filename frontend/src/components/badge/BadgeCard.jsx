import React from 'react';
import TierBadge from '../common/TierBadge';

const BadgeCard = ({ participant }) => {
    return (
        <div
            className="bg-[#0a0a1a]/80 backdrop-blur-xl rounded-2xl p-8 text-center relative overflow-hidden transition-all duration-500 animate-fadeIn"
            style={{
                border: '1px solid rgba(249,162,77,0.3)',
                boxShadow: '0 0 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(249,162,77,0.05)',
            }}
        >
            {/* Holographic background effect */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #F9A24D 2px, #F9A24D 4px)'
                }}
            />

            <div className="relative z-10">
                <TierBadge tier={participant.tier || 'Bronze'} />

                <h3
                    className="text-3xl font-bold text-white mt-6 mb-2 uppercase tracking-wider"
                    style={{ fontFamily: "'Orbitron', sans-serif", textShadow: '0 0 15px rgba(249,162,77,0.5)' }}
                >
                    {participant.name}
                </h3>

                <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    Citizen ID: <span className="text-[#F9A24D]">{participant.citizenId}</span>
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div
                        className="bg-black/40 rounded-xl p-4 border transition-all hover:bg-black/60"
                        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                    >
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Total Points</p>
                        <p
                            className="text-2xl font-bold text-[#F9A24D]"
                            style={{ fontFamily: "'Orbitron', sans-serif", textShadow: '0 0 10px rgba(249,162,77,0.4)' }}
                        >
                            {participant.totalPoints || 0}
                        </p>
                    </div>

                    <div
                        className="bg-black/40 rounded-xl p-4 border transition-all hover:bg-black/60"
                        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                    >
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Rooms Cleared</p>
                        <p
                            className="text-2xl font-bold text-white"
                            style={{ fontFamily: "'Orbitron', sans-serif", textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                        >
                            {participant.roomsCompleted || 0}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BadgeCard;
