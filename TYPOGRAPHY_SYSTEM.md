# Premium Typography System

## Overview
Editorial-style typography using Inter (sans-serif) + Playfair Display (serif) with cyan accent color (`#06b6d4` / `text-cyan-600`). Designed for refugee/immigrant support organization (New International Hope).

---

## CSS Classes (globals.css)

### 1. Heading Classes

```css
/* Primary Editorial Headings - Large serif display text */
.heading-editorial {
  @apply font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight leading-tight;
}

/* Cyan Accent for Editorial Headings */
.heading-accent-cyan {
  @apply font-serif italic font-normal text-cyan-600;
}

/* Standard Sans-serif Heading */
.heading-sans {
  @apply font-sans text-3xl md:text-4xl font-bold text-gray-900;
}
```

### 2. Kicker Classes (Eyebrow Labels)

```css
/* Standard Kicker - uppercase label */
.kicker {
  @apply font-sans font-semibold text-xs uppercase tracking-[0.25em] text-gray-500;
}

/* Cyan Kicker - brand accent version */
.kicker-cyan {
  @apply font-sans font-semibold text-xs uppercase tracking-[0.25em] text-cyan-600;
}
```

### 3. Body Text Classes

```css
/* Editorial Body - Light weight, premium feel */
.body-editorial {
  @apply font-sans font-light leading-relaxed tracking-premium;
  line-height: 1.8;
}

/* Hero Subtitle - Slightly larger body text */
.hero-subtitle {
  @apply text-lg md:text-xl font-light leading-relaxed;
}

/* Quote Editorial - Pull quote styling */
.quote-editorial {
  @apply font-serif text-2xl md:text-3xl font-medium italic leading-relaxed;
}
```

### 4. Card & Interactive Classes

```css
/* Card Title with Cyan Hover */
.card-title-cyan {
  @apply font-serif font-medium text-xl leading-tight text-gray-900 hover:text-cyan-600 transition-colors;
}

/* Standard Card Title */
.card-title {
  @apply font-serif font-medium text-xl leading-tight text-gray-900;
}

/* Card Lift Effect */
.card-lift {
  @apply transition-all duration-300 hover:-translate-y-1 hover:shadow-xl;
}
```

### 5. Stat/Number Classes

```css
/* Cyan Stat Numbers */
.stat-cyan {
  @apply font-serif font-semibold tracking-tight text-cyan-600;
}

/* Standard Stat Numbers */
.stat-number {
  @apply font-serif font-semibold tracking-tight text-gray-900;
}
```

### 6. Divider Classes

```css
/* Elegant Gradient Divider */
.hr-elegant {
  @apply w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto;
}

/* Cyan Gradient Divider */
.hr-cyan {
  @apply w-24 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto;
}

/* White Gradient Divider (for dark backgrounds) */
.hr-white {
  @apply w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto;
}
```

### 7. Button Classes

```css
/* Cyan Button */
.btn-cyan {
  @apply inline-flex items-center justify-center px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition shadow-lg hover:shadow-xl;
}

/* Text Render Premium */
.text-render-premium {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## Usage Patterns

### Hero Section Pattern
```tsx
<section className="relative bg-cover bg-center" style={{backgroundImage: 'url(...)'}}>
  <div className="absolute inset-0 bg-white/85" /> {/* White overlay */}
  <div className="relative z-10">
    <span className="kicker-cyan mb-4 block">Eyebrow Label</span>
    <h1 className="heading-editorial text-gray-900">
      Main Heading <span className="heading-accent-cyan">Accent Word</span>
    </h1>
    <div className="hr-cyan my-6"></div>
    <p className="hero-subtitle text-gray-600">
      Supporting description text
    </p>
  </div>
</section>
```

### Content Section Pattern
```tsx
<section className="relative bg-cover bg-center" style={{backgroundImage: 'url(...)'}}>
  <div className="absolute inset-0 bg-white/85" />
  <div className="relative z-10">
    <div className="text-center mb-12">
      <span className="kicker-cyan mb-4 block">Section Label</span>
      <h2 className="heading-editorial text-gray-900">
        Section Title <span className="heading-accent-cyan">Accent</span>
      </h2>
      <div className="hr-cyan mx-auto my-6"></div>
      <p className="body-editorial text-gray-600 max-w-2xl mx-auto">
        Section description
      </p>
    </div>
  </div>
