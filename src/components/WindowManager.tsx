import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindows } from '../context/WindowContext';
import Window from './Window';

const WindowManager: React.FC = () => {
  const { windows } = useWindows();
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
    <AnimatePresence>
      {windows.map((window) => (
        <motion.div
          key={window.id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 25,
            duration: 0.3
          }}
          style={{ 
            zIndex: window.zIndex,
            display: window.isMinimized ? 'none' : 'block',
            ...(isMobile && {
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1000
            })
          }}
        >
          <Window windowState={{
            ...window,
            ...(isMobile && {
              isMaximized: true,
              position: { x: 0, y: 0 },
              size: { width: window.innerWidth || 400, height: window.innerHeight || 600 }
            })
          }} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default WindowManager;