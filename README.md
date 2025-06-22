# Trees - Digital Garden

A beautiful, modern digital garden built with React, TypeScript, and Tailwind CSS. This project serves as a personal knowledge management system and creative writing platform.

## Project Structure

```
src/
├── components/
│   ├── ui/                     # Reusable UI components (buttons, cards, etc.)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── separator.tsx
│   │   ├── utils.ts           # UI utility functions
│   │   └── index.ts           # Clean exports
│   ├── sections/              # Page sections and layouts
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── ContentSection.tsx
│   │   ├── WritingSection.tsx
│   │   ├── WritingDetail.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   └── common/                # Shared components
│       └── figma/             # Figma-specific components
│           └── ImageWithFallback.tsx
├── hooks/                     # Custom React hooks
├── utils/                     # Utility functions
│   └── index.ts              # Date formatting, text utilities, etc.
├── types/                     # TypeScript type definitions
│   └── index.ts              # All interfaces and types
├── lib/                       # Third-party configs and data
│   └── constants.ts          # Sample data and configuration
├── styles/                    # CSS and styling
│   └── globals.css           # Global styles and Tailwind config
├── assets/                    # Static assets
│   ├── images/
│   └── fonts/
├── App.tsx                    # Main application component
└── main.tsx                   # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trees
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Architecture

### Component Organization

- **UI Components** (`src/components/ui/`): Reusable, unstyled components built with Radix UI
- **Sections** (`src/components/sections/`): Page-specific components and layouts
- **Common** (`src/components/common/`): Shared components used across multiple sections

### Type Safety

All components are fully typed with TypeScript. Key interfaces include:
- `WritingItem` - Blog posts and essays
- `ReadingItem` - Book notes and reading materials
- `DeepDiveItem` - In-depth research articles
- `SectionType` - Navigation sections

### Styling

- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theming (light/dark modes)
- **Responsive Design** with mobile-first approach

## Design System

### Colors
- Primary: Forest green palette
- Secondary: Natural earth tones
- Accent: Vibrant green for highlights

### Typography
- Headings: Medium weight for hierarchy
- Body: Regular weight for readability
- Code: Monospace for technical content

### Components
- Cards with subtle shadows
- Rounded corners (10px radius)
- Smooth transitions and hover effects

## Features

- **Digital Garden** - Non-chronological content organization
- **Writing Sections** - Essays, poetry, and creative writing
- **Reading Notes** - Curated insights from books and articles
- **Deep Dives** - Comprehensive research articles
- **Responsive Design** - Works on all devices
- **Dark Mode** - Comfortable reading in any lighting
- **Smooth Animations** - Enhanced user experience

## Customization

### Adding New Content

1. **Writing Items**: Add to `SAMPLE_WRITING_ITEMS` in `src/lib/constants.ts`
2. **Reading Notes**: Add to `SAMPLE_READING_ITEMS` in `src/lib/constants.ts`
3. **Deep Dives**: Add to `SAMPLE_DEEP_DIVE_ITEMS` in `src/lib/constants.ts`

### Styling Changes

- **Colors**: Update CSS variables in `src/styles/globals.css`
- **Components**: Modify Tailwind classes in component files
- **Layout**: Adjust spacing and sizing in section components

### Adding New Sections

1. Create component in `src/components/sections/`
2. Add route to `App.tsx`
3. Update navigation in `Header.tsx`
4. Add to `SectionType` in `src/types/index.ts`

## Development

### Code Style

- Use TypeScript for all new files
- Follow React best practices
- Implement proper error boundaries
- Use semantic HTML elements
- Ensure accessibility compliance

### Performance

- Lazy loading for images
- Component memoization where appropriate
- Efficient re-renders with proper dependencies
- Optimized bundle size

## Dependencies

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Icon library
- **Framer Motion** - Animations

### Utilities
- **clsx** - Conditional class names
- **tailwind-merge** - Merge Tailwind classes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE). 