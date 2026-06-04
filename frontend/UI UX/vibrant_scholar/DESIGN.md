---
name: Vibrant Scholar
colors:
  surface: '#faf9f9'
  surface-dim: '#dadada'
  surface-bright: '#faf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f3'
  surface-container: '#eeeeed'
  surface-container-high: '#e9e8e8'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#3f4a36'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f0f0'
  outline: '#6f7b64'
  outline-variant: '#becbb1'
  surface-tint: '#2b6c00'
  primary: '#2b6c00'
  on-primary: '#ffffff'
  primary-container: '#58cc02'
  on-primary-container: '#1e5000'
  inverse-primary: '#6be026'
  secondary: '#006590'
  on-secondary: '#ffffff'
  secondary-container: '#2fb8ff'
  on-secondary-container: '#004666'
  tertiary: '#8c5000'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff9c27'
  on-tertiary-container: '#683a00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#87fe45'
  primary-fixed-dim: '#6be026'
  on-primary-fixed: '#082100'
  on-primary-fixed-variant: '#1f5100'
  secondary-fixed: '#c8e6ff'
  secondary-fixed-dim: '#88ceff'
  on-secondary-fixed: '#001e2e'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#ffdcbf'
  tertiary-fixed-dim: '#ffb872'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6a3b00'
  background: '#faf9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e3e2e2'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 30px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  label-bold:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 64px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 120px
---

## Brand & Style

The design system is engineered for the "Casual Learning" category, specifically targeting children in Grades 3 through 6. The brand personality is **exuberant, encouraging, and tactile**, mirroring the dopamine-driven feedback loops of successful gamified education.

The visual style is a **Modern-Tactile** hybrid. It utilizes thick "clay-like" borders and soft, directional shadows to make interface elements feel like physical toys. This reduces the friction of academic tasks by framing them as play. High-contrast, saturated colors are paired with generous white space to maintain clarity and focus, ensuring that even younger users can navigate complex learning paths intuitively.

## Colors

This design system utilizes a high-energy palette designed to evoke specific psychological triggers in a learning environment:

- **Primary (Vibrant Green):** Represents progress, correctness, and growth. Used for "Check" buttons and success states.
- **Secondary (Sky Blue):** Used for informational elements, navigation, and interactive tasks.
- **Tertiary (Bright Orange):** Reserved for "Energy," streaks, and premium alerts to create urgency and excitement.
- **Neutral (Cool Gray):** Used for secondary text and borders to ensure the vibrant accents remain the focal point.

Every interactive element features a **"Shadow-Tone"**—a darker version of the base color (15-20% more saturation/darkness) applied to the bottom border to create a 3D pressed-button effect.

## Typography

The typography strategy prioritizes **legibility and warmth**. **Plus Jakarta Sans** is used for its friendly, rounded terminals which feel inviting to a younger audience. 

- **Headlines:** Use Extra Bold (800) weights to create a strong hierarchy. These should feel "heavy" and stable.
- **Body Text:** Use Medium (500) weights for better readability against white backgrounds.
- **Labels:** **Be Vietnam Pro** is utilized for navigation and small UI labels to provide a slight stylistic contrast that aids in functional recognition.
- **Line Heights:** Generous line heights are maintained throughout to prevent the UI from feeling "cramped," which can be overwhelming for student users.

## Layout & Spacing

The design system follows a **flexible fluid grid** model that prioritizes a single-column focus for learning tasks to minimize distractions.

- **Mobile:** A 4-column grid with 20px side margins. Elements are typically full-width to maximize the hit area for smaller fingers.
- **Desktop:** A centered 12-column grid. Learning content is capped at a max-width of 800px to ensure line lengths remain readable.
- **Spacing Rhythm:** Based on an 8px scale. Component internal padding should favor `md` (24px) to create a "roomy," approachable feel.

## Elevation & Depth

Depth in this design system is conveyed through **Tactile Layering** rather than traditional ambient shadows:

- **The "Lift" Effect:** Interactive cards and buttons use a solid 4px bottom border (the Shadow-Tone) instead of a blur. When pressed, the element translates 2px downward, simulating a physical click.
- **Floating Elements:** Modals and high-priority tooltips use a very soft, large-radius shadow (0px 8px 24px rgba(0,0,0,0.08)) to appear as if they are floating gently above the interface.
- **Inner Depth:** Progress bar containers use a subtle inner-shadow to appear "recessed" into the page, while the progress fill is "extruded" outward.

## Shapes

The shape language is defined by **Exaggerated Roundness**. 

- **Standard Elements:** Use a 16px (1rem) radius to remove all "sharpness" from the experience.
- **Large Containers:** Educational cards use a 24px (1.5rem) radius.
- **Interactive Triggers:** Buttons and chips often utilize a "Pill" shape (full rounding) to signal clickability.
- **Stroke Weights:** Use a consistent 2px border width for container outlines to maintain a cohesive, "illustrated" look.

## Components

### Buttons (Call-to-Action)
The primary button is the "Big Green Button." It must have a 4px bottom shadow in a darker green. Text is uppercase `label-bold`. When active, the shadow disappears and the button moves down 4px.

### Progress Bars
Containers are light gray with a 16px height. The fill should be a vibrant gradient or solid Primary Green. Include a "shine" highlight (a white, semi-transparent streak) on the top half of the fill for a 3D gummy effect.

### Illustrative Cards
Cards should have a white background, a 2px light gray border, and a 4px bottom "tactile" shadow. They often contain a large central icon or character illustration.

### Input Fields
Inputs are large with 16px padding and a 2px border. On focus, the border color changes to Secondary Blue and the border weight increases to 4px.

### Feedback Toasts
Success toasts are Primary Green; error toasts are Error Red. They slide up from the bottom of the screen and use the same tactile border/shadow logic as buttons.