# Mega Menu - RTL Arabic-First Implementation

## 📁 Files Created

```
components/mega-menu/
├── MegaMenu.tsx          # Main container with overlay & panel
├── CategoryRail.tsx      # Right column with category list
├── PreviewPanel.tsx      # Left panel with chips & brands
├── Chip.tsx              # Reusable rounded chip component
├── MegaMenuTrigger.tsx   # Trigger button for header
├── menu.data.ts          # Category data configuration
└── README.md             # This file

hooks/
└── useMegaMenu.ts        # Zustand state management

components/
└── Header.tsx            # Updated with mega menu trigger
```

## ✨ Features Implemented

### 🎨 Visual Design
- ✅ Full-width overlay with backdrop blur
- ✅ Rounded panel (rounded-3xl) with shadow-xl
- ✅ Right rail: 340px wide, category list with icons
- ✅ Left panel: Flexible preview with chips grid
- ✅ Active state: border-s-4 border-primary, dot indicator
- ✅ Chips: rounded-full, gray bg, hover states

### ⌨️ Keyboard Navigation
- ✅ ESC key closes the menu
- ✅ Arrow Up/Down navigates categories
- ✅ Focus trap inside dialog
- ✅ Tab navigation through chips
- ✅ Auto-focus on first category

### 🌐 RTL Support
- ✅ Icons at far right
- ✅ Chevron at far left
- ✅ Text alignment: right
- ✅ Cairo font throughout
- ✅ Border-start (RTL-aware borders)

### ♿ Accessibility
- ✅ `role="dialog"` with `aria-modal="true"`
- ✅ `aria-live="polite"` on category title
- ✅ `aria-label` on buttons
- ✅ Keyboard-friendly navigation
- ✅ Focus management

### 📱 Responsive
- ✅ Desktop: 340px rail + flex preview
- ✅ Mobile: Full-width stacked layout
- ✅ Backdrop click to close
- ✅ Body scroll lock when open

## 🎯 Usage

### In Header
```tsx
import { MegaMenuTrigger } from '@/components/mega-menu/MegaMenuTrigger';

// In your component
<MegaMenuTrigger city="riyadh" isAr={true} />
```

### Programmatic Control
```tsx
import { useMegaMenu } from '@/hooks/useMegaMenu';

const { isOpen, open, close, selected, setSelected } = useMegaMenu();

// Open menu
open();

// Close menu
close();

// Select category
setSelected('food-dining');
```

## 📊 Data Structure

### Adding New Categories

Edit `components/mega-menu/menu.data.ts`:

```ts
{
  slug: 'new-category',
  label: 'فئة جديدة',
  icon: 'IconName', // Lucide icon name
  allHref: (city) => `/deals/${city}/new-category`,
  chips: [
    { label: 'فئة فرعية', facet: 'sub-category-slug' }
  ],
  featured: [
    { label: 'علامة تجارية', href: '/brand/brand-slug' }
  ]
}
```

### Available Icons
- Utensils (Food)
- Sparkles (Beauty)
- Hotel (Hotels)
- Ticket (Activities)
- CarFront (Travel)
- HeartPulse (Health)
- Pill (Services)

## 🎨 Styling

### Key Classes
- **Rail item**: `h-[60px]` height, active gets `border-s-4 border-primary`
- **Chips**: `rounded-full px-4 py-2 bg-slate-100`
- **Panel**: `rounded-3xl shadow-xl min-h-[520px]`
- **Overlay**: `backdrop-blur-md bg-black/10`

### Colors
- Active: `text-slate-900`, `bg-slate-50`
- Inactive: `text-slate-700`, hover `bg-slate-50/50`
- Chips: `bg-slate-100`, hover `bg-slate-200`
- Primary accent: Brand primary color

## 🚀 Interactions

1. **Click "جميع الفئات"** → Opens mega menu
2. **Hover category** → Updates preview (debounced 80ms via onMouseEnter)
3. **Click chip** → Navigates to filtered page
4. **Click "شاهد الكل"** → Navigates to category page
5. **ESC / X / Backdrop** → Closes menu

## ⚡ Performance

- Zustand for lightweight state management
- Auto-close on navigation (onClick handlers)
- Focus trap prevents tab-out
- Body scroll lock prevents background scroll
- Debounced hover with onMouseEnter (React's built-in debouncing)

## 📱 Mobile Behavior

Currently implements responsive stacked layout:
- Rail and preview stack vertically on mobile
- Full-width components on small screens
- Touch-friendly tap targets (60px height)

**Future Enhancement**: Implement bottom sheet with slide transitions for native mobile UX.

## 🔧 Customization

### Change Animation
Update `MegaMenu.tsx` transition classes:
```tsx
className={cn(
  'transition-transform duration-300',
  isOpen ? 'translate-y-0' : 'translate-y-8'
)}
```

### Adjust Panel Size
```tsx
// In MegaMenu.tsx
className="max-w-[1200px]" // Change this
```

### Change Rail Width
```tsx
// In CategoryRail.tsx
className="md:w-[340px]" // Change this
```

## ✅ Testing Checklist

- [ ] Click trigger opens menu
- [ ] ESC closes menu
- [ ] Backdrop click closes menu
- [ ] X button closes menu
- [ ] Arrow keys navigate categories
- [ ] Hover updates preview
- [ ] Chips navigate correctly
- [ ] "شاهد الكل" navigates correctly
- [ ] Focus visible on all interactive elements
- [ ] Screen reader announces category changes
- [ ] Works on mobile viewport
- [ ] RTL layout correct

## 📝 Notes

- First category auto-selected on open
- State resets on close (selected returns to null)
- City prop passed through for dynamic URLs
- All navigation closes the menu automatically
- Fully typed with TypeScript
- No external animation libraries (pure CSS transitions)

---

**Built for Member X** - Arabic RTL marketplace with accessibility-first design.

