'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/ui/Navigation';
import HorizonHero from '@/components/sections/HorizonHero';
import GlareCards from '@/components/sections/GlareCards';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

// Dynamically import 3D components to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/three/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="loading-spinner"></div>
    </div>
  ),
});

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0B1426] text-white overflow-x-hidden">
      {/* 3D Background Scene */}
      <Scene3D scrollY={scrollY} section={currentSection} />

      {/* Navigation */}
      <Navigation />

      {/* Page Sections */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="home">
          <HorizonHero />
        </section>

        {/* Services Section */}
        <section id="services">
          <GlareCards />
        </section>

        {/* About Section */}
        <About />

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <footer className="py-12 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-black text-xl">FS</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">F.S.INFRASTRUCTURE</h3>
                    <p className="text-xs text-cyan-400 tracking-wider">PREMIUM DESIGN</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  Transforming spaces with sustainable, innovative design solutions since 2016
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">Quick Contact</h4>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>+91 90077 76923</p>
                  <p>farez@fsinfrastructure.com</p>
                  <p>Santoshpur Station Road<br />Kolkata 700066</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">Services</h4>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>Interior Design</p>
                  <p>Architecture</p>
                  <p>Commercial Design</p>
                  <p>Space Planning</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-8 pt-8 text-center">
              <p className="text-slate-400 text-sm">
                © 2024 F.S.Infrastructure. All rights reserved. | Designed with ❤️ in Kolkata
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}