'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass backdrop-blur-lg border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl">FS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-white">F.S.INFRASTRUCTURE</h1>
              <p className="text-xs text-cyan-400 tracking-wider">PREMIUM DESIGN</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-white hover:text-cyan-400 transition-colors font-medium relative group"
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>

          {/* Contact Info & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Contact Links */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.a
                href="tel:+919007776923"
                whileHover={{ scale: 1.1 }}
                className="p-2 glass rounded-lg hover:bg-cyan-400/20 transition-colors"
              >
                <Phone size={18} className="text-cyan-400" />
              </motion.a>
              <motion.a
                href="mailto:farez@fsinfrastructure.com"
                whileHover={{ scale: 1.1 }}
                className="p-2 glass rounded-lg hover:bg-emerald-400/20 transition-colors"
              >
                <Mail size={18} className="text-emerald-400" />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 glass rounded-lg"
            >
              {isOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="block text-white hover:text-cyan-400 transition-colors font-medium py-2"
                >
                  {item.name}
                </motion.a>
              ))}
              
              {/* Mobile Contact */}
              <div className="pt-4 border-t border-white/10 flex space-x-4">
                <motion.a
                  href="tel:+919007776923"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300"
                >
                  <Phone size={18} />
                  <span>Call Us</span>
                </motion.a>
                <motion.a
                  href="mailto:farez@fsinfrastructure.com"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300"
                >
                  <Mail size={18} />
                  <span>Email</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}