import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Desktop from './components/Desktop';
import WindowManager from './components/WindowManager';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import { WindowProvider } from './context/WindowContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/globals.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Clear any stored state if needed
    localStorage.removeItem('desktop-session');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoggedIn(true);
    setIsLoggingIn(false);
  };

  if (!isLoggedIn) {
    return (
      <ThemeProvider>
        <Login onLogin={handleLogin} isLoggingIn={isLoggingIn} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <WindowProvider>
        <div className="desktop-container">
          <CustomCursor />
          <Desktop onLogout={handleLogout} />
          <WindowManager />
          {showCommandPalette && (
            <CommandPalette onClose={() => setShowCommandPalette(false)} onLogout={handleLogout} />
          )}
        </div>
      </WindowProvider>
    </ThemeProvider>
  );
}

export default App;