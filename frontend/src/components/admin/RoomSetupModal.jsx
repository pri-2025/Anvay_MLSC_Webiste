import React, { useState } from 'react';
import { Users, DoorOpen, ArrowRight } from 'lucide-react';

const RoomSetupModal = ({ room, onConfirm, onCancel }) => {
    const [totalParticipants, setTotalParticipants] = useState('');
    const [capacity, setCapacity] = useState('');

    const handleConfirm = () => {
        const participants = parseInt(totalParticipants) || 0;
        const cap = parseInt(capacity) || 0;
        if (participants <= 0 || cap <= 0) return;
        onConfirm({ totalParticipants: participants, capacity: cap });
    };

    const isValid = parseInt(totalParticipants) > 0 && parseInt(capacity) > 0;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-secondary border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="text-center mb-6">
                    <div
                        className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${room.color}20`, border: `1px solid ${room.color}40` }}
                    >
                        <DoorOpen size={24} style={{ color: room.color }} />
                    </div>
                    <h2 className="text-xl font-heading font-bold text-white">
                        {room.name}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Enter room details before starting
                    </p>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2 flex items-center gap-1.5">
                            <Users size={14} />
                            Total Participants
                        </label>
                        <input
                            type="number"
                            value={totalParticipants}
                            onChange={(e) => setTotalParticipants(e.target.value)}
                            placeholder="e.g. 45"
                            min="1"
                            className="w-full px-4 py-3 rounded-lg bg-primary border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-center text-lg font-bold"
                        />
                        <p className="text-gray-500 text-xs mt-1">Number of participants assigned to this room</p>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2 flex items-center gap-1.5">
                            <DoorOpen size={14} />
                            Room Capacity
                        </label>
                        <input
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            placeholder="e.g. 50"
                            min="1"
                            className="w-full px-4 py-3 rounded-lg bg-primary border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-center text-lg font-bold"
                        />
                        <p className="text-gray-500 text-xs mt-1">Maximum capacity of this room</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 rounded-lg border border-gray-600 text-gray-300 font-semibold hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!isValid}
                        className="flex-1 py-3 rounded-lg text-white font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: isValid ? room.color : `${room.color}40`,
                        }}
                    >
                        Enter Room
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomSetupModal;
