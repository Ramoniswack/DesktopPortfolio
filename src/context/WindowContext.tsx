import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface WindowState {
  id: string;
  title: string;
  component: React.ComponentType;
  props?: Record<string, any>;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

interface WindowContextType {
  windows: WindowState[];
  openWindow: (id: string, title: string, component: React.ComponentType, props?: Record<string, any>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);

  const openWindow = (id: string, title: string, component: React.ComponentType, props?: Record<string, any>) => {
    const existingWindow = windows.find(w => w.id === id);
    if (existingWindow) {
      focusWindow(id);
      return;
    }

    const newWindow: WindowState = {
      id,
      title,
      component,
      props,
      isMinimized: false,
      isMaximized: false,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 100 + 100 },
      size: { width: 800, height: 600 },
      zIndex: nextZIndex,
    };

    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w)
    );
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)
    );
  };

  const focusWindow = (id: string) => {
    const currentZIndex = nextZIndex;
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, zIndex: currentZIndex, isMinimized: false } : w)
    );
    setNextZIndex(prev => prev + 1);
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, position } : w)
    );
  };

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, size } : w)
    );
  };

  return (
    <WindowContext.Provider value={{
      windows,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
    }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindows = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindows must be used within a WindowProvider');
  }
  return context;
};