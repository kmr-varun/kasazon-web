# Kasazon Web Portal

## Project Overview
Building the Kasazon web landing page using Next.js 16 with App Router, TypeScript, and Tailwind CSS.

**Figma Design**: https://www.figma.com/design/u6jVImCaEYqNLjJd1S5K5l/Kasazon?node-id=629-842

## Critical Implementation Rules

### Design Fidelity - EXACT REQUIREMENTS
- ✅ **Use EXACT fonts** from Figma design
- ✅ **Use EXACT colors** (hex values from Figma)
- ✅ **Use EXACT icons** - ALWAYS download from Figma exports
- ✅ **Use EXACT images** from Figma exports
- ❌ **NEVER use emojis** as icons (no 🎤, 🔍, 🏠, etc.)
- ❌ **NEVER hand-draw SVG paths** or use placeholders
- ❌ **NEVER use Unicode characters** as icon replacements

### Responsive Design - CRITICAL
- **DO NOT use exact pixel dimensions** from Figma
- **Understand the design intent** - layout, hierarchy, spacing relationships
- **Build responsive** - must work across ALL screen sizes:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
- Use **relative units**: %, rem, em, vh, vw
- Use **Tailwind responsive utilities**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Use **flexible layouts**: CSS Grid, Flexbox
- **Maintain visual hierarchy** at all breakpoints

### Asset Management
1. **Download ALL assets** from Figma via `get_design_context`
2. Save to `public/images/` directory
3. Commit all assets to repository
4. Use Next.js `<Image>` component for optimization

### Development Workflow

#### Section-by-Section Implementation
1. User shares Figma URL for specific section with `node-id`
2. Fetch design context via Figma MCP `get_design_context`
3. Analyze design:
   - Layout structure
   - Components needed
   - Spacing relationships
   - Typography hierarchy
   - Color usage
4. Download all icons and images
5. Build responsive implementation
6. Review with user before next section

#### Design System Approach
- **Incremental design system** - build `src/theme/` as we implement
- **Extract design tokens**: colors, spacing, typography, shadows, radius
- **Reusable components** - extract when used 2+ times
- **TypeScript** - everything properly typed, no `any`

#### Component Strategy - CRITICAL
- **Always look for reusable patterns** - buttons, cards, inputs, sections
- **Create components early** - don't wait for duplication
- **Build composable components** - small, focused, reusable pieces
- **Component hierarchy**:
  1. **Atomic components** - Button, Input, Icon, Text, etc.
  2. **Composite components** - Card, FormField, SearchBar, etc.
  3. **Section components** - Hero, Features, Testimonials, etc.
- **Reuse across sections** - if similar pattern exists, use/adapt existing component
- **Props for flexibility** - use variants, sizes, colors as props
- **Check before creating** - always check if similar component exists first

## Tech Stack

- **Framework**: Next.js 16.3.6 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Package Manager**: Bun 1.1.38
- **Fonts**: Load exact fonts from Figma design
- **Images**: Next.js Image component with optimization

## File Organization

```
web/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── common/      # Buttons, inputs, cards, etc.
│   │   ├── layout/      # Header, footer, navigation
│   │   └── sections/    # Landing page sections
│   ├── theme/           # Design system tokens
│   │   ├── colors.ts    # Color palette
│   │   ├── spacing.ts   # Spacing scale
│   │   ├── typography.ts # Font sizes, weights, line heights
│   │   ├── shadows.ts   # Box shadows
│   │   ├── radius.ts    # Border radius values
│   │   └── index.ts     # Export all tokens
│   ├── data/            # Mock data (structured for backend swap)
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── hooks/           # Custom React hooks
├── public/
│   └── images/          # Downloaded Figma assets (icons, images)
│       ├── icons/       # Icon assets
│       └── photos/      # Photo/image assets
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
└── package.json
```

## Code Quality Standards

### TypeScript
- Strict mode enabled
- No `any` types - use proper typing
- Define interfaces for all data models
- Use type inference where appropriate

### Components
- **Functional components** with TypeScript
- **Props interface** for every component with proper typing
- **Extract reusable components proactively** - don't wait for duplication
- **Component-first mindset** - break UI into small, reusable pieces
- **Check existing components** before creating new ones
- **Keep components focused** - single responsibility principle
- **Make components flexible** - use props for variants (size, color, state)
- **Compose larger components** from smaller ones

### Styling
- Tailwind utility classes for styling
- Design tokens for consistency
- Mobile-first responsive approach
- Semantic HTML elements

### Data Layer
- **Mock data with structure** matching expected API responses
- Keep mock data in `src/data/` directory
- Easy to swap with real API calls later
- Well-typed data models

## Commands

```bash
bun install <package>    # Install packages
bun run dev             # Start dev server (localhost:3000)
bun run build           # Production build
bun run start           # Start production server
bun run lint            # Run ESLint
```

## Current Phase

**Phase**: Building web landing page UI with mock data
- Building section by section from Figma
- Responsive implementation for all screen sizes
- Extracting design system as we go
- Backend integration comes later

## Important Notes

- This is NOT a standard Next.js project - check `AGENTS.md` for breaking changes
- Always verify Next.js API usage with docs in `node_modules/next/dist/docs/`
- Never trust training data - check current Next.js 16 documentation
- Tailwind CSS 4 has breaking changes - verify utility classes

## Parent Project Context

Kasazon is a multi-platform project. See `/Users/thundr/workspace/kasazon/CLAUDE.md` for:
- Overall project structure
- Other apps (user, service, admin, vendor, backend)
- Shared design principles
- All Figma design links
