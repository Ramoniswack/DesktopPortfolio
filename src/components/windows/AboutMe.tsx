import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, Code2, Music, PenTool } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AboutMe: React.FC = () => {
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`${isMobile ? 'p-4' : 'p-8'} h-full overflow-y-auto`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${isMobile ? 'space-y-4' : 'max-w-4xl mx-auto space-y-8'}`}
      >
        {/* Header */}
        <div className={`text-center ${isMobile ? 'mb-4' : 'mb-8'}`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`${isMobile ? 'w-24 h-24 mb-4' : 'w-32 h-32 mb-6'} mx-auto rounded-full overflow-hidden border-4`}
            style={{ borderColor: 'var(--sky-blue)' }}
          >
            <img
              src="/logos/MyPhoto.png"
              alt="R.a.mohan Tiwari"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIxVjE5QTQgNCAwIDAgMCAxNiAxNUg4QTQgNCAwIDAgMCA0IDE5VjIxIiBzdHJva2U9IiM5MUM4RTQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIgc3Ryb2tlPSIjOTFDOEU0IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
              }}
            />
          </motion.div>

          <motion.h1
            className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold mb-2`}
            style={{ color: isDark ? 'white' : '#1f2937' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            R.a.mohan Tiwari
          </motion.h1>

          <motion.p
            className={`${isMobile ? 'text-lg' : 'text-xl'}`}
            style={{ color: isDark ? '#e5e7eb' : '#6b7280' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            a developer
          </motion.p>
        </div>

        {/* Main Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`rounded-2xl ${isMobile ? 'p-4' : 'p-8'} text-center ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-gray-200'
            }`}
        >
          <p className={`${isMobile ? 'text-base' : 'text-lg'} leading-relaxed`} style={{ color: 'white' }}>
            Transforming ideas into interactive experiences. Experimenting and exploring
            my rapid interests in tech.
          </p>
        </motion.div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`rounded-2xl ${isMobile ? 'p-4' : 'p-6'} ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-gray-200'
            }`}
        >
          <div className="flex items-center space-x-3 mb-4">
            <MapPin size={24} style={{ color: 'var(--sky-blue)' }} />
            <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold`} style={{ color: 'white' }}>
              Current Status
            </h2>
          </div>
          <p className={`${isMobile ? 'text-sm' : ''}`} style={{ color: isDark ? '#e5e7eb' : '#6b7280' }}>
            Currently working on React, learning full-stack practices
          </p>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`rounded-2xl ${isMobile ? 'p-4' : 'p-6'} ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-gray-200'
            }`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <Heart size={24} style={{ color: 'var(--sky-blue)' }} />
            <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold`} style={{ color: isDark ? 'white' : '#1f2937' }}>
              Interests & Passions
            </h2>
          </div>

          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-3 gap-6'}`}>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`${isMobile ? 'w-12 h-12 mb-2' : 'w-16 h-16 mb-4'} mx-auto rounded-full flex items-center justify-center`}
                style={{ backgroundColor: 'var(--sky-blue)' }}>
                <Code2 size={isMobile ? 20 : 28} className="text-white" />
              </div>
              <h3 className={`font-semibold ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`} style={{ color: 'white' }}>
                Coding
              </h3>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'}`} style={{ color: isDark ? '#e5e7eb' : '#6b7280' }}>
                Crafting clean, efficient code
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`${isMobile ? 'w-12 h-12 mb-2' : 'w-16 h-16 mb-4'} mx-auto rounded-full flex items-center justify-center`}
                style={{ backgroundColor: 'var(--steel-blue)' }}>
                <Music size={isMobile ? 20 : 28} className="text-white" />
              </div>
              <h3 className={`font-semibold ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`} style={{ color: 'white' }}>
                Music
              </h3>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'}`} style={{ color: isDark ? '#e5e7eb' : '#6b7280' }}>
                Finding rhythm in melodies
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`${isMobile ? 'w-12 h-12 mb-2' : 'w-16 h-16 mb-4'} mx-auto rounded-full flex items-center justify-center`}
                style={{ backgroundColor: 'var(--ocean-blue)' }}>
                <PenTool size={isMobile ? 20 : 28} className="text-white" />
              </div>
              <h3 className={`font-semibold ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`} style={{ color: 'white' }}>
                Writing
              </h3>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'}`} style={{ color: isDark ? '#e5e7eb' : '#6b7280' }}>
                Syntax and lyrics alike
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`rounded-2xl ${isMobile ? 'p-4' : 'p-8'} text-center ${isDark ? 'bg-blue-900/20 border border-blue-800/30' : 'bg-blue-50/80 border border-blue-200'
            }`}
        >
          <p className={`${isMobile ? 'text-base' : 'text-lg'} italic`} style={{ color: isDark ? 'white' : '#1f2937' }}>
            "I write — syntax and lyrics alike"
          </p>
          <p className={`${isMobile ? 'mt-2 text-xs' : 'mt-4 text-sm'}`} style={{ color: isDark ? '#e5e7eb' : '#6b7280' }}>
            Bridging the gap between technical precision and creative expression
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutMe;