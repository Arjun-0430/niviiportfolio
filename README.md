# 🌸 Nivetha V - Portfolio Website

A world-class, Apple-inspired portfolio site with pastel-floral aesthetics and smooth scroll animations.

## ✨ Features

- **Apple-inspired Design**: Clean, minimalist interface with glassmorphism effects
- **Pastel-Floral Theme**: Soft color palette (Rose, Mint, Lavender, Blush)
- **Smooth Animations**: Framer Motion for micro-interactions and scroll-triggered animations
- **Fully Responsive**: Mobile-first design that works on all devices
- **Accessibility**: WCAG AA compliant with reduced motion support
- **Data-Driven**: All content managed via `resumeData.json`

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
nivii/
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Education.jsx
│   │   ├── Certifications.jsx
│   │   ├── Traits.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── ScrollProgress.jsx
│   │   └── BackToTop.jsx
│   ├── data/
│   │   └── resumeData.json
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Fonts**: Inter (body), Poppins (headings)

## 📝 Customization

Edit `src/data/resumeData.json` to update:
- Personal information
- Skills and competencies
- Work experience
- Projects
- Education
- Certifications
- Traits

## 🌐 Deployment

### Vercel

```bash
npm run build
# Deploy the `dist` folder to Vercel
```

### Netlify

```bash
npm run build
# Deploy the `dist` folder to Netlify
```

## 📄 License

© 2025 Nivetha V. All rights reserved.

## 🙏 Acknowledgments

Built with React, Framer Motion, TailwindCSS, and AI assistance.
