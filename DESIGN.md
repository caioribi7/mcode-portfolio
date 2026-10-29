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

Projects use two columns above 1024px and one below; The portfolio has exactly two slots: Bara's Hotel (a noninteractive screenshot of the hotel in Bom Conselho, Pernambuco) and the Órbita concept. The studio grid and contact introduction become single-column at 1024px. Studio service modules use open dividers and 26px vertical padding on mobile. Contact rows and navigation adapt at 768px. Project metadata wraps instead of colliding. Contact channels stack in open rows, with wrapping text at narrow widths.

## Terminal logo

The original contours are extruded 48 units and projected on Canvas 2D as green ASCII characters. Luminance controls glyph density and brightness; dim code columns fall behind the rotating logo with brighter leading characters. The character grid uses a minimum 6px cell width, scales to about 70 columns, and uses installed Consolas/monospace. All frames, including the rain, are deterministic from the cycle time. This replaces the earlier halftone dot pass. The logo scale is about 15% smaller than the earlier rendering; the projected visible silhouette is recentered each frame so rotation does not make it drift. Tests sample the turn to verify centering and prevent clipping. The cycle takes 12000ms, drawing at most 30fps and 600 internal pixels wide. There is no visible pause/resume control, as requested. The latest explicit user request requires automatic continuous playback, including when the OS requests reduced motion. The logo no longer pauses on that preference or viewport visibility. requestAnimationFrame remains subject to browser throttling in background tabs. A sibling SVG image is visible until the first successful canvas render, including without JavaScript or a canvas context.

The canvas fills the terminal body at its native aspect ratio, with zero vertical margins on both desktop and mobile. The frame uses a terminal bar, with decorative window dots and a short title. Terminal decoration is hidden from assistive technology. The canvas has its own descriptive accessible name.

## Ribbon and pointer

The brutalist ribbon uses local Anton 400 at clamp(32px, 4.5vw, 58px), with tight 0.025em tracking and filled/outlined contrast. It contains two identical, non-shrinking groups and moves one half of its track in a linear 26-second cycle. One accessible label describes it; duplicates are hidden from assistive technology. Reduced motion stops the animation and shows one wrapping group.

The pointer is a thin brand-green circle with a white center dot. Links gently expand the ring from 28 to 36px. Over projects, it crossfades into a compact 28px green arrow with a white outline and a small Explorar label. The former large delta, cutout, fold line, rotation and shadow are removed. Position uses the existing smooth interpolation; shape, scale and opacity transitions take 220-300ms and can reverse mid-transition. The persistent label fades on exit as well as entry. Fields, touch and keyboard retain native behavior. Reduced motion keeps direct position tracking while the short, explicitly requested cursor state transitions remain enabled.

The projects button no longer includes // 01. A lime circular fill expands from its arrow bubble across the button on hover or keyboard focus. Text shifts slightly, changes to dark ink, and the arrow turns and cycles through its clipped container. The email action retains its existing treatment.

A separate fixed Canvas 2D layer paints visible but restrained halftone dots behind the content (base alpha 0.18, previously 0.09), with pointer-events disabled and aria-hidden. Nearby dots brighten, enlarge and move away from the pointer; clicking adds a short ripple. The grid adapts to a roughly 4500-dot budget, device pixel ratio is capped at 1.5, and its loop ends after motion settles. Touch sees a static dot field. Reduced motion uses a direct spatial response without ripple or autonomous animation. Body isolation keeps the canvas behind content without covering links or forms.

## Studio section

The section formerly titled Chame atenção / Dê motivos para ficar is fully rebuilt under Presença. Com intenção. By the latest explicit user request, the studio keeps its editorial layout but uses the default dark background, off-white text and acid-green accent. It must not return to the off-white/deep-green variant solely because an older audit recommended it. Three open service modules replace the boxed cards; they inherit the root palette without section-local color overrides. Redundant service tags, numbers, geometry badges and kickers were removed. The content keeps its two-column desktop grid and stacks at 1024px. A closing contact link and the illustrative-services notice remain. The original service scope is unchanged; no client claims or new delivery promises are introduced.

## Interaction and content

Mobile navigation uses native buttons and aria-expanded; Escape closes it and restores focus. Conceptual project links open their matching details, update the fragment and move focus to the summary. Bara's Hotel is presented as a user-identified developed project and links externally to Google Maps; no client metrics or availability claims are presented.

The contact section uses open full-width rows with channel icons, readable labels and dividers. Email is a native mailto link to mcode.contato@gmail.com, functional without JavaScript. WhatsApp and Instagram are noninteractive Em breve placeholders until official details arrive. No form, summary, clipboard logic or delivery claim remains.

## Team

The navigation includes Nossos devs linking to #devs. Mateus Dias uses the user-supplied devs/dev-1.jpg (853x1280) and confirmed GitHub root-mwteus; Caio Ribi uses devs/dev-2.jpg (960x1280) and confirmed GitHub caioribi7. Original photos are unchanged; CSS uses a 4:5 portrait frame, object-fit cover and upper-quarter alignment. Explicit dimensions and lazy loading reserve layout space. Profile captions have named, keyboard-accessible GitHub links opening a new tab. No roles or biographies were inferred.

## Analysis remediation

Informational art labels are at least 12px and functional copy uses 13-16px. Space Grotesk carries form labels, status messages and project descriptions while mono remains on terminal/navigation accents. The form notice is a plain paragraph. Green glow shadows were removed. The ASCII autoplay, font choice and ribbon remain explicit user preferences; detector warnings about the font/ribbon are recorded, not hidden. A full remediation record and validation evidence is appended to analise.md.

## Files and verification

styles.css owns the active rules, including the former refinements. refinements.css remains a compatibility stub for the 404 page and publication manifest. cursor.mjs and halftone-background.mjs are independent progressive enhancements so a pointer failure cannot disable the form. No runtime package dependency or external font service is used.

The local production copy was reviewed at 1920, 1440, 1280, 1101, 1024, 844 landscape, 768, 720, 390 and 320px. Keyboard menu, project focus, local brief, clipboard denial, reduced motion and JavaScript-off behavior were checked in headless Chromium. Automated scores are lab evidence, not a screen-reader audit, field Core Web Vitals or hosted-production validation. Detailed results and remaining launch dependencies are recorded in melhorias.md.
