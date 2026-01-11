
## Deployed link to the project 
https://comparisonui.vercel.app/

# Product Comparison UI

A modern, responsive product comparison application built with React, Vite, and Tailwind CSS. Users can browse products, select up to 3 items for comparison, and view detailed side-by-side specifications.

## 🚀 Features

### Product Gallery

- **Responsive Grid Layout**: 4 columns on desktop, 3 on large tablets, 2 on tablets, 1 on mobile
- **Product Cards**: Display product image, brand, name, price, and key features
- **Hover Animations**: Smooth image zoom and shadow effects on hover
- **Selection Indicator**: Green checkmark and border when product is selected

### Product Comparison

- **Select Up to 3 Products**: Maximum of 3 products can be compared at once
- **Compare Bar**: Floating bottom bar appears when 2+ products are selected
  - Shows selected product thumbnails
  - Quick remove button for each product
  - Empty slots indicating available selection spots
  - "Compare Now" button to open comparison view
- **Side-by-Side Comparison View**:
  - Product headers with images, names, brands, and prices
  - Specification comparison table (Display, Battery, Storage, Camera, Processor, RAM)
  - **Difference Highlighting**: Rows with different values are highlighted in amber/yellow
  - Key features section for each product
  - Remove products directly from comparison view

### Mobile-Optimized Comparison

- **Tabbed Card View**: Swipe/tap between products on mobile
- **Full Product Details**: See all specs for one product at a time
- **Visual Indicators**: "Varies" badges on specs that differ
- **Keyboard Navigation**: Arrow keys to switch between products

### Search & Filter

- **Search Bar**: Search products by name, brand, or features
- **Brand Filter**: Dropdown to filter products by brand
- **Results Count**: Shows filtered count vs total products
- **Empty State**: Friendly message with "Clear Filters" button

### Data Persistence

- **localStorage Integration**: Selected products persist across page reloads
- **Theme Persistence**: Dark/light mode preference is saved

### Accessibility

- **Keyboard Navigation**: Full keyboard support for product selection
  - Tab to navigate between products
  - Enter/Space to toggle selection
  - Escape to close comparison modal
  - Arrow keys for mobile tab navigation
- **Focus Indicators**: Visible focus rings on all interactive elements
- **ARIA Labels**: Proper accessibility attributes throughout
- **Screen Reader Support**: Meaningful labels and roles

### Dark Mode

- **Theme Toggle**: Sun/moon icon button in top-right corner
- **System Preference**: Defaults to system color scheme preference
- **Full Theme Support**: All components support both light and dark themes
- **Smooth Transitions**: Animated color transitions when switching themes

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Hitesh-gurnani/comparisonui.git

# Navigate to project directory
cd comparison-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏃 Running the App

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎯 Assumptions Made

### Product Data

1. **Static Data**: Products are stored as static JavaScript objects, not fetched from an API
2. **Image Sources**: Product images are from Unsplash (external URLs)
3. **Spec Categories**: All products have the same 6 specification fields (display, battery, storage, camera, processor, RAM)
4. **N/A Values**: Products without certain specs use "N/A" as a placeholder

### Comparison Logic

1. **Maximum 3 Products**: The comparison limit of 3 products is hardcoded based on UX best practices for side-by-side comparison
2. **Minimum 2 Products**: Comparison view requires at least 2 products to be meaningful
3. **Same Category**: All products are tech products and share the same specification fields (no dynamic spec handling)

### UI/UX Decisions

1. **Desktop-First Design**: The side-by-side table is optimized for desktop, with a different mobile experience
2. **Mobile Tab View**: On mobile, users see one product at a time with tabs, rather than a cramped table
3. **Difference Highlighting**: Only highlighting "differs" vs "same" - no "better/worse" logic as that's subjective for text specs
4. **Amber Color for Differences**: Amber/yellow was chosen as a neutral attention color that works in both light/dark modes

### Browser Support

1. **Modern Browsers**: Targeting modern browsers with CSS features like `backdrop-blur`, CSS Grid, and `gap`
2. **localStorage Available**: Assumes localStorage is available and not blocked
3. **JavaScript Required**: No server-side rendering or progressive enhancement

### Accessibility

1. **Color Not Sole Indicator**: Differences use both color AND text badges ("Differs", "Varies")
2. **Keyboard Users**: Assumed users may navigate entirely by keyboard
3. **Screen Readers**: Basic ARIA support provided, but not extensively tested with screen readers

### Performance

1. **No Virtualization**: All 8 products render at once (suitable for small catalogs)
2. **No Image Optimization**: External Unsplash images are used directly without lazy loading
3. **No Code Splitting**: All components load together (acceptable for this app size)

## 🎨 Design Decisions

- **Emerald Green**: Primary accent color for selected states and CTAs
- **Gray Palette**: Neutral grays for backgrounds and text in both themes
- **Amber Highlights**: Attention color for differences in comparison
- **Rounded Corners**: Consistent `rounded-xl` and `rounded-2xl` for modern feel
- **Feather Icons**: Clean, minimal icon style that matches the overall aesthetic

## 📱 Responsive Breakpoints

| Breakpoint    | Screen Width    | Layout                         |
| ------------- | --------------- | ------------------------------ |
| Mobile        | < 640px         | 1 column, tab-based comparison |
| Tablet        | 640px - 1023px  | 2 columns                      |
| Desktop       | 1024px - 1279px | 3 columns                      |
| Large Desktop | ≥ 1280px        | 4 columns                      |

## 🔑 Keyboard Shortcuts

| Shortcut          | Action                           |
| ----------------- | -------------------------------- |
| `⌘K` / `Ctrl+K`   | Focus search bar                 |
| `Tab`             | Navigate between products        |
| `Enter` / `Space` | Toggle product selection         |
| `Escape`          | Close comparison modal           |
| `←` / `→`         | Switch tabs in mobile comparison |

## 📄 License

MIT License - feel free to use this project for learning or as a starting point for your own comparison UI.

---

Built with ❤️ using React + Vite + Tailwind CSS

