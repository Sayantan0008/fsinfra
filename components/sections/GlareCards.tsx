'use client';

import { motion } from 'framer-motion';
import {
  Home,
  Building2,
  Briefcase,
  Award,
  Ruler,
  Users,
  UserCheck,
  Star,
  MapPin,
  Palette,
  Lightbulb,
  Shield
} from 'lucide-react';
import { GlareCard } from '@/components/ui/glare-card';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  index: number;
}

function ServiceCard({ title, description, icon, features, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-[400px]"
    >
      <GlareCard className="p-6 h-full flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-emerald-500/20 backdrop-blur-sm border border-cyan-400/30">
              {icon}
            </div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-yellow-400 fill-current" />
              ))}
            </div>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                <span className="text-xs text-slate-400">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
            <span className="text-xs text-emerald-400 font-semibold tracking-wider uppercase">
              Premium Service
            </span>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-500 flex items-center justify-center cursor-pointer"
            >
              <span className="text-white text-xs font-bold">→</span>
            </motion.div>
          </div>
        </div>
      </GlareCard>
    </motion.div>
  );
}

export default function GlareCards() {
  const services = [
    {
      title: "Interior Design Excellence",
      description: "Transform your living spaces with our award-winning interior design services, featuring sustainable materials and innovative layouts.",
      icon: <Home size={24} className="text-cyan-400" />,
      features: ["Space Planning", "Material Selection", "3D Visualization", "Project Management"]
    },
    {
      title: "Architectural Innovation",
      description: "Cutting-edge architectural solutions that blend functionality with aesthetic beauty, designed for the modern world.",
      icon: <Building2 size={24} className="text-emerald-400" />,
      features: ["Structural Design", "Building Permits", "Construction Drawings", "Site Supervision"]
    },
    {
      title: "Commercial Spaces",
      description: "Create productive and inspiring work environments with our commercial interior design and space planning expertise.",
      icon: <Briefcase size={24} className="text-orange-400" />,
      features: ["Office Design", "Retail Spaces", "Restaurant Design", "Corporate Branding"]
    },
    {
      title: "Army Recognition",
      description: "Proudly recognized by the Indian Army for our exceptional design of Army Public School Panagarh - a testament to our quality.",
      icon: <Award size={24} className="text-yellow-400" />,
      features: ["Government Projects", "Educational Facilities", "Quality Assurance", "Timely Delivery"]
    },
    {
      title: "Space Planning",
      description: "Optimize your space with intelligent planning that maximizes functionality while maintaining aesthetic appeal.",
      icon: <Ruler size={24} className="text-purple-400" />,
      features: ["Layout Optimization", "Traffic Flow", "Furniture Planning", "Storage Solutions"]
    },
    {
      title: "Design Consultation",
      description: "Expert guidance from concept to completion with personalized design solutions tailored to your vision and budget.",
      icon: <Lightbulb size={24} className="text-blue-400" />,
      features: ["Concept Development", "Budget Planning", "Timeline Management", "Design Review"]
    },
    {
      title: "Er. Farez Ahmed Gazi",
      description: "Founder & Principal Architect with M.BDes, B.Tech Civil Engineering, and IE India membership. 8+ years of design excellence.",
      icon: <UserCheck size={24} className="text-cyan-400" />,
      features: ["M.BDes Qualified", "B.Tech Civil", "IE India Member", "8+ Years Experience"]
    },
    {
      title: "Sustainable Design",
      description: "Eco-friendly design solutions that reduce environmental impact while creating beautiful, healthy living spaces.",
      icon: <Shield size={24} className="text-green-400" />,
      features: ["Green Materials", "Energy Efficiency", "Waste Reduction", "Sustainable Practices"]
    },
    {
      title: "Contact & Location",
      description: "Visit our studio at Santoshpur Station Road, Kolkata 700066. Call +91 90077 76923 or email farez@fsinfrastructure.com",
      icon: <MapPin size={24} className="text-emerald-400" />,
      features: ["Free Consultation", "Site Visits", "24/7 Support", "Kolkata Based"]
    }
  ];

  return (
    <section className="py-20 relative z-10">
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
              Our Design Services
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive architectural and interior design solutions backed by 8+ years of excellence and Army recognition
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Schedule Your Free Design Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}