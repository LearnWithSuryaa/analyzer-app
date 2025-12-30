# Javanese Krama Syntax Analyzer

Aplikasi web untuk menganalisis sintaksis dan validasi Unggah-Ungguh (tingkat kesopanan) dalam bahasa Jawa Krama.

## 🚀 Instalasi Lokal

```bash
# Clone repository
git clone https://github.com/LearnWithSuryaa/analyzer-app.git
cd analyzer-app

# Install dependencies (akan otomatis link workspace @javanese-ai/core)
npm install

# Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📦 Struktur Monorepo

```
analyzer-app/
├── packages/
│   └── core/              # @javanese-ai/core - Logika parser & kamus
│       ├── src/
│       │   ├── analyzer.ts
│       │   ├── types.ts
│       │   └── data/
│       │       └── kamus_jawa.json
│       └── package.json
└── web/                   # Aplikasi Next.js
    ├── app/
    ├── components/
    └── package.json
```

## 🌐 Deployment ke Vercel

### Pengaturan Project di Vercel Dashboard:

1. **Root Directory**: Biarkan kosong (gunakan root `/`)
2. **Framework Preset**: Next.js
3. **Build Command**: `cd web && npm run build`
4. **Output Directory**: `web/.next`
5. **Install Command**: `npm install`

### Atau gunakan `vercel.json`:

File `vercel.json` sudah dikonfigurasi untuk monorepo. Vercel akan otomatis membaca konfigurasi ini.

## 🛠️ Tech Stack

- **Core**: TypeScript, Custom CFG Parser
- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📚 Fitur

- ✅ Tokenisasi kata Jawa Krama/Ngoko
- ✅ Parsing sintaksis (S-P-O-K)
- ✅ Validasi Unggah-Ungguh (politeness level)
- ✅ Visualisasi Parse Tree interaktif
- ✅ Derivasi Left-most step-by-step
- ✅ Fuzzy matching untuk koreksi typo
- ✅ Support kalimat majemuk & subjek implisit

## 📖 Dokumentasi

Dokumentasi lengkap tersedia di `/docs` setelah aplikasi berjalan.

## 🤝 Kontribusi

Contributions are welcome! Silakan buat issue atau pull request.

## 📄 Lisensi

MIT License
