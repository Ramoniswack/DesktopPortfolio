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
  video?: string;
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
      image: '/logos/KharchaMeterFull.png',
      video: '/clips/Kharchameter-clip.mp4',
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
      image: '/logos/MovieFlix Logo.png',
      video: '/clips/movie-flix-clip.mp4',
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
      image: '/logos/aajatasure.png',
      video: '/clips/aajatasure-clip.mp4',
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
      image: '/logos/attendifyplus.png',
      video: '/clips/attendifyplus-clip.mp4',
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
      image: '/logos/Gadighar-square.png',
      video: '/clips/Gadighar-clip.mp4',
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
              {/* Project Header */}
              <div className="flex items-center mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-12 h-12 rounded-lg mr-4 object-cover bg-gray-900"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzM3NDE1MSIvPgo8cGF0aCBkPSJNMjQgMTZMMzIgMjhIMTZMMjQgMTZaIiBmaWxsPSIjNkI3Mjg1Ii8+CjwvnN2Zz4K';
                  }}
                />
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{project.title}</h2>
                  <p className="text-sm text-gray-300">{project.description}</p>
                </div>
              </div>

              {/* Video Preview */}
              {project.video && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <video
                    className="w-full h-40 object-cover"
                    poster={project.image}
                    controls
                    preload="metadata"
                  >
                    <source src={project.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-4">
                <span className="text-xs bg-blue-700 text-white px-2 py-1 rounded-full mr-2">{project.status}</span>
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full mr-1 mb-1 inline-block">{tech}</span>
                ))}
              </div>

              {/* Features */}
              <ul className="list-disc list-inside text-gray-200 mb-4 text-sm">
                {project.features.map((feature, i) => (
                  <li key={i} className="mb-1">{feature}</li>
                ))}
              </ul>

              {/* Links */}
              <div className="flex space-x-3 mt-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline flex items-center text-sm">
                    <ExternalLink size={16} className="mr-1" /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:underline flex items-center text-sm">
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