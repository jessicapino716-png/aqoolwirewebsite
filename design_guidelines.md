# The Aqool AI - Design Guidelines

## Design Approach
**Reference-Based Approach**: Inspired by The Verge's modern news website design, focusing on clean typography, structured content hierarchy, and professional news presentation suitable for AI policy expertise.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Dark Mode: Background 222 15% 8%, Text 0 0% 95%
- Light Mode: Background 0 0% 98%, Text 222 15% 15%
- Brand Accent: 210 85% 45% (Saudi-inspired blue for links and highlights)

**Supporting Colors:**
- Success/positive: 142 76% 36%
- Warning/neutral: 45 93% 47%
- Muted text: 215 16% 47%

### B. Typography
**Font Families:**
- Primary: Inter (headings and UI elements)
- Body: System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI")

**Hierarchy:**
- H1: 2.25rem (36px), font-weight 700
- H2: 1.875rem (30px), font-weight 600  
- H3: 1.5rem (24px), font-weight 600
- Body: 1rem (16px), line-height 1.6
- Small text: 0.875rem (14px)

### C. Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Consistent padding: p-4, p-6, p-8
- Margins: m-2, m-4, m-8
- Heights: h-8, h-12, h-16 for interactive elements

**Grid System:**
- Max width: 1200px container
- Article cards: 3-column grid on desktop, 1-column on mobile
- Sidebar: 1/3 width on desktop

### D. Component Library

**Navigation:**
- Clean header with logo, main navigation, and newsletter CTA
- Sticky navigation on scroll
- Mobile hamburger menu

**Article Cards:**
- Large featured article card with image
- Standard article cards with thumbnail, headline, excerpt, author, date
- Category tags with subtle background colors

**Content Sections:**
- Featured news hero section
- Latest AI Policy & Regulation feed
- AI Tools highlight grid
- Weekly op-ed spotlight
- Newsletter signup form with prominent placement

**Forms:**
- Newsletter signup: email input + submit button
- Rounded corners (rounded-md)
- Focus states with brand color outline

### E. Animations
Minimal and purposeful:
- Smooth scroll behavior
- Subtle hover states on cards (slight elevation)
- Loading states for content

## Key Design Principles

1. **Content-First**: Typography and readability prioritized over decorative elements
2. **Professional Authority**: Clean, trustworthy design befitting policy expertise
3. **Middle Eastern Context**: Subtle nods to Saudi/GCC region without stereotypes
4. **Mobile Responsive**: News consumption optimized for mobile devices
5. **Fast Loading**: Lightweight design for quick news access

## Newsletter Integration
- Prominent "Subscribe to Weekly Newsletter" sections throughout site
- Email collection with privacy notice
- Success confirmation messaging
- Integration with SendGrid for reliable delivery

## Content Structure
- Hero section with latest featured article
- "Latest in AI Policy" feed with date-based organization
- "AI Tools of the Week" curated section
- "Weekly Op-Ed" prominent placement
- Author bio section establishing Saudi AI policy credentials

This design establishes The Aqool AI as the authoritative source for AI policy news in Saudi Arabia and the GCC region, with a professional, modern aesthetic that builds trust and expertise.