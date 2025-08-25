import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface DesktopIconProps {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ title, icon: Icon, onClick }) => {
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer p-4 rounded-lg select-none"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="w-16 h-16 rounded-2xl glass-morphism flex items-center justify-center mb-2 shadow-lg"
        whileHover={{ 
          backgroundColor: 'rgba(145, 200, 228, 0.3)',
          boxShadow: '0 12px 40px rgba(31, 38, 135, 0.5)'
        }}
        transition={{ duration: 0.2 }}
      >
        <Icon 
          size={32} 
          className="text-white"
          strokeWidth={1.5}
        />
      </motion.div>
      <span 
        className="text-sm font-medium text-center max-w-20 leading-tight text-white"
      >
        {title}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;