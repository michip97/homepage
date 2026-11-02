import { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Code2, Layers, Cpu, Network, Users } from 'lucide-react';
import axios from 'axios';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (err) {
        setError('Failed to load projects. Ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-textPrimary mb-4">Featured Work</h1>
          <p className="text-xl text-textSecondary max-w-2xl">
            A selection of my recent architectures, platform engineering implementations, and technical achievements.
          </p>
        </div>


        {/* Pinned Featured Case Study */}
        <div className="mb-16">
          <div className="bg-bgSecondary/30 backdrop-blur-md rounded-3xl border border-borderBase p-8 lg:p-12 overflow-hidden relative group hover:border-accent/40 transition-colors duration-500 shadow-xl">
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
                <p className="text-textSecondary leading-relaxed">
                  End-to-end conception, implementation, and production operation of a scalable Kubernetes cloud platform hosting distributed microservices.
                </p>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-bgPrimary/50 p-6 rounded-2xl border border-borderBase hover:border-accent/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <Layers className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="font-bold text-textPrimary mb-2">Cluster & Traffic Engineering</h3>
                  <p className="text-sm text-textSecondary leading-relaxed">Designed and managed the production <strong>AKS</strong> cluster, implementing <strong>NGINX Ingress</strong> for load balancing and routing, alongside private container registries and persistent storage.</p>
                </div>
                <div className="bg-bgPrimary/50 p-6 rounded-2xl border border-borderBase hover:border-accent/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                    <Cpu className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className="font-bold text-textPrimary mb-2">CI/CD & Automation</h3>
                  <p className="text-sm text-textSecondary leading-relaxed">Built automated <strong>Jenkins</strong> build and release pipelines and managed cloud/Linux infrastructure reproducibly using <strong>Terraform</strong> and <strong>Ansible</strong>.</p>
                </div>
                <div className="bg-bgPrimary/50 p-6 rounded-2xl border border-borderBase hover:border-accent/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                    <Network className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="font-bold text-textPrimary mb-2">Distributed Systems & Support</h3>
                  <p className="text-sm text-textSecondary leading-relaxed">Integrated message queues, diverse database systems, and secure inter-service communication protocols while leading 3rd-level troubleshooting in production.</p>
                </div>
                <div className="bg-bgPrimary/50 p-6 rounded-2xl border border-borderBase hover:border-accent/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="font-bold text-textPrimary mb-2">Technical Ownership</h3>
                  <p className="text-sm text-textSecondary leading-relaxed">Owned the technical roadmap, sprint/release scheduling, and task coordination across the engineering team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-textPrimary mb-8">Other Projects & Explorations</h2>


        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10 bg-red-500/10 rounded-lg">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-bgSecondary rounded-2xl border border-borderBase overflow-hidden group hover:shadow-xl hover:border-accent/30 transition-all duration-300 flex flex-col"
              >
                <div className="h-48 bg-bgPrimary border-b border-borderBase p-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent z-0" />
                  <Code2 className="w-16 h-16 text-accent/40 z-10 group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-textPrimary mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-textSecondary text-sm mb-6 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.split(',').map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-bgPrimary border border-borderBase rounded-full text-xs font-medium text-textSecondary">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-borderBase">
                    <button className="flex items-center text-sm font-medium text-textSecondary hover:text-accent transition-colors cursor-not-allowed opacity-50">
                      <Code className="w-4 h-4 mr-2" /> Code
                    </button>
                    <button className="flex items-center text-sm font-medium text-textSecondary hover:text-accent transition-colors cursor-not-allowed opacity-50">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Projects;
