import React, { useState } from 'react';
import { Search, IdCard } from 'lucide-react';
import BadgeCard from './BadgeCard';
import { getParticipantByCitizenId } from '../../services/participantService';

const BadgeLookup = () => {
    const [citizenId, setCitizenId] = useState('');
    const [participant, setParticipant] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLookup = async (e) => {
        e.preventDefault();
        if (!citizenId.trim()) return;

        setLoading(true);
        setError('');
        setParticipant(null);

        try {
            const data = await getParticipantByCitizenId(citizenId.trim());
            setParticipant(data);
        } catch (err) {
            setError('Citizen not found. Check your ID and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="badge-lookup" className="py-16 px-4 bg-secondary">
            <div className="max-w-2xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <IdCard size={28} className="text-cyan-400" />
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        Badge Lookup
                    </h2>
                </div>
                <p className="text-gray-400 mb-8">
                    Enter your Citizen ID to view your badge and progress.
                </p>

                <form onSubmit={handleLookup} className="flex gap-3 mb-8 justify-center max-w-md mx-auto">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={citizenId}
                            onChange={(e) => setCitizenId(e.target.value)}
                            placeholder="Enter Citizen ID..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-primary border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-highlight text-white rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? 'Searching...' : 'Lookup'}
                    </button>
                </form>

                {error && (
                    <p className="text-red-400 mb-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3 inline-block">
                        {error}
                    </p>
                )}
                {participant && <BadgeCard participant={participant} />}
            </div>
        </section>
    );
};

export default BadgeLookup;
