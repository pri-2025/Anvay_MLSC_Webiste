import React from 'react';
import AppRoutes from './routes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { AuthProvider } from './context/AuthContext';
import { LeaderboardProvider } from './context/LeaderboardContext';
import { ParticipantProvider } from './context/ParticipantContext';

function App() {
    return (
        <AuthProvider>
            <LeaderboardProvider>
                <ParticipantProvider>
                    <div className="min-h-screen flex flex-col bg-primary">
                        <Navbar />
                        <main className="flex-1">
                            <AppRoutes />
                        </main>
                        <Footer />
                    </div>
                </ParticipantProvider>
            </LeaderboardProvider>
        </AuthProvider>
    );
}

export default App;