# The Aqool Wire - News Website Project

## Overview

The Aqool Wire is Saudi Arabia's first data-driven AI intelligence platform, designed as a premium magazine-style publication with a Bloomberg/Reuters terminal aesthetic. The site features a deep green to black gradient background (#0a0f1b → #050a12) with cyan (#00d4aa) and magenta (#ff00ff) accents, glass morphism effects, and a sophisticated magazine grid layout that delivers authoritative coverage of AI policy, regulation, and strategy across the Kingdom and GCC region.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
  - Main sections: Regulatory Intelligence, Research & Technology Policy, AI Advisory, Insights, Reports, About Us, Contact Us
  - Legacy routes maintained: Policy, Regulation, Analysis, News
- **Styling**: Tailwind CSS with shadcn/ui component library
  - Custom magazine aesthetic with deep green/black gradient background
  - Glass morphism effects (backdrop-filter blur, rgba borders)
  - Cyan (#00d4aa) primary accent, Magenta (#ff00ff) secondary accent
  - Subtle grid pattern overlay on body
- **Magazine Components**: Reusable components for editorial layout
  - HeroFeature, SidebarSpotlight, FeaturedList, SpecialEdition, NumberedList, CardGrid, NewsletterForm
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds
- **Theme**: Dark-mode only magazine aesthetic (no light mode toggle)

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript throughout the stack for consistency
- **Development Mode**: Custom Vite integration with Express for seamless development experience
- **Storage Interface**: Abstracted storage layer with in-memory implementation (ready for database integration)

### Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions
- **Schema**: Currently includes user management tables with UUID primary keys
- **Migrations**: Drizzle Kit for database schema management and migrations
- **Connection**: Configured for Neon Database serverless PostgreSQL

### Design System
- **Visual Theme**: Bloomberg/Reuters terminal-inspired magazine aesthetic
  - Background: Linear gradient 135deg from #0a0f1b (deep green) to #050a12 (black)
  - Grid pattern overlay with subtle cyan lines (rgba(0,212,170,0.03))
  - Glass morphism cards with backdrop blur and transparent borders
- **Color Palette**:
  - Primary Cyan: #00d4aa (HSL 168 100% 42%) - links, CTAs, hover states
  - Secondary Magenta: #ff00ff (HSL 300 100% 50%) - special highlights, destructive actions
  - Foreground: 98% white for text
  - Muted: 65% gray for secondary text
- **Typography**: IBM Plex Sans (from Google Fonts) for clean, professional readability
  - Headline scales: 44/32/24/18/16/14px with tight line-height (1.25-1.4)
  - Eyebrow labels: 12px uppercase, 0.08em letter-spacing
  - Kicker pills: Cyan background with border, uppercase labels
- **Component Library**: Custom shadcn/ui with magazine-specific components
- **Layout**: CSS Grid-based magazine layout
  - Desktop (≥1024px): 2.2fr / 1fr grid (content / sidebar)
  - Tablet (768px): Responsive 2-column grids
  - Mobile (≤768px): Single column stack
- **Interactive States**:
  - Focus: 2px solid cyan outline with 2px offset (focus-cyan utility)
  - Hover: Cyan glow effects, scale transforms, color transitions
  - Glass morphism: backdrop-filter blur(10px-15px) on cards

### Content Management
- **Article System**: Structured article data with metadata including categories, authors, and timestamps
  - Content types: "external" (news articles), "op-ed" (opinion pieces)
  - News tab displays all external articles (filtered by type="external")
- **Author Profiles**: Comprehensive author information with social links and expertise areas
- **Magazine Layout Components**:
  - Hero Feature: Full-bleed image with dark overlay, kicker label, headline, excerpt, CTA
  - Sidebar Spotlight: Small image tiles with category tags
  - Featured List: Compact list of headline links (5-7 items)
  - Special Edition: Left text / right image banner for featured content
  - Numbered List: "Most Recents" with 01-05 numbered items
  - Category Grids: 2-3 column grids for Insights/Reports sections
  - Newsletter Form: Email capture with validation and success states
- **Source Attribution**: 
  - Internal op-eds automatically display "The Aqool Wire" as the source
  - External op-eds can specify custom sources (e.g., think tank names)
  - External articles require a source field (e.g., "TechCrunch", "Reuters")
  - Source names display in hot pink (#f2007d) across all article cards
  - Source logos can be displayed next to source names for external articles
  - Admin forms include optional "Source Logo URL" field for adding news site logos
- **Image Upload**: Backend-proxied upload system using SimpleImageUpload component to avoid CORS issues
  - External articles and Op-Eds both use SimpleImageUpload for reliable image uploads
  - Images are uploaded through /api/upload-image endpoint to Google Cloud Storage
  - Admin authentication token key: 'adminToken' (camelCase) stored in localStorage
- **SEO**: 
  - Dynamic sitemap.xml generation at /sitemap.xml
  - Includes all static pages and dynamically generated article pages
  - Automatically updates when new content is published
  - Proper priority and change frequency hints for search engines
  - Site-wide meta tags optimized for AI policy, regulation, Saudi Arabia, GCC, Riyadh, Vision 2030
  - Dynamic page-specific SEO using React Helmet Async
  - Canonical URLs always use https://theaqoolwire.com domain
- **Social Media Integration**:
  - LinkedIn company page link in footer (https://www.linkedin.com/company/the-aqool-wire)
  - Helps with brand authority and referral traffic
  - Improves branded search results on Google

## Recent Changes (November 2024)

### Magazine Redesign Implementation
- **Complete visual overhaul**: Transitioned from The Verge-inspired design to premium magazine aesthetic
- **New color scheme**: Deep green (#0a0f1b) to black (#050a12) gradient with cyan/magenta accents
- **Glass morphism**: Added backdrop blur effects and transparent borders throughout
- **Navigation restructure**: Updated to magazine-focused sections (Regulatory Intelligence, Research & Policy, AI Advisory, Insights, Reports)
- **Component library**: Created 7 reusable magazine components for editorial layouts including TopSpotlightCard with Saudi Arabia map background
- **Dark mode only**: Removed light mode; site defaults to dark magazine aesthetic
- **Accessibility**: All components include focus-cyan states, ARIA labels, semantic HTML, data-testid attributes
- **Bug fixes**: Fixed date handling in Insights page to prevent runtime errors with invalid dates

### Homepage Layout Restructure (November 5, 2024)
- **Three-row magazine grid layout**:
  - **Row 1**: Large hero feature (left 2fr) + Platform mission spotlight with Saudi map background & Featured News list (right 1fr)
  - **Row 2**: Most Recents numbered list (left 1fr) + Special Edition banner (right 2fr)
  - **Row 3**: Five dedicated topic grids (3-column layout each)
- **Platform Mission Spotlight**: Top right card shows platform mission statement over Saudi Arabia map background instead of article
- **Topic-Specific Grids**: Five dedicated sections for content organization:
  - Regulatory Intelligence (regulation/policy/compliance articles)
  - Research & Technology Policy (research/tech/innovation articles)
  - AI Advisory (strategy/analysis/governance articles)
  - Insights (opinion/perspective/commentary articles)
  - Reports (data/market/intelligence briefs)
- **Flexible Category Filtering**: Case-insensitive keyword-based matching system ensures sections populate regardless of category capitalization
- **Newsletter Consolidation**: Removed newsletter form from main content; kept only in footer

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with Zod validation
- **Routing**: Wouter for client-side navigation
- **State Management**: TanStack React Query for server state and caching

### UI and Styling
- **Component Library**: Radix UI primitives for accessible component foundations
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Animations**: Class Variance Authority for dynamic styling

### Database and Backend
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for runtime type checking and validation
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Development Tools
- **Build System**: Vite with React plugin and runtime error overlay
- **TypeScript**: Full TypeScript support across client and server
- **Development**: Replit-specific plugins for enhanced development experience
- **Email Service**: SendGrid integration for contact form and newsletter functionality
  - Using direct API key (SENDGRID_API_KEY_NEW) stored in Replit Secrets
  - Verified sender: jessicapino@theaqoolwire.com
  - Fallback to Replit connector if direct key not available

### Production Considerations
- **Build Process**: ESBuild for server-side bundling and Vite for client-side optimization
- **Asset Management**: Vite alias configuration for clean import paths
- **Error Handling**: Comprehensive error boundaries and API error handling
- **Performance**: React Query caching and Vite optimization for fast loading times