import React from 'react';
import { Medal } from 'lucide-react';

const TopThreeCard = ({ entry, rank }) => {
    const rankConfig = {
        1: {
            border: 'border-yellow-500/50',
            bg: 'bg-yellow-500/5',
            glow: '0 0 30px rgba(234, 179, 8, 0.15)',
            color: '#eab308',
            label: '1st Place',
        },
        2: {
            border: 'border-gray-400/50',
            bg: 'bg-gray-400/5',
            glow: '0 0 30px rgba(156, 163, 175, 0.1)',
            color: '#9ca3af',
            label: '2nd Place',
        },
        3: {
            border: 'border-orange-500/50',
            bg: 'bg-orange-500/5',
            glow: '0 0 30px rgba(249, 115, 22, 0.1)',
            color: '#f97316',
            label: '3rd Place',
        },
    };

    const config = rankConfig[rank] || rankConfig[3];

    return (
        <div
            className={`rounded-2xl border-2 p-6 text-center transition-all duration-300 hover:scale-105 ${config.border} ${config.bg}`}
            style={{ boxShadow: config.glow }}
        >
            <Medal size={36} style={{ color: config.color }} className="mx-auto mb-3" />
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: config.color }}>
                {config.label}
            </p>
            <h3 className="text-xl font-heading font-bold text-white mb-1">
                {entry.name || 'Unknown'}
            </h3>
            <p className="text-2xl font-bold text-highlight mb-2">
                {entry.totalPoints || 0} pts
            </p>
            <p className="text-sm text-gray-400">{entry.tier || 'Explorer'}</p>
        </div>
    );
};

export default TopThreeCard;
