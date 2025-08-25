import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Draggable from 'react-draggable';
import { Minus, Square, X } from 'lucide-react';
import { useWindows, WindowState } from '../context/WindowContext';

interface WindowProps {
  windowState: WindowState;
}

const Window: React.FC<WindowProps> = ({ windowState }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowSize } = useWindows();
  const windowRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef<string | null>(null);
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const resizeStartSize = useRef({ width: 0, height: 0 });
  const resizeStartWindowPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = () => {
    focusWindow(windowState.id);
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = direction;
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    resizeStartSize.current = { ...windowState.size };
    resizeStartWindowPos.current = { ...windowState.position };

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing.current) return;

    const deltaX = e.clientX - resizeStartPos.current.x;
    const deltaY = e.clientY - resizeStartPos.current.y;

    let newWidth = resizeStartSize.current.width;
    let newHeight = resizeStartSize.current.height;
    let newX = resizeStartWindowPos.current.x;
    let newY = resizeStartWindowPos.current.y;

    const direction = isResizing.current;

    if (direction.includes('right')) {
      newWidth = Math.max(400, resizeStartSize.current.width + deltaX);
    }
    if (direction.includes('left')) {
      newWidth = Math.max(400, resizeStartSize.current.width - deltaX);
      newX = resizeStartWindowPos.current.x + deltaX;
      if (newWidth === 400) {
        newX = resizeStartWindowPos.current.x + (resizeStartSize.current.width - 400);
      }
    }
    if (direction.includes('bottom')) {
      newHeight = Math.max(300, resizeStartSize.current.height + deltaY);
    }
    if (direction.includes('top')) {
      newHeight = Math.max(300, resizeStartSize.current.height - deltaY);
      newY = resizeStartWindowPos.current.y + deltaY;
      if (newHeight === 300) {
        newY = resizeStartWindowPos.current.y + (resizeStartSize.current.height - 300);
      }
    }

    updateWindowSize(windowState.id, { width: newWidth, height: newHeight });

    // Update position for left/top resizing
    if (direction.includes('left') || direction.includes('top')) {
      if (windowRef.current) {
        windowRef.current.style.left = `${newX}px`;
        windowRef.current.style.top = `${newY}px`;
      }
    }
  };

  const handleResizeEnd = () => {
    isResizing.current = null;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, []);

  const windowStyle = {
    width: windowState.isMaximized ? '100%' : `${windowState.size.width}px`,
    height: windowState.isMaximized ? '100%' : `${windowState.size.height}px`,
    position: 'fixed' as const,
    left: windowState.isMaximized ? 0 : windowState.position.x,
    top: windowState.isMaximized ? 0 : windowState.position.y,
    zIndex: windowState.zIndex,
    borderRadius: windowState.isMaximized ? 0 : undefined,
  };

  return (
    <Draggable
      handle=".window-header"
      disabled={windowState.isMaximized}
      onMouseDown={handleMouseDown}
    >
      <motion.div
        ref={windowRef}
        className={`glass-morphism overflow-hidden shadow-2xl relative ${windowState.isMaximized ? '' : 'rounded-lg'}`}
        style={windowStyle}
        layout={windowState.isMaximized}
      >
        {/* Resize Handles - Outside content area */}
        {!windowState.isMaximized && (
          <>
            {/* Corner handles */}
            <div
              className="absolute -bottom-1 -right-1 w-4 h-4 cursor-se-resize bg-gray-400 opacity-0 hover:opacity-70 transition-opacity z-50"
              onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
            />
            <div
              className="absolute -top-1 -right-1 w-4 h-4 cursor-ne-resize bg-gray-400 opacity-0 hover:opacity-70 transition-opacity z-50"
              onMouseDown={(e) => handleResizeStart(e, 'top-right')}
            />
            <div
              className="absolute -bottom-1 -left-1 w-4 h-4 cursor-sw-resize bg-gray-400 opacity-0 hover:opacity-70 transition-opacity z-50"
              onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
            />
            <div
              className="absolute -top-1 -left-1 w-4 h-4 cursor-nw-resize bg-gray-400 opacity-0 hover:opacity-70 transition-opacity z-50"
              onMouseDown={(e) => handleResizeStart(e, 'top-left')}
            />

            {/* Edge handles */}
            <div
              className="absolute -bottom-1 left-4 right-4 h-2 cursor-s-resize bg-gray-400 opacity-0 hover:opacity-50 transition-opacity z-50"
              onMouseDown={(e) => handleResizeStart(e, 'bottom')}
            />
            <div
              className="absolute -top-1 left-4 right-4 h-2 cursor-n-resize bg-gray-400 opacity-0 hover:opacity-50 transition-opacity z-50"
              onMouseDown={(e) => handleResizeStart(e, 'top')}
            />
            <div
              className="absolute -right-1 top-4 bottom-4 w-2 cursor-e-resize bg-gray-400 opacity-0 hover:opacity-50 transition-opacity z-50"
              onMouseDown={(e) => handleResizeStart(e, 'right')}
            />
            <div
              className="absolute -left-1 top-4 bottom-4 w-2 cursor-w-resize bg-gray-400 opacity-0 hover:opacity-50 transition-opacity z-50"
              onMouseDown={(e) => handleResizeStart(e, 'left')}
            />
          </>
        )}
        {/* Window Header */}
        <div
          className="window-header h-12 flex items-center justify-between px-4 cursor-move select-none"
          style={{ backgroundColor: 'rgba(145, 200, 228, 0.2)' }}
        >
          <h3 className="text-sm font-semibold" style={{ color: 'var(--dark-slate)' }}>
            {windowState.title}
          </h3>

          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => minimizeWindow(windowState.id)}
              className="w-6 h-6 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Minus size={12} className="text-yellow-800" />
            </motion.button>

            <motion.button
              onClick={() => maximizeWindow(windowState.id)}
              className="w-6 h-6 rounded-full bg-green-400 hover:bg-green-500 flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Square size={10} className="text-green-800" />
            </motion.button>

            <motion.button
              onClick={() => closeWindow(windowState.id)}
              className="w-6 h-6 rounded-full bg-red-400 hover:bg-red-500 flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={12} className="text-red-800" />
            </motion.button>
          </div>
        </div>

        {/* Window Content */}
        <div className="h-full pb-12 overflow-hidden">
          <windowState.component {...windowState.props} />
        </div>
      </motion.div>
    </Draggable>
  );
};

export default Window;