# Design System: MCode

## Direction

The existing near-black, acid-green digital studio identity remains. The 28 October 2026 user request makes the typography lighter, removes the location/status bar and floating notification, removes technical footer copy, puts the halftone logo inside a terminal window, and adds a seamless moving ribbon and responsive custom cursor. The approved source identity files are unchanged.

## Colors

- Background: #0B100D; terminal canvas: #090E0B.
- Foreground: #F1F5EF; accent: #A3FF12.
- Supporting text and placeholders: #9AAA9F; lighter supporting text: #A7B5AC.
- Panel: #111A14; separators: #1F2822 and #2D3A31.
- Text selection, caret, focus and scrollbar use the same palette.

## Typography

Barlow 400 is locally hosted and used for the hero, section titles, body, buttons and project information. Synthetic weights are disabled with font-synthesis: none. Georgia italic provides the green COM accent without a network font. Anton 400 is limited to the three conceptual project artworks. Terminal bars and compact metadata use installed Consolas/Courier New. Only Barlow is preloaded.

The hero scales from 54 to 96px on desktop and from 48 to 80px on mobile, at line-height 1.02. Section titles scale from 36 to 64px, weight 400 and line-height 1.1. Body copy uses 17-18px and line-height 1.6-1.65. Outlined section type uses a 1px foreground stroke.

## Composition

The page is centered within 1400px with clamp(20px, 4vw, 64px) gutters. The desktop hero uses two columns: title/copy/actions on the left, terminal artwork on the right. At 768px and below, the title, copy and actions precede the terminal. The main CTA sits approximately 492px from the top at a 390px viewport in local tests.

Projects use two columns above 1024px and one below; Pulse spans the desktop grid. The studio and contact introduction become single-column at 1024px. Forms and navigation adapt at 768px. Project metadata wraps instead of colliding. Contact fields retain persistent labels and a local-brief explanation.

## Terminal logo

The original contours are extruded 48 units and projected on Canvas 2D with luminance-driven green halftone dots. The cycle takes 12000ms, drawing at most 30fps and 600 internal pixels wide. There is no visible pause/resume control, as requested. The OS reduced-motion preference renders a static frame; hidden/offscreen states suspend work. A sibling SVG image is visible until the first successful canvas render, including without JavaScript or a canvas context.

The frame reuses the briefing terminal bar, with decorative window dots and a short title. Terminal decoration is hidden from assistive technology. The canvas has its own descriptive accessible name.

## Ribbon and pointer

The ribbon contains two identical, non-shrinking groups and moves one half of its track in a linear 26-second cycle. One accessible label describes it; duplicates are hidden from assistive technology. Reduced motion stops the animation and shows one wrapping group.

The pointer is a green dot with a following ring. Exponential interpolation smooths movement and velocity stretches the ring. It expands over controls and shows Explorar on project links. Fields keep their native text cursor; Tab, scrolling, pointer leave, window blur and visibility changes restore the native cursor. Touch devices and reduced motion never enable the effect. Its requestAnimationFrame loop stops when settled.

## Interaction and content

Mobile navigation uses native buttons and aria-expanded; Escape closes it and restores focus. Project links open their matching details, update the fragment and move focus to the summary. Visible project cards retain conceptual labels; no client metrics or availability claims are presented.

The user supplied mcode.contato@gmail.com. Direct mailto links work independently of the briefing. The form prepares plain text locally, then offers copying and opening the email application; it never claims successful delivery. Controls start disabled until initialization completes. Clipboard failure selects the text and explains manual copying.

## Files and verification

styles.css owns the active rules, including the former refinements. refinements.css remains a compatibility stub for the 404 page and publication manifest. cursor.mjs is an independent progressive enhancement so a pointer failure cannot disable the form. No runtime package dependency or external font service is used.

The local production copy was reviewed at 1920, 1440, 1280, 1024, 844 landscape, 768, 720, 390 and 320px. Keyboard menu, project focus, local brief, clipboard denial, reduced motion and JavaScript-off behavior were checked in headless Chromium. Automated scores are lab evidence, not a screen-reader audit, field Core Web Vitals or hosted-production validation. Detailed results and remaining launch dependencies are recorded in melhorias.md.
