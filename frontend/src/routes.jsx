import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AnvayaLanding from './pages/idk';
import NotFound from './pages/NotFound';

// Participant
import ParticipantLogin from './pages/participant/ParticipantLogin';
import ParticipantDashboard from './pages/participant/ParticipantDashboard';
import ParticipantProfile from './pages/participant/ParticipantProfile';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/idk" element={<AnvayaLanding />} />

            {/* Participant flow */}
            <Route path="/participant" element={<ParticipantLogin />} />
            <Route path="/participant/dashboard" element={<ParticipantDashboard />} />
            <Route path="/participant/profile" element={<ParticipantProfile />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;