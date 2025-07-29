'use client';

import { motion } from 'framer-motion';
import { Award, Users, Clock, Star, CheckCircle } from 'lucide-react';

export default function About() {
  const achievements = [
    {
      icon: <Award className="text-yellow-400" size={24} />,
      title: "Army Recognition",
      description: "Official appreciation from Indian Army for Army Public School Panagarh design"
    },
    {
      icon: <Users className="text-cyan-400" size={24} />,
      title: "100+ Happy Clients",
      description: "Over 100 satisfied clients with 5-star Google reviews"
    },
    {
      icon: <Clock className="text-emerald-400" size={24} />,
      title: "8+ Years Experience",
      description: "Established in 2016 with continuous growth and excellence"
    },
    {
      icon: <Star className="text-purple-400" size={24} />,
      title: "Premium Quality",
      description: "Sustainable designs with innovative materials and layouts"
    }
  ];

  const credentials = [
    "M.BDes - Master of Design",
    "B.Tech Civil Engineering", 
    "Member of IE India",
    "Sustainable Design Specialist",
    "LEED Certified Professional"
  ];

  return (
    <section id="about" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent">
              Meet Our Founder
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Leading F.S.Infrastructure with vision, expertise, and a commitment to sustainable design excellence
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Founder Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Profile Card */}
            <div className="glass rounded-2xl p-8 relative overflow-hidden group">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-emerald-500"></div>
              </div>
              
              <div className="relative z-10">
                {/* Profile Image Placeholder */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-4xl font-black text-white">FG</span>
                </motion.div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-black text-white mb-2">
                    Er. Farez Ahmed Gazi
                  </h3>
                  <p className="text-cyan-400 font-semibold mb-1">
                    Founder & Principal Architect
                  </p>
                  <p className="text-emerald-400 text-sm font-medium">
                    F.S.Infrastructure
                  </p>
                </div>
              </div>
            </div>

            {/* Credentials */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white mb-4">Professional Credentials</h4>
              {credentials.map((credential, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 glass rounded-lg"
                >
                  <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-300">{credential}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-black text-white mb-2">
                Design Excellence
              </h3>
              <p className="text-slate-300 leading-relaxed">
                With over 8 years of experience in interior design and architecture, 
                Er. Farez Ahmed Gazi has established F.S.Infrastructure as Kolkata's 
                premier design firm, specializing in sustainable residential and 
                commercial projects.
              </p>
            </div>

            {/* Achievement Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-xl p-6 group hover:border-cyan-400/50 transition-all duration-300"
                >
                  <div className="mb-4 p-3 bg-white/5 rounded-lg w-fit">
                    {achievement.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Vision Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass rounded-xl p-6 border-l-4 border-gradient-to-b from-cyan-400 to-emerald-500"
            >
              <blockquote className="text-slate-300 italic text-lg leading-relaxed">
                "Our mission is to create spaces that not only inspire but also 
                contribute to a sustainable future. Every project is an opportunity 
                to blend innovation with responsibility."
              </blockquote>
              <cite className="text-cyan-400 font-semibold mt-4 block">
                - Er. Farez Ahmed Gazi
              </cite>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}