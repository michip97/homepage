import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
  const experiences = [
    {
      role: 'Lead Software Engineer / IT System Engineer',
      company: 'PSE Solutions GmbH, Rothenburg',
      period: '07/2022 - Present',
      details: [
        'Technical overall responsibility for the Azure/AKS cloud platform',
        'Architecture design and development of distributed .NET services',
        'Implementation of high-performance REST and gRPC interfaces',
        'Introduction and optimization of CI/CD pipelines',
        'Responsible for an external developer in Brazil and coordination with international partners',
      ],
    },
    {
      role: 'Junior Project Manager Heating/Cooling',
      company: 'Amstein + Walthert AG, Zürich',
      period: '12/2019 - 06/2022',
      details: ['Project management and planning for building technology.'],
    },
    {
      role: 'Building Technology Planner (Heating)',
      company: 'Fredy Häfliger AG, Küssnacht am Rigi',
      period: '08/2014 - 12/2018',
      details: ['Drafting and planning of heating systems.'],
    },
  ];

  const education = [
    {
      degree: 'B.Sc. Computer Science (Major in IT Operations & Security)',
      school: 'Hochschule Luzern, Rotkreuz',
      period: '2020 - 2024',
    },
    {
      degree: 'Vocational Baccalaureate (Technology)',
      school: 'BBZW, Luzern',
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
            I am a young, highly motivated Software and DevOps Engineer from Luzern, Switzerland.
            My passion lies in open-source technologies, modern IT infrastructure, and building scalable cloud applications.
            Beyond my technical skills, I am known for my energy, initiative, and the joy I bring to my work. I thrive on taking ownership, value a collaborative team environment, and possess strong analytical skills.
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
          <h2 className="text-2xl font-bold text-textPrimary mb-4">Beyond the Code</h2>
          <p className="text-textSecondary leading-relaxed">
            When I'm not architecting cloud systems or writing C# code, I believe in maintaining a healthy work-life balance.
            I enjoy spending time in nature, exploring new technologies as a hobby, and engaging in sports. Coming from a building technology background, I still appreciate the intersection of physical infrastructure and digital automation.
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default About;
