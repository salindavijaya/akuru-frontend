# Akuru Frontend — අකුරු

Mobile-first React web app for the Sinhala OCR API. Fully bilingual (English/Sinhala), camera-ready, PWA-enabled.

---

## Features

- **Bilingual UI** — seamless English ⇄ Sinhala toggle, all strings translated
- **Mobile-first** — camera capture, thumb-friendly buttons (52px touch targets), responsive throughout
- **Live polling** — React Query polls job status every 3s until completion
- **PWA-ready** — manifest.json for "Add to Home Screen" on Android/iOS
- **Dark mode only** — warm charcoal + amber gold color scheme (palm-leaf manuscript aesthetic)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| State | React Query (server state) + Context API (auth, lang, toast) |
| Styling | Tailwind CSS 3.4 |
| Icons | Lucide React |
| Fonts | Google Fonts: Fraunces (display), DM Sans (body), Noto Sans Sinhala |

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (proxies API to localhost:3000)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

The app will be available at `http://localhost:5173`.

**Important:** The backend API must be running on `http://localhost:3000` for the proxy to work. If your backend is elsewhere, update `vite.config.js`:

```js
server: {
  proxy: {
    '/api': {
      target: 'http://your-backend-url:3000',
      changeOrigin: true,
    },
  },
}
```

---

## Environment Variables

Create `.env.local` (gitignored) if you need custom config:

```bash
# API base URL (when not using Vite proxy)
VITE_API_URL=https://api.akuru.example.com
```

---

## Project Structure

```
src/
├── api/              # Axios client + API call functions
│   ├── client.js     # Base axios instance with JWT interceptor
│   ├── auth.js       # register, login, API keys
│   └── jobs.js       # transcribe, getJob, listJobs
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── FileDropzone.jsx    # Camera + drag-drop upload
│   ├── JobCard.jsx
│   ├── StatusBadge.jsx
│   ├── Spinner.jsx
│   └── ProtectedRoute.jsx  # Auth guard wrapper
├── contexts/         # Global state providers
│   ├── AuthContext.jsx     # user, login(), logout()
│   ├── LangContext.jsx     # locale, t(), toggle()
│   └── ToastContext.jsx    # toast.success/error/info
├── hooks/
│   └── useJobPoller.js     # React Query polling hook
├── pages/            # Route-level components
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx   # Upload + job history
│   ├── JobResultPage.jsx   # Live status + extracted text + downloads
│   └── SettingsPage.jsx    # Profile + API keys + language toggle
├── utils/
│   ├── i18n.js             # 80+ translation keys (en/si)
│   └── token.js            # JWT localStorage helpers
├── index.css         # Tailwind + global styles
└── main.jsx          # App entry with all providers
```

---

## Translation Keys

All user-facing strings are in `src/utils/i18n.js`. To add a new string:

```js
// utils/i18n.js
export const translations = {
  'my.new.key': { en: 'Hello', si: 'ආයුබෝවන්' },
  // ...
}

// In your component
import { useLang } from '../contexts/LangContext'
const { t } = useLang()
return <p>{t('my.new.key')}</p>
```

---

## Deployment

### Docker (Production)

```bash
# Build production image
docker build -t akuru-frontend .

# Run container
docker run -p 80:80 akuru-frontend
```

The Dockerfile is multi-stage:
1. **Builder** — `npm run build` inside Node 20 Alpine
2. **Production** — nginx Alpine serving `/dist`, gzipped assets, SPA routing

### Deploy to Vercel / Netlify

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set build command: `npm run build`  
Set output directory: `dist`

For API routing, add a `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://your-backend-api.com/api/:path*" }
  ]
}
```

---

## Design System Tokens

From `tailwind.config.js`:

| Token | Value | Usage |
|---|---|---|
| `ink-900` | `#1a1712` | Main background |
| `ink-800` | `#26221a` | Card backgrounds |
| `ink-700` | `#332d22` | Borders, hover states |
| `gold-400` | `#e8be55` | Primary CTA hover |
| `gold-500` | `#d4a017` | Primary CTA base |
| `cream-100` | `#f8f1e0` | Primary text |
| `cream-300` | `#e4d0a0` | Secondary text |
| `leaf-400` | `#7ab87a` | Success states |
| `ember-400` | `#e07855` | Error states |

**Font stack:**
- Display: `Fraunces` (serif, for headings)
- Body: `DM Sans` (sans-serif)
- Sinhala: `Noto Sans Sinhala`
- Mono: `JetBrains Mono` (API keys)

---

## Mobile Optimizations

1. **Camera capture** — `<input capture="environment">` triggers rear camera on mobile
2. **Touch targets** — All buttons min 48×48px (iOS guideline), most are 52px
3. **Viewport units** — Uses `dvh` (dynamic viewport height) to account for mobile browser chrome
4. **Tap highlight** — Disabled via CSS to avoid blue flash on tap
5. **Focus styles** — 2px gold outline on `:focus-visible`, 3px offset
6. **Toast positioning** — Fixed bottom (thumb zone), max-width 420px, centered

---

## PWA Setup

The app includes:
- `manifest.json` — defines app name, icons, theme color
- Service worker support ready (add `vite-plugin-pwa` for offline caching)

To enable full PWA capabilities:

```bash
npm install vite-plugin-pwa -D
```

Then in `vite.config.js`:

```js
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-*.png'],
      manifest: {
        // reads from public/manifest.json
      },
    }),
  ],
})
```

---

## Accessibility

- Semantic HTML throughout (`<main>`, `<nav>`, `<section>`)
- ARIA labels on icon-only buttons
- `aria-live="polite"` on toast container
- Keyboard navigation support (Enter/Escape handlers where needed)
- Focus trap inside modals (API key creation)
- Color contrast ratios meet WCAG AA (checked via axe DevTools)

---

## Performance

Production build metrics:
- **JS bundle:** 306KB (96KB gzipped)
- **CSS:** 25KB (5.4KB gzipped)
- **Initial load:** ~100KB transferred (gzipped)
- **Code splitting:** Automatic via Vite (React Router lazy loading ready)
- **Asset caching:** 1 year via nginx headers on static files

---

## Known Limitations

1. **PDF rendering** — Backend generates PDFs using standard fonts (no embedded Sinhala glyphs). Users need a Sinhala-capable PDF viewer or local Noto Sans Sinhala font installed. Phase 2 will embed fonts via `pdf-lib` + `fontkit`.
2. **No offline mode** — PWA manifest exists, but no service worker yet. Add `vite-plugin-pwa` to cache API responses for offline viewing of completed jobs.
3. **API key display** — Shown once, never again. Users who lose keys must revoke and create new ones.

---

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Follow the existing code style (Prettier + ESLint config TBD)
4. Test in both English and Sinhala
5. Test on mobile viewport (Chrome DevTools → iPhone SE 375px)
6. Submit a PR

---

## License

Same as backend — proprietary / commercial. Contact the founder for licensing.
