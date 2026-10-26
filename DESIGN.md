---
name: MCode
description: Disciplined black-and-neon creative-development poster with separated halftone logo and filled/outlined type.
colors:
  bg: "#0b100d"
  ink: "#f1f5ef"
  accent: "#a3ff12"
  muted: "#a7b1aa"
  line: "#2a332d"
  field-line: "#3c6515"
  field-placeholder: "#38531c"
  contact-note: "#30471d"
typography:
  display:
    fontFamily: "Anton, 'Arial Narrow', sans-serif"
    fontSize: "clamp(80px,14.15vw,232px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-.028em"
  headline:
    fontFamily: "Anton, 'Arial Narrow', sans-serif"
    fontSize: "clamp(46px,5.2vw,82px)"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-.025em"
  body:
    fontFamily: "Barlow, 'Segoe UI', sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Barlow, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "Barlow, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.5
  field:
    fontFamily: "Barlow, 'Segoe UI', sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  square: "0"
spacing:
  gutter: "clamp(22px,4.2vw,72px)"
  section: "112px"
  section-tablet: "80px"
  section-mobile: "64px"
  field-block: "16px"
  grid-column: "34px"
  grid-row: "46px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    padding: "15px 23px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  button-contact:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.square}"
    padding: "15px 23px"
  button-contact-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.bg}"
    rounded: "{rounded.square}"
    padding: "12px 0"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.bg}"
    typography: "{typography.field}"
    rounded: "{rounded.square}"
    padding: "16px 0"
  navigation:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "12px 0"
  disclosure:
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "20px 0"
---

# Design System: MCode

## Overview

**Creative North Star: "The digital-studio poster"**

The implemented portfolio is a disciplined digital-studio poster on near-black, punctuated by acid-green fields and oversized condensed lettering. Filled and outlined words share the same headline. The exact MCode symbol geometry is extruded 48 units and rotates in a 12-second loop, rendered through CPU-projected 3D geometry and a luminance-driven halftone pass on Canvas 2D. Its own stage sits above the off-white tape and semantic headline; artwork, text and controls have separate space, with no anime character or collage.

The visual world is pinned, not a proposal for a new identity. This record describes `index.html`, with `refinements.css` loaded AFTER `styles.css` as the active override layer. Interaction lives in `app.mjs`, `brief.mjs` and `logo-animation.mjs`; exact symbol contours and extrusion live in `logo-geometry.mjs`. Original identity SVGs remain unchanged; only the derivative 3D scene rotates. Inactive ghost-window, character and collage CSS rules are legacy residue, not the current interface or design system.

**Key Characteristics:**
- Near-black canvas, off-white reading text and acid-green emphasis.
- Local Anton display lettering paired with local Barlow reading text.
- Sharp controls, thin separators and asymmetric project artboards.
- A separate halftone logo stage above readable headline, work, studio and enquiry bands.

## Colors

### Primary

The `accent` token is the acid-green identity color. It marks calls to action, the headline period, contact navigation, selected display words, the static ticker and the complete contact field. It is not restricted to a tiny highlight budget.

### Neutral

`bg` is the green-tinted near-black canvas and the ink on green. `ink` supplies off-white type, light project surfaces and the shadowless tape. `muted` distinguishes supporting copy; `line` draws quiet separators. The three field/contact tokens preserve the darker green line, placeholder and explanatory-copy roles on the accent field.

