# ꦗ Javanese AI Analyzer

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

**Javanese AI Analyzer** is a modern, high-fidelity web application designed to analyze Javanese sentence structures and validate **Urutan Unggah-Ungguh** (politeness levels). Built with cutting-edge web technologies, it provides a premium, "Apple-like" user experience for linguistic analysis.

## ✨ Features

- **Syntax Analysis**: Automatically parses Javanese sentences into Subject (Jejer), Predicate (Wasesa), Object (Lesan), and Description (Katerangan) components using Context-Free Grammar (CFG).
- **Unggah-Ungguh Validation**: Detects and highlights mismatches in politeness levels (e.g., mixing _Krama Inggil_ verbs with _Ngoko_ subjects).
- **Interactive Visualizations**:
  - **Parse Tree**: Visual hierarchical breakdown of sentence structure.
  - **Derivation Trace**: Step-by-step derivation history of the parsing process.
- **Premium UI/UX**:
  - Glassmorphic design with smooth animations (Framer Motion).
  - "Zen Mode" minimalist analyzer interface.
  - Premium smooth scrolling (Lenis).
  - Dynamic "Product Updates" timeline (Changelog).

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Scroll**: [Lenis](https://lenis.studio/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/LearnWithSuryaa/analyzer-app.git
    cd analyzer-app/web
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

1.  Navigate to the **Analyzer** page (`/analyze`).
2.  Type a Javanese sentence (e.g., _"Kula dahar sekul wonten ing griya"_).
3.  Press **Enter** or click the send button.
4.  View the validation results, syntax breakdown, and visualization trees.

## 📂 Project Structure

```
web/
├── app/
│   ├── analyze/       # Analyzer page & logic
│   ├── about/         # About page with team & tech stack
│   ├── changelog/     # Product updates timeline
│   ├── docs/          # Documentation & styling guide
│   └── components/    # Reusable UI components (Navbar, Footer, etc.)
├── components/
│   └── visualizations/# Tree & Derivation graph components
├── data/
│   └── kamus_jawa.json # Dictionary database for analysis
├── lib/
│   └── analyzer.ts    # Core CFG & Validation logic
└── public/            # Static assets (images, logos)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/LearnWithSuryaa">Suryaa</a>
</p>
