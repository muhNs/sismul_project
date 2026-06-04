---
name: Vibrant Learner
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
  tertiary: '#755b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#ddad00'
  on-tertiary-container: '#574300'
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
  tertiary-fixed: '#ffdf92'
  tertiary-fixed-dim: '#f4bf00'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#faf9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e3e2e2'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
  button-depth: 4px
---

## Brand & Style

The design system is engineered for maximum engagement and emotional safety for children in grades 3-6. The brand personality is **cheerful, encouraging, and energetic**, aiming to transform educational challenges into a playful journey.

The visual style is **Tactile-Digital**, characterized by "chunky" 3D elements that feel physically interactable. This is achieved through solid bottom-shadows on buttons and cards, moving away from realistic skeuomorphism toward a modern, simplified "toy-like" aesthetic. The interface should feel sturdy and responsive, providing high-confidence feedback through motion and color to maintain a "flow state" during learning sessions.

## Colors

The palette uses high-saturation primary colors to signal different functional zones and emotional states.

- **Vibrant Green (Primary):** Used for "Correct" states, primary calls to action, and progression. It represents growth and success.
- **Bright Blue (Secondary):** Used for secondary actions, information tips, and navigation. It provides a calm but energetic contrast to the green.
- **Sunny Yellow (Tertiary):** Reserved for achievements, streaks, and "bonus" moments. It should be used sparingly to maintain its impact as a reward signal.
- **Soft White & Greys:** Backgrounds utilize a slightly off-white to reduce eye strain, while neutrals are used for disabled states and "3D" depth shadows.
- **Bright Red:** Specifically for "Incorrect" feedback, designed to be clear but not punishing.

## Typography

The design system utilizes **Plus Jakarta Sans** for its friendly, rounded terminals and high legibility. 

- **Weight Strategy:** Use Bold (700) or ExtraBold (800) for almost all UI headings to maintain the "chunky" brand feel. 
- **Readability:** Body text uses Medium (500) weight rather than Regular to ensure characters stand out clearly against vibrant backgrounds. 
- **Scale:** Sizes are slightly larger than standard enterprise apps to accommodate younger users who are still developing fine motor skills and reading speed.

## Layout & Spacing

This design system follows a **Fixed Grid** philosophy for tablet and desktop to maintain a "game board" feel, while remaining fluid on mobile devices.

- **Rhythm:** An 8px base unit drives all spacing. 
- **Safe Areas:** Generous margins (20px on mobile) ensure the UI feels airy and uncrowded.
- **Vertical Stack:** Content is primarily organized in a single central column or a 2-column split (Content/Sidebar) on larger screens to keep the focus on one learning task at a time.
- **Interactive Spacing:** Touch targets are a minimum of 48x48px, with 12px-16px of breathing room between clickable elements to prevent accidental taps.

## Elevation & Depth

Depth is not communicated through ambient blurs or realistic lighting, but through **Hard Tonal Offsets**:

- **3D Effect:** Interactive elements (buttons, active cards) feature a solid bottom border (2-4px) that is a darker shade of the element's color. This creates a "pressable" appearance.
- **Pressed State:** When an element is clicked, it translates 2px downward on the Y-axis, and the bottom "shadow" border disappears or shrinks, simulating a physical button press.
- **Card Layers:** Cards use a subtle, 2px grey bottom border rather than a soft drop shadow to maintain the clean, illustrative aesthetic.

## Shapes

The shape language is consistently **Rounded**. 

- **Containers:** All cards and buttons use a 16px (1rem) corner radius to evoke a soft, safe, and friendly environment.
- **Input Fields:** These follow the same 16px radius to match the rest of the UI.
- **Progress Bars:** Use fully rounded (pill-shaped) ends to feel like a "liquid" filling a container.
- **Icons:** Should be encased in circular or highly rounded square containers with a consistent stroke weight.

## Components

### Buttons
The "Chunky Button" is the hero component. It must have a solid 4px bottom shadow of a darker hue (e.g., Green #58CC02 has a shadow of #46A302). On hover, it might lift slightly; on tap, it sinks.

### Progress Bars
Progress bars consist of a thick grey track (#E5E5E5) with a colorful "fill" (Primary Green). The fill should have a subtle white "sheen" or highlight on the top edge to appear 3D.

### Learning Cards
Used for multiple-choice questions. 
- **Inactive:** White background with a 2px light grey border.
- **Selected:** Secondary Blue background with a 2px darker blue bottom border.
- **Correct/Incorrect:** Transitions to Primary Green or Error Red respectively.

### Navigation
A bottom navigation bar on mobile with large, simple icons. Icons should be "active" when they take on the Primary Color and a slightly thicker stroke.

### Feedback Toasts
Large, full-width banners that slide up from the bottom for "Correct" or "Incorrect" answers. These should be high-contrast (Solid Green or Red) with white text and a big "Continue" button.