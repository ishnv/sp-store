# Agent Task: Local Business Website Redesign & Rebranding

## Context & Problem Statement
The current repository contains a site that was accidentally built using template assets for "PNB Kitchenmate". 
We need to fully rebrand and redesign the site into **"SP-Store"**—a modern, high-converting local retail store website.

**Primary Goals:**
1. Rebrand all copy, metadata, logo references, and branding from "PNB Kitchenmate" to **SP-Store**.
2. Redesign the Hero Section layout for strong visual impact.
3. Fix misplaced/incorrect images across the application.
4. Set up clean, maintainable image placeholders with clear alt texts and dimension constraints.

---

## 1. Rebranding & Copy Audit (PNB Kitchenmate ➔ SP-Store)
- Search the entire workspace for instances of:
  - `"PNB"`, `"Kitchenmate"`, `"PNB Kitchenmate"`
  - Replace them with **"SP-Store"** (or appropriate local store copy).
- Audit app headers, footers, meta tags (`index.html` or Head components), page titles, and hero titles.
- Ensure the local store tone is warm, community-focused, and inviting (e.g., "Your Everyday Local Neighborhood Store").

---

## 2. Hero Section Layout Fixes
- **Structure:** Clean up the Hero section layout.
  - Left Side: Clear, high-contrast typography (Headline, Subheadline, Value Proposition, Action Buttons).
  - Right Side: A clean product display grid, featured banner, or structured card layout (No empty white space).
- **CTA Buttons:** Primary action ("Explore Products" / "Visit Us Today") and Secondary action ("Call Store" / "View Offers").
- **Responsiveness:** Ensure mobile stack order is correct (Text content first, visual/hero image second).

---

## 3. Image Strategy & Placeholder Rules
Since actual store photos will be provided later, replace incorrect PNB images with standardized, clean placeholders:
- **Hero Image:** High-quality local retail store hero image (or Unsplash placeholder: `https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1200`).
- **Product Categories / Cards:** Use clean SVG standard placeholders or contextual Unsplash image placeholders (e.g., groceries, daily essentials, household goods).
- **Image Requirements in Code:**
  - Every `<img>` tag must have explicit `alt`, `width`, and `height` props or responsive wrapper divs to prevent Layout Shift (CLS).
  - Wrap missing image handlers with a clean fallback placeholder component.

---

## 4. Execution Guidelines for VS Code Agent
1. **Locate Files:** Inspect components in `src/components/`, `src/pages/`, `src/layouts/`, and `src/data/`.
2. **Global Replacement:** Update mock data files or hardcoded text containing PNB references.
3. **Style Tweaks:** Use Tailwind CSS (or existing design system tokens) to ensure consistent spacing, margins, padding, and colors.
4. **Validation:** Ensure there are no broken imports, missing assets, or syntax errors after refactoring.