import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const pathToTitle: Record<string, string> = {
      '/': 'Home',
      '/about': 'About',
      '/projects': 'Projects',
      '/contact': 'Contact',
      '/downloads': 'Downloads',
    };

    const currentPath = location.pathname;
    const pageTitle = pathToTitle[currentPath];

    if (pageTitle) {
      document.title = `Michael Portmann - ${pageTitle}`;
    } else {
      document.title = 'Michael Portmann';
    }
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24 pb-12 flex flex-col"
    >
      {children}
    </motion.div>
  );
};
