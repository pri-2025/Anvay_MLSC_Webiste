import React from 'react';
import { Medal, Award, Crown, Gem } from 'lucide-react';

const TierBadge = ({ tier }) => {
    const tierConfig = {
        Bronze: { color: 'text-bronze', bg: 'bg-orange-500/10', border: 'border-bronze', icon: Medal, iconColor: '#cd7f32' },
        Silver: { color: 'text-silver', bg: 'bg-gray-400/10', border: 'border-silver', icon: Award, iconColor: '#9ca3af' },
        Gold: { color: 'text-gold', bg: 'bg-yellow-500/10', border: 'border-gold', icon: Crown, iconColor: '#f59e0b' },
        Platinum: { color: 'text-platinum', bg: 'bg-gray-200/10', border: 'border-platinum', icon: Gem, iconColor: '#e2e8f0' },
    };

    const config = tierConfig[tier] || tierConfig.Bronze;
    const Icon = config.icon;

    return (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${config.border} ${config.bg}`}>
            <Icon size={18} style={{ color: config.iconColor }} />
            <span className={`font-heading font-bold ${config.color}`}>{tier}</span>
        </div>
    );
};

export default TierBadge;
