import { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import axios from 'axios';
import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Canvas } from '@react-three/fiber';
import { TechGlobeScene } from '../components/3d/TechGlobeScene';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Interactive 3D Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl font-extrabold text-textPrimary mb-6">Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">amazing.</span></h1>
            <p className="text-xl text-textSecondary mb-6 leading-relaxed">
              Based in the beautiful city of Luzern. Whether you have a question about cloud architecture, a project proposal, or just want to say hi, I'll try my best to get back to you!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-[400px] w-full rounded-3xl overflow-hidden border border-borderBase bg-bgPrimary shadow-[0_0_50px_rgba(59,130,246,0.1)] relative cursor-grab active:cursor-grabbing"
          >
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              <div className="px-3 py-1 bg-bgPrimary/80 backdrop-blur-md rounded-full text-xs font-mono text-textSecondary border border-borderBase">
                LOC: LUZERN_CH [47.0502° N, 8.3093° E]
              </div>
            </div>
            <React.Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-accent"><span className="animate-pulse">Loading Map Data...</span></div>}>
              <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <TechGlobeScene />
              </Canvas>
            </React.Suspense>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12" style={{ perspective: "1000px" }}>
          {/* Contact Info & Map */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glareColor="var(--accent)" className="rounded-2xl">
              <motion.div
                initial={{ opacity: 0, rotateX: -15, z: -100 }}
                whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-bgSecondary/50 backdrop-blur-sm p-8 rounded-2xl border border-borderBase shadow-lg"
              >
                <h3 className="text-xl font-bold text-textPrimary mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-accent mt-1 mr-4" />
                  <div>
                    <p className="font-medium text-textPrimary">Location</p>
                    <p className="text-textSecondary">6005 Luzern<br />Switzerland</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-accent mt-1 mr-4" />
                  <div>
                    <p className="font-medium text-textPrimary">Email</p>
                    <a href="mailto:michi97.portmann@gmail.com" className="text-textSecondary hover:text-accent transition-colors">
                      michi97.portmann@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-accent mt-1 mr-4" />
                  <div>
                    <p className="font-medium text-textPrimary">Phone</p>
                    <a href="tel:+41786358406" className="text-textSecondary hover:text-accent transition-colors">
                      +41 78 635 84 06
                    </a>
                  </div>
                </div>
              </div>
              </motion.div>
            </Tilt>

            {/* Google Maps iFrame */}
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glareColor="var(--accent)" className="rounded-2xl flex-grow">
              <motion.div
                initial={{ opacity: 0, rotateX: 15, z: -100 }}
                whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="bg-bgSecondary/50 backdrop-blur-sm p-2 rounded-2xl border border-borderBase h-full shadow-lg overflow-hidden min-h-[250px]"
              >
                <iframe
                  title="Google Maps Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2698.810526043126!2d8.3150!3d47.0396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478ffbf40d3a5105%3A0x6a2c2df283d57d5e!2sLuzern%2C%20Switzerland!5e0!3m2!1sen!2sch!4v1680000000000!5m2!1sen!2sch"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '0.75rem', minHeight: '200px' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </Tilt>
          </div>

          {/* Contact Form */}
          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} glareEnable={true} glareMaxOpacity={0.05} glareColor="var(--accent)" className="lg:col-span-2 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, rotateY: 10, x: 50 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="h-full"
          >
            <form onSubmit={handleSubmit} className="bg-bgSecondary/50 backdrop-blur-sm p-8 rounded-2xl border border-borderBase space-y-6 h-full shadow-lg flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-textPrimary mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-bgPrimary border border-borderBase text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-textPrimary mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-bgPrimary border border-borderBase text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent transition-shadow"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-textPrimary mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-bgPrimary border border-borderBase text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent transition-shadow resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-accent hover:bg-accentHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : (
                  <>Send Message <Send className="ml-2 w-5 h-5" /></>
                )}
              </button>

              {status === 'success' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 text-center mt-4">
                  Message sent successfully!
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-center mt-4">
                  Failed to send message. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
          </Tilt>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Contact;
