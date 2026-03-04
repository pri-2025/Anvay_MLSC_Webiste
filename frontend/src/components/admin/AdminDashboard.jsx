import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import BonusPointsModal from './BonusPointsModal';
import { Zap } from 'lucide-react';

const AdminDashboard = () => {
    const { logout, admin } = useAuth();
    const [showBonusModal, setShowBonusModal] = useState(false);

    return (
        <div className="min-h-screen bg-primary">
            {/* Top Bar */}
            <div className="max-w-6xl mx-auto px-4 pt-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold uppercase tracking-wider mb-1" style={{ fontFamily: "'Orbitron', sans-serif", color: '#F9A24D' }}>
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Welcome back, <span className="text-white font-medium">{admin?.name || 'Admin'}</span>
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowBonusModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#0a0e1e] border border-cyan-500/30 text-cyan-400 text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-cyan-500/10 transition-colors"
                    >
                        <Zap size={16} /> Bonus Points
                    </button>
                    <button
                        onClick={logout}
                        className="px-5 py-2 border border-gray-600 text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-12 text-center text-gray-500">
                <p>Use the Bonus Points button above to manage citizen scores.</p>
            </div>

            {/* Bonus Points Modal */}
            {showBonusModal && (
                <BonusPointsModal onClose={() => setShowBonusModal(false)} />
            )}
        </div>
    );
};

export default AdminDashboard;
