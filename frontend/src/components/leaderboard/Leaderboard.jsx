import React from 'react';
import { Trophy, Activity } from 'lucide-react';
import LeaderboardRow from './LeaderboardRow';
import TopThreeCard from './TopThreeCard';
import useFetchLeaderboard from '../../hooks/useFetchLeaderboard';

const Leaderboard = () => {
    const { leaderboard, loading, error } = useFetchLeaderboard();

    if (loading) {
        return (
            <section id="leaderboard" className="py-16 px-4 bg-primary">
                <div className="text-center text-gray-400">Loading leaderboard...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="leaderboard" className="py-16 px-4 bg-primary">
                <div className="text-center text-red-400">Error loading leaderboard.</div>
            </section>
        );
    }

    const topThree = leaderboard.slice(0, 3);
    const rest = leaderboard.slice(3);

    return (
        <section id="leaderboard" className="py-16 px-4 bg-primary">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <Trophy size={28} className="text-yellow-400" />
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                            Live Leaderboard
                        </h2>
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30">
                            <Activity size={12} className="text-green-400 animate-pulse" />
                            <span className="text-green-400 text-xs font-bold">LIVE</span>
                        </span>
                    </div>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Top citizens of BlockCity ranked by total points across all rooms.
                    </p>
                </div>

                {/* Top 3 Podium */}
                {topThree.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {topThree.map((entry, index) => (
                            <TopThreeCard key={entry._id || index} entry={entry} rank={index + 1} />
                        ))}
                    </div>
                )}

                {/* Rest of leaderboard */}
                {rest.length > 0 && (
                    <div className="bg-secondary/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
                        <div className="grid grid-cols-4 gap-4 p-4 text-gray-500 font-semibold text-xs uppercase tracking-wider border-b border-gray-700/50">
                            <span>Rank</span>
                            <span>Name</span>
                            <span>Points</span>
                            <span>Tier</span>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                            {rest.map((entry, index) => (
                                <LeaderboardRow key={entry._id || index} entry={entry} rank={index + 4} />
                            ))}
                        </div>
                    </div>
                )}

                {leaderboard.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <Trophy size={40} className="mx-auto mb-3 text-gray-600" />
                        <p>No entries yet. The competition hasn't started!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Leaderboard;
