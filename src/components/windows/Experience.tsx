import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, GraduationCap, Code, Target } from 'lucide-react';

const Experience: React.FC = () => {
  const timeline = [
    {
      type: 'learning',
      title: 'Full-Stack Development Journey',
      organization: 'Self-Directed Learning',
      period: '2024 - Present',
      description: 'Currently expanding skills to become a full-stack developer, focusing on backend technologies and database management.',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'RESTful APIs'],
      icon: Target,
      color: 'var(--sky-blue)'
    },
    {
      type: 'work',
      title: 'Frontend Developer',
      organization: 'Self-Employed / Freelance',
      period: '2023 - Present',
      description: 'Developing responsive web applications using React, TypeScript, and modern frontend technologies.',
      skills: ['React', 'TypeScript', 'TailwindCSS', 'JavaScript', 'HTML5', 'CSS3'],
      icon: Briefcase,
      color: 'var(--steel-blue)'
    },
    {
      type: 'education',
      title: 'Self-Taught Web Development',
      organization: 'Online Learning Platforms',
      period: '2022 - 2023',
      description: 'Intensive self-learning journey covering fundamental and advanced web development concepts.',
      skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Git'],
      icon: GraduationCap,
      color: 'var(--ocean-blue)'
    },
    {
      type: 'project',
      title: 'First Web Projects',
      organization: 'Personal Projects',
      period: '2022',
      description: 'Started building personal projects to apply learned concepts and develop practical skills.',
      skills: ['Basic HTML/CSS', 'Vanilla JavaScript', 'Bootstrap'],
      icon: Code,
      color: 'var(--neutral-beige)'
    }
  ];

  const currentFocus = [
    'Advanced React patterns and hooks',
    'Backend development with Node.js',
    'Database design and optimization',
    'DevOps and deployment strategies',
    'Testing and quality assurance'
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold mb-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Professional Journey
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            My path in web development and continuous learning
          </motion.p>
        </div>
        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 text-white"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center bg-sky-700"
            >
              <Briefcase size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Current Focus
              </h2>
          </div>
          <ul className="list-disc list-inside text-gray-200">
            {currentFocus.map((focus, i) => (
              <li key={i}>{focus}</li>
            ))}
          </ul>
        </motion.div>
        {/* Timeline */}
        <div className="space-y-6">
          {timeline.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 text-white"
            >
              <div className="flex items-center mb-2">
                <item.icon size={24} style={{ color: item.color }} className="mr-2" />
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  </div>
              <div className="text-sm text-gray-300 mb-1">{item.organization} &bull; {item.period}</div>
              <div className="text-gray-200 mb-2">{item.description}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {item.skills.map((skill, i) => (
                  <span key={i} className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;