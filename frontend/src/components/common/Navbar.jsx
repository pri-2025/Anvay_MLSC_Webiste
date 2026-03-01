import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isParticipantPage = location.pathname.startsWith('/participant');

    const navLinks = [
        { label: 'Map', href: '/#city-map', external: true },
        { label: 'Leaderboard', href: '/#leaderboard', external: true },
        { label: 'About Us', href: '/#about-us', external: true },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-primary/90 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link
                    to="/"
                    className="text-xl font-heading font-bold text-white hover:text-highlight transition-colors"
                >
                    Anvaya
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-gray-300 hover:text-white transition-colors text-sm"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        to="/participant"
                        className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                        style={
                            isParticipantPage
                                ? {
                                    background: 'linear-gradient(135deg, #F9A24D, #ff6b35)',
                                    color: '#0a0a1a',
                                    boxShadow: '0 0 20px rgba(249,162,77,0.3)',
                                }
                                :
                                {
                                    border: '1px solid rgba(249,162,77,0.3)',
                                    color: '#F9A24D',
                                    background: 'rgba(249,162,77,0.06)',
                                }
                        }
                    >
                        Participant
                    </Link>
                    <Link to="/admin" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
                        Admin
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(o => !o)}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div
                    className="md:hidden border-t px-4 py-4 space-y-3"
                    style={{ background: 'rgba(10,10,26,0.98)', borderColor: 'rgba(255,255,255,0.06)' }}
                >
                    {navLinks.map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="block text-gray-300 hover:text-white transition-colors text-sm py-1"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        to="/participant"
                        className="block px-4 py-2 rounded-lg text-sm font-bold text-center"
                        style={{ background: 'linear-gradient(135deg, #F9A24D, #ff6b35)', color: '#0a0a1a' }}
                        onClick={() => setMenuOpen(false)}
                    >
                        Participant
                    </Link>
                    <Link
                        to="/admin"
                        className="block text-gray-500 hover:text-gray-300 text-sm py-1"
                        onClick={() => setMenuOpen(false)}
                    >
                        Admin
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;