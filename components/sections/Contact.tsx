'use client';

import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Send,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: <MapPin className="text-emerald-400" size={24} />,
      title: "Visit Our Studio",
      details: "Santoshpur Station Road, Kolkata 700066, West Bengal, India",
      action: "Get Directions"
    },
    {
      icon: <Phone className="text-cyan-400" size={24} />,
      title: "Call Us",
      details: "+91 90077 76923",
      action: "Call Now"
    },
    {
      icon: <Mail className="text-purple-400" size={24} />,
      title: "Email Us",
      details: "farez@fsinfrastructure.com",
      action: "Send Email"
    },
    {
      icon: <Clock className="text-yellow-400" size={24} />,
      title: "Working Hours",
      details: "Mon - Sat: 9:00 AM - 7:00 PM\nSunday: By Appointment",
      action: "Schedule Call"
    }
  ];

  const services = [
    "Interior Design",
    "Architecture",
    "Commercial Design",
    "Residential Design",
    "Space Planning",
    "Other"
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, href: "#", color: "text-pink-400" },
    { icon: <Facebook size={20} />, href: "#", color: "text-blue-400" },
    { icon: <Linkedin size={20} />, href: "#", color: "text-cyan-400" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 relative z-10">
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
              Let's Create Together
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ready to transform your space? Get in touch for a free consultation and discover how we can bring your vision to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-xl p-6 group cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {info.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-3">
                      {info.details}
                    </p>
                    <span className="text-emerald-400 text-sm font-semibold hover:text-emerald-300 transition-colors">
                      {info.action} →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* WhatsApp Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-xl p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <MessageCircle size={24} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Quick WhatsApp</h3>
                    <p className="text-slate-300 text-sm">Get instant response</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Chat Now
                </motion.button>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`p-3 glass rounded-lg ${social.color} hover:bg-white/10 transition-colors`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Start Your Project
                </h3>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="+91 xxxxx xxxxx"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Service Required *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service} className="bg-slate-800">
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Project Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  placeholder="Tell us about your project requirements, budget, timeline, etc."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-cyan-400 to-emerald-500 text-white font-bold rounded-lg hover:from-cyan-500 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </motion.button>

              <p className="text-xs text-slate-400 text-center">
                We'll respond within 24 hours with a detailed consultation plan
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}