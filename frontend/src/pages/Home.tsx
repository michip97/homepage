import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Cloud, Server, Users, Code, Database, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
  const skills = [
    { icon: Cloud, title: 'Cloud & Architecture', desc: 'Azure, AKS, Scalable Systems' },
    { icon: Server, title: 'Backend & Fullstack', desc: '.NET/C#, REST, React, PostgreSQL' },
    { icon: Terminal, title: 'DevOps & Platform', desc: 'Kubernetes, CI/CD, Linux' },
    { icon: Users, title: 'Leadership', desc: 'Tech Lead, Mentorship, Strategy' },
  ];

  const floatingBadges = [
    { icon: Cloud, text: 'Azure', color: 'text-blue-500', delay: 0 },
    { icon: Code, text: '.NET / C#', color: 'text-purple-500', delay: 1.5 },
    { icon: Terminal, text: 'Kubernetes', color: 'text-blue-400', delay: 3 },
    { icon: Globe, text: 'React', color: 'text-cyan-400', delay: 0.5 },
    { icon: Database, text: 'PostgreSQL', color: 'text-indigo-500', delay: 2 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col py-20">

        {/* Hero Section - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[60vh]">

          {/* Left Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold tracking-wide uppercase text-sm mb-6 border border-accent/20">
              <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              Available for New Opportunities
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-textPrimary tracking-tight mb-4">
              Hi, I'm <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
                Michael Portmann
              </span>.
            </h1>

            <div className="text-2xl md:text-3xl font-bold text-textSecondary mb-6 h-10">
              I am a{' '}
              <span className="text-accent">
                <Typewriter
                  words={['Software Engineer', 'Cloud Architect', 'DevOps Enthusiast', 'Tech Lead']}
                  loop={0}
                  cursor
                  cursorStyle='_'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </div>

            <p className="max-w-xl text-lg text-textSecondary mb-10 leading-relaxed mx-auto lg:mx-0">
              I specialize in designing and building highly scalable cloud platforms, resilient microservices, and modern web applications. Bridging the gap between code and infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/projects" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-accent hover:bg-accentHover shadow-lg hover:shadow-accent/50 transition-all duration-300 hover:-translate-y-1">
                View My Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-borderBase text-base font-bold rounded-xl text-textPrimary bg-bgPrimary hover:bg-bgSecondary hover:border-accent/50 transition-all duration-300">
                Get in Touch
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visuals / Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:flex justify-center items-center h-full"
          >
            {/* Glowing Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse"></div>

            {/* Main Image Frame (Placeholder for real photo) */}
            <div className="relative w-80 h-80 rounded-full border-4 border-bgSecondary shadow-2xl bg-gradient-to-br from-bgSecondary to-bgPrimary flex items-center justify-center overflow-hidden z-10 group">
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                {/* You can replace this Code icon with an actual <img src="your-photo.jpg" /> later */}
                <Code className="w-32 h-32 text-textSecondary group-hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Floating Badges */}
            {floatingBadges.map((badge, idx) => (
              <motion.div
                key={idx}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: badge.delay,
                  ease: "easeInOut",
                }}
                className="absolute z-20 px-4 py-2 bg-bgPrimary border border-borderBase shadow-xl rounded-full flex items-center gap-2"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <badge.icon className={`w-5 h-5 ${badge.color}`} />
                <span className="text-sm font-bold text-textPrimary">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Quick Summary */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-40 border-t border-borderBase pt-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-textPrimary mb-4">Core Competencies</h2>
            <p className="text-textSecondary max-w-2xl mx-auto">From enterprise cloud infrastructure to full-stack application development.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-2xl border border-borderBase bg-bgSecondary hover:bg-bgPrimary hover:shadow-xl hover:border-accent/50 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-bgPrimary border border-borderBase flex items-center justify-center mb-6 group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors shadow-sm">
                    <skill.icon className="h-7 w-7 text-textPrimary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-textPrimary mb-3">{skill.title}</h3>
                  <p className="text-textSecondary leading-relaxed">{skill.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Home;
