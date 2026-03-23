# Portfolio Rebuild Plan — taeho-world

**Created:** 2026-03-23
**Status:** Draft — awaiting confirmation
**Estimated complexity:** MEDIUM
**Scope:** ~8 files modified/created, ~3 files deleted

---

## Context

Taeho Kim's personal portfolio site (`taeho-world`) is a single-page React 19 + Vite + TypeScript + Tailwind v4 app. The site already has a working layout with Hero, Projects, Expertise, and Contact sections, i18n support (ko/en), and a monochrome design (#0a0a0a / #fafafa). Two things need significant work:

1. The Hero section robot is built from ~40 hand-coded Three.js primitives. It needs to be replaced with a Mixamo Y-Bot GLB model loaded via GLTFLoader with AnimationMixer for idle animation.
2. Project cards currently link externally or do nothing on click. They need a click-to-open modal/dialog with an image carousel showing all project images.

Additional polish, performance cleanup, and removal of dead code round out the effort.

### Key Dependencies Already Installed
- `three` v0.175 + `@types/three` (GLTFLoader is available from `three/addons`)
- `@radix-ui/react-dialog` (ready for modal)
- `embla-carousel-react` v8.6 (ready for image carousel)
- `lucide-react` (icons for prev/next/close)

No new npm packages are needed.

---

## Prerequisites (User Action Required)

### Obtain and place the Y-Bot GLB file

The Y-Bot model is not yet in the project. Before Phase 1 can begin:

