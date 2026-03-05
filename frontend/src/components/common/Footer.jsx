import React from 'react';
import { Github, Instagram, Linkedin, Twitter, MapPin, Trophy, Shield, Mail, Phone, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* ── Col 1: MLSC Identity ─────────────────────────── */}
                    <div className="md:col-span-1">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                            style={{
                                background: 'linear-gradient(135deg, rgba(249,162,77,0.15), rgba(255,107,53,0.08))',
                                border: '1.5px solid rgba(249,162,77,0.35)',
                            }}
                        >
                            <span className="text-2xl"><img src="./mlsc_logo.png" alt="MLSC Logo" /></span>
                        </div>
                        <h3 className="text-base font-heading font-bold text-white mb-1">
                            Microsoft Learn Student Club
                        </h3>
                        <p
                            className="text-[11px] font-bold tracking-widest uppercase mb-3"
                            style={{ color: '#F9A24D' }}
                        >
                            MLSC CCEW — Cummins College
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering students through technology, innovation, and collaboration.
                            Building future-ready tech leaders.
                        </p>
                    </div>

                    {/* ── Col 2: About ─────────────────────────────────── */}
                    <div>
                        <h3 className="text-sm font-heading font-bold text-white mb-4 uppercase tracking-widest">
                            About
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-bold text-white mb-1">Who We Are</p>
                                <p className="text-gray-400 text-xs leading-relaxed">
                                    Microsoft Learn Student Club (MLSC) is a student-led technical community
                                    focused on learning, collaboration, and innovation. We bring together
                                    passionate students to explore modern technologies and real-world problem solving.
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white mb-1">Our Vision</p>
                                <p className="text-gray-400 text-xs leading-relaxed">
                                    To build a strong student tech ecosystem that nurtures innovation, teamwork,
                                    and industry-ready skills using Microsoft technologies.
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-bold mb-1" style={{ color: '#F9A24D' }}>
                                    Anvaya: The BlockCity Edition
                                </p>
                                <p className="text-gray-400 text-xs leading-relaxed">
                                    A gamified Web3 event where participants navigate themed rooms,
                                    solve blockchain challenges, and compete on the leaderboard.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Col 3: Quick Links + Contact ─────────────────── */}
                    <div>
                        <h3 className="text-sm font-heading font-bold text-white mb-4 uppercase tracking-widest">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 mb-6">
                            {[
                                { label: 'City Map', href: '/#city-map', },
                                { label: 'Leaderboard', href: '/#leaderboard' },
                                { label: 'About Us', href: '/#about' },
                                { label: 'Admin Access', href: '/admin' },
                            ].map(({ label, href, icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm group"
                                    >
                                        {icon && <span className="opacity-60 group-hover:opacity-100">{icon}</span>}
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-sm font-heading font-bold text-white mb-3 uppercase tracking-widest">
                            Contact
                        </h3>
                        <ul className="space-y-2.5">
                            <li className="flex items-start gap-2">
                                <Mail size={13} className="text-gray-500 mt-0.5 flex-shrink-0" />
                                <a
                                    href="mailto:mlsc.ccew@cumminscollege.in"
                                    className="text-gray-400 hover:text-white transition-colors text-xs"
                                >
                                    mlsc.ccew@cumminscollege.in
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone size={13} className="text-gray-500 mt-0.5 flex-shrink-0" />
                                <div className="text-gray-400 text-xs leading-relaxed">

                                    <p>Vaishnavi Ahire: +91 8530017432</p>
                                    <p>Aarya Kulkarni: +91 8010678775</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin size={13} className="text-gray-500 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-400 text-xs leading-relaxed">
                                    MKSSS's Cummins College of Engineering,<br />
                                    Pune, Maharashtra 411052, IN
                                </p>
                            </li>
                        </ul>
                    </div>

                    {/* ── Col 4: Follow Us ─────────────────────────────── */}
                    <div>
                        <h3 className="text-sm font-heading font-bold text-white mb-4 uppercase tracking-widest">
                            Follow Us
                        </h3>
                        <p className="text-gray-400 text-xs mb-5 leading-relaxed">
                            Stay updated with MLSC events, workshops, and highlights.
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { icon: <Linkedin size={15} />, label: 'LinkedIn', href: 'https://www.linkedin.com/company/microsoft-learn-student-chapter-ccew/posts/?feedView=all', hover: 'hover:text-blue-400 hover:border-blue-400/30' },

                                { icon: <Instagram size={15} />, label: 'Instagram', href: 'https://www.instagram.com/mlsc_ccoew?igsh=dnBwNmJ1NHlrenJs', hover: 'hover:text-pink-400 hover:border-pink-400/30' },
                            ].map(({ icon, label, href, hover }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 text-gray-400 text-xs transition-all ${hover}`}
                                    style={{ background: 'rgba(255,255,255,0.03)' }}
                                >
                                    {icon} {label}
                                </a>
                            ))}
                        </div>

                        <a
                            href="https://mlsc-website-rho.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 flex items-center gap-2 text-xs transition-opacity hover:opacity-75"
                            style={{ color: '#F9A24D' }}
                        >
                            <ExternalLink size={12} />
                            Visit MLSC Website
                        </a>
                    </div>

                </div>

                {/* ── Divider + Copyright ───────────────────────────────── */}
                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} MLSC CCEW — Anvaya: The BlockCity Edition. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-xs">
                        Made with ♥ by MLSC Team
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;