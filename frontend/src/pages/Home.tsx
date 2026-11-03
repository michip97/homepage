import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Users, Network, Cpu, Shield, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import Tilt from 'react-parallax-tilt';

const Home = () => {
  const skills = [
    { icon: Layers, title: 'Container & Kubernetes Engineering', desc: 'Architecture, deployment, and production operation of Kubernetes clusters (AKS). Traffic routing & load balancing via NGINX Ingress, container storage, image registries, and microservice orchestration.' },
    { icon: Terminal, title: 'Linux, CI/CD & Automation', desc: 'Linux system administration (focus: RHEL & RHCSA in Q1). Automated build and deployment pipelines using Jenkins. Infrastructure as Code and configuration management with Terraform and Ansible.' },
    { icon: Shield, title: 'Observability, Networking & Security', desc: 'Cluster monitoring, metrics, and logs. Network architecture, message queues, and DB integration. IT Operation & Security foundation (B.Sc. HSLU: hardening, access control, root-cause analysis).' },
    { icon: Users, title: 'Software Background & Leadership', desc: 'Multi-year production experience in C# / .NET — understanding platform requirements from a developer perspective. Technical roadmap planning, team coordination, and structured stakeholder communication.' },
  ];

  const floatingBadges = [
    { icon: Terminal, text: 'Linux', color: 'text-orange-500', delay: 0 },
    { icon: Layers, text: 'Kubernetes', color: 'text-blue-500', delay: 1.5 },
    { icon: Network, text: 'Prometheus', color: 'text-orange-400', delay: 3 },
    { icon: Cpu, text: 'Automation', color: 'text-cyan-400', delay: 0.5 },
    { icon: Shield, text: 'Open Source', color: 'text-green-500', delay: 2 },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col py-20 relative">

        {/* Hero Section - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[60vh]">

          {/* Left Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left z-10"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-textPrimary tracking-tight mb-4 leading-tight mt-12">
              Hi, I'm <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
                Michael Portmann
              </span>.
            </h1>

            <div className="text-2xl md:text-3xl font-bold text-textSecondary mb-6 h-10">
              I am a{' '}
              <span className="text-accent">
                <Typewriter
                  words={[
                    'Linux & Kubernetes System Engineer',
                    'Cloud Platform Architect (AKS)',
                    'Infrastructure & CI/CD Automation',
                    'IT Operations & Security (B.Sc.)'
                  ]}
                  loop={0}
                  cursor
                  cursorStyle='_'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </span>
            </div>

            <div className="max-w-xl text-lg text-textSecondary mb-6 leading-relaxed mx-auto lg:mx-0">
              <p className="mb-4">
                I design, automate, and operate resilient container and Linux platforms. Combining hands-on Kubernetes engineering and IT security with a strong background in technical project management, I bridge the gap between complex infrastructure and reliable production workloads.
              </p>
              <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
                <p className="text-sm font-medium text-textPrimary">
                  Currently preparing for the <strong>Red Hat Certified System Administrator (RHCSA)</strong> exam (completion in Q1) — back in Switzerland end of December and ready for new challenges in Enterprise Linux & Kubernetes engineering.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/projects" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-accent hover:bg-accentHover shadow-lg hover:shadow-accent/50 transition-all duration-300 hover:-translate-y-1">
                View My Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-borderBase text-base font-bold rounded-xl text-textPrimary bg-bgPrimary/50 backdrop-blur-sm hover:bg-bgSecondary hover:border-accent/50 transition-all duration-300">
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse"></div>

            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              transitionSpeed={1500}
              scale={1.05}
              gyroscope={true}
              className="z-10"
            >
              {/* Main Image Frame */}
              <div className="relative w-80 h-80 rounded-[2rem] border border-borderBase shadow-2xl bg-bgSecondary/80 backdrop-blur-xl flex items-center justify-center overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20"></div>
                  <Terminal className="w-32 h-32 text-textSecondary/50 group-hover:scale-110 group-hover:text-accent transition-all duration-700" />
              </div>
            </Tilt>

            {/* Floating Badges */}
            {floatingBadges.map((badge, idx) => (
              <motion.div
                key={idx}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: badge.delay,
                  ease: "easeInOut",
                }}
                className="absolute z-20 px-5 py-3 bg-bgSecondary/90 backdrop-blur-md border border-borderBase shadow-xl rounded-2xl flex items-center gap-3"
                style={{
                  top: `${15 + Math.random() * 70}%`,
                  left: `${5 + Math.random() * 90}%`,
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
          className="mt-40 pt-20 relative"
        >
          {/* Subtle separator line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-borderBase to-transparent"></div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-textPrimary mb-4">Core Competencies</h2>
            <p className="text-textSecondary max-w-2xl mx-auto">From complex Linux architectures and container platforms to full-lifecycle infrastructure management.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {skills.map((skill, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                glareEnable={true}
                glareMaxOpacity={0.15}
                glareColor="var(--accent)"
                glarePosition="all"
                className="rounded-2xl"
              >
                <motion.div
                  variants={itemVariants}
                  className="p-8 rounded-2xl border border-borderBase bg-bgSecondary/50 backdrop-blur-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)] hover:border-accent/30 transition-all duration-300 group relative overflow-hidden h-full"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-bgPrimary border border-borderBase flex items-center justify-center mb-6 group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors shadow-sm">
                      <skill.icon className="h-7 w-7 text-textPrimary group-hover:text-accent transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-textPrimary mb-3">{skill.title}</h3>
                    <p className="text-textSecondary leading-relaxed">{skill.desc}</p>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </motion.div>


        {/* Case Study */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 relative"
        >
          <div className="bg-bgSecondary/30 backdrop-blur-md rounded-3xl border border-borderBase p-8 lg:p-12 overflow-hidden relative group hover:border-accent/40 transition-colors duration-500 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
              <div className="lg:col-span-1 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-6 w-fit">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  Featured Architecture
                </div>
                <h2 className="text-3xl font-extrabold text-textPrimary mb-4">Designing & Operating the "PSE Cloud"</h2>
                <div className="mb-6">
                  <p className="text-accent font-bold">IT System Engineer & Lead Software Developer</p>
                  <p className="text-sm text-textSecondary">PSE Solutions GmbH (07/2022 – Present)</p>
                </div>
                <p className="text-textSecondary leading-relaxed mb-8">
                  End-to-end conception, implementation, and production operation of a scalable Kubernetes cloud platform hosting distributed microservices.
                </p>
                <Link to="/projects" className="inline-flex items-center text-accent hover:text-accentHover font-bold transition-colors w-fit group/link">
                  View full project details <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-bgPrimary/50 p-6 rounded-2xl border border-borderBase">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <Layers className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="font-bold text-textPrimary mb-2">Cluster & Traffic Engineering</h3>
                  <p className="text-sm text-textSecondary leading-relaxed">Designed and managed the production <strong>AKS</strong> cluster, implementing <strong>NGINX Ingress</strong> for load balancing and routing, alongside private container registries and persistent storage.</p>
                </div>
                <div className="bg-bgPrimary/50 p-6 rounded-2xl border border-borderBase">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                    <Cpu className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="font-bold text-textPrimary mb-2">CI/CD & Automation</h3>
                  <p className="text-sm text-textSecondary leading-relaxed">Built automated <strong>Jenkins</strong> build and release pipelines and managed cloud/Linux infrastructure reproducibly using <strong>Terraform</strong> and <strong>Ansible</strong>.</p>
                </div>
                <div className="bg-bgPrimary/50 p-6 rounded-2xl border border-borderBase">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                    <Network className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="font-bold text-textPrimary mb-2">Distributed Systems</h3>
                  <p className="text-sm text-textSecondary leading-relaxed">Integrated message queues, diverse database systems, and secure inter-service communication protocols while leading 3rd-level troubleshooting in production.</p>
                </div>
                <div className="bg-bgPrimary/50 p-6 rounded-2xl border border-borderBase">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="font-bold text-textPrimary mb-2">Technical Ownership</h3>
                  <p className="text-sm text-textSecondary leading-relaxed">Owned the technical roadmap, sprint/release scheduling, and task coordination across the engineering team.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </PageWrapper>
  );
};

export default Home;
