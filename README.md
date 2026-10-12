# Panachyow — Portfolio

> 1-to-1 high-fidelity reproduction of [panachyow.framer.website](https://panachyow.framer.website/).

Built with React 19, TypeScript, Tailwind CSS, and Vite. Designed to look and feel identical across all viewport resolutions (Desktop, Tablet, Mobile) with high typographic fidelity, authentic brand assets, and interactive hover states.

---

## ⚡ Features

- **Pixel-Exact Layout**: Strict adherence to the 390px content grid and responsive viewport rules matching the original Framer design.
- **Dynamic Clock & Date**: Live real-time clock (`DD/MM/YYYY` and `hh:mma`) updating every second.
- **Brand Identity**: Original SVG wordmark logo on `#FF0009` red background.
- **Media Asset**: Direct integration of the video loop with fallback poster and auto-play attributes.
- **Typography & Font Pairing**:
  - `Gambetta` (500) serif with red marker hover states for links.
  - `Helvetica` (700 bold, `-0.03em` tracking) for structured body and experience items.
  - `Courier New` monospace (`-0.06em` tracking) for the date/time header.
- **Fully Responsive**:
  - **Desktop (1440px+)**: Centered container with 24px padding.
  - **Tablet (810px - 1439px)**: Proportional centering with 32px vertical rhythm.
  - **Mobile (< 810px)**: Fluid container with responsive padding and mobile-safe bottom clearance.

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

---

## 📦 Publishing to GitHub

To push this repository to your GitHub account:

```bash
git remote add origin https://github.com/<YOUR-USERNAME>/panachyow-portfolio.git
git branch -M main
git push -u origin main
```
