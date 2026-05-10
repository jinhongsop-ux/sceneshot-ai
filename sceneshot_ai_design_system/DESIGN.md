---
name: SceneShot AI Design System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#434656'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#747687'
  outline-variant: '#c4c5d9'
  surface-tint: '#0f4aef'
  primary: '#0041de'
  on-primary: '#ffffff'
  primary-container: '#2d5cfe'
  on-primary-container: '#efefff'
  inverse-primary: '#b8c4ff'
  secondary: '#841cd8'
  on-secondary: '#ffffff'
  secondary-container: '#9e42f2'
  on-secondary-container: '#fffbff'
  tertiary: '#565555'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e6d6d'
  on-tertiary-container: '#f3f0ef'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001355'
  on-primary-fixed-variant: '#0036bc'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0050'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-xl:
    fontFamily: Outfit
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

This design system is engineered for high-velocity consumer adoption, blending **Minimalism** with **Glassmorphism** to create a "Premium Tech" aesthetic. The brand personality is energetic and forward-leaning, removing the friction of complex AI tools through a radically simple interface. 

The visual strategy relies on a "High-Definition" clarity: expansive white space ensures the AI-generated content remains the hero, while vibrant gradients provide a "viral" energy that feels modern and approachable. It avoids corporate stiffness by using oversized geometry and playful, tactile interactions. The emotional goal is to evoke a sense of "magic made simple"—instilling trust through clean execution while maintaining a trendy, cutting-edge vibe.

## Colors

The palette is anchored by a high-octane **Electric Blue to Violet gradient**, used exclusively for primary actions and brand-led moments to drive conversion. 

- **Primary & Secondary:** The gradient represents the "engine" of the AI. Use the solid `#2D5CFE` for smaller interactive elements where legibility is paramount.
- **Neutral/Text:** Dark charcoal (`#1A1A1A`) provides maximum contrast against the white backgrounds, ensuring premium readability without the harshness of pure black.
- **Backgrounds:** Use pure white (`#FFFFFF`) for the main canvas to maintain a "clean-room" feel. A soft off-white (`#F8F9FA`) is reserved for section grouping and subtle card offsets to prevent visual fatigue.

## Typography

This design system utilizes **Outfit** for headlines to provide a geometric, modern tech feel that is both friendly and authoritative. **Plus Jakarta Sans** is used for body copy and UI labels, chosen for its soft curves and high legibility in dense SaaS environments.

- **Headlines:** Use tight letter-spacing on larger displays to create a high-impact, editorial look.
- **Body:** Maintain generous line heights to preserve the "simple" and "airy" vibe of the brand.
- **Hierarchy:** Use font weight rather than color shifts to establish hierarchy, keeping the dark charcoal consistent across all text levels.

## Layout & Spacing

The layout follows a **12-column fluid grid** for desktop, transitioning to a **4-column grid** for mobile. The system prioritizes "breathability" with significant vertical padding between sections (80px to 120px) to reinforce the premium, non-cluttered feel.

- **Consistency:** All spacing is based on an 8px square grid.
- **Margins:** Desktop views use wide 64px margins to keep content centered and focused. Mobile margins are tighter (20px) to maximize screen real estate for AI imagery.
- **Reflow:** Components like "Before/After" modules should expand to the full width of their container, while CTA sections should maintain a centered, max-width layout for better focus.

## Elevation & Depth

Depth is achieved through a combination of **Ambient Shadows** and **Glassmorphism**. This creates a layered UI that feels physical yet digital.

- **Surface Layers:** Main cards use a extremely soft, diffused shadow (0px 20px 50px rgba(0, 0, 0, 0.04)). There are no hard borders; depth is suggested by the contrast between the white surface and the neutral-offset background.
- **Glassmorphism:** Overlays, navigation bars, and floating action buttons use a backdrop blur (20px) with a semi-transparent white fill (80% opacity). A subtle 1px white border (20% opacity) is applied to these elements to catch the "light" and define edges.
- **Interaction:** On hover, cards should lift slightly (shadow intensity increases and Y-offset grows) to provide tactile feedback.

## Shapes

The shape language is defined by **exaggerated roundness**. This softens the "AI" technicality and makes the product feel like a consumer lifestyle app.

- **Containers:** Large cards and primary modules must use a minimum of 24px corner radius.
- **Buttons:** Primary CTAs should be fully pill-shaped to stand out as the most interactive elements.
- **Media:** AI-generated images and video previews should follow the container rounding (24px) to ensure a cohesive visual flow.

## Components

- **Buttons:** Primary buttons are pill-shaped, using the electric blue/violet gradient with white text. They should include a subtle "glow" (shadow tinted with the primary blue). Secondary buttons use a thick 2px charcoal border or a soft grey ghost style.
- **Before/After Modules:** A central vertical slider with a high-contrast handle. The "Before" side is slightly desaturated to emphasize the "After" AI-enhanced result.
- **Input Fields:** Large, 16px padding with 24px corners. The focus state replaces the border with a 2px electric blue glow.
- **Trust Signals:** Clean, monochrome logos of partners or "Featured In" sections, kept at 40% opacity to remain secondary to the main content.
- **Comparison Cards:** Side-by-side layouts with heavy rounding and a subtle glassmorphic label (e.g., "AI Enhanced") in the corner.
- **Chips/Badges:** Small, pill-shaped tags with a 10% opacity tint of the primary blue, used for "New" or "Pro" features.