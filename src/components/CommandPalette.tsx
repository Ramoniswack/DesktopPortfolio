import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Code, Folder, Mail, Calendar, Share2, Terminal, Settings, LogOut } from 'lucide-react';
import { useWindows } from '../context/WindowContext';
import AboutMe from './windows/AboutMe';
import Skills from './windows/Skills';
import Portfolio from './windows/Portfolio';
import Contact from './windows/Contact';
import Experience from './windows/Experience';
import Socials from './windows/Socials';
import TerminalWindow from './windows/TerminalWindow';
import TechStack from './windows/TechStack';

interface CommandPaletteProps {
  onClose: () => void;
  onLogout: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ onClose, onLogout }) => {
  const { openWindow } = useWindows();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const commands = [
    { id: 'about', title: 'About Me', icon: User, component: AboutMe, keywords: ['about', 'profile', 'bio', 'me'] },
    { id: 'skills', title: 'Skills', icon: Code, component: Skills, keywords: ['skills', 'abilities', 'tech', 'programming'] },
    { id: 'portfolio', title: 'Portfolio', icon: Folder, component: Portfolio, keywords: ['portfolio', 'projects', 'work', 'showcase'] },
    { id: 'contact', title: 'Contact', icon: Mail, component: Contact, keywords: ['contact', 'email', 'reach', 'message'] },
    { id: 'experience', title: 'Experience', icon: Calendar, component: Experience, keywords: ['experience', 'work', 'career', 'history'] },
    { id: 'socials', title: 'Socials', icon: Share2, component: Socials, keywords: ['social', 'links', 'profiles', 'network'] },
    { id: 'terminal', title: 'Terminal', icon: Terminal, component: TerminalWindow, keywords: ['terminal', 'console', 'command', 'cli'] },
    { id: 'tech-stack', title: 'Tech Stack', icon: Settings, component: TechStack, keywords: ['tech', 'stack', 'technology', 'tools'] },
    { id: 'logout', title: 'Logout', icon: LogOut, keywords: ['logout', 'sign out', 'exit', 'log out'] },
  ];

  const filteredCommands = commands.filter(command => 
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.keywords.some(keyword => keyword.includes(query.toLowerCase()))
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleCommandSelect = (command: any) => {
    if (command.id === 'logout') {
      setShowLogoutConfirm(true);
      return;
    }
    openWindow(command.id, command.title, command.component);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          const command = filteredCommands[selectedIndex];
          handleCommandSelect(command);
        }
        break;
      case 'Escape':
        if (showLogoutConfirm) {
          setShowLogoutConfirm(false);
        } else {
          onClose();
        }
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-morphism rounded-2xl p-6 w-96 max-h-96"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search applications..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-sky-400 text-white placeholder-gray-300"
          />
        </div>

        {/* Commands List */}
        <div className="space-y-1 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command, index) => (
                <motion.div
                  key={command.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                    index === selectedIndex 
                      ? 'bg-sky-400 bg-opacity-30' 
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                  onClick={() => handleCommandSelect(command)}
                >
                  <command.icon size={20} className="text-white" />
                  <span className="text-white font-medium">{command.title}</span>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-300"
              >
                No applications found
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-white border-opacity-20 text-xs text-gray-300 text-center">
          Press <kbd className="px-2 py-1 bg-white bg-opacity-20 rounded">↑↓</kbd> to navigate, 
          <kbd className="px-2 py-1 bg-white bg-opacity-20 rounded ml-1">↵</kbd> to select, 
          <kbd className="px-2 py-1 bg-white bg-opacity-20 rounded ml-1">Esc</kbd> to close
        </div>
        {/* Logout Confirmation Dialog */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10001]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-morphism rounded-lg p-6 max-w-sm mx-4 bg-white/90 dark:bg-gray-800/90"
            >
              <div className="text-center">
                <LogOut className="w-12 h-12 mx-auto mb-4 text-red-500 dark:text-red-400" />
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Logout</h3>
                <p className="text-sm mb-6 text-gray-600 dark:text-gray-300">
                  Are you sure you want to logout? You'll be returned to the login screen.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 py-2 px-4 rounded-lg transition-all duration-200 bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => { setShowLogoutConfirm(false); onLogout(); onClose(); }}
                    className="flex-1 py-2 px-4 rounded-lg transition-all duration-200 bg-red-500 text-white hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CommandPalette;