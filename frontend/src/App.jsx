import React from 'react';
import AppRoutes from './routes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { AuthProvider } from './context/AuthContext';
import { LeaderboardProvider } from './context/LeaderboardContext';
import GlobalParticles from './components/common/GlobalParticles';

function App() {
    return (
        <AuthProvider>
            <LeaderboardProvider>
                <div className="min-h-screen flex flex-col bg-primary relative">
                    <GlobalParticles />
                    <Navbar />
                    <main className="flex-1">
                        <AppRoutes />
                    </main>
                    <Footer />
                </div>
            </LeaderboardProvider>
        </AuthProvider>
    );
}

export default App;
