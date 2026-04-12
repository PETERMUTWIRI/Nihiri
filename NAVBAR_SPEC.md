# Navbar Specification - New International Hope

## Overview
Fixed dual-layer navbar with:
1. **Top Bar** (cyan background) - Contact info + social links
2. **Main Nav** (white/cream background) - Logo + mega menus + mobile drawer

## Component Structure

```
Navbar (fixed, full-width)
├── TopBar (bg-cyan-600, hidden on scroll)
│   ├── Left: Phone + Email
│   └── Right: Social Icons (Twitter, FB, Insta, LinkedIn, YouTube) + Theme Toggle
├── MainNav (bg-white/95 backdrop-blur)
│   ├── Left: Logo + Site Title
│   ├── Center: Desktop Mega Menu Items
│   └── Right: Contact Link + Donate Button + Mobile Menu Toggle
└── MobileDrawer (slides from right, cyan bg)
    ├── Header: Site Title + Close Button
    ├── Featured Blog Card (optional)
    └── Accordion Menu Items
```

## Visual Specifications

### Top Bar
```
Height: 56px (h-14)
Background: bg-cyan-600 (or bg-cyan-600/95 with backdrop-blur)
Text: text-white
Border: border-b border-white/20

Left Section:
- Phone: FaPhone icon (text-brand-primary/yellow) + "+(203) 675 93 95"
- Email: FaEnvelope icon + "info@nihri.com"

Right Section:
- Social icons: 16px size, hover:text-brand-primary
- Theme Toggle (sun/moon)
```

### Main Nav
```
Height: 80px (h-20)
Background: bg-white/95 backdrop-blur-md
Border: border-b border-gray-200
Position: Fixed below top bar (top-[56px]) or top-0 when scrolled

Logo Area:
- Logo: 48x48px rounded-full image with ring-2 ring-white/50
- Title Structure:
  ```
  <div class="flex flex-col">
    <span class="text-[10px] uppercase tracking-[0.2em] text-cyan-600 font-semibold leading-none mb-0.5">
      New International Hope
    </span>
    <h2 class="font-serif text-2xl font-semibold text-gray-900 tracking-tight">
      Nihri's <span class="italic font-normal text-cyan-600">hope</span>
    </h2>
  </div>
  ```
```

### Desktop Mega Menu
```
Trigger Button:
- Padding: px-6 h-full
- Text: text-black font-extrabold text-base
- Chevron: FaChevronDown, rotates 180deg when open
- Active indicator: Animated underline bar (motion.div with layoutId)

Mega Menu Panel:
- Position: fixed, left-0 right-0, top-full
- Background: bg-white dark:bg-brand-dark-bg
- Shadow: shadow-2xl
- Animation: Height + opacity (AnimatePresence)
- Layout: 4-column grid (3 cols links + 1 col featured)

Menu Item Card:
- Padding: p-2
- Border-left: 4px transparent, hover:border-brand-primary
- Hover: bg-white
- Title: font-sans font-bold text-sm
- Description: text-gray-600 text-xs line-clamp-2
```

### Mobile Drawer
```
Container:
- Width: w-80 (320px)
- Background: bg-cyan-700
- Animation: Slide from right + clipPath circle expand
- Close: X button top-right

Header:
- Same logo/title as desktop
- Close button: FaX, text-white

Menu Structure:
- Accordion style (expand/collapse)
- Section titles: font-sans font-bold text-base
- Chevron: cyan color, rotates on open
- Links: text-white/90 hover:text-cyan-300

Featured Card (optional):
- bg-white/10 rounded-lg
- Shows latest blog post
```

## Key CSS Classes Used

### Typography Classes
```css
/* Site Title Kicker */
text-[10px] uppercase tracking-[0.2em] text-cyan-600 font-semibold

/* Site Title Main */
font-serif text-2xl font-semibold text-gray-900 tracking-tight

/* Site Title Accent */
italic font-normal text-cyan-600

/* Nav Items */
font-extrabold text-base text-black hover:text-brand-primary

/* Mobile Menu Headers */
font-sans font-bold text-base text-white
```

### Layout Classes
```css
/* Top Bar */
bg-cyan-600/95 backdrop-blur-md h-14 px-6 md:px-12

/* Main Nav */
bg-white/95 backdrop-blur-md border-b border-gray-200 h-20 px-6 md:px-12

/* Mega Menu Panel */
fixed left-0 right-0 top-full w-full bg-white shadow-2xl z-50
max-w-7xl mx-auto px-8 py-2 grid grid-cols-4

/* Mobile Drawer */
fixed inset-y-0 right-0 w-80 bg-cyan-700 z-[70]
```

## Animation Specifications

### Scroll Behavior
```typescript
// Top bar hides on scroll down
const scrolledDown = scrollY > 100;

// Main nav moves to top when scrolled
className={`fixed left-0 right-0 z-40 transition-transform duration-300 ${
  scrolledDown ? 'top-0' : 'top-[56px]'
}`}
```

### Mega Menu Animation
```typescript
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
transition={{ duration: 0.35, ease: 'easeOut' }}
```

### Mobile Drawer Animation
```typescript
initial: { x: '100%', clipPath: 'circle(0% at 100% 0)' }
animate: { x: 0, clipPath: 'circle(150% at 100% 0)' }
exit: { x: '100%', clipPath: 'circle(0% at 100% 0)' }
transition: { type: 'spring', stiffness: 300, damping: 40 }
```

### Active Underline Bar
```typescript
<motion.div
  layoutId={`underline-${layoutId}`}
  className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary"
  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
/>
```

## Navigation Items Structure

```typescript
interface NavItemType {
  label: string;
  href: string;
  description: string;
}

const navItems = {
  about: [
    { label: 'About Us', href: '/about', description: '...' },
    { label: 'Our History', href: '/history', description: '...' },
    // ...
  ],
  events: [...],
  programs: [...],
  getInvolved: [...]
};
```

## Color Palette

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Top Bar | bg-cyan-600 | bg-cyan-600 |
| Main Nav | bg-white/95 | bg-brand-dark-bg/95 |
| Site Title | text-gray-900 | text-white |
| Kicker | text-cyan-600 | text-cyan-600 |
| Nav Items | text-black | text-white |
| Menu Hover | bg-white | bg-brand-dark-card |
| Mobile Drawer | bg-cyan-700 | bg-cyan-700 |

## Responsive Breakpoints

- **Desktop (xl+)**: Full mega menus visible
- **Tablet (md-xl)**: Contact link visible, hamburger appears
- **Mobile (<md)**: Only logo, donate button (optional), hamburger

## Dependencies

```typescript
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPhone, FaEnvelope, FaXTwitter, FaFacebookF, 
  FaInstagram, FaLinkedinIn, FaYoutube, 
  FaChevronDown, FaBars, FaX, FaSun, FaMoon 
} from 'react-icons/fa6';
```

## Usage Instructions

1. Create `components/Navbar.tsx`
2. Wrap in layout: `<Navbar />` before `<main>`
3. Add padding to main content to account for fixed navbar:
   ```css
   main { padding-top: 136px; } /* 56px top bar + 80px nav */
   ```
4. For scrolled state, use useScroll hook to detect scroll position

## Files to Create

1. `components/Navbar.tsx` - Main component
2. `hooks/useScroll.ts` - Scroll position detection (optional)
3. Update `app/layout.tsx` - Add Navbar component
4. Update `globals.css` - Ensure backdrop-blur support
