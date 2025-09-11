# The Aqool AI - Design Guidelines

## Design Approach
**Exact Replication**: Precisely matching The Verge's website design (https://www.theverge.com/tech) for news website layout, typography, colors, and component styling to create a professional tech journalism appearance.

## Core Design Elements

### A. Color Palette
**Exact Verge Colors:**
- Background: Pure white (#FFFFFF) in light mode
- Primary text: Pure black (#000000) 
- Secondary text: #666666 (medium gray)
- Link color: #B266CC (purple/magenta for links)
- Border color: #E5E5E5 (light gray borders)

**Supporting Colors:**
- Category badges: Various bright colors (#FF6B35, #4ECDC4, #45B7D1)
- Hover states: Subtle gray (#F5F5F5)
- Active states: Darker grays

### B. Typography
**Font Families:**
- Primary: __Polysans__, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI"
- All text uses system fonts with specific font weights

**Hierarchy (exact Verge sizing):**
- Main headline: 2.5rem (40px), font-weight 700, line-height 1.1
- Article titles: 1.25rem (20px), font-weight 600
- Body text: 1rem (16px), line-height 1.5
- Meta text: 0.875rem (14px), color #666
- Category badges: 0.75rem (12px), uppercase, bold

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