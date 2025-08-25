import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Command {
  command: string;
  output: string[] | string;
  timestamp: Date;
}

interface TerminalWindowProps {
  onLogout?: () => void;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ onLogout }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = {
    help: {
      output: [
        'Available commands:',
        '  help      - Show this help message',
        '  about     - Display bio information',
        '  skills    - List technical skills',
        '  projects  - Show project list',
        '  contact   - Display contact info',
        '  socials   - Show social media links',
        '  clear     - Clear terminal screen',
        '  whoami    - Display current user info',
        '  date      - Show current date and time',
        '  ls        - List available sections',
        '  logout    - Logout from desktop'
      ]
    },
    about: {
      output: [
        'R.a.mohan Tiwari',
        'Frontend Developer & Creative',
        '',
        'Transforming ideas into interactive experiences.',
        'Experimenting and exploring my rapid interests in tech.',
        '',
        'Currently working on React, learning full-stack practices.',
        'I write — syntax and lyrics alike.'
      ]
    },
    skills: {
      output: [
        'Technical Skills:',
        '',
        'Frontend:',
        '  • HTML5, CSS3, JavaScript, TypeScript',
        '  • React, TailwindCSS, Zod',
        '',
        'Backend:',
        '  • PHP, MySQL, MongoDB, SQL Server',
        '',
        'Programming:',
        '  • Java, C++',
        '',
        'Currently Learning:',
        '  • Full-stack development',
        '  • Advanced React patterns'
      ]
    },
    projects: {
      output: [
        'Featured Projects:',
        '',
        '1. MovieFlix',
        '   React app with TMDB API integration',
        '   Live: https://moviee-flix.vercel.app',
        '',
        '2. Aaja Ta Sure',
        '   TypeScript To-Do app with Zod validation',
        '   Live: https://aajatasure.vercel.app',
        '',
        '3. Attendify+',
        '   PHP/MySQL attendance management system',
        '',
        '4. GadiBazaar',
        '   Full-stack marketplace application',
        '   Live: https://gadibazaar.infy.uk',
        '',
        'GitHub: https://github.com/Ramoniswack'
      ]
    },
    contact: {
      output: [
        'Contact Information:',
        '',
        'Email: ramontiwari086@gmail.com',
        '',
        'Social Media:',
        '  • GitHub: https://github.com/Ramoniswack',
        '  • LinkedIn: https://linkedin.com/in/r-a-mohan',
        '  • Discord: https://discord.gg/72n6NAwK',
        '',
        'Status: Available for freelance and full-time opportunities'
      ]
    },
    socials: {
      output: [
        'Social Media Links:',
        '',
        'Professional:',
        '  • GitHub: https://github.com/Ramoniswack',
        '  • LinkedIn: https://linkedin.com/in/r-a-mohan',
        '',
        'Social:',
        '  • Discord: https://discord.gg/72n6NAwK',
        '  • X (Twitter): https://x.com/RamonTiwari',
        '  • Instagram: https://instagram.com/r.a.mon_',
        '  • Facebook: https://facebook.com/profile.php?id=100090829328516'
      ]
    },
    whoami: {
      output: ['ramon@portfolio:~$ frontend-developer && creative']
    },
    date: {
      output: [new Date().toString()]
    },
    ls: {
      output: [
        'about.md    skills.json    projects/',
        'contact.txt    socials/    experience.log',
        'terminal.sh    tech-stack.config'
      ]
    },
    logout: {
      output: [
        'Logging out...',
        'Goodbye! 👋'
      ]
    }
  };

  useEffect(() => {
    // Welcome message
    setHistory([
      {
        command: 'Welcome to R.a.mohan Portfolio Terminal v1.0',
        output: [
          'Type "help" to see available commands.',
          'Use ↑↓ arrow keys to navigate command history.',
          ''
        ],
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output: string[] | string = [];

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (commands[cmd as keyof typeof commands]) {
      output = commands[cmd as keyof typeof commands].output;
      
      // Handle logout command
      if (cmd === 'logout' && onLogout) {
        setTimeout(() => {
          onLogout();
        }, 1500);
      }
    } else {
      output = [`Command not found: ${cmd}`, 'Type "help" for available commands.'];
    }

    setHistory(prev => [...prev, {
      command: input,
      output,
      timestamp: new Date()
    }]);

    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const commandHistory = history.filter(h => h.command && !h.command.startsWith('Welcome'));
    
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? 0 : Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex].command);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="h-full p-4 bg-black bg-opacity-90 font-mono text-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex flex-col"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <span className="text-gray-300 ml-4">ramon@portfolio:~</span>
          </div>
          <span className="text-gray-500 text-xs">Terminal v1.0</span>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="flex-grow overflow-y-auto mb-4 space-y-2"
        >
          {history.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {entry.command && !entry.command.startsWith('Welcome') && (
                <div className="flex text-green-400">
                  <span className="text-gray-500">ramon@portfolio:~$ </span>
                  <span className="ml-1">{entry.command}</span>
                </div>
              )}
              <div className="text-gray-300 whitespace-pre-line ml-0">
                {Array.isArray(entry.output) ? entry.output.join('\n') : entry.output}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">ramon@portfolio:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent text-gray-300 outline-none"
            placeholder="Type a command..."
            autoComplete="off"
          />
        </form>

        {/* Footer */}
        <div className="mt-4 pt-2 border-t border-gray-700 text-xs text-gray-500">
          <p>Use TAB for autocompletion • Ctrl+C to interrupt • Type 'help' for commands</p>
        </div>
      </motion.div>
    </div>
  );
};

export default TerminalWindow;