Project-specific artwork has additional colors; these are artwork-only, not the main brand palette or new system tokens. The active halftone uses the existing `accent` (#a3ff12). The declared CSS `--panel` and colors from inactive ghost-window rules are deliberately not promoted to design tokens.

**The Inversion Rule.** On the green contact field, text, field focus and outlines switch to dark ink; the action becomes dark with off-white text.

## Typography

Anton (`assets/fonts/anton.ttf`) is the local display face; Barlow (`assets/fonts/barlow.ttf`) is the local body face. Both files declare weight 400 and `font-display: swap`. Buttons request weight 600 without a separate bundled bold face, so that treatment may be synthesized by the browser. OFL notices remain beside the fonts.

The frontmatter display role records the desktop foreground h1; there is no active background lettering layer. The work heading uses the headline role. Body uses the base reading rhythm; labels, navigation and inputs have their own smaller roles. Project titles use Barlow (22px, weight 400); disclosure paragraphs use 16px/1.65 with a maximum 68ch measure. Studio prose is narrower (48ch). Final small-print overrides leave project artwork labels at 11px and the content, concept and footer notes at 12px.

Frame artwork type uses clamp(40px,4.3vw,66px)/1.04 on desktop and clamp(34px,10.5vw,56px) on mobile, confined to the left column beside the image. Pulse lettering is reduced to 92px/.93 on desktop and 78px on mobile; its waveform is hidden on mobile. These are artwork-specific sizes, not new headline tokens.

At 700px and below the h1 becomes 27vw/.99 with -.025em tracking, wrapping the final word onto a new line. The work/contact headings become 12vw; studio headings become 10.3vw. At 1700px and above the h1 is 248px. These are explicit CSS breakpoints rather than a fabricated modular scale.

**The Filled/Outline Rule.** Use the same condensed family for filled and transparent stroked words. The hero uses a 2px off-white stroke on desktop and 1.3px on mobile; ordinary outlined headings use 1.2px, while contact headings use a dark 1.3px stroke.

## Layout

The shared fluid gutter is the frontmatter gutter token, fixed to 22px at 700px and below. Section vertical padding steps from the desktop section token to tablet at 1050px and mobile at 700px. Contact has a desktop 90px vertical override, superseded by the same responsive section rules. At 1700px and above the body is centered with a 1920px maximum width.

Work uses an asymmetric two-column grid (1.18fr / 1fr); its third artboard spans both columns. The studio uses 1.12fr / 1fr with an 8vw gap, reduced to 5vw at 1050px. At 700px work, studio and form rows become single-column. Work gaps become 30px. The desktop masthead is at least 108px tall; the mobile masthead is at least 85px tall. Mobile navigation is an absolutely positioned bordered dropdown, not a full-screen overlay.

The hero flows as separate logo stage, tape/headline and supporting-copy/action bands without overlapping text. The stage is at least 300px tall (350px at 1700px and above); its canvas is min(520px,70vw) wide with a 1/.62 aspect ratio, growing to 560px on wide screens. At 700px and below the stage is at least 255px tall with 26px bottom padding; canvas width is min(380px,94vw), capped at viewport width minus 44px. The rotation control moves below the logo on mobile. Frame reserves a right-hand image column (37%) separate from its left headline, and artwork captions reserve a bottom band clear of headlines and arrow controls. These surface-specific dimensions are not reusable system spacing tokens.

## Elevation & Depth

Depth comes from the real 48-unit extrusion, perspective projection, face lighting and luminance-driven acid-green halftone dots in the logo stage, alongside contrasting flat project fields. There is no reusable elevated-card, glow or shadow system. The active override removes the tape shadow; inactive glyph shadows are not design tokens.

State motion is brief: navigation underline 250ms, primary action/arrow 220ms and disclosure/project-open transforms 200ms. Project hover brightness is removed by the active override. The ticker remains static (`animation: none`), with responsive padding and a minimum height of 77px on desktop and 56px on mobile. Reduced-motion preference disables CSS transitions/animations and changes smooth scrolling to automatic scrolling.

The logo makes one vertical-axis rotation every 12000ms with a fixed tilt and a draw cap of 30fps. The keyboard-operable pause/resume button updates its text, icon and `aria-pressed` state (true means paused). Reduced motion starts paused on a rendered static frame and preference changes update that state; visitors can explicitly resume. Suspend the animation loop while the canvas is offscreen or the document is hidden, without advancing animation time on return. Keep the deterministic cycle and 600px maximum internal canvas width; this is Canvas 2D, not a WebGL renderer.

## Shapes

Controls and artboards are square-edged. Thin rules separate navigation, sections and native disclosures; input fields use only a bottom border. Project wire geometry and halftone dots belong to illustration, not rounded UI. Icons use square linecaps and miter joins; the recurring diagonal arrow is a stroked inline SVG. Preserve the existing logo SVG files rather than reconstructing the mark in type or CSS.

## Components

### Buttons

Primary actions are flat accent rectangles, with the frontmatter padding and a minimum 58px height. Hover changes the field to off-white and moves the arrow diagonally by 2px. Contact actions invert to dark, then off-white on hover. The mobile hero action is full width, at least 55px high and 15px type. The copy action is a borderless text button with a bottom rule, 12px vertical padding and an inline arrow.

Keyboard focus is a 2px accent outline with 6px offset; inside contact it switches to dark. There is no custom pressed-state system. The global disabled button style uses opacity .6 and a wait cursor.

### Logo stage and rotation control

The Canvas 2D stage renders the exact two approved MCode symbol contours as an extruded mesh, not a font approximation or image spin. Preserve the source logo files. Use the existing acid-green accent for the halftone pass; keep the tape, headline and work CTA outside the stage. The canvas has an accessible image label and approved SVG fallback.

The rotation control is a quiet Barlow text button (12px desktop, 11px mobile), at least 44px tall, with a 15px pause/play icon. Default text uses `muted`, hover uses `accent`, and keyboard focus keeps the global visible outline. Labels alternate between “Pausar rotação” and “Retomar rotação”; behavior and suspension constraints are specified in Elevation & Depth.

### Project artboards

Project links are image-led rectangular artboards with separate title/category captions and a square diagonal-arrow affordance (46px). Hover leaves artwork brightness unchanged and translates the arrow affordance. Clicking opens the matching native project disclosure and follows its anchor; there is no modal or separate case-study route. Artwork heights are surface-specific, not a universal card token. Keep the explicit conceptual-project descriptions. The active artwork height is 440px (Pulse: 420px), becoming 390px for all three on mobile. Frame image and headline remain in separate columns; artwork captions sit in reserved bottom bands (26px above the bottom, with room for the arrow). Keep Pulse at its reduced type size and hide its waveform at 700px and below.

### Inputs / Fields

Contact labels sit above transparent, square-edged inputs and resizable textareas with dark bottom rules. Placeholder and explanatory copy use their dedicated dark-green roles. Fields focus with a 2px dark outline, offset 6px. Mobile input type becomes 16px. Validation uses native HTML requirements and limits, not a custom error component.

Submitting prepares a readonly brief locally, reveals its result, focuses the textarea and announces that nothing was sent. Copy uses the Clipboard API; failure selects the text and announces manual-copy instructions. No destination, email service or backend is implemented.

### Navigation

Desktop navigation is inline, with a left-origin accent underline on hover and an accented contact link. The 700px mobile menu exposes `aria-expanded`, closes on link selection or Escape, restores focus on Escape and resets at breakpoint changes. The skip link appears on focus. These controls use the same visible focus treatment as the rest of the page.

### Disclosures

Native `details`/`summary` rows use thin bottom separators, a minimum 72px summary height and 20px vertical padding. Hover accents the summary; the SVG plus rotates 45 degrees when open. Project summaries become at least 62px tall on mobile. Services share the pattern, with one initially open.

### Static ticker

A full-width green band contrasts filled and dark-stroked Anton words. It is clipped and static, not an automatic marquee; active minimum heights and padding are described in Elevation & Depth. Desktop lettering uses clamp(24px,2.6vw,38px); mobile uses 22px with 22px asterisks. This describes the implemented signature without making artwork ornaments a universal icon system.

## Do's and Don'ts

### Do:
- Do preserve the near-black, off-white and acid-green roles, including the full green contact field.
- Do pair local Anton display type with Barlow reading text and retain the OFL notices.
- Do preserve filled/outlined headline contrast, square controls and thin section rules.
- Do retain semantic links, native disclosures, visible focus and reduced-motion behavior.
- Do preserve the exact logo contours, 48-unit extrusion, 12-second loop and accessible pause control in their own stage.
- Do keep conceptual content and the non-sending contact limitation explicit until replaced with verified content and functionality.

### Don't:
- Don't replace the pinned green/black filled-and-outline poster identity with a generic rounded-card or gradient landing page.
- Don't apply decorative hero microcopy sizes to real navigation or reading text.
- Don't turn artwork-specific palettes, dimensions or inactive ghost-window rules into main brand tokens or reusable component rules.
- Don't reintroduce anime characters, collage layers or artwork/text collisions; the former character asset has been deleted.
- Don't claim a brief was sent, invent a contact destination or remove concept labels without real replacement evidence.
