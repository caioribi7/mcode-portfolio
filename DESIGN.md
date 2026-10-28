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

Projects use two columns above 1024px and one below; Pulse spans the desktop grid. The studio introduction and contact introduction become single-column at 1024px; studio service rows become single-column on mobile. Forms and navigation adapt at 768px. Project metadata wraps instead of colliding. Contact fields retain persistent labels and a local-brief explanation.

## Terminal logo

The original contours are extruded 48 units and projected on Canvas 2D as green ASCII characters. Luminance controls glyph density and brightness; dim code columns fall behind the rotating logo with brighter leading characters. The character grid uses a minimum 6px cell width, scales to about 70 columns, and uses installed Consolas/monospace. All frames, including the rain, are deterministic from the cycle time. This replaces the earlier halftone dot pass. The logo scale is about 15% smaller than the earlier rendering; the projected visible silhouette is recentered each frame so rotation does not make it drift. Tests sample the turn to verify centering and prevent clipping. The cycle takes 12000ms, drawing at most 30fps and 600 internal pixels wide. There is no visible pause/resume control, as requested. The latest explicit user request requires automatic continuous playback, including when the OS requests reduced motion. The logo no longer pauses on that preference or viewport visibility. requestAnimationFrame remains subject to browser throttling in background tabs. A sibling SVG image is visible until the first successful canvas render, including without JavaScript or a canvas context.

The canvas fills the terminal body at its native aspect ratio, with zero vertical margins on both desktop and mobile. The frame reuses the briefing terminal bar, with decorative window dots and a short title. Terminal decoration is hidden from assistive technology. The canvas has its own descriptive accessible name.

## Ribbon and pointer

The brutalist ribbon uses local Anton 400 at clamp(32px, 4.5vw, 58px), with tight 0.025em tracking and filled/outlined contrast. It contains two identical, non-shrinking groups and moves one half of its track in a linear 26-second cycle. One accessible label describes it; duplicates are hidden from assistive technology. Reduced motion stops the animation and shows one wrapping group.

The pointer is a thin brand-green circle with a white center dot. Over controls its ring grows to 42px. Over project links the ring and point fade down while a 68px delta-wing SVG arrow scales and rotates in, with green wings, a white edge/fold and a real transparent inner cutout. A persistent Explorar label fades below it; the exit crossfade is also animated. Shapes remain mounted, so direction changes can interrupt and reverse transitions without a hard swap. Pointer entry/exit fades, and its first position is set before it becomes visible. Fields, touch and keyboard retain native behavior. Reduced motion keeps direct position tracking, but the cursor's short state transitions remain enabled by explicit user request for fluid changes across states.

PRESENÇA in the hero now uses hollow lettering with a 1.2px stroke that fills on heading hover. CLAREZA and EXPERIÊNCIA use hollow type in both repeated ribbon groups. Their actual text remains available to assistive technology.

The projects button no longer includes // 01. A lime circular fill expands from its arrow bubble across the button on hover or keyboard focus. Text shifts slightly, changes to dark ink, and the arrow turns and cycles through its clipped container. The email action retains its existing treatment.

A separate fixed Canvas 2D layer paints visible but restrained halftone dots behind the content (base alpha 0.18, previously 0.09), with pointer-events disabled and aria-hidden. Nearby dots brighten, enlarge and move away from the pointer; clicking adds a short ripple. The grid adapts to a roughly 4500-dot budget, device pixel ratio is capped at 1.5, and its loop ends after motion settles. Touch sees a static dot field. Reduced motion uses a direct spatial response without ripple or autonomous animation. Body isolation keeps the canvas behind content without covering links or forms.

## Studio section

The section formerly titled Chame atenção / Dê motivos para ficar is fully rebuilt under Presença. Com intenção. An off-white panel interrupts the dark page, with oversized solid/outlined black Anton headings and a short manifesto. Three open editorial rows replace the boxed service cards, with black dividers, Space Grotesk titles and restrained green-tinted dark copy. A closing contact link and the illustrative-services notice remain. The original service scope is unchanged; no client claims or new delivery promises are introduced.

## Interaction and content

Mobile navigation uses native buttons and aria-expanded; Escape closes it and restores focus. Project links open their matching details, update the fragment and move focus to the summary. Visible project cards retain conceptual labels; no client metrics or availability claims are presented.

The user supplied mcode.contato@gmail.com. Direct mailto links work independently of the briefing. The form prepares plain text locally, then offers copying and opening the email application; it never claims successful delivery. Controls start disabled until initialization completes. Clipboard failure selects the text and explains manual copying.

## Files and verification

styles.css owns the active rules, including the former refinements. refinements.css remains a compatibility stub for the 404 page and publication manifest. cursor.mjs and halftone-background.mjs are independent progressive enhancements so a pointer failure cannot disable the form. No runtime package dependency or external font service is used.

The local production copy was reviewed at 1920, 1440, 1280, 1024, 844 landscape, 768, 720, 390 and 320px. Keyboard menu, project focus, local brief, clipboard denial, reduced motion and JavaScript-off behavior were checked in headless Chromium. Automated scores are lab evidence, not a screen-reader audit, field Core Web Vitals or hosted-production validation. Detailed results and remaining launch dependencies are recorded in melhorias.md.
