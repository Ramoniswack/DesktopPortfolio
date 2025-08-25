import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface LoginProps {
  onLogin: () => void;
  isLoggingIn: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoggingIn }) => {
  const { isDark } = useTheme();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      className={`w-full h-screen flex items-center justify-center relative px-4 ${isDark
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800'
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
        }`}
      style={{
        background: isDark
          ? 'linear-gradient(135deg, var(--dark-slate) 0%, var(--neutral-beige) 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Time Display */}
      <motion.div
        className="absolute top-4 sm:top-8 right-4 sm:right-8 text-right"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className={`text-2xl sm:text-3xl md:text-4xl font-thin mb-1 ${isDark ? 'text-white' : 'text-gray-800'
          }`}>
          {formatTime(time)}
        </div>
        <div className={`text-xs sm:text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
          {formatDate(time)}
        </div>
      </motion.div>

      {/* Login Form */}
      <motion.div
        className={`glass-morphism rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md text-center mx-4 ${isDark
          ? 'bg-white/10 border-white/20'
          : 'bg-white/80 border-gray-200/50'
          }`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      >
        {/* Profile Image */}
        <motion.div
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden border-4"
          style={{ borderColor: 'var(--sky-blue)' }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
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

        {/* User Info */}
        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className={`text-xl sm:text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'
            }`}>
            R.a.mohan Tiwari
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
            a developer
          </p>
        </motion.div>

        {/* Login Button/Status */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isLoggingIn ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--sky-blue)' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--steel-blue)' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--ocean-blue)' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                />
              </div>
              <p className={isDark ? 'text-white' : 'text-gray-800'}>Logging in...</p>
            </div>
          ) : (
            <motion.button
              onClick={onLogin}
              className="w-full py-3 px-6 rounded-xl font-medium text-white transition-all duration-300 text-sm sm:text-base"
              style={{ backgroundColor: 'var(--sky-blue)' }}
              whileHover={{
                scale: 1.02,
                backgroundColor: 'var(--steel-blue)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Enter Desktop
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* Footer Info */}
      <motion.div
        className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center text-xs sm:text-sm px-4 ${isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p>Click to enter the desktop experience</p>
        <p className="mt-1 hidden sm:block">Press Ctrl+K for quick navigation</p>
      </motion.div>
    </motion.div>
  );
};

export default Login;