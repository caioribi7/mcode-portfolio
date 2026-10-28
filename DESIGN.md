# Design System: MCode

## Direction

The existing near-black, acid-green digital studio identity remains. The latest user refinement follows the Alethe reference with condensed display lettering and monospace navigation, removes the location/status bar and floating notification, removes technical footer copy, puts the ASCII Matrix logo inside a terminal window, and adds a seamless moving ribbon and responsive custom cursor. The approved source identity files are unchanged.

## Colors

- Background: #0B100D; terminal canvas: #090E0B.
- Foreground: #F1F5EF; accent: #A3FF12.
- Supporting text and placeholders: #9AAA9F; lighter supporting text: #A7B5AC.
- Panel: #111A14; separators: #1F2822 and #2D3A31.
- Text selection, caret, focus and scrollbar use the same palette.

## Typography

Anton 400 now provides condensed hero and section headings, following the silhouette of the supplied Alethe screenshot. Space Grotesk variable (300-700) supplies body copy, project names, service names and buttons. Geist Mono variable (100-900) supplies navigation, terminal bars and compact metadata. All files and OFL licenses are local. Synthetic weights remain disabled. COM is upright Anton at 0.78em, in green, replacing the earlier italic serif. Anton and Space Grotesk are preloaded; Geist Mono is discovered through CSS. This is a visual match, not a claim that the screenshot uses these exact families.

The hero scales from 54 to 96px on desktop and from 48 to 80px on mobile, at line-height 1.02. Section titles scale from 36 to 64px, weight 400 and line-height 1.1. Body copy uses 17-18px and line-height 1.6-1.65. Outlined section type uses a 1px foreground stroke.

## Composition

The page is centered within 1400px with clamp(20px, 4vw, 64px) gutters. The desktop hero uses two columns: title/copy/actions on the left, terminal artwork on the right. At 768px and below, the title, copy and actions precede the terminal. The main CTA sits approximately 483px from the top at a 390px viewport in local tests.

Projects use two columns above 1024px and one below; Pulse spans the desktop grid. The studio and contact introduction become single-column at 1024px. Forms and navigation adapt at 768px. Project metadata wraps instead of colliding. Contact fields retain persistent labels and a local-brief explanation.

## Terminal logo

The original contours are extruded 48 units and projected on Canvas 2D as green ASCII characters. Luminance controls glyph density and brightness; dim code columns fall behind the rotating logo with brighter leading characters. The character grid uses a minimum 6px cell width, scales to about 70 columns, and uses installed Consolas/monospace. All frames, including the rain, are deterministic from the cycle time. This replaces the earlier halftone dot pass. The cycle takes 12000ms, drawing at most 30fps and 600 internal pixels wide. There is no visible pause/resume control, as requested. The latest explicit user request requires automatic continuous playback, including when the OS requests reduced motion. The logo no longer pauses on that preference or viewport visibility. requestAnimationFrame remains subject to browser throttling in background tabs. A sibling SVG image is visible until the first successful canvas render, including without JavaScript or a canvas context.

The frame reuses the briefing terminal bar, with decorative window dots and a short title. Terminal decoration is hidden from assistive technology. The canvas has its own descriptive accessible name.

## Ribbon and pointer

The ribbon contains two identical, non-shrinking groups and moves one half of its track in a linear 26-second cycle. One accessible label describes it; duplicates are hidden from assistive technology. Reduced motion stops the animation and shows one wrapping group.

The pointer is a terminal-style target: four green corner brackets and a small diamond center. It follows with exponential interpolation and a restrained velocity tilt, expands on links and becomes a labelled frame over project cards. Link mode uses difference blending to stay visible on lime buttons. Fields keep their native text cursor; Tab, scrolling, pointer leave, window blur and visibility changes restore the native cursor. Touch keeps the native cursor. Under reduced motion, the custom cursor tracks directly without trailing or an animation loop.

The projects button no longer includes // 01. A lime circular fill expands from its arrow bubble across the button on hover or keyboard focus. Text shifts slightly, changes to dark ink, and the arrow turns and cycles through its clipped container. The email action retains its existing treatment.

A separate fixed Canvas 2D layer paints visible but restrained halftone dots behind the content (base alpha 0.18, previously 0.09), with pointer-events disabled and aria-hidden. Nearby dots brighten, enlarge and move away from the pointer; clicking adds a short ripple. The grid adapts to a roughly 4500-dot budget, device pixel ratio is capped at 1.5, and its loop ends after motion settles. Touch sees a static dot field. Reduced motion uses a direct spatial response without ripple or autonomous animation. Body isolation keeps the canvas behind content without covering links or forms.

## Interaction and content

Mobile navigation uses native buttons and aria-expanded; Escape closes it and restores focus. Project links open their matching details, update the fragment and move focus to the summary. Visible project cards retain conceptual labels; no client metrics or availability claims are presented.

The user supplied mcode.contato@gmail.com. Direct mailto links work independently of the briefing. The form prepares plain text locally, then offers copying and opening the email application; it never claims successful delivery. Controls start disabled until initialization completes. Clipboard failure selects the text and explains manual copying.

## Files and verification

styles.css owns the active rules, including the former refinements. refinements.css remains a compatibility stub for the 404 page and publication manifest. cursor.mjs and halftone-background.mjs are independent progressive enhancements so a pointer failure cannot disable the form. No runtime package dependency or external font service is used.

The local production copy was reviewed at 1920, 1440, 1280, 1024, 844 landscape, 768, 720, 390 and 320px. Keyboard menu, project focus, local brief, clipboard denial, reduced motion and JavaScript-off behavior were checked in headless Chromium. Automated scores are lab evidence, not a screen-reader audit, field Core Web Vitals or hosted-production validation. Detailed results and remaining launch dependencies are recorded in melhorias.md.
