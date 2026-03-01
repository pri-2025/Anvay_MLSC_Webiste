import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/blockcity-bg.png')" }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary" />

            {/* Floating Particles */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full opacity-20 animate-pulse"
                        style={{
                            width: `${4 + i * 2}px`,
                            height: `${4 + i * 2}px`,
                            backgroundColor: '#ef4444',
                            top: `${15 + i * 14}%`,
                            left: `${10 + i * 15}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${2 + i * 0.5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <p className="text-highlight text-sm font-semibold tracking-[0.3em] uppercase mb-4 animate-pulse">
                    MLSC Presents
                </p>

                <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-3 drop-shadow-2xl">
                    ANVAYA
                </h1>

                <h2 className="text-xl md:text-3xl font-heading text-gray-200 mb-6 tracking-wide">
                    The BlockCity Edition
                </h2>

                <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Navigate through rooms, solve challenges, earn points, and rise through the tiers to become BlockCity's top citizen.
                </p>

                <div className="flex gap-4 justify-center flex-wrap">
                    <a
                        href="/participant"
                        className="px-8 py-3.5 bg-highlight text-white font-semibold rounded-lg hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 text-sm md:text-base"
                    >
                        Participant
                    </a>
                    <a
                        href="/admin"
                        className="px-8 py-3.5 border border-highlight/50 text-highlight font-semibold rounded-lg hover:bg-highlight hover:text-white hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 text-sm md:text-base"
                    >
                        Admin
                    </a>
                    <a
                        href="#about-us"
                        className="px-8 py-3.5 border border-gray-400 text-gray-200 font-semibold rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300 text-sm md:text-base"
                    >
                        About Us
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <a href="#city-map" className="text-gray-500 hover:text-white transition-colors">
                    <ChevronDown size={28} />
                </a>
            </div>
        </section>
    );
};

export default HeroSection;
