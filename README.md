# Tulio Abraham Ramírez — Portfolio

> Personal portfolio website built with React, TypeScript, Vite, and Tailwind CSS v4.

## ✨ Features

- **Bilingual (EN / ES)** — Full i18n support with a custom language switcher
- **Custom cursor** — Magnetic cursor with interactive states
- **Smooth scroll navigation** — Animated section transitions
- **Responsive design** — Mobile-first layout with a bottom navigation bar on small screens
- **"Available for Work" badge** — Live status indicator in the navbar
- **Framer Motion animations** — Polished entrance animations across all sections
- **Contact form** — With WhatsApp and Email quick links

## 🛠 Tech Stack

| Category       | Technology                          |
|----------------|-------------------------------------|
| Framework      | React 19                            |
| Language       | TypeScript 5.8                      |
| Build tool     | Vite 6                              |
| Styling        | Tailwind CSS v4 + Vanilla CSS       |
| Animations     | Motion (Framer Motion)              |
| Icons          | Lucide React                        |
| Utilities      | clsx, tailwind-merge                |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18

### Installation

```bash
# Clone the repo
git clone https://github.com/targoos/tulioramirez-portfolio.git
cd tulioramirez-portfolio

# Install dependencies
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable        | Description                            |
|-----------------|----------------------------------------|
| `GEMINI_API_KEY` | Gemini AI API key (optional)          |
| `APP_URL`        | Base URL where the app is hosted      |

### Development

```bash
npm run dev
# → http://localhost:3000
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── CustomCursor.tsx     # Animated custom cursor
│   ├── Navbar.tsx           # Top navbar with lang switcher & status badge
│   └── ProjectCard.tsx      # Project showcase card
├── data/
│   └── constants.ts         # Projects & tech stack data
├── i18n/
│   ├── en.ts                # English translations
│   ├── es.ts                # Spanish translations
│   └── index.tsx            # Language context & useLanguage hook
├── lib/
│   └── utils.ts             # cn() utility helper
├── types/                   # Shared TypeScript types
├── App.tsx                  # Main application layout
├── main.tsx                 # React entry point
└── index.css                # Global styles & design tokens
```

## 📜 Available Scripts

| Script          | Description                         |
|-----------------|-------------------------------------|
| `npm run dev`   | Start dev server on port 3000       |
| `npm run build` | Build production bundle             |
| `npm run preview` | Preview the production build      |
| `npm run lint`  | TypeScript type-check (no emit)     |
| `npm run clean` | Remove `dist/` folder               |

## 📬 Contact

- **Email**: tulioramirez0119@gmail.com

---

© 2025 Tulio Abraham Ramírez. All rights reserved.
