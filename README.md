# IRONCORE FITNESS — Premium Gym & Athletic Club Website

> **"BUILD YOUR BODY. MASTER YOUR MIND."**  
> A high-performance, dark-themed gym and fitness website engineered with a modern aesthetic, electric orange accents, and complete client-side functionality.

---

## 🎨 Brand Identity & Design System
- **Primary Background:** Deep Charcoal / Pure Black (`#0B0B0B`)
- **Secondary Surfaces:** Dark Grey (`#141414` / `#181818`)
- **Accent Color:** Electric Orange (`#FF5A1F`) with hover gradients and neon glows
- **Text & Contrast:** Pure White (`#FFFFFF`) with Light Grey secondary body (`#B5B5B5`)
- **Typography:** *Syne* & *Oswald* (Display headings) paired with *Plus Jakarta Sans* (Readable UI)
- **Icons:** Font Awesome 6 Pro Vector Suite

---

## 📂 Multi-Page Architecture

| Page | File | Core Content & Features |
|---|---|---|
| **Home Page** | [`index.html`](file:///C:/Users/kasinathan/.gemini/antigravity/scratch/ironcore-fitness/index.html) | Full-screen dynamic Hero with dark overlay, Animated Statistics counter (2500+ members, 25+ trainers, 12+ years, 15+ programs), About preview, 6 Program cards, Why Choose Us grid, Featured Trainers, 3 Membership Cards (Premium highlighted), Testimonials, BMI & Calorie Calculator widget, High-converting CTA banner, and multi-column Footer. |
| **About Us** | [`about.html`](file:///C:/Users/kasinathan/.gemini/antigravity/scratch/ironcore-fitness/about.html) | 12-Year gym heritage story, Core Pillars (Mission, Vision, Discipline, Inclusivity), 6 Facility Breakdown Zones (Olympic platforms, Cardio Suite, CrossFit Turf, Recovery Sauna, Fuel Bar). |
| **Programs** | [`programs.html`](file:///C:/Users/kasinathan/.gemini/antigravity/scratch/ironcore-fitness/programs.html) | Interactive Category Filter (Strength, Cardio & HIIT, Functional, Yoga, Personal Coaching), In-depth program blueprints, duration, calorie expenditure, key benefits, and direct registration CTAs. |
| **Trainers** | [`trainers.html`](file:///C:/Users/kasinathan/.gemini/antigravity/scratch/ironcore-fitness/trainers.html) | Elite coach roster (CSCS, USAW, ACSM, E-RYT 500, ISSN certified), years of experience, specialized disciplines, social profiles, and "Book Consultation" triggers. |
| **Membership** | [`membership.html`](file:///C:/Users/kasinathan/.gemini/antigravity/scratch/ironcore-fitness/membership.html) | Monthly vs. Annual discount toggle (Save 20%), Basic (₹999), Premium (₹1,999 - Featured), and Elite (₹3,499) plans, Full Side-by-Side Comparison Matrix, and Expandable FAQ Accordion. |
| **Gallery** | [`gallery.html`](file:///C:/Users/kasinathan/.gemini/antigravity/scratch/ironcore-fitness/gallery.html) | Filterable photo gallery (Gym Floor, Cardio, CrossFit Turf, Yoga Studio, Recovery & Spa) with high-res Lightbox modal, previous/next controls, image captions, and keyboard arrow navigation. |
| **Contact Us** | [`contact.html`](file:///C:/Users/kasinathan/.gemini/antigravity/scratch/ironcore-fitness/contact.html) | Interactive enquiry form with real-time validation, address, phone numbers, email, operating hours, dark-themed interactive map embed, and direct WhatsApp concierge integration. |

---

## ⚡ Functional Features Implemented
1. **Dynamic Transparent-to-Frosted Navbar:** Transparent on initial hero view, automatically shifts to frosted dark glass (`backdrop-filter: blur(16px)`) on scroll.
2. **Mobile Slide-Out Drawer:** Responsive off-canvas menu for smartphones and tablets.
3. **Animated Number Counters:** Uses `IntersectionObserver` to trigger count-up animations when the stats section enters the viewport.
4. **Interactive BMI & Caloric Score Calculator:** Real-time formula computation with status indicators (Underweight, Optimal, Overweight, Obese) and dynamic program recommendation.
5. **Universal Join / Free Trial Modal:** Accessible from any page or card. Automatically pre-populates selected plan and workout program.
6. **Form Validation & Local Persistence:** Real-time field validation, animated loading spinner, toast notifications, and `localStorage` mock database for enquiries.
7. **Interactive Billing Switcher:** Dynamically recalculates monthly versus annual pricing with a 20% discount.
8. **Interactive Lightbox:** Full-screen modal for gallery images with Prev, Next, Close, and `ArrowLeft` / `ArrowRight` / `Escape` keyboard shortcuts.
9. **Instant WhatsApp Integration:** Direct links and floating pulse button that format a customized chat greeting to the gym's concierge desk.
10. **Back-to-Top Button:** Floating smooth-scroll button with threshold visibility.

---

## 🚀 How to Run & Preview
You can open any of the HTML files directly in your web browser (Chrome, Edge, Firefox, Safari) by double-clicking them, or host with any static file server:

```powershell
# Recommended: Set this folder as your active workspace in Antigravity
cd "C:\Users\kasinathan\.gemini\antigravity\scratch\ironcore-fitness"

# Open directly in default web browser:
Start-Process "index.html"
```
