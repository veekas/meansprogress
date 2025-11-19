# Portfolio Screenshots

This directory contains screenshots and images for portfolio projects displayed on the website.

## Directory Structure

```
public/portfolio/
├── rewiring-america/
│   ├── ira-calculator-hero.png
│   ├── ira-calculator-results.png
│   └── website-homepage.png
├── arcadia/
│   ├── community-solar.png
│   └── energy-dashboard.png
└── the-knot/
    ├── wedding-planner.png
    └── vendor-marketplace.png
```

## Image Guidelines

### Resolution
- **Desktop Screenshots**: Minimum 1920x1080px
- **Mobile Screenshots**: Actual device resolution or 375x812px (iPhone X)
- Capture at 2x resolution for retina displays when possible

### Format
- **UI Screenshots**: PNG format for crisp text and UI elements
- **Photos**: JPG format for photographs
- Create WebP versions for modern browsers (better compression)

### File Naming
- Use lowercase with hyphens
- Be descriptive but concise
- Examples: `ira-calculator-hero.png`, `energy-dashboard-mobile.png`

### Optimization
- Compress images before adding to repository
- Target: Max 200KB per image
- Tools:
  - **ImageOptim** (Mac)
  - **TinyPNG** (https://tinypng.com)
  - **Squoosh** (https://squoosh.app)
  - Command line: `optipng`, `jpegoptim`, `cwebp`

### Alt Text
When adding images, update the corresponding project data in `src/App.svelte`:
- Replace `imagePlaceholder` with actual image path
- Add descriptive alt text for accessibility

## Required Screenshots

### Rewiring America
- [ ] IRA Calculator - Landing page
- [ ] IRA Calculator - Results page with sample data
- [ ] Main website homepage
- [ ] Key feature pages (optional)

### Arcadia
- [ ] Community solar enrollment flow
- [ ] Energy dashboard with sample data
- [ ] User account interface (if publicly shareable)

### The Knot
- [ ] Wedding planning tools interface
- [ ] Vendor marketplace search results
- [ ] Key features in use

## WebP Conversion

To create WebP versions of your images:

```bash
# Single file
cwebp input.png -q 80 -o output.webp

# Batch conversion
for file in *.png; do
  cwebp "$file" -q 80 -o "${file%.png}.webp"
done
```

## Usage in Code

Once screenshots are added, update `src/App.svelte`:

```javascript
// Before
imagePlaceholder: "Screenshot: IRA Calculator Interface"

// After
image: "/portfolio/rewiring-america/ira-calculator-hero.png",
imageWebP: "/portfolio/rewiring-america/ira-calculator-hero.webp",
alt: "IRA Savings Calculator showing personalized incentive recommendations"
```

Then update `src/ProjectCard.svelte` to use actual images instead of placeholders.

## Privacy & Permissions

- Ensure you have permission to share screenshots of internal tools
- Avoid including:
  - Real user data or PII
  - Confidential business information
  - Proprietary features not publicly visible
- Use sample/demo data for dashboards and tools

## Tips

1. **Capture full page**: Use browser extensions like "Full Page Screen Capture"
2. **Clean state**: Clear notifications, close unnecessary tabs/modals
3. **Representative data**: Use realistic sample data that showcases the feature
4. **Consistent browser**: Use same browser for all screenshots (Chrome recommended)
5. **Hide sensitive info**: Use browser DevTools to modify DOM and hide sensitive data before screenshotting
