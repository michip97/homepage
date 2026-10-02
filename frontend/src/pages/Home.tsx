import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Cloud, Server, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const skills = [
    { icon: Cloud, title: 'Cloud & Architecture', desc: 'Azure, AKS, Scalable Systems' },
    { icon: Server, title: 'Backend & Fullstack', desc: '.NET/C#, REST, React, PostgreSQL' },
    { icon: Terminal, title: 'DevOps & Platform', desc: 'Kubernetes, CI/CD, Linux' },
    { icon: Users, title: 'Leadership', desc: 'Tech Lead, Mentorship, Strategy' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center py-20">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center sm:text-left"
        >
          <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-4">
            Software Engineer & Cloud Architect
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-textPrimary tracking-tight mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accentHover">Michael Portmann</span>.
          </h1>
          <p className="max-w-2xl text-xl text-textSecondary mb-10 leading-relaxed sm:mx-0 mx-auto">
            I specialize in designing and building scalable cloud platforms, microservices, and modern web applications with a strong focus on clean architecture and performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link to="/projects" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-accent hover:bg-accentHover transition-colors duration-200">
              View My Work <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 border border-borderBase text-base font-medium rounded-lg text-textPrimary bg-transparent hover:bg-bgSecondary transition-colors duration-200">
              Get in Touch
            </Link>
          </div>
        </motion.div>

        {/* Skills Quick Summary */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32"
        >
          <h2 className="text-2xl font-bold text-textPrimary mb-8 text-center sm:text-left">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-xl border border-borderBase bg-bgPrimary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <skill.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-textPrimary mb-2">{skill.title}</h3>
                <p className="text-textSecondary text-sm">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Home;
