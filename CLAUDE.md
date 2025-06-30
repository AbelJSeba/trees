# Trees Digital Garden - Comprehensive Project Guide

## Project Overview

This is Abel's Digital Garden - a personal portfolio and content management system built with React, TypeScript, and Vite. The project features a nature/tree-themed design with interactive visualizations and smooth animations.

**⚠️ IMPORTANT NOTE**: The "3D Sphere" feature mentioned in initial docs is **NOT IMPLEMENTED**. Only a traditional grid-based project view exists.

### Key Features (Actual Implementation)
- **Digital Garden Concept**: Non-chronological content organization with growing, interconnected ideas
- **Grid-Based Projects**: Traditional responsive grid layout for project showcase
- **Scrollytelling Tree**: Scroll-driven animation showing growth stages from dirt to cosmos
- **Content Sections**: Reading notes, writing (essays & poetry), and deep dives
- **Responsive Design**: Mobile-friendly with collapsible navigation
- **Nature Theme**: Green color palette with tree/garden metaphors throughout
- **Form Infrastructure**: Complete form handling system (unused)
- **Comprehensive UI Library**: 47 shadcn/ui components (many unused)

## Tech Stack

### Core Technologies
- **React 18.2.0** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework with custom nature theme
- **Framer Motion** - Animations

### UI Component Library
- **Shadcn/ui** - Complete component library using Radix UI primitives
- **Lucide React** - Icon library
- **Class Variance Authority (CVA)** - Component variants

### Additional Libraries
- **Embla Carousel** - Carousel functionality (❌ UNUSED)
- **Recharts** - Data visualization (❌ UNUSED)
- **React Hook Form** - Form handling (❌ UNUSED but configured)
- **Sonner** - Toast notifications (❌ UNUSED)
- **date-fns** - Date formatting (❌ UNUSED)

**⚠️ Bundle Size Impact**: ~60-70% of dependencies are unused and can be safely removed

## Project Structure

```
/trees/
├── src/
│   ├── App.tsx                    # Main app component with routing logic
│   ├── main.tsx                   # React entry point
│   ├── components/
│   │   ├── sections/              # Page sections
│   │   │   ├── Hero.tsx          # Landing page with ScrollytellingTree
│   │   │   ├── Header.tsx        # Navigation header
│   │   │   ├── About.tsx         # About page with profile
│   │   │   ├── Projects.tsx      # Grid-based project showcase
│   │   │   ├── ContentSection.tsx # Reusable content grid template
│   │   │   ├── WritingSection.tsx # Writing showcase with filters
│   │   │   ├── WritingDetail.tsx # Individual writing piece view
│   │   │   ├── Footer.tsx        # Site footer
│   │   │   ├── ScrollytellingTree.tsx # Scroll animation component
│   │   │   └── SphereProjects.tsx # ❌ NOT IMPLEMENTED
│   │   ├── ui/                    # Shadcn/ui components (40+ components)
│   │   ├── common/                # Shared components
│   │   └── pages/                 # Page-level components
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── lib/
│   │   └── constants.ts          # App constants and sample data
│   ├── styles/
│   │   └── globals.css           # Global styles and theme variables
│   ├── hooks/                     # Custom React hooks
│   ├── utils/                     # Utility functions
│   └── assets/
│       ├── fonts/                 # Custom fonts
│       └── images/                # Static images
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
├── tailwind.config.js            # Tailwind configuration
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
└── postcss.config.js             # PostCSS configuration
```

## Key Components

### Navigation & Layout
- **App.tsx**: Main component managing section navigation and selected content
- **Header.tsx**: Sticky navigation with mobile menu
- **Footer.tsx**: Site footer with social links

### Content Sections
- **Hero.tsx**: Landing page with introduction and navigation cards
- **About.tsx**: Personal profile, interests, skills, and philosophy
- **Projects.tsx**: Grid-based project showcase with hover animations
- **ContentSection.tsx**: Template for reading/deep-dive sections
- **WritingSection.tsx**: Writing showcase with essay/poetry filters
- **WritingDetail.tsx**: Full-screen writing piece viewer

### Interactive Components
- **ScrollytellingTree.tsx**: 7-stage scroll animation (dirt → cosmos)
- **SphereProjects.tsx**: ❌ NOT IMPLEMENTED (documented but missing)

### Animation Components
- **Framer Motion Integration**: Used across Hero, Projects, and Writing sections
- **CSS Animations**: Social media hover effects and smooth transitions
- **Scroll-Triggered Animations**: Progressive reveal with staggered timing

## Navigation Flow

The app uses a single-page architecture with section-based navigation:

