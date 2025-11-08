# Nivetha V - Portfolio Website

A modern, Apple-inspired portfolio website built with React and Framer Motion featuring smooth animations, content protection, and responsive design.

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js 18 or higher** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** (optional) - [Download here](https://git-scm.com/)

### Check if Node.js is installed:
```bash
node --version
npm --version
```

## 🚀 Installation & Setup

### Step 1: Extract Project
1. Extract the zip file to your desired location
2. Navigate to the project folder

### Step 2: Install Dependencies
Open terminal/command prompt in the project folder and run:

```bash
# Install all required packages
npm install
```

**Note:** This will install all dependencies listed in `package.json` including React, Vite, Framer Motion, and TailwindCSS.

### Step 3: Start Development Server
```bash
# Start the development server
npm run dev
```

### Step 4: Open in Browser
- Open your browser and go to: `http://localhost:5173`
- The website should load with all animations and features working

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |

## 🏗️ Build for Production

To create a production-ready build:

```bash
# Build the project
npm run build

# Preview the build (optional)
npm run preview
```

The built files will be in the `dist/` folder.

## 🌐 Deployment

### GitHub Pages (Current Live Site)
- **Live URL:** https://arjun-0430.github.io/niviiportfolio/
- Automatically deploys from the `main` branch using GitHub Actions

### Deploy to Other Platforms

**Netlify:**
1. Drag the `dist` folder to [netlify.com/drop](https://netlify.com/drop)
2. Get instant URL

**Vercel:**
1. Connect GitHub repository at [vercel.com](https://vercel.com)
2. Auto-deploys on every push

## 🛡️ Content Protection Features

This website includes advanced content protection:
- Screenshot blocking
- Right-click disabled
- Developer tools detection
- Screen recording prevention
- Copy/paste protection
- Print protection

## 🎨 Tech Stack & Features

### Core Technologies
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Smooth animations and transitions
- **TailwindCSS** - Utility-first CSS framework

### Key Features
- ✅ Apple-inspired design language
- ✅ Smooth scroll animations
- ✅ Responsive design (mobile-first)
- ✅ Dark/light theme support
- ✅ Interactive project showcases
- ✅ Advanced content protection
- ✅ Performance optimized
- ✅ SEO friendly

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use different port
npm run dev -- --port 3000
```

**Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Check Node.js version (should be 18+)
node --version
# Update npm
npm install -g npm@latest
```

## 📂 Project Structure

```
nivii/
├── public/                 # Static assets
│   ├── contentProtection.js
│   ├── blurOverlay.css
│   └── company-logos/
├── src/
│   ├── components/         # React components
│   ├── data/              # JSON data files
│   ├── hooks/             # Custom React hooks
│   └── contexts/          # React contexts
├── package.json           # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── tailwind.config.js    # TailwindCSS config
```

## 🤝 Support

If you encounter any issues:

1. **Check Node.js version** (must be 18+)
2. **Clear cache and reinstall** dependencies
3. **Check console** for error messages
4. **Ensure port 5173** is available

## 📄 License

This project is for portfolio purposes. All rights reserved.

---

**Developer:** Nivetha V  
**Live Site:** https://arjun-0430.github.io/niviiportfolio/  
**Built with:** React + Vite + Framer Motion + TailwindCSS