import { useState, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Code2 } from 'lucide-react';
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
            A selection of my recent projects, architectures, and technical achievements.
          </p>
        </div>

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
