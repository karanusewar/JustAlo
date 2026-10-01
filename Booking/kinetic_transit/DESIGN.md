---
name: Kinetic Transit
colors:
  surface: '#fcf8f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#3c494a'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#6c7a7a'
  outline-variant: '#bbc9ca'
  surface-tint: '#00696e'
  primary: '#00696e'
  on-primary: '#ffffff'
  primary-container: '#00c2cb'
  on-primary-container: '#004a4e'
  inverse-primary: '#3edae3'
  secondary: '#bc0008'
  on-secondary: '#ffffff'
  secondary-container: '#ea000d'
  on-secondary-container: '#fffbff'
  tertiary: '#006d33'
  on-tertiary: '#ffffff'
  tertiary-container: '#42c76f'
  on-tertiary-container: '#004e22'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6bf6ff'
  primary-fixed-dim: '#3edae3'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4a9'
  on-secondary-fixed: '#410001'
  on-secondary-fixed-variant: '#930004'
  tertiary-fixed: '#7bfc9d'
  tertiary-fixed-dim: '#5ddf83'
  on-tertiary-fixed: '#00210b'
  on-tertiary-fixed-variant: '#005225'
  background: '#fcf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Outfit
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a high-frequency, utility-first digital marketplace for intercity and hyper-local transit, vehicle hire, and parcel logistics. The brand ethos captures the dynamic pulse of modern Indian transit platforms—pragmatic, hyper-legible under harsh sunlight, fast-loading, and reassuringly transactional.

The aesthetic fuses **Modern Clean Utility** with **Kinetic Commerce**:
- **Clarity over ornamentation:** Crisp dividers, clear typographic hierarchy, and structural white space ensure users can book trips, track couriers, and compare vehicle types in seconds.
- **Micro-moments of delight:** Energetic teal anchors primary navigation and action states, while calculated pops of crimson ignite critical purchase decisions, urgent departure alerts, and live tracking points.
- **Affordance & Trust:** Sturdy container cards, explicit route progress nodes, and readable pill badges establish confidence across diverse age groups and digital literacy levels.

## Colors

The palette balances energetic mobility tones with functional state signaling:

- **Primary Teal (`#00C2CB`):** The operational core. Used for brand touchpoints, primary search triggers, active route paths, toggle fills, and key interface transitions. 
- **Accent Red (`#FE1617`):** The transactional catalyst. Reserved for final booking conversions, seat lock countdowns, live bus tracking beacons, critical alerts, and time-sensitive discounts.
- **Functional Tertiary Green (`#1FAE59`):** Represents confirmation, confirmed seat allocations, parcel pickup status, and positive transit milestones.
- **Warning Amber (`#FFA726`):** Signals low seat availability, minor boarding delays, and pending parcel authentications.
- **Ink Neutral (`#0A0A0A`):** The primary text value, delivering maximum WCAG AAA contrast across bright mobile viewports.
- **Subtle Surfaces (`#FAFAFA` and `#FFFFFF`):** The foundation. `#FFFFFF` serves as elevated card modules and modal backgrounds; `#FAFAFA` establishes ambient depth for canvas backdrops and recessed form fields.
- **Border Inks (`#E5E7EB`):** Crisp 1px separators defining card perimeters, fare breakdown partitions, and route step timelines.

## Typography

The typographic engine marries geometric presence (`Outfit`) with dense, high-legibility transactional text (`Inter`).

- **Display & Headlines (`Outfit`):** Geometric, rhythmic, and welcoming. Applied to trip origin/destination banners, service selection headers (Bus, Rentals, Parcel), and hero promotional deals.
- **Body & Data Grid (`Inter`):** Clean, neutral, and structurally precise. Handles dense vehicle manifests, fare itemizations, estimated arrival times, and luggage constraint disclaimers.
- **Numerical Stacking:** For departure times, currency figures, and tracking IDs, tabular numbers (`tnum`) in `Inter` should be enabled via OpenType features to preserve spatial alignment across list layouts.

## Layout & Spacing

A structured fluid layout system engineered for high-density consumer interactions:

- **Grid Architecture:** 
  - **Mobile (< 768px):** 4 columns with `margin-mobile` (16px) and `gutter-mobile` (12px). Ensures thumb-reachable booking flows and compact card scanning.
  - **Tablet (768px – 1024px):** 8 columns with 24px margins and 16px gutters.
  - **Desktop (> 1024px):** 12 columns with a fixed container max-width of 1200px, centering transit search forms, comparison grids, and fleet selection drawers.
