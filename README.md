# Javanese Krama Syntax Analyzer

<div align="center">

**Aplikasi web untuk menganalisis sintaksis dan validasi Unggah-Ungguh (tingkat kesopanan) dalam bahasa Jawa Krama.**

[![npm version](https://img.shields.io/npm/v/javanese-analyzer-core.svg)](https://www.npmjs.com/package/javanese-analyzer-core)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LearnWithSuryaa/analyzer-app)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Demo Live](https://javanese-ai.vercel.app) • [Dokumentasi](#-fitur) • [Kontribusi](#-kontribusi)

</div>

---

## 🚀 Quick Start

### Opsi 1: Install Package (Untuk Library Usage)

Install core analyzer sebagai dependency di project Anda:

```bash
npm install javanese-analyzer-core
```

```typescript
import { analyze } from "javanese-analyzer-core";

const result = analyze("Kula nedha sekul");
console.log(result);
```

### Opsi 2: CLI Tool (Recommended - Full App)

Cara tercepat untuk membuat aplikasi lengkap:

```bash
npx create-javanese-analyzer my-app
cd my-app
npm run dev
```

Aplikasi akan berjalan di **http://localhost:3000**

### Opsi 3: Template Repository

Gunakan template tanpa clone history:

```bash
npx degit LearnWithSuryaa/analyzer-app my-app
cd my-app
npm install
npm run dev
```

### Opsi 4: Clone Repository (Untuk Development)

Clone dengan full git history:

```bash
git clone https://github.com/LearnWithSuryaa/analyzer-app.git
cd analyzer-app
npm install
npm run dev
```

### Build Production

```bash
# Build semua workspace
npm run build

# Start production server
npm run start --workspace=web
```

---

## 📦 Struktur Monorepo

```
analyzer-app/
├── packages/
│   └── core/                    # @javanese-ai/core
│       ├── src/
│       │   ├── analyzer.ts      # Parser & Tokenizer
│       │   ├── types.ts         # Type Definitions
│       │   ├── index.ts         # Public API
│       │   └── data/
│       │       └── kamus_jawa.json  # Kamus 1000+ kata
│       ├── package.json
│       └── tsconfig.json
│
└── web/                         # Next.js Application
    ├── app/                     # App Router
    │   ├── page.tsx             # Landing Page
    │   ├── analyze/             # Analyzer Page
    │   ├── docs/                # Documentation
    │   └── globals.css
    ├── components/              # React Components
    │   ├── ChatInput.tsx
    │   ├── ResultSection.tsx
    │   └── visualizations/
    ├── package.json
    └── tailwind.config.js
```

---

## 🛠️ Tech Stack

| Layer          | Technology                    |
| -------------- | ----------------------------- |
| **Core Logic** | TypeScript, Custom CFG Parser |
| **Frontend**   | Next.js 16, React 19          |
| **Styling**    | Tailwind CSS v3               |
| **Animations** | Framer Motion                 |
| **Icons**      | Lucide React                  |
| **Deployment** | Vercel                        |

---

## 📚 Fitur Utama

### ✅ Analisis Sintaksis (S-P-O-K)

- Tokenisasi kata Jawa Krama/Ngoko
- Parsing berbasis Context-Free Grammar (CFG)
- Support kalimat tunggal & majemuk
- Deteksi subjek implisit

### ✅ Validasi Unggah-Ungguh

- Validasi tingkat kesopanan (politeness level)
- Deteksi kesalahan penggunaan Krama Inggil/Lugu
- Saran koreksi otomatis

### ✅ Visualisasi Interaktif

- **Parse Tree**: Visualisasi hierarki sintaksis dengan mode fullscreen
- **Derivation Trace**: Step-by-step leftmost derivation
- **Token Analysis**: Breakdown kata per kata dengan keterangan

### ✅ Fuzzy Matching

- Koreksi typo otomatis menggunakan Levenshtein Distance
- Threshold adaptif berdasarkan panjang kata

---

## 🌐 Deployment ke Vercel

### Opsi 1: Deploy via Dashboard

1. Import repository ke Vercel
2. **Root Directory**: `web`
3. Framework akan auto-detect sebagai Next.js
4. Deploy!

### Opsi 2: Deploy via CLI

```bash
npm install -g vercel
vercel
```

### Konfigurasi (Opsional)

File `vercel.json` sudah dikonfigurasi:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build --workspace=web",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

**Catatan**: Set **Root Directory = `web`** di Vercel Dashboard.

---

## 📖 Dokumentasi API

### Import Package

```typescript
import { analyze } from "javanese-analyzer-core";

const result = analyze("Kula nedha sekul");
console.log(result);
```

### Response Structure

```typescript
{
  tokens: [
    { token: "kula", label: "SUBJEK", keterangan: "pronomina diri sendiri" },
    { token: "nedha", label: "PREDIKAT", keterangan: "verba krama lugu" },
    { token: "sekul", label: "OBJEK_NOUN", keterangan: "tempat / nomina" }
  ],
  analisis: {
    jenis_kalimat: "kalimat tunggal",
    validitas_sintaksis: "VALID",
    validitas_unggah_ungguh: "SESUAI",
    jenis_kesalahan: []
  },
  structure: { /* Parse Tree */ },
  derivations: [ /* Leftmost Derivation Steps */ ]
}
```

Dokumentasi lengkap tersedia di `/docs` setelah aplikasi berjalan.

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Berikut cara berkontribusi:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Development Guidelines

- Gunakan TypeScript untuk type safety
- Follow existing code style
- Tambahkan test untuk fitur baru
- Update dokumentasi jika diperlukan

---

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Surya**

- GitHub: [@LearnWithSuryaa](https://github.com/LearnWithSuryaa)
- Project Link: [https://github.com/LearnWithSuryaa/analyzer-app](https://github.com/LearnWithSuryaa/analyzer-app)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ for preserving Javanese language and culture

</div>
