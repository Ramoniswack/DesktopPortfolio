import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, MessageCircle, Camera, Linkedin, Twitter, Facebook } from 'lucide-react';

interface SocialLink {
  name: string;
  username: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  color: string;
  followers?: string;
}

const Socials: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      username: '@Ramoniswack',
      url: 'https://github.com/Ramoniswack',
      icon: Github,
      description: 'Code repositories and open source contributions',
      color: '#333',
      followers: 'Public repos: 8+'
    },
    {
      name: 'LinkedIn',
      username: 'r-a-mohan',
      url: 'https://linkedin.com/in/r-a-mohan',
      icon: Linkedin,
      description: 'Professional network and career updates',
      color: '#0077B5'
    },
    {
      name: 'Discord',
      username: 'Join Server',
      url: 'https://discord.gg/72n6NAwK',
      icon: MessageCircle,
      description: 'Community discussions and collaboration',
      color: '#5865F2'
    },
    {
      name: 'X (Twitter)',
      username: '@RamonTiwari',
      url: 'https://x.com/RamonTiwari',
      icon: Twitter,
      description: 'Tech thoughts and project updates',
      color: '#1DA1F2'
    },
    {
      name: 'Instagram',
      username: '@r.a.mon_',
      url: 'https://instagram.com/r.a.mon_',
      icon: Camera,
      description: 'Personal moments and creative content',
      color: '#E4405F'
    },
    {
      name: 'Facebook',
      username: 'R.a.mohan Tiwari',
      url: 'https://facebook.com/profile.php?id=100090829328516',
      icon: Facebook,
      description: 'Personal updates and community engagement',
      color: '#1877F2'
    }
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
            Connect With Me
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Find me across the web and let's connect
          </motion.p>
        </div>

        {/* Social Links Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gray-800/50 rounded-2xl p-6 group hover:shadow-xl transition-all duration-300 text-white border border-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-start space-x-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: social.color }}
                >
                  <social.icon size={28} className="text-white" />
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold truncate text-white">
                      {social.name}
                    </h3>
                    <ExternalLink 
                      size={16} 
                      className="text-gray-400 group-hover:text-gray-600 transition-colors ml-2" 
                    />
                  </div>
                  
                  <p className="text-sm font-medium mb-2" style={{ color: social.color }}>
                    {social.username}
                  </p>
                  
                  <p className="text-xs mb-3 text-gray-200">
                    {social.description}
                  </p>
                  
                  {social.followers && (
                    <p className="text-xs font-medium text-blue-300">
                      {social.followers}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Hover indicator */}
              <motion.div
                className="mt-4 h-1 rounded-full"
                style={{ backgroundColor: social.color }}
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800/50 rounded-2xl p-8 text-center border border-gray-700 text-white"
        >
          <h2 className="text-xl font-bold mb-4">
            Let's Collaborate
          </h2>
          <p className="mb-6 text-gray-200">
            I'm always open to interesting conversations, collaboration opportunities, 
            and connecting with fellow developers and creatives.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <motion.button
              className="px-6 py-3 rounded-lg font-medium text-white transition-all bg-sky-500 hover:bg-sky-600"
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://github.com/Ramoniswack')}
            >
              View Code
            </motion.button>
            
            <motion.button
              className="px-6 py-3 rounded-lg font-medium text-white transition-all bg-blue-700 hover:bg-blue-800"
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://linkedin.com/in/r-a-mohan')}
            >
              Connect
            </motion.button>
            
            <motion.button
              className="px-6 py-3 rounded-lg font-medium text-white transition-all bg-ocean-blue hover:bg-blue-900"
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('mailto:ramontiwari086@gmail.com')}
            >
              Email Me
            </motion.button>
          </div>
        </motion.div>

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700 text-white">
            <div className="text-2xl font-bold mb-2 text-sky-400">
              6+
            </div>
            <p className="text-sm text-gray-200">
              Platforms Connected
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700 text-white">
            <div className="text-2xl font-bold mb-2 text-blue-400">
              24/7
            </div>
            <p className="text-sm text-gray-200">
              Online Presence
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700 text-white">
            <div className="text-2xl font-bold mb-2 text-ocean-blue">
              100%
            </div>
            <p className="text-sm text-gray-200">
              Response Rate
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Socials;