1. Go to [mixamo.com](https://www.mixamo.com/) (free Adobe account required).
2. In the Characters tab, find **Y Bot**.
3. Download as **FBX** with skin. Also download an **idle animation** (search "Idle" or "Breathing Idle") applied to Y Bot, format FBX.
4. Convert both FBX files to a single GLB:
   - **Option A (Blender):** Import the character FBX, then import the idle animation FBX into the same scene. Export as GLB with "Include > Animation" checked.
   - **Option B (online):** Use [https://products.aspose.app/3d/conversion/fbx-to-glb](https://products.aspose.app/3d/conversion/fbx-to-glb) or similar. Note: online converters may strip animations — Blender is more reliable.
5. Create `public/models/` directory and place the file at `public/models/ybot.glb`.
6. Verify the GLB loads correctly at [https://gltf-viewer.donmccurdy.com/](https://gltf-viewer.donmccurdy.com/) — you should see the robot with animation clips listed.

**Acceptance:** `public/models/ybot.glb` exists, is under 15MB, and contains at least one animation clip.

---

## Phase 1: GLB Robot Integration

**Goal:** Replace the primitive Three.js robot with the Y-Bot GLB model, playing an idle animation.

### Tasks

1. **Rewrite `src/hooks/useRobotScene.ts`**
   - Remove all hand-coded geometry (~230 lines of primitive meshes).
   - Import `GLTFLoader` from `three/addons/loaders/GLTFLoader.js`.
   - Load `"/models/ybot.glb"` asynchronously.
   - On load: add the model to the scene, create `THREE.AnimationMixer`, find the idle clip via `gltf.animations[0]`, call `mixer.clipAction(clip).play()`.
   - Keep the existing: scene setup, camera, renderer, lighting, resize handler, cleanup.
   - Update the animation loop to call `mixer.update(delta)` each frame using `THREE.Clock`.
   - Add a loading state: return `{ isLoading: boolean }` from the hook so HeroSection can show a placeholder while the GLB downloads.

2. **Update `src/sections/HeroSection.tsx`**
   - Consume the `isLoading` return value from `useRobotScene`.
   - While loading, show a subtle skeleton/pulse placeholder in the canvas area.
   - No other changes needed — the containerRef pattern stays the same.

3. **Delete `src/hooks/useThree.ts`** if it is only used by the old primitive robot (verify before deleting).

### Acceptance Criteria
- [ ] GLB robot renders in the Hero section on page load.
- [ ] Idle animation plays continuously without stuttering.
- [ ] Canvas is transparent (alpha: true) — robot floats over the dark background.
- [ ] Resize works correctly (robot scales with viewport).
- [ ] No console errors related to Three.js or GLTFLoader.
- [ ] Loading state displays briefly, then transitions to the model.
- [ ] `dat.gui` import is removed if it was only used for primitive robot debugging.

---

## Phase 2: Project Modal with Image Carousel

**Goal:** Clicking a project card opens a dialog with a full image carousel and project details.

### Tasks

1. **Create `src/components/ProjectModal.tsx`**
   - Use `@radix-ui/react-dialog` (already installed) for the modal shell.
   - Props: `project` (from data), `open`, `onOpenChange`.
   - Layout inside the dialog:
     - Top: image carousel using `embla-carousel-react` (already installed). Show all images from `project.images[]`.
     - Carousel controls: prev/next arrows (lucide-react `ChevronLeft`/`ChevronRight`), dot indicators.
     - Below carousel: project name, full description (`t('projects.${key}.description')`), tech stack tags, company name, date range.
     - Optional: link to external URL if `project.url` exists.
   - Styling: monochrome — `bg-[#111111]` dialog, `border-[#1f1f1f]`, consistent with card styling.
   - Responsive: full-screen on mobile, max-w-3xl centered on desktop.
   - Close via X button (top-right), Escape key, or overlay click (all Radix defaults).

2. **Update `src/sections/ProjectsSection.tsx`**
   - Add state: `const [selectedProject, setSelectedProject] = useState(null)`.
   - Make each `ProjectCard` clickable (replace external `<a>` with `onClick` that sets `selectedProject`).
   - Render `<ProjectModal>` at section level, controlled by `selectedProject`.
   - If `project.url` exists, the modal can include an "Open project" external link button instead of the card linking directly.

3. **Add i18n keys** (if missing)
   - Verify `projects.${key}.description` exists in both `ko.json` and `en.json` for all 8 projects.
   - If only `singleSentence` exists, either reuse it or add a `description` key with longer text.

### Acceptance Criteria
- [ ] Clicking any project card opens a modal (not navigating away).
- [ ] Image carousel shows all images for that project, with working prev/next.
- [ ] Carousel is swipeable on mobile (Embla default behavior).
- [ ] Modal closes on X, Escape, and overlay click.
- [ ] Modal is full-width on mobile, centered max-w-3xl on desktop.
- [ ] All 8 projects display correctly in the modal.
- [ ] Both Korean and English text render correctly.
- [ ] Focus is trapped inside the modal (Radix default).

---

## Phase 3: Design Polish

**Goal:** Refine typography, spacing, hover states, and add subtle scroll animations for a polished feel.

### Tasks

1. **Typography and spacing audit**
   - Ensure consistent type scale across all sections (Hero h1, section headers, card titles, body text).
   - Verify vertical rhythm: sections use consistent `py-24`, cards use consistent padding.
   - Check that the monochrome palette is applied uniformly (no stray accent colors).

2. **Hover states and micro-interactions**
   - Project cards: add a subtle `scale-[1.01]` + `shadow` on hover with `transition-transform duration-200`.
   - Nav links: add underline-on-hover or opacity transition.
   - Buttons/links: ensure all interactive elements have visible hover/focus states.

3. **Scroll animations (lightweight)**
   - Add CSS-only `@keyframes fadeInUp` for section entry (using Intersection Observer or CSS `animation-timeline: view()` if browser support is acceptable).
   - Keep it subtle: 20px translateY + opacity fade, 0.4s ease-out.
   - Alternative: use the already-installed `tw-animate-css` for Tailwind-native animations.

4. **Mobile refinements**
   - Verify Hero section text sizing on small screens (text-7xl may be too large on 375px).
   - Ensure nav collapses or scrolls horizontally on mobile.
   - Test project cards at 1-column layout on narrow screens.

### Acceptance Criteria
- [ ] No visual regressions on desktop (1440px) or mobile (375px).
- [ ] All interactive elements have visible hover and focus states.
- [ ] Sections fade in on scroll (not jarring, not blocking).
- [ ] Typography is consistent — no mismatched sizes or weights across sections.
- [ ] Lighthouse accessibility score remains above 90.

---

## Phase 4: Performance and Cleanup

**Goal:** Remove dead code, optimize the Three.js bundle, and ensure fast load times.

### Tasks

1. **Remove dead Three.js primitive code**
   - After Phase 1, verify `useRobotScene.ts` no longer contains any primitive geometry.
   - Delete `useThree.ts` if unused.
   - Remove `dat.gui` from `package.json` and `@types/dat.gui` if no longer used anywhere.

2. **Three.js tree-shaking verification**
   - Run `npx vite build` and check the output bundle size.
   - Ensure only used Three.js modules are included (GLTFLoader, AnimationMixer, core renderer).
   - If the Three.js chunk is too large (>500KB gzipped), consider dynamic import: `const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js')`.

3. **Asset optimization**
   - Verify all `.webp` images in `src/pages/CareerPage/images/` are reasonably sized (<200KB each).
   - Add `loading="lazy"` to project card images.
   - Ensure the GLB file is served with proper caching headers (Vite handles this for `/public` assets).

4. **Final cleanup**
   - Remove `react-router` from dependencies if no routing is used (current App.tsx has no router).
   - Remove `@tanstack/react-query` if not used.
   - Remove `zustand` if not used.
   - Run `npm run lint` and fix any issues.
   - Run `npm run build` to verify zero TypeScript errors.

### Acceptance Criteria
- [ ] `npm run build` succeeds with zero errors.
- [ ] `npm run lint` passes cleanly.
- [ ] No unused dependencies remain in package.json.
- [ ] Total JS bundle (gzipped) is under 300KB (excluding Three.js).
- [ ] Three.js chunk is under 600KB gzipped.
- [ ] GLB loads within 3 seconds on a fast 3G throttle.
- [ ] Lighthouse Performance score is above 80.

---

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Y-Bot GLB has no embedded animation clips | Medium | Blocks Phase 1 idle animation | Verify in gltf-viewer before starting. If missing, download a separate idle animation FBX from Mixamo and merge in Blender. |
| GLB file is too large (>20MB) | Low | Slow hero load | Use Blender to reduce polygon count (Decimate modifier) or use Draco compression (`gltf-pipeline -d`). |
| Three.js GLTFLoader version mismatch | Low | Runtime error | Import GLTFLoader from `three/addons` (not a separate package). Matches the installed `three@0.175`. |
| Embla carousel conflicts with Radix dialog focus trap | Low | Carousel arrows not clickable inside modal | Test early. If conflict, use `onOpenAutoFocus` prop to manage focus. |
| `animation-timeline: view()` CSS not supported | Medium | No scroll animations in older browsers | Fallback to Intersection Observer API or skip scroll animation on unsupported browsers — progressive enhancement. |
| Removing unused deps breaks hidden usage | Low | Build failure | Grep for each dependency name before removing. Run full build after cleanup. |

---

## Execution Order

```
Prerequisites (user)  -->  Phase 1 (GLB robot)
                            |
                            v
                       Phase 2 (Project modal)  -- can start in parallel after Phase 1 begins
                            |
                            v
                       Phase 3 (Design polish)  -- depends on Phase 1 + 2 being visually complete
                            |
                            v
                       Phase 4 (Cleanup)        -- must be last
```

Phases 1 and 2 are independent and can be worked in parallel. Phase 3 should follow both. Phase 4 is always last.

---

## Files Affected (estimated)

| Action | File |
|---|---|
| Rewrite | `src/hooks/useRobotScene.ts` |
| Modify | `src/sections/HeroSection.tsx` |
| Modify | `src/sections/ProjectsSection.tsx` |
| Create | `src/components/ProjectModal.tsx` |
| Create | `public/models/ybot.glb` (user-provided) |
| Modify | `src/i18n/locales/ko.json` (if description keys needed) |
| Modify | `src/i18n/locales/en.json` (if description keys needed) |
| Modify | `package.json` (remove unused deps) |
| Delete | `src/hooks/useThree.ts` (if unused) |