1. **Home** (`activeSection: 'home'`) - Hero landing page
2. **About** (`activeSection: 'about'`) - Personal information
3. **Projects** (`activeSection: 'projects'`) - Grid-based project showcase
4. **Reading** (`activeSection: 'reading'`) - Reading notes grid
5. **Writing** (`activeSection: 'writing'`) - Essays and poetry
6. **Deep Dives** (`activeSection: 'deep-dives'`) - In-depth explorations

Writing items can be clicked to show `WritingDetail` view with full content.

## Styling System

### Theme Colors (Nature/Garden Theme)
- **Primary**: Various shades of green (`#2d5a2d`, `#7fb069`)
- **Background**: Light green-tinted white (`#fafbfa`)
- **Accent**: Nature greens (`#6a994e`, `#a7c957`)
- **Dark Mode**: Deep forest greens with light green text

### CSS Architecture
- Tailwind CSS with custom configuration
- CSS variables for theme customization
- Responsive design with mobile-first approach
- Custom animations for scrollytelling and interactions

## Available Scripts

```bash
npm run dev      # Start development server (Vite)
npm run build    # TypeScript check + production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Critical Issues Found

### High Priority Fixes Needed
1. **Type Mismatch**: Header component expects `string` but receives `SectionType` - will cause runtime errors
2. **XSS Vulnerability**: chart.tsx uses `dangerouslySetInnerHTML` without sanitization
3. **Bundle Size**: 60-70% of dependencies are unused (347KB → ~120KB after cleanup)
4. **Performance**: ScrollytellingTree lacks scroll throttling causing performance issues
5. **Accessibility**: Missing ARIA labels, keyboard navigation, and focus management
6. **External Dependencies**: 100% reliance on Unsplash CDN for all images

### Medium Priority Issues
1. **No URL Routing**: Cannot bookmark or share specific sections
2. **Missing Error Handling**: No error boundaries or loading states
3. **SEO Issues**: Missing meta tags, Open Graph, and structured data
4. **Dark Mode**: CSS ready but no toggle mechanism implemented
5. **Social Links**: All placeholder URLs, not functional

## Sample Data

All sample content is defined in `src/lib/constants.ts`:
- `NAV_ITEMS`: Navigation menu items
- `SAMPLE_READING_ITEMS`: Reading notes examples
- `SAMPLE_WRITING_ITEMS`: Writing pieces (essays & poetry)
- `SAMPLE_DEEP_DIVE_ITEMS`: Deep dive explorations

## Type Definitions

Key TypeScript interfaces in `src/types/index.ts`:
- `SectionType`: Navigation section types
- `BaseContentItem`: Common content properties
- `ReadingItem`, `WritingItem`, `DeepDiveItem`: Content types
- Component prop types for all major components

## Development Tips

1. **Adding New Sections**: Update `SectionType` and add case in App.tsx
2. **New Components**: Place in appropriate folder (sections/ui/common)
3. **Styling**: Use Tailwind classes and theme variables
4. **Icons**: Use Lucide React icons for consistency
5. **Animations**: Leverage Framer Motion for smooth transitions

## Common Tasks

### Add a New Writing Piece
1. Add item to `SAMPLE_WRITING_ITEMS` in `lib/constants.ts`
2. Include all required fields (title, content, type, etc.)
3. Writing will appear in WritingSection automatically

### Modify Theme Colors
1. Edit CSS variables in `src/styles/globals.css`
2. Update both light and dark mode values
3. Colors use HSL format for consistency

### Add New UI Component
1. Check if Shadcn/ui has the component first
2. Place in `src/components/ui/` if generic
3. Follow existing component patterns for consistency

## Performance Analysis

### Current Performance Issues
- **Unbounded Scroll Events**: ScrollytellingTree has no throttling (major performance bottleneck)
- **External Image Dependency**: All images from Unsplash CDN (single point of failure)
- **Unused Dependencies**: 60-70% of bundle size from unused libraries
- **No Image Optimization**: No lazy loading, responsive images, or WebP support
- **Animation Performance**: Multiple Framer Motion instances without optimization

### Optimization Opportunities
- **Bundle Size Reduction**: Remove unused dependencies for 60-70% size reduction
- **Image Strategy**: Implement local assets with optimization pipeline
- **Scroll Throttling**: Add `requestAnimationFrame` throttling to scroll handlers
- **Code Splitting**: Lazy load section components for better initial load
- **Icon Tree-Shaking**: Optimize Lucide React imports for significant savings

## Debugging

- ScrollytellingTree has built-in debug overlay showing scroll progress
- Browser DevTools React extension helpful for component state
- Vite provides fast HMR for quick iteration

## Architecture & Code Quality

