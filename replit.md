# The Aqool Wire - News Website Project

## Overview

The Aqool Wire is a news website focused on AI policy and regulation coverage in Saudi Arabia and the GCC region. The project is a full-stack web application that mimics The Verge's design aesthetic to deliver professional tech journalism content. It features a modern tech news layout with article cards, author profiles, newsletter subscription functionality, and AI tool highlights specifically tailored for the Middle Eastern AI policy landscape.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

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
- **Component Library**: Custom shadcn/ui implementation with extensive component coverage
- **Typography**: Multi-font system with Geist, DM Sans, and Fira Code for varied content types
- **Color Scheme**: The Verge-inspired color palette with neutral base and purple accent colors
- **Layout**: Responsive grid system with mobile-first approach
- **Spacing**: Consistent Tailwind utility classes for spacing and layout

### Content Management
- **Article System**: Structured article data with metadata including categories, authors, and timestamps
- **Author Profiles**: Comprehensive author information with social links and expertise areas
- **Newsletter Integration**: Multi-variant newsletter signup components with form validation
- **Tool Reviews**: Dedicated components for AI tool showcases and reviews
- **YouTube Video Management**: Full CRUD system for managing AI tool demonstration videos
  - Admin interface at /admin/tool-videos for creating, editing, and deleting videos
  - Videos display on /tools page with embedded YouTube iframes
  - Database table (toolVideos) with fields: id, title, description, youtubeUrl, displayOrder, createdAt
  - API routes at /api/tool-videos with admin authentication required
  - Ordered display based on displayOrder field
  - Loading and empty states for optimal UX
- **Source Attribution**: 
  - Internal op-eds automatically display "The Aqool Wire" as the source
  - External op-eds can specify custom sources (e.g., think tank names)
  - External articles require a source field (e.g., "TechCrunch", "Reuters")
  - Source names display in bright green (#00e676) across all article cards
- **Image Upload**: Backend-proxied upload system using SimpleImageUpload component to avoid CORS issues
  - External articles and Op-Eds both use SimpleImageUpload for reliable image uploads
  - Images are uploaded through /api/upload-image endpoint to Google Cloud Storage
  - Admin authentication token key: 'adminToken' (camelCase) stored in localStorage
- **SEO**: 
  - Dynamic sitemap.xml generation at /sitemap.xml
  - Includes all static pages and dynamically generated article pages
  - Automatically updates when new content is published
  - Proper priority and change frequency hints for search engines

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