- **Vertical Rhythm:** Multiples of 4px and 8px govern card interiors, timeline milestones, and input paddings. Micro gaps (`space-xs`) group departure times with labels; component paddings (`space-md` to `space-lg`) shield interactive zones from accidental taps.

## Elevation & Depth

Visual hierarchy uses a refined hybrid of **low-contrast borders** and **ambient drop shadows**:

- **Canvas Level (Ground):** `#FAFAFA` foundation; recessed tracking panels and inactive seat maps use flat surfaces without elevation.
- **Surface Level 1 (Listing Cards & Chips):** `#FFFFFF` with a crisp `1px solid #E5E7EB` border and an ambient shadow: `0px 2px 8px -2px rgba(10, 10, 10, 0.04)`.
- **Surface Level 2 (Selected Trip Cards & Dropdowns):** Elevated with a subtle teal outline glow: `0px 8px 16px -4px rgba(0, 194, 203, 0.12), 0px 2px 4px -1px rgba(10, 10, 10, 0.06)`.
- **Surface Level 3 (Sticky Booking Bars & Modals):** Grounded at viewport edges with heavy ambient dispersion: `0px -4px 20px rgba(10, 10, 10, 0.08)`.

## Shapes

The interface adopts a deliberate, rounded geometry that balances friendly consumer mobility with structural rigor:

- **Base Radius (`0.5rem` / 8px):** Applied to input fields, list tiles, route map overlays, and modal containers.
- **Medium Radius (`1rem` / 16px):** Standard for primary cards, bus seat layout containers, and vehicle category cards.
- **Full Pill (`9999px`):** Reserved exclusively for status indicators, fast filter chips (e.g., "AC Sleeper", "Instant Drop", "Driver Included"), and floating quick-action pills.

## Components

### Buttons
- **Primary Action (Book / Pay Now):** Filled Accent Red (`#FE1617`) with white text and `label-lg` styling. Height: 48px on mobile, 44px on desktop. 8px border radius.
- **Secondary Action (Search / Filter):** Filled Primary Teal (`#00C2CB`) with dark ink text (`#0A0A0A`) for daytime visual punch.
- **Tertiary / Outline:** White surface with 1px border (`#E5E7EB`), active hover transitioning to Teal-tinted background (`rgba(0, 194, 203, 0.06)`).

### Chips & Filter Pills
- Fully rounded (`9999px`), 32px height, 12px horizontal padding.
- Inactive: `#FFFFFF` surface with `#E5E7EB` border, `#0A0A0A` text (`body-sm`).
- Active: `#00C2CB` fill, `#0A0A0A` text, no border.
- Critical Count/Urgency Chips (e.g., "Only 2 Seats Left"): `#FE1617` background with `#FFFFFF` text.

### Trip & Fleet Cards
- Container: `#FFFFFF` background, 16px border radius, 1px border (`#E5E7EB`).
- Top Bar: Operator/Vehicle identity on the left, price highlighted in bold display font on the right.
- Center Section: Visual route track—departure time, duration pill in the center, and arrival time. Linear progress dots mark transit duration.
- Bottom Amenities: Micro-badges (`space-xs` padding) displaying AC, WiFi, Charging Points, or Delivery Insurance tags.

### Inputs & Date Selectors
- Height: 52px for easy touch targeting.
- Style: `#FAFAFA` base, transitioning to `#FFFFFF` on focus with a 2px `#00C2CB` border ring.
- Location Swapper: Central circular button (36px diameter) floating between Source and Destination inputs.

### Checkboxes & Seat Selectors
- Seat Grid: Sleeper and seater icons inside an interactive canvas.
- Available: `#FFFFFF` with `#E5E7EB` border.
- Selected: `#00C2CB` fill with white checkmark.
- Booked: `#F3F4F6` fill with inactive diagonal hash lines.
- Women-Only Reserved: Soft magenta outline with distinct legend indicator.

### Parcel Status Timeline
- Vertical or horizontal path with 12px status nodes. Completed legs filled in `#1FAE59`, active leg pulsed in `#00C2CB`, remaining legs in `#E5E7EB`.