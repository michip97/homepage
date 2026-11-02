import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
  const experiences = [
    {
      role: 'IT System Engineer & Lead Software Developer',
      company: 'PSE Solutions GmbH, Rothenburg',
      period: '07/2022 - Present',
      details: [
        'Technical overall responsibility and lifecycle management for the Azure/AKS cloud platform',
        'End-to-End architectural design of distributed cloud infrastructure and services',
        'Setup, optimization, and automation of complex CI/CD pipelines and infrastructure deployments',
        'Extensive experience with Kubernetes cluster operations, monitoring, and scaling',
        'Task delegation and leadership for external developers and coordination with international partners',
      ],
    },
    {
      role: 'Junior Project Manager HVAC / Building Technology',
      company: 'Amstein + Walthert AG, Zurich',
      period: '12/2019 - 06/2022',
      details: ['Project management and planning for building technology.'],
    },
    {
      role: 'Military Service (Single-Term Conscript / Durchdiener, Infantry)',
      company: 'Swiss Armed Forces, Bern',
      period: '2019',
      details: ['Service as a single-term conscript.'],
    },
    {
      role: 'Building Systems Planner HVAC',
      company: 'Küssnacht am Rigi & Lucerne',
      period: '08/2014 - 12/2018',
      details: ['Drafting and planning of heating systems (incl. Technical Federal Vocational Baccalaureate / Berufsmatura 2015-2018).'],
    },
  ];

  const education = [
    {
      degree: 'B.Sc. in Computer Science (Major in IT Operation & Security)',
      school: 'Lucerne University of Applied Sciences and Arts (HSLU), Rotkreuz',
      period: '2020 - 2024',
    },
    {
      degree: 'Technical Federal Vocational Baccalaureate / Berufsmatura',
      school: 'BBZW, Lucerne',
      period: '2015 - 2018',
    },
  ];

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl font-bold text-textPrimary mb-6">About Me</h1>
          <p className="text-lg text-textSecondary leading-relaxed">
            <strong>From Engineering Project Management to Cloud Platforms:</strong><br/>
            My professional journey started in building systems engineering and as a Junior Project Manager at Amstein + Walthert AG in Zurich. That role taught me how to plan complex technical systems from scratch, manage strict timelines, and communicate clearly with clients and stakeholders. While completing my B.Sc. in Computer Science (Major in <em>IT Operation & Security</em>) at HSLU, I transitioned fully into system engineering and cloud architecture at PSE Solutions GmbH, taking ownership of our Kubernetes platform.
            <br/><br/>
            <strong>Continuous Learning & RedHat Focus:</strong><br/>
            Right now, I am taking a planned sabbatical until the end of December by compensating accrued overtime to travel and dedicate focused self-study time to the <strong>Red Hat Certified System Administrator (RHCSA)</strong> exam (scheduled for Q1). When I commit to a technology ecosystem like Enterprise Linux and Kubernetes, I go all-in.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="text-accent h-6 w-6" />
            <h2 className="text-2xl font-bold text-textPrimary">Professional Experience</h2>
          </div>
          <div className="space-y-12 border-l-2 border-borderBase ml-3 pl-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-bgPrimary border-2 border-accent" />
                <h3 className="text-xl font-bold text-textPrimary">{exp.role}</h3>
                <div className="text-accent font-medium mb-2">{exp.company} <span className="text-textSecondary text-sm ml-2 font-normal">{exp.period}</span></div>
                <ul className="list-disc list-inside text-textSecondary space-y-1">
                  {exp.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="text-accent h-6 w-6" />
            <h2 className="text-2xl font-bold text-textPrimary">Education</h2>
          </div>
          <div className="space-y-12 border-l-2 border-borderBase ml-3 pl-8">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-bgPrimary border-2 border-accent" />
                <h3 className="text-xl font-bold text-textPrimary">{edu.degree}</h3>
                <div className="text-textSecondary">{edu.school} <span className="ml-2 text-sm">{edu.period}</span></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Private / Hobbies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bgSecondary p-8 rounded-2xl border border-borderBase"
        >
          <h2 className="text-2xl font-bold text-textPrimary mb-4">Soft Skills, Mindset & Personal Life</h2>
          <div className="text-textSecondary leading-relaxed space-y-4">
            <p>
              <strong>End-to-End Ownership:</strong> Structured, self-driven, and goal-oriented — I enjoy planning complex initiatives and seeing them through from initial concept to stable operation.
            </p>
            <p>
              <strong>Team Player & Communicator:</strong> Strong interpersonal skills, transparent communication, and experience coordinating technical teams and advising stakeholders.
            </p>
            <p>
              <strong>Athletic Ambition & Balance:</strong> Outside of IT, I am an ambitious athlete and value a healthy, active lifestyle and clear work-life balance — giving me the energy, discipline, and composure needed when production systems get demanding.
            </p>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default About;
