import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Smartphone, Cloud, GitBranch } from 'lucide-react';

interface Technology {
  name: string;
  category: string;
  description: string;
  icon?: string;
}

const TechStack: React.FC = () => {
  const technologies: Technology[] = [
    // Frontend
    { name: 'HTML5', category: 'Frontend', description: 'Semantic markup and modern HTML features', icon: '/icons/html-5.png' },
    { name: 'CSS3', category: 'Frontend', description: 'Responsive design, animations, Grid & Flexbox', icon: '/icons/css-3.png' },
    { name: 'JavaScript', category: 'Frontend', description: 'ES6+, DOM manipulation, async programming', icon: '/icons/js.png' },
    { name: 'TypeScript', category: 'Frontend', description: 'Type-safe JavaScript development', icon: '/icons/typescript.png' },
    { name: 'React', category: 'Frontend', description: 'Hooks, Context API, component architecture', icon: '/icons/react.png' },
    { name: 'TailwindCSS', category: 'Frontend', description: 'Utility-first CSS framework', icon: '/icons/Tailwindcss.png' },
    { name: 'Zod', category: 'Frontend', description: 'Schema validation library', icon: '/icons/zod.png' },

    // Backend
    { name: 'PHP', category: 'Backend', description: 'Server-side scripting and web development', icon: '/icons/php.png' },
    { name: 'MySQL', category: 'Database', description: 'Relational database management', icon: '/icons/mysql-database.png' },
    { name: 'MongoDB', category: 'Database', description: 'NoSQL document database', icon: '/icons/mongodb.png' },
    { name: 'SQL Server', category: 'Database', description: 'Microsoft database platform', icon: '/icons/sql-server.png' },

    // Programming Languages
    { name: 'Java', category: 'Programming', description: 'Object-oriented programming', icon: '/icons/java.png' },
    { name: 'C++', category: 'Programming', description: 'System programming and algorithms', icon: '/icons/c-.png' },
  ];

  const categories = {
    'Frontend': { icon: Globe, color: 'var(--sky-blue)' },
    'Backend': { icon: Database, color: 'var(--steel-blue)' },
    'Database': { icon: Database, color: 'var(--ocean-blue)' },
    'Programming': { icon: Code, color: 'var(--neutral-beige)' },
    'Mobile': { icon: Smartphone, color: 'var(--warm-beige)' },
    'DevOps': { icon: Cloud, color: 'var(--dark-slate)' },
    'Tools': { icon: GitBranch, color: 'var(--steel-blue)' }
  };

  const tools = [
    { name: 'Git', description: 'Version control' },
    { name: 'VS Code', description: 'Code editor' },
    { name: 'Figma', description: 'Design tool' },
    { name: 'Postman', description: 'API testing' },
    { name: 'Chrome DevTools', description: 'Debugging' },
    { name: 'NPM', description: 'Package manager' }
  ];

  const groupedTech = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, Technology[]>);

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
            Technology Stack
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Technologies, tools, and frameworks I work with
          </motion.p>
        </div>
        {/* Tech Categories */}
        {Object.entries(groupedTech).map(([category, techs], categoryIndex) => {
          const categoryInfo = categories[category as keyof typeof categories];
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + categoryIndex * 0.1 }}
              className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 text-white"
            >
              <div className="flex items-center space-x-3 mb-6">
                <categoryInfo.icon size={28} style={{ color: categoryInfo.color }} />
                <h2 className="text-xl font-bold text-white">{category}</h2>
              </div>
              <div className="grid gap-4">
                {techs.map((tech, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {tech.icon && (
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-8 h-8 rounded object-contain bg-white/10 p-1"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <span className="font-semibold text-white">{tech.name}</span>
                      <p className="text-gray-300 text-sm mt-1">{tech.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
        {/* Tools */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 text-white">
          <h2 className="text-xl font-bold mb-4">Tools</h2>
          <ul className="list-disc list-inside text-gray-200">
            {tools.map((tool, i) => (
              <li key={i} className="mb-1">
                <span className="font-semibold text-white">{tool.name}</span> — <span className="text-gray-300">{tool.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default TechStack;