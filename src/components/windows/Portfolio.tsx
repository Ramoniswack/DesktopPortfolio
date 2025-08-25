import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  features: string[];
  status: 'completed' | 'in-progress';
}

const Portfolio: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'Kharcha Meter',
      description: 'Smart expense tracker built with React Native',
      tech: ['React Native', 'Expo', 'TypeScript'],
      liveUrl: 'https://kharcha-meter.vercel.app/',
      githubUrl: 'https://github.com/Ramoniswack/Kharcha-Meter',
      image: '',
      features: [
        'Track daily, weekly, and monthly expenses',
        'Intuitive mobile-first UI',
        'Category-wise analytics and charts',
        'Offline support',
        'Progressive Web App (PWA) ready'
      ],
      status: 'completed'
    },
    {
      title: 'MovieFlix',
      description: 'React app using TMDB API with debounced search',
      tech: ['React', 'TMDB API', 'JavaScript', 'CSS3'],
      liveUrl: 'https://moviee-flix.vercel.app',
      githubUrl: 'https://github.com/Ramoniswack/MovieFlix',
      image: '/MovieFlix-Logo.png',
      features: [
        'Real-time movie search with debouncing',
        'Detailed movie information display',
        'Responsive design for all devices',
        'TMDB API integration'
      ],
      status: 'completed'
    },
    {
      title: 'Aaja Ta Sure',
      description: 'TypeScript To-Do app with Zod validation',
      tech: ['React', 'TypeScript', 'Zod', 'TailwindCSS'],
      liveUrl: 'https://aajatasure.vercel.app',
      githubUrl: 'https://github.com/Ramoniswack/aaja-ta-suree',
      image: '/ats.png',
      features: [
        'Type-safe todo management',
        'Zod schema validation',
        'Modern UI with TailwindCSS',
        'LocalStorage persistence'
      ],
      status: 'completed'
    },
    {
      title: 'Attendify+',
      description: 'PHP/MySQL attendance management system',
      tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
      githubUrl: 'https://github.com/Ramoniswack',
      image: '/logo-bg.png',
      features: [
        'Student attendance tracking',
        'Teacher dashboard',
        'Report generation',
        'Role-based access control'
      ],
      status: 'completed'
    },
    {
      title: 'GadiBazaar',
      description: 'Full-stack marketplace application',
      tech: ['React', 'PHP', 'MySQL'],
      liveUrl: 'https://gadibazaar.infy.uk',
      githubUrl: 'https://github.com/Ramoniswack',
      image: '/Gadighar-circle.png',
      features: [
        'Vehicle marketplace platform',
        'User authentication system',
        'Advanced search and filters',
        'Admin panel for management'
      ],
      status: 'completed'
    }
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold mb-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Featured Projects
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A selection of my work
          </motion.p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 text-white"
            >
              <div className="flex items-center mb-4">
                <img src={project.image} alt={project.title} className="w-12 h-12 rounded-lg mr-4 object-cover bg-gray-900" />
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{project.title}</h2>
                  <p className="text-sm text-gray-300">{project.description}</p>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-xs bg-blue-700 text-white px-2 py-1 rounded-full mr-2">{project.status}</span>
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full mr-1">{tech}</span>
                ))}
              </div>
              <ul className="list-disc list-inside text-gray-200 mb-4">
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="flex space-x-3 mt-2">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline flex items-center">
                    <Play size={16} className="mr-1" /> Live
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:underline flex items-center">
                    <Github size={16} className="mr-1" /> GitHub
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio;