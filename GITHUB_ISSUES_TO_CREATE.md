# GitHub Issues to Create

## Issue 1: Portfolio Section with Project Showcases

**Title**: Add portfolio section showcasing work at Rewiring America, Arcadia, and The Knot

**Labels**: enhancement, design

**Body**:

### Overview
The personal splash page needs a dedicated portfolio section to showcase professional work with visual examples and project descriptions.

### Requirements

#### Portfolio Section Design
- Modern, professional layout
- Mobile-responsive design
- Grid or card-based layout for projects
- Easy to navigate and visually appealing

#### Content to Include

##### Rewiring America (Primary Focus)
Projects to showcase:
- [ ] **IRA Savings Calculator**: Interactive tool for homeowners to calculate potential savings from Inflation Reduction Act incentives
  - Screenshots of calculator interface
  - Link to live tool (if public)
  - Description of technical implementation
  - Technologies used (React, TypeScript, etc.)

- [ ] **Rewiring America Website**: Main public-facing website
  - Screenshots of key pages
  - Description of contributions
  - Performance improvements implemented
  - Accessibility enhancements

- [ ] **Internal Tools**: (if publicly shareable)
  - Dashboard screenshots
  - Description of tools built for internal teams
  - Impact on team efficiency

##### Arcadia
Projects to showcase:
- [ ] **Community Solar Platform**: Features built for community solar enrollment
  - Screenshots of user interface
  - Description of functionality
  - User impact metrics (if available)

- [ ] **Energy Data Visualization**: Tools for visualizing energy usage
  - Screenshots of dashboards
  - Technical approach
  - Data processing capabilities

##### The Knot
Projects to showcase:
- [ ] **Wedding Planning Tools**: Features developed for wedding planning
  - Screenshots of tools
  - User engagement metrics (if available)
  - Technical challenges solved

- [ ] **Vendor Marketplace**: Work on vendor discovery and booking
  - Interface screenshots
  - Search and filtering improvements
  - Performance optimizations

#### Technical Implementation
- Create new `Portfolio.svelte` component (or React component if using Vite upgrade)
- Add route for `/portfolio` or integrate into main page
- Implement image optimization for screenshots
- Add lazy loading for images
- Ensure accessibility (ARIA labels, keyboard navigation)

#### Design Considerations
- Use consistent color scheme matching current site
- Include hover effects on project cards
- Add smooth transitions and animations
- Ensure fast load times
- Progressive image loading

### Acceptance Criteria
- [ ] Portfolio section is visible on the main page or accessible via navigation
- [ ] At least 3 projects from Rewiring America are showcased
- [ ] At least 2 projects each from Arcadia and The Knot are included
- [ ] Each project includes:
  - Professional screenshot(s)
  - Clear description (2-3 sentences)
  - Link to live project (if available)
  - Technologies used
- [ ] Mobile responsive design works on all screen sizes
- [ ] Images are optimized and load quickly
- [ ] Accessibility standards are met (WCAG AA)

---

## Issue 2: Major Site Redesign

**Title**: Redesign personal splash page with modern, professional aesthetic

**Labels**: enhancement, design

**Body**:

### Overview
The current splash page design needs a refresh to better represent professional experience as a senior software engineer while maintaining personality and authenticity.

### Current Issues
- Limited visual hierarchy
- No portfolio showcase
- Minimal information about professional work
- Could better highlight technical expertise

### Redesign Goals

#### Visual Design
- Modern, clean aesthetic
- Professional yet personable
- Strong visual hierarchy
- Engaging typography
- Thoughtful use of whitespace
- Consistent color palette

#### Content Structure
1. **Hero Section**
   - Professional headshot or avatar
   - Name and title (Senior Software Engineer)
   - Brief tagline highlighting expertise
   - Call-to-action buttons (Contact, Resume, Portfolio)

2. **About Section**
   - Professional summary (2-3 paragraphs)
   - Key skills and technologies
   - Current role and focus

3. **Portfolio Section**
   - Featured projects from Rewiring America, Arcadia, The Knot
   - See Issue #1 for detailed portfolio requirements

4. **Experience Timeline**
   - Visual timeline of career progression
   - Key accomplishments at each role
   - Technologies used

5. **Contact Section**
   - Social media links (already present, needs styling)
   - Email contact
   - Optional: contact form

