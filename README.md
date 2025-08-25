# Desktop Portfolio Environment

A modern, interactive desktop environment built with React, TypeScript, and Vite that serves as a creative portfolio showcase. This project simulates a complete desktop operating system experience with windows, taskbars, icons, and a custom cursor system.

## 🖥️ Desktop Environment Architecture

### Core Components

#### 1. **Login System** (`src/components/Login.tsx`)

- **Purpose**: Authenticates users before entering the desktop environment
- **Features**:
  - Real-time clock display with date
  - Animated glass-morphism design
  - Profile image with fallback
  - Loading animation during login process
  - Responsive design for mobile/desktop
- **Mouse Issue**: ✅ Fixed - Cursor visibility properly managed between login and desktop states

#### 2. **Desktop Interface** (`src/components/Desktop.tsx`)

- **Purpose**: Main desktop workspace with icons and background
- **Features**:
  - Desktop icons with drag-and-drop positioning
  - Animated icon appearances
  - User guidance tooltips
  - Mobile-responsive grid layout
  - Glass-morphism background effects

#### 3. **Taskbar System** (`src/components/Taskbar.tsx`)

- **Purpose**: Bottom navigation bar with quick access to applications
- **Features**:
  - Search functionality
  - Application shortcuts with active state indicators
  - Theme toggle (dark/light mode)
  - System clock display
  - Mobile-optimized bottom navigation
  - Hover effects and animations

#### 4. **Window Management** (`src/components/Window.tsx`)

- **Purpose**: Individual application windows with full desktop OS controls
- **Features**:
  - Draggable windows with custom handles
  - Resizable windows (8-direction resize)
  - Minimize, maximize, close buttons
  - Z-index management for window stacking
  - Glass-morphism styling
  - Mobile-optimized full-screen windows

#### 5. **Custom Cursor** (`src/components/CustomCursor.tsx`)

- **Purpose**: Replaces default cursor with animated custom cursor
- **Features**:
  - Animated cursor trail effects
  - Dynamic scaling for clickable elements
  - Color-coded interaction states
  - Performance-optimized animations
  - Mobile detection (disabled on mobile)

### Application Windows

#### Portfolio Applications

- **About Me** (`src/components/windows/AboutMe.tsx`): Personal information and bio
- **Skills** (`src/components/windows/Skills.tsx`): Technical skills showcase
- **Portfolio** (`src/components/windows/Portfolio.tsx`): Project gallery
- **Experience** (`src/components/windows/Experience.tsx`): Work history
- **Contact** (`src/components/windows/Contact.tsx`): Contact information
- **Socials** (`src/components/windows/Socials.tsx`): Social media links
- **Tech Stack** (`src/components/windows/TechStack.tsx`): Technology overview
- **Terminal** (`src/components/windows/TerminalWindow.tsx`): Interactive terminal simulation

### State Management

#### 1. **Window Context** (`src/context/WindowContext.tsx`)

- **Purpose**: Manages all window states and operations
- **Features**:
  - Window opening/closing/minimizing/maximizing
  - Position and size management
  - Z-index stacking order
  - Window focus management
  - State persistence

#### 2. **Theme Context** (`src/context/ThemeContext.tsx`)

- **Purpose**: Manages dark/light theme switching
- **Features**:
  - Theme persistence in localStorage
  - CSS class toggling
  - Global theme state
  - Smooth transitions

### Design System

#### Color Palette (CSS Variables)

```css
--cream: #FFFBDE        /* Light backgrounds */
--sky-blue: #91C8E4     /* Primary accent */
--steel-blue: #749BC2   /* Secondary accent */
--ocean-blue: #4682A9   /* Dark accents */
--dark-slate: #383F51   /* Dark text */
--light-gray: #DDDBF1   /* Light borders */
--neutral-beige: #3C4F76 /* Neutral tones */
--warm-beige: #AB9F9D   /* Warm accents */
```

#### Glass-Morphism Effects

- Backdrop blur with transparency
- Subtle borders and shadows
- Theme-aware styling
- Smooth transitions

### Responsive Design

#### Desktop Experience

- Full desktop OS simulation
- Draggable windows and icons
- Custom cursor with trails
- Multi-window management
- Keyboard shortcuts (Ctrl+K for command palette)

#### Mobile Experience

- Simplified grid layout
- Full-screen windows
- Touch-optimized interactions
- Bottom navigation bar
- Disabled custom cursor

### Technical Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 7.0.6
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: Framer Motion 11.0.8
- **Icons**: Lucide React 0.344.0
- **Window Dragging**: React Draggable 4.5.0
- **Linting**: ESLint 9.9.1

### Key Features

1. **Authentic Desktop Experience**: Complete OS simulation with windows, taskbar, and desktop icons
2. **Interactive Elements**: Draggable windows, resizable components, custom cursor
3. **Theme System**: Dark/light mode with smooth transitions
4. **Mobile Responsive**: Optimized experience for mobile devices
5. **Performance Optimized**: Efficient animations and state management
6. **Accessibility**: Keyboard navigation and screen reader support

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### File Structure

```
src/
├── components/
│   ├── windows/          # Application windows
│   ├── Desktop.tsx       # Main desktop interface
│   ├── Taskbar.tsx       # Bottom navigation
│   ├── Window.tsx        # Window component
│   ├── Login.tsx         # Login screen
│   ├── CustomCursor.tsx  # Custom cursor
│   └── CommandPalette.tsx # Quick navigation
├── context/
│   ├── WindowContext.tsx # Window state management
│   └── ThemeContext.tsx  # Theme state management
├── styles/
│   └── globals.css       # Global styles and design system
└── App.tsx               # Main application component
```

### Known Issues

1. **Login Page Cursor**: ✅ Fixed - Cursor visibility properly managed between login and desktop states
2. **Mobile Performance**: Complex animations may impact mobile performance
3. **Window Resizing**: Edge cases in window resizing on certain screen sizes

### Future Enhancements

- [x] Fix login page cursor visibility
- [ ] Add more keyboard shortcuts
- [ ] Implement window snapping
- [ ] Add desktop wallpaper customization
- [ ] Create more application windows
- [ ] Add sound effects for interactions
- [ ] Implement file system simulation
