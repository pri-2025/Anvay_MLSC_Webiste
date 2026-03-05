import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Circle, CheckCircle } from 'lucide-react';

const RoomCard = ({ room }) => {
    const navigate = useNavigate();

    const statusColors = {
        open: 'border-green-500 bg-green-500/10',
        completed: 'border-gold bg-yellow-500/10',
    };

    const statusLabels = {
        open: <span className="flex items-center gap-1.5 text-green-400"><Circle size={10} className="fill-green-400" /> Open</span>,
        completed: <span className="flex items-center gap-1.5 text-yellow-400"><CheckCircle size={12} /> Completed</span>,
    };

    return (
        <div
            className={`rounded-xl border-2 p-6 transition-all hover:scale-105 flex flex-col justify-between h-full ${statusColors[room.status] || statusColors.open
                }`}
        >
            <div>
                <h3 className="text-xl font-heading font-semibold text-white mb-2">
                    {room.name}
                </h3>
                <p className="text-gray-400 mb-4">{room.description}</p>
                <span className="text-sm font-medium block mb-4">
                    {statusLabels[room.status] || statusLabels.open}
                </span>
            </div>

            <button
                onClick={() => navigate(`/participant/room/${room.id}`)}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/15 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/25 transition-colors font-medium text-sm"
            >
                <LogIn size={16} />
                Access Room
            </button>
        </div>
    );
};

export default RoomCard;