#### Technical Improvements
- [ ] Implement CSS Grid for layout
- [ ] Add smooth scroll navigation
- [ ] Optimize images with WebP format
- [ ] Implement dark mode toggle (optional)
- [ ] Add micro-interactions and animations
- [ ] Ensure excellent Lighthouse scores (90+ in all categories)
- [ ] Implement proper semantic HTML
- [ ] Add structured data (Schema.org) for SEO

#### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interactive elements
- Optimized images for different screen sizes

### Design Inspiration
Consider modern developer portfolio sites:
- Emphasis on work samples
- Clear, readable typography
- Subtle animations
- Fast loading times
- Accessibility focus

### Acceptance Criteria
- [ ] New design is implemented and deployed
- [ ] Site is fully responsive across all device sizes
- [ ] Lighthouse scores are 90+ in all categories
- [ ] All existing links and functionality are preserved
- [ ] Portfolio section is integrated (or created per Issue #1)
- [ ] Load time is under 2 seconds on 3G connection
- [ ] Accessibility audit passes WCAG AA standards
- [ ] Cross-browser testing completed (Chrome, Firefox, Safari, Edge)

---

## Issue 3: Add Project Screenshots and Media Assets

**Title**: Collect and add high-quality screenshots for portfolio projects

**Labels**: content, assets

**Body**:

### Overview
Need to collect, optimize, and add professional screenshots for all portfolio projects from Rewiring America, Arcadia, and The Knot.

### Required Screenshots

#### Rewiring America
- [ ] IRA Savings Calculator - landing page
- [ ] IRA Savings Calculator - results page
- [ ] Main website homepage
- [ ] Key feature pages
- [ ] Internal tools (if shareable)

#### Arcadia
- [ ] Community solar enrollment flow
- [ ] Energy dashboard
- [ ] User account interface
- [ ] Key features

#### The Knot
- [ ] Wedding planning tools
- [ ] Vendor marketplace
- [ ] Search and discovery features
- [ ] User-facing tools

### Screenshot Guidelines
- Resolution: Minimum 1920x1080 for desktop views
- Format: PNG for UI screenshots, JPG for photos
- Optimize images: Use ImageOptim, TinyPNG, or similar
- Create WebP versions for modern browsers
- Include alt text descriptions for accessibility
- Consider creating animated GIFs or short videos for interactive features

### Image Organization
```
public/
  portfolio/
    rewiring-america/
      ira-calculator-hero.png
      ira-calculator-results.png
      website-homepage.png
    arcadia/
      community-solar.png
      energy-dashboard.png
    the-knot/
      wedding-planner.png
      vendor-marketplace.png
```

### Acceptance Criteria
- [ ] All project screenshots are collected
- [ ] Images are optimized (max 200KB each)
- [ ] WebP versions created
- [ ] Images added to repository
- [ ] Alt text written for each image
- [ ] Images displayed correctly in portfolio section

---

## Issue 4: Update About/Bio Content

**Title**: Update biographical content to emphasize senior engineering experience

**Labels**: content

**Body**:

### Overview
Update the about/bio section to better reflect current professional status as a senior software engineer with focus on Rewiring America work.

### Current Content Gaps
- Could better highlight senior-level experience
- Should emphasize impact of work (climate tech, electrification)
- Need to showcase technical leadership
- Could better describe technical skills and expertise

### Suggested Content Updates

#### Professional Summary
Emphasize:
- Senior Software Engineer title
- Years of experience
- Primary focus areas (climate tech, clean energy, web development)
- Technical expertise (specific technologies and frameworks)
- Leadership and mentorship experience

#### Current Work Highlight
- Role at Rewiring America
- Mission and impact (home electrification, climate change)
- Technical projects and accomplishments
- Technologies used

#### Previous Experience
- Brief mention of Arcadia (clean energy sector)
- Brief mention of The Knot (consumer web applications)
- Technical progression and growth

#### Technical Skills
Create a skills section highlighting:
- **Frontend**: React, TypeScript, Svelte, modern CSS
- **Backend**: Node.js, Python, APIs
- **Tools**: Git, CI/CD, testing frameworks
- **Practices**: Accessibility, performance optimization, responsive design

### Tone and Voice
- Professional but approachable
- Highlight impact and mission-driven work
- Demonstrate technical depth
- Show enthusiasm for climate tech and clean energy

### Acceptance Criteria
- [ ] Bio section updated with senior engineering focus
- [ ] Rewiring America work highlighted prominently
- [ ] Technical skills clearly presented
- [ ] Previous experience at Arcadia and The Knot mentioned
- [ ] Content is concise and well-written
- [ ] Tone is professional yet personable
