import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import { useWindows } from '../context/WindowContext';
import { User, Code, Folder, Mail, Calendar, Share2, Terminal, Settings } from 'lucide-react';
import AboutMe from './windows/AboutMe';
import Skills from './windows/Skills';
import Portfolio from './windows/Portfolio';
import Contact from './windows/Contact';
import Experience from './windows/Experience';
import Socials from './windows/Socials';
import TerminalWindow from './windows/TerminalWindow';
import TechStack from './windows/TechStack';

interface DesktopProps {
  onLogout: () => void;
}

const Desktop: React.FC<DesktopProps> = ({ onLogout }) => {
  const { openWindow } = useWindows();
  const [showTooltip, setShowTooltip] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const desktopIcons = [
    { id: 'about', title: 'About Me', icon: User, component: AboutMe, position: { x: 100, y: 100 } },
    { id: 'skills', title: 'Skills', icon: Code, component: Skills, position: { x: 100, y: 200 } },
    { id: 'portfolio', title: 'Portfolio', icon: Folder, component: Portfolio, position: { x: 100, y: 300 } },
    { id: 'contact', title: 'Contact', icon: Mail, component: Contact, position: { x: 100, y: 400 } },
    { id: 'experience', title: 'Experience', icon: Calendar, component: Experience, position: { x: 250, y: 100 } },
    { id: 'socials', title: 'Socials', icon: Share2, component: Socials, position: { x: 250, y: 200 } },
    { id: 'terminal', title: 'Terminal', icon: Terminal, component: TerminalWindow, position: { x: 250, y: 300 } },
    { id: 'tech-stack', title: 'Tech Stack', icon: Settings, component: TechStack, position: { x: 250, y: 400 } },
  ];

  if (isMobile) {
    return (
      <div className="w-full h-full relative overflow-y-auto">
        {/* Mobile Header */}
        <div className="bg-gray-900/90 backdrop-blur-sm p-4 sticky top-0 z-50">
          <h1 className="text-xl font-bold text-white text-center">R.a.mohan Tiwari</h1>
          <p className="text-sm text-gray-300 text-center">Frontend Developer & Creative</p>
        </div>

        {/* Mobile Grid */}
        <div className="p-4 grid grid-cols-2 gap-4 pb-20">
          {desktopIcons.map((icon, index) => (
            <motion.div
              key={icon.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center"
              onClick={() => {
                if (icon.id === 'terminal') {
                  openWindow(icon.id, icon.title, icon.component, { onLogout });
                } else {
                  openWindow(icon.id, icon.title, icon.component);
                }
              }}
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                <icon.icon size={32} className="text-white" />
              </div>
              <h3 className="text-white font-medium text-sm">{icon.title}</h3>
            </motion.div>
          ))}
        </div>

        <Taskbar onLogout={onLogout} />
      </div>
    );
  }
  return (
    <div className="w-full h-full relative">
      {/* Desktop Icons */}
      {desktopIcons.map((icon, index) => (
        <motion.div
          key={icon.id}
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          style={{
            position: 'absolute',
            left: icon.position.x,
            top: icon.position.y,
          }}
        >
          <DesktopIcon
            title={icon.title}
            icon={icon.icon}
            onClick={() => {
              if (icon.id === 'terminal') {
                openWindow(icon.id, icon.title, icon.component, { onLogout });
              } else {
                openWindow(icon.id, icon.title, icon.component);
              }
            }}
          />
        </motion.div>
      ))}

      {/* User Guidance Tooltip */}
      {showTooltip && !isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-20 right-8 glass-morphism rounded-lg p-4 max-w-sm"
        >
          <div className="text-sm text-gray-800">
            <h3 className="font-semibold mb-2">Welcome to my Desktop Portfolio!</h3>
            <ul className="space-y-1 text-xs">
              <li>• Click icons to open applications</li>
              <li>• Drag windows to move them around</li>
              <li>• Press Ctrl+K for quick navigation</li>
              <li>• Hover over taskbar to reveal it</li>
            </ul>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </motion.div>
      )}

      <Taskbar onLogout={onLogout} />
    </div>
  );
};

export default Desktop;