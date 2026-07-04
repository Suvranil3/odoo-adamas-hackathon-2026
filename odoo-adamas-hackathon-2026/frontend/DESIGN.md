---
name: Global Talent Passport
colors:
  surface: '#faf9fa'
  surface-dim: '#dbdada'
  surface-bright: '#faf9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f4'
  surface-container: '#efedee'
  surface-container-high: '#e9e8e9'
  surface-container-highest: '#e3e2e3'
  on-surface: '#1b1c1d'
  on-surface-variant: '#44474c'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f1'
  outline: '#75777c'
  outline-variant: '#c5c6cc'
  surface-tint: '#535f70'
  primary: '#0e1a28'
  on-primary: '#ffffff'
  primary-container: '#232f3e'
  on-primary-container: '#8a97a8'
  inverse-primary: '#bbc7da'
  secondary: '#5a5f66'
  on-secondary: '#ffffff'
  secondary-container: '#dce0e9'
  on-secondary-container: '#5f636a'
  tertiary: '#241523'
  on-tertiary: '#ffffff'
  tertiary-container: '#3a2938'
  on-tertiary-container: '#a68fa2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3f7'
  primary-fixed-dim: '#bbc7da'
  on-primary-fixed: '#101c2a'
  on-primary-fixed-variant: '#3c4857'
  secondary-fixed: '#dfe2eb'
  secondary-fixed-dim: '#c3c6cf'
  on-secondary-fixed: '#181c22'
  on-secondary-fixed-variant: '#43474e'
  tertiary-fixed: '#f6dbef'
  tertiary-fixed-dim: '#d9bfd3'
  on-tertiary-fixed: '#261625'
  on-tertiary-fixed-variant: '#544151'
  background: '#faf9fa'
  on-background: '#1b1c1d'
  surface-variant: '#e3e2e3'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
This design system embodies a **Corporate Modern** aesthetic tailored for high-stakes professional transitions. It prioritizes reliability, global scale, and frictionless utility. The design language avoids decorative flourishes in favor of clear information hierarchy and functional confidence, ensuring that the candidate's journey feels secure and organized.

The visual style is characterized by "content-first efficiency"—utilizing significant whitespace, structured grid systems, and a refined, professional color palette to guide users through complex administrative tasks with ease. It draws inspiration from systematic enterprise design, emphasizing a sense of "Day 1" readiness and professional momentum through a more muted and sophisticated tonal approach.

## Colors
The palette is anchored by a sophisticated tonal range. The **Tertiary Deep Eggplant** is used for structural framing and high-contrast elements to provide a sense of stability. The **Primary Steel Blue-Gray** serves as the primary action color, providing a professional and calm interface for critical progress indicators.

- **Primary (Steel Blue-Gray):** Use for primary buttons, active states, and grounding structural elements.
- **Secondary (Slate Gray):** Use for supporting UI elements, secondary buttons, and interactive states.
- **Tertiary (Deep Eggplant):** Use for navigation bars, primary headings, and high-impact text.
- **Neutral (Balanced Gray):** A soft, functional background color used to differentiate content zones from the pure white surfaces of interactive cards.
- **Text:** Use the Deep Eggplant (#3A2938) for body copy to ensure maximum legibility against white backgrounds.

## Typography
**Hanken Grotesk** is the chosen typeface for its sharp, contemporary geometry and exceptional readability in professional contexts. It balances the warmth of a humanist sans-serif with the precision of a technical grotesque.

- **Weight Strategy:** Use Bold (700) for large displays, SemiBold (600) for section headers, and Regular (400) for long-form body copy. 
- **Scale:** Maintain a strict vertical rhythm. Large headlines should collapse significantly on mobile to avoid excessive line-breaking.
- **Hierarchy:** Use the Tertiary Deep Eggplant color for all headers to maintain brand consistency; secondary body text can use the Primary Blue-Gray for sub-labels.

## Layout & Spacing
The layout follows a **Fixed Grid** model for desktop, centered within the viewport to maintain focus on the central task (e.g., login or profile editing). 

- **Grid:** Use a 12-column grid for desktop with 24px gutters. On mobile, transition to a single-column layout with 16px side margins.
- **Rhythm:** Spacing is strictly based on an 8px scale (8, 16, 24, 32, 48, 64). 
- **Centering:** For authentication screens, use a "Stage" layout—a central white card container set against a light neutral background, ensuring the user's focus is locked to the form field inputs.

## Elevation & Depth
This design system uses **Tonal Layers** rather than aggressive shadows to define hierarchy. 

- **Level 0 (Base):** The background layer.
- **Level 1 (Surface):** Pure white (#FFFFFF) cards or containers. These should use a thin, 1px border (#777778 at low opacity) instead of a shadow to maintain a "flat and clean" aesthetic.
- **Level 2 (Interactive):** Only use subtle, diffused shadows (Blur: 12px, Opacity: 5%, Color: Tertiary) for floating elements like dropdown menus or modals to distinguish them from the primary surface.
- **Focus:** Use a 2px Primary (#6C7889) ring for focused input states to ensure accessibility and clear visual feedback.

## Shapes
The shape language is **Soft and Precise**. A consistent 4px (0.25rem) radius is applied to buttons, input fields, and small containers. This slight rounding takes the "edge" off the corporate aesthetic without making the UI feel overly casual or "bubbly."

Large cards or "Passport" containers may use the `rounded-lg` (8px) setting to create a more distinct container for primary content sections.

## Components
- **Buttons:** Primary buttons use the Primary Steel Blue-Gray background with white text for maximum legibility. Secondary buttons use a Primary outline with no fill.
- **Input Fields:** Use a 1px neutral border that thickens and changes to the Primary color on focus. Labels should be placed above the field in `label-md` styling.
- **Cards:** Centralize form content in cards with 32px padding on desktop and 20px padding on mobile. 
- **Progress Indicators:** Use a horizontal bar system at the top of the viewport or card, utilizing the Tertiary color to represent the completed percentage of the profile/application.
- **Navigation:** The header should be a solid Tertiary Deep Eggplant bar with the logo left-aligned. On the right, use high-contrast white text for utility links (e.g., "Help" or "Language Selection").