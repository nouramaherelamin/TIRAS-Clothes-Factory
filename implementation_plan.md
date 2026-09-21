# Modern Textile & Manufacturing Website

This plan outlines the architecture, setup, and implementation steps for building a premium, modern textile, garment, and leather products website using React, Vite, and Bootstrap 5.

## User Review Required

> [!WARNING]
> **Existing Files in Workspace**
> There are existing files (`Index.Html`, `Script.js`, `Style.Css`) in the workspace. Running the Vite initialization in the current directory (`./`) might conflict with or overwrite some of these files (e.g. Vite uses `index.html`). 
> **Question**: Should I initialize the React app in a subfolder (e.g. `frontend/`), or can I overwrite/clean up the existing HTML/CSS/JS files in the root folder?

> [!IMPORTANT]
> **Visual Reference**
> The design will strictly follow the structural and visual aesthetics of the provided Textilz reference (minimal, editorial, luxury industrial) while using your own branding, copy, and provided assets (`asstes/` directory).

## Open Questions

- **Supabase Integration**: Do you have a Supabase URL and Anon Key ready for `.env` integration, or should I create mock API services for now so that the site is fully functional on the frontend before connecting a real backend?
- **Asset P36**: One of the leather images is listed in the instructions as `P36.jpg`, but in the directory it is `P36.avif`. I will use the `.avif` version, is that okay?

## Proposed Architecture & Structure

The project will be built with **React**, **Vite**, and **Bootstrap 5**, with standard CSS for custom premium styles and animations.

**Key Technologies:**
- React (Vite)
- Bootstrap 5 (Layout, Grid, Utilities)
- React Icons
- Custom CSS (for animations, premium styling, and overrides)

**Proposed Folder Structure:**
```
src/
├── assets/
│   └── images/ (Copy of your provided assets)
├── components/
│   ├── Layout/ (Navbar, Footer, Layout Wrapper)
│   ├── Home/ (Hero, Stats, Marquee, Process, Quality, CTA)
│   ├── Products/ (ProductCard, ProductGrid, FeaturedProducts, PremiumCollection, LeatherSection, Portfolio)
│   ├── Services/ (ServicesSection)
│   └── Blog/ (BlogPreview, BlogCard)
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── ServicesPage.jsx
│   ├── PortfolioPage.jsx
│   ├── Shop.jsx
│   ├── ProductDetails.jsx
│   ├── Blog.jsx
│   ├── BlogDetails.jsx
│   └── Contact.jsx
├── data/
│   ├── products.js
│   ├── services.js
│   └── blog.js
├── App.jsx
├── main.jsx
└── index.css
```

## Implementation Steps

### Phase 1: Project Setup
1. Create Vite React project (pending directory decision).
2. Install dependencies: `bootstrap`, `react-icons`, `react-router-dom`.
3. Set up global CSS (`index.css`) with premium design tokens (colors, fonts, variables) and base styles.
4. Copy assets from `asstes/` to `src/assets/images/`.
5. Create placeholder mock data in `src/data/` for products, services, and blog.

### Phase 2: Core Layout Components
1. Create `Navbar.jsx`: Transparent/overlay initially, sticky on scroll with off-white solid background and shadow.
2. Create `Footer.jsx`: Premium multi-column footer with links and social icons.
3. Setup `react-router-dom` in `App.jsx` with routes.

### Phase 3: Home Page Implementation (Priority)
Build the `Home.jsx` page sequentially:
1. **Hero Section**: Left content + Right layered images and floating cards.
2. **Stats Section**: Animated counters with clean layout.
3. **Red Marquee**: Continuous CSS scrolling text.
4. **Featured Products**: Using supplied images, hover effects.
5. **Premium Collection**: Editorial cards.
6. **Manufacturing Process**: Step-by-step layout.
7. **Services**: Grid layout with hover expansion.
8. **Quality Section**: Strong headline and supporting image.
9. **Leather Section**: Dedicated layout for leather goods.
10. **Portfolio**: Filterable grid using React state.
11. **Blog Preview**: Recent articles.
12. **CTA Section**: Large call to action.

### Phase 4: Inner Pages
1. Build Contact page with a functional-looking form layout.
2. Build Shop and Product Details pages.
3. Build remaining pages (About, Services, Portfolio, Blog).

### Phase 5: Polish
1. Apply and refine responsive breakpoints.
2. Implement subtle animations (fade-ups, hover zooms, navbar transitions).
3. Ensure SEO meta tags structure.

## Verification Plan

### Automated/System Tests
- `npm run dev`: Ensure the development server starts without errors.
- `npm run build`: Verify the production bundle builds successfully (Vercel-ready).

### Manual Verification
- Verify responsiveness across all requested breakpoints (1920px down to 375px).
- Verify the premium visual aesthetic matches the requested direction.
- Verify all provided images are loaded correctly and mapped correctly.
- Ask the user to visually inspect the Home Page components before proceeding to Phase 4 (Inner pages).
