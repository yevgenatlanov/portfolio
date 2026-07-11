# Agent context: portfolio-1

## Project overview
Personal portfolio site for Yevhenii Atlanov. Built as a **dualistic split-screen experience** (light = visionary, dark = practitioner).

- **Framework:** Next.js 16 app router, React 19, TypeScript
- **Styling:** Tailwind CSS 4 + custom `globals.css` (monochrome dual palette)
- **UI library:** shadcn/ui New York / neutral + Radix primitives
- **Icons:** `react-icons` and `@iconify/react`
- **Data:** static TypeScript files under `src/data/` (projects, experience, skills, blog)
- **i18n:** custom `src/lib/i18n.tsx` context (`en`/`de`)
- **Theme:** `next-themes`, default dark

## Directory map

```
src/app/           # routes: /, /blog/[slug], /ink, /ui-variants
src/components/    # feature components
  home/            # HomePage + dualism layout
  ink/             # ink absorption experiment component
  navigation/      # nav variants
  projects/        # project presentation variants
  experience/      # experience timeline variants
  blog/            # blog list variants
  pagination/      # pagination pattern variants
  ui/              # shadcn/ui wrappers
src/data/          # projects.ts, exp.ts, skills.ts, posts.tsx
src/hooks/         # use-dualism-scroll.ts, use-mobile.ts
src/lang/          # translation JSON files (en, de, driod)
src/lib/           # i18n.tsx, utils.ts, dateUtils.ts
src/theme/         # themeProvider.tsx
src/types/         # shared TypeScript types
```

## Key design tokens

Dual palette is hard-coded in CSS custom properties:

- `--dual-light-bg: #fafafa`, `--dual-light-fg: #0a0a0a`
- `--dual-dark-bg: #0a0a0a`, `--dual-dark-fg: #f5f5f5`
- shadcn tokens default to dark mode (`--background: #0a0a0a`, etc.)

Components receive a `variant: "light" | "dark"` prop and compute colors:

```ts
const isLight = variant === "light";
const mutedColor = isLight ? "#404040" : "#a3a3a3";
const borderColor = isLight ? "rgba(10,10,10,0.12)" : "rgba(245,245,245,0.12)";
```

## Component conventions

1. **Variants** live in feature folders. Many variants share a single file if they are small (e.g. `projectVariants.tsx`).
2. **Reusable props pattern:** `{ variant }: { variant: "light" | "dark" }` for content blocks; `{ activeSection, onNavigate }` for navigation.
3. **Use shadcn primitives** where possible: `Card`, `Badge`, `Button`, `Separator`, `Sheet`, `DropdownMenu`, `Tooltip`, `Switch`, `Input`, `Skeleton`.
4. **Icons:** prefer `react-icons/fi` and `react-icons/fa`; `@iconify/react` for skill tech logos.
5. **Data:** import from `@/data/*` and `@/lib/dateUtils` for experience date math.
6. **CSS:** add new variant styles to `src/app/globals.css`. Follow existing naming: `.project-*`, `.blog-*`, `.experience-*`, `.pagination-*`, `.nav-*`.
7. **No magic numbers for layout:** respect `split-container`, `panel`, `sect`, `sect-content` classes.

## Type highlights

- `Project` — title, description, tags, role, techStack, keyFeatures, timeframe, urls
- `Experience` — company, title, location, type, startDate, endDate, achievements, technologies
- `Skill` — name, icon, category, level, experience, isFeatured
- `BlogPost` — title, slug, excerpt, date, tags, readTime

## Available shadcn/ui wrappers

`src/components/ui/`: badge, button, card, dropdown-menu, input, separator, sheet, skeleton, switch, tooltip.

Additional Radix primitives are installed and may be used directly: accordion, tabs, scroll-area, progress, avatar, etc.

## UI variants showroom

`/ui-variants` showcases **10 presentation alternatives per block**. Blocks:

- **Navigation:** numbered, vertical text, line progress, dot, pill, step, breadcrumb, horizontal, drawer, tabs.
- **Projects:** interactive terminal, list, minimal, cards, static terminal, carousel, accordion, kanban, feature matrix, masonry.
- **Experience:** chrono timeline, time bars, period lines, year stream, duration blocks, classic timeline, compact accordion, passport cards, stats, tech frequency.
- **Blog:** list, numbered, grid, magazine, featured card, table, minimal, carousel, searchable, tag cloud.
- **Pagination:** scroll-snap, horizontal swipe, load more, drag scroller, reveal on scroll, terminal, keyboard, stacked sheets, progress steps, segmented bar.

Add new variant styles to `src/app/globals.css` following the existing naming convention.

## Build / checks

```bash
npm run dev          # turbopack dev server
npm run build        # production build
npm run lint         # eslint
```

Always run `npm run build` and `npm run lint` before finishing non-trivial work. The repo tracks `package-lock.json` (npm), not pnpm.

## Common gotchas

- The homepage uses a custom dual-scroll hook; avoid changing `panel-inner`/`split-container` lightly.
- `/ui-variants` has a light background; components rendered there receive `variant="light"`.
- Experience date parsing handles `"Present"`, year-only strings, and `"Month Year"` formats.
- Do not run `git commit`/`git push` unless explicitly asked.
