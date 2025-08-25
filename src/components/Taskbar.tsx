import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Code, Folder, Mail, Calendar, Share2, Terminal, Settings, Sun, Moon, LogOut } from 'lucide-react';
import { useWindows } from '../context/WindowContext';
import { useTheme } from '../context/ThemeContext';
import AboutMe from './windows/AboutMe';
import Skills from './windows/Skills';
import Portfolio from './windows/Portfolio';
import Contact from './windows/Contact';
import Experience from './windows/Experience';
import Socials from './windows/Socials';
import TerminalWindow from './windows/TerminalWindow';
import TechStack from './windows/TechStack';

interface TaskbarProps {
  onLogout: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ onLogout }) => {
  const { windows, openWindow, focusWindow } = useWindows();
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const taskbarItems = [
    { id: 'about', icon: User, label: 'About Me', component: AboutMe },
    { id: 'skills', icon: Code, label: 'Skills', component: Skills },
    { id: 'portfolio', icon: Folder, label: 'Portfolio', component: Portfolio },
    { id: 'experience', icon: Calendar, label: 'Experience', component: Experience },
    { id: 'contact', icon: Mail, label: 'Contact', component: Contact },
    { id: 'socials', icon: Share2, label: 'Socials', component: Socials },
    { id: 'terminal', icon: Terminal, label: 'Terminal', component: TerminalWindow },
    { id: 'tech-stack', icon: Settings, label: 'Tech Stack', component: TechStack },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  if (isMobile) {
    return (
      <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-sm border-t z-50 ${
        isDark ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-300'
      }`}>
        <div className="flex items-center justify-around p-2 overflow-x-auto">
          {taskbarItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = windows.some(w => w.id === item.id);
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  const existingWindow = windows.find(w => w.id === item.id);
                  if (existingWindow) {
                    focusWindow(item.id);
                  } else {
                    if (item.id === 'terminal') {
                      openWindow(item.id, item.label, item.component, { onLogout });
                    } else {
                      openWindow(item.id, item.label, item.component);
                    }
                  }
                }}
                className={`p-3 rounded-lg transition-all duration-200 flex flex-col items-center min-w-0 ${
                  isActive 
                    ? `${isDark ? 'bg-blue-600/80 text-white' : 'bg-blue-500/80 text-white'}` 
                    : `${isDark ? 'text-gray-300 hover:bg-gray-700/80 hover:text-white' : 'text-gray-600 hover:bg-gray-200/80 hover:text-gray-900'}`
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs truncate">{item.label.split(' ')[0]}</span>
                {isActive && (
                  <div className={`w-1 h-1 rounded-full mt-1 ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                )}
              </button>
            );
          })}
          
          {/* Logout Button for Mobile */}
          <button
            onClick={handleLogoutClick}
            className={`p-3 rounded-lg transition-all duration-200 flex flex-col items-center min-w-0 ${
              isDark ? 'text-red-400 hover:bg-red-500/20 hover:text-red-300' : 'text-red-500 hover:bg-red-100/80 hover:text-red-600'
            }`}
            title="Logout"
          >
            <LogOut className="w-5 h-5 mb-1" />
            <span className="text-xs truncate">Logout</span>
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={`fixed bottom-0 left-0 right-0 h-12 backdrop-blur-sm border-t flex items-center px-4 z-50 ${
        isDark ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-300'
      }`}>
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-shrink-0 mr-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="R.a.mohan's Portfolio"
              className={`pl-10 pr-4 py-2 w-64 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDark 
                  ? 'bg-gray-800/80 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-100/80 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </form>

        {/* Taskbar Items */}
        <div className="flex items-center space-x-2 flex-1">
          {taskbarItems.map((item) => {
            const Icon = item.icon;
            const isActive = windows.some(w => w.id === item.id);
            
                          return (
                <button
                  key={item.id}
                  onClick={() => {
                    const existingWindow = windows.find(w => w.id === item.id);
                    if (existingWindow) {
                      focusWindow(item.id);
                    } else {
                      if (item.id === 'terminal') {
                        openWindow(item.id, item.label, item.component, { onLogout });
                      } else {
                        openWindow(item.id, item.label, item.component);
                      }
                    }
                  }}
                  className={`p-2 rounded-lg transition-all duration-200 group relative ${
                  isActive 
                    ? `${isDark ? 'bg-blue-600/80 text-white' : 'bg-blue-500/80 text-white'}` 
                    : `${isDark ? 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 hover:text-white' : 'bg-gray-200/60 text-gray-600 hover:bg-gray-300/80 hover:text-gray-900'}`
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                    isDark ? 'bg-blue-400' : 'bg-blue-600'
                  }`}></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center space-x-2 mr-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isDark 
                ? 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 hover:text-white' 
                : 'bg-gray-200/60 text-gray-600 hover:bg-gray-300/80 hover:text-gray-900'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Logout Button */}
        <div className="flex items-center space-x-2 mr-4">
          <button
            onClick={handleLogoutClick}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isDark 
                ? 'bg-gray-800/60 text-red-400 hover:bg-red-500/20 hover:text-red-300' 
                : 'bg-gray-200/60 text-red-500 hover:bg-red-100/80 hover:text-red-600'
            }`}
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* System Tray */}
        <div className={`flex items-center space-x-2 text-sm ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`glass-morphism rounded-lg p-6 max-w-sm mx-4 ${
              isDark ? 'bg-gray-800/90' : 'bg-white/90'
            }`}
          >
            <div className="text-center">
              <LogOut className={`w-12 h-12 mx-auto mb-4 ${
                isDark ? 'text-red-400' : 'text-red-500'
              }`} />
              <h3 className={`text-lg font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Logout
              </h3>
              <p className={`text-sm mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Are you sure you want to logout? You'll be returned to the login screen.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleLogoutCancel}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  className="flex-1 py-2 px-4 rounded-lg transition-all duration-200 bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Taskbar;