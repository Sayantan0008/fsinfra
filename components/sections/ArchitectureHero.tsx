'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, PlayCircle, Award, Users, Calendar } from 'lucide-react';

export default function ArchitectureHero() {
    const [currentSection, setCurrentSection] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const heroSections = [
        {
            title: "F.S.INFRASTRUCTURE",
            subtitle: "Where architectural vision meets design excellence",
            accent: "PREMIUM DESIGN",
            stats: { projects: "100+", years: "8+", clients: "500+" }
        },
        {
            title: "DESIGN INNOVATION",
            subtitle: "Sustainable spaces that inspire and transform lives",
            accent: "SUSTAINABLE",
            stats: { awards: "15+", sqft: "2M+", rating: "5.0" }
        },
        {
            title: "TRUSTED EXCELLENCE",
            subtitle: "Recognized by Indian Army for exceptional design quality",
            accent: "ARMY RECOGNIZED",
            stats: { recognition: "Army", experience: "8Y", satisfaction: "100%" }
        }
    ];

    useEffect(() => {
        setIsLoaded(true);
        const interval = setInterval(() => {
            setCurrentSection((prev) => (prev + 1) % heroSections.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const currentHero = heroSections[currentSection];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Geometric Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>

                {/* Floating Architecture Elements */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-20 left-10 w-32 h-32 border-2 border-cyan-400/20 rounded-lg"
                />

                <motion.div
                    animate={{
                        y: [0, 15, 0],
                        rotate: [0, -3, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute top-40 right-20 w-24 h-24 border-2 border-emerald-400/20 rounded-full"
                />

                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        x: [0, 10, 0]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-orange-400/20 rotate-45"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                {/* Company Badge */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold tracking-wider text-cyan-400">
                            ESTABLISHED 2016
                        </span>
                    </div>
                </motion.div>

                {/* Main Hero Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSection}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {/* Accent Text */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block"
                        >
                            <span className="text-emerald-400 font-semibold text-sm tracking-[0.2em] uppercase">
                                {currentHero.accent}
                            </span>
                        </motion.div>

                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none"
                        >
                            <span className="bg-gradient-to-r from-white via-cyan-100 to-emerald-200 bg-clip-text text-transparent">
                                {currentHero.title}
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
                        >
                            {currentHero.subtitle}
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12"
                        >
                            {Object.entries(currentHero.stats).map(([key, value], index) => (
                                <div key={key} className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                                        {value}
                                    </div>
                                    <div className="text-sm text-slate-400 uppercase tracking-wider">
                                        {key === 'projects' && 'Projects'}
                                        {key === 'years' && 'Years'}
                                        {key === 'clients' && 'Clients'}
                                        {key === 'awards' && 'Awards'}
                                        {key === 'sqft' && 'Sq Ft'}
                                        {key === 'rating' && 'Rating'}
                                        {key === 'recognition' && 'Recognition'}
                                        {key === 'experience' && 'Experience'}
                                        {key === 'satisfaction' && 'Satisfaction'}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary group relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center space-x-2">
                            <PlayCircle size={20} />
                            <span>View Our Portfolio</span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-secondary group"
                    >
                        <span className="flex items-center space-x-2">
                            <Calendar size={18} />
                            <span>Free Consultation</span>
                        </span>
                    </motion.button>
                </motion.div>

                {/* Section Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-16 flex justify-center space-x-3"
                >
                    {heroSections.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSection(index)}
                            className={`w-12 h-1 rounded-full transition-all duration-300 ${currentSection === index
                                    ? 'bg-gradient-to-r from-cyan-400 to-emerald-500'
                                    : 'bg-slate-600 hover:bg-slate-500'
                                }`}
                        />
                    ))}
                </motion.div>

                {/* Scroll Arrow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <ArrowDown size={24} className="text-cyan-400" />
                </motion.div>
            </div>

            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50 pointer-events-none"></div>
        </section>
    );
}