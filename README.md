# DIY Detail Reference App

Professional detailing quick reference for DIY Detail products. Fully offline-capable PWA designed for iPhone home screen add-to-home.

## Features

- **6 Job Types** with complete step-by-step workflows
  - Interior Detail
  - Exterior Detail (Wash, Clay & Seal)
  - Ceramic Coating Prep
  - Paint Correction
  - Odour Treatment
  - Maintenance Wash

- **Product Directory** with search
  - 30+ products from DIY Detail lineup
  - Dilution ratios
  - Application methods
  - Service compatibility

- **Job Checklist Mode**
  - Track progress across steps
  - Persistent state (survives app close)
  - Progress bar visualization

- **Dark Theme** with gold accents (#c8a45a)
  - Mobile-first responsive design
  - Touch-optimized interface
  - PWA-ready for home screen

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Deploy to Vercel

```bash
vercel
```

## Installing on iPhone

1. Open app in Safari
2. Tap Share button (bottom center)
3. Scroll down and tap "Add to Home Screen"
4. Name it "DIY Detail Ref"
5. Tap "Add"

App now appears on home screen and works offline.

## Features

- Service worker caches all assets on first load
- Works completely offline after first visit
- Checklist data persists in browser localStorage
- No API calls or external dependencies
- Designed for professional detailers using DIY Detail products

## Browser Support

- iOS Safari 13.4+ (full PWA support)
- Chrome/Edge (desktop PWA support)
- Firefox (offline support)
- All modern mobile browsers

## Technical Stack

- **Next.js** 14 - React framework
- **Tailwind CSS** - Styling
- **next-pwa** - PWA configuration
- **Lucide React** - Icons
- **localStorage** - Checklist persistence

## License

Private project for Alchemy Detailing.