</section>
```

### Card Pattern
```tsx
<div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:-translate-y-1 border border-cyan-100">
  <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
    <Icon className="text-3xl text-cyan-600"/>
  </div>
  <h3 className="card-title-cyan text-xl mb-3">Card Title</h3>
  <p className="text-gray-600">Card description</p>
</div>
```

### Dark Section Pattern (Cyan Background)
```tsx
<section className="relative bg-cover bg-center" style={{backgroundImage: 'url(...)'}}>
  <div className="absolute inset-0 bg-cyan-600/85" /> {/* Cyan overlay */}
  <div className="relative z-10">
    <span className="kicker text-white/90 mb-4 block">Label</span>
    <h2 className="heading-editorial text-white">
      Title <span className="italic font-serif">Accent</span>
    </h2>
    <div className="hr-white mx-auto my-6"></div>
    
    {/* Cards on dark bg */}
    <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
      <h3 className="card-title-cyan">Card on Dark BG</h3>
    </div>
  </div>
</section>
```

### Dark Section Pattern (Slate Background)
```tsx
<section className="relative bg-cover bg-center" style={{backgroundImage: 'url(...)'}}>
  <div className="absolute inset-0 bg-slate-950/80" /> {/* Dark overlay */}
  <div className="relative z-10">
    <span className="kicker text-cyan-300 mb-4 block">Label</span>
    <h2 className="heading-editorial text-white">
      Title <span className="italic font-serif text-cyan-300">Accent</span>
    </h2>
    <div className="hr-cyan mx-auto my-6"></div>
    
    {/* Glass cards */}
    <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
      <h3 className="text-xl font-serif font-medium text-white">Glass Card</h3>
      <p className="text-white/80">Description</p>
    </div>
  </div>
</section>
```

### Stats Pattern
```tsx
<div className="text-center">
  <span className="stat-cyan text-5xl block mb-2">500+</span>
  <span className="text-gray-600 body-editorial">Label</span>
</div>
```

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `text-cyan-600` | `#06b6d4` | Primary accent, kickers, hover states |
| `text-cyan-300` | `#67e8f9` | Light accent on dark backgrounds |
| `text-cyan-700` | `#0e7490` | Darker accent for hover/links |
| `bg-cyan-600` | `#06b6d4` | Primary button/CTA background |
| `bg-cyan-100` | `#cffafe` | Light backgrounds, icon containers |
| `text-gray-900` | `#111827` | Primary headings |
| `text-gray-600` | `#4b5563` | Body text |
| `bg-white/85` | White 85% opacity | Section overlays |
| `bg-slate-950/80` | Dark 80% opacity | Dark section overlays |

---

## Font Configuration (tailwind.config.ts)

```typescript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  serif: ['Playfair Display', 'Georgia', 'serif'],
}
```

Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
```

---

## Key Principles

1. **Contrast**: White/light sections use `text-gray-900` headings + `text-gray-600` body
2. **Accent**: Cyan (`text-cyan-600`) for kickers, hover states, and italic accents in headings
3. **Hierarchy**: Serif for headings, sans-serif for body and kickers
4. **Spacing**: Use `hr-cyan` dividers between sections for visual rhythm
5. **Cards**: White cards with `border-cyan-100` and hover effects via `card-title-cyan`
6. **Icons**: Cyan background circles (`bg-cyan-100`) with cyan icons (`text-cyan-600`)

---

## Responsive Breakpoints

- Mobile: Default styles
- md (768px): `text-5xl` headings, 2-col grids
- lg (1024px): `text-6xl` headings, larger spacing

---

## Animation Classes

```css
/* Scroll animation for carousels */
.animate-scroll-right {
  animation: scroll-right 30s linear infinite;
}

@keyframes scroll-right {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```
