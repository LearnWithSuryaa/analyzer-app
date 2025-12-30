# javanese-analyzer-core

[![npm version](https://img.shields.io/npm/v/javanese-analyzer-core.svg)](https://www.npmjs.com/package/javanese-analyzer-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Javanese Krama syntax analyzer with Unggah-Ungguh (politeness level) validation**

A TypeScript library for analyzing Javanese language sentences, validating syntax structure (S-P-O-K), and checking politeness levels (Unggah-Ungguh) compliance.

## 🚀 Installation

```bash
npm install javanese-analyzer-core
```

## 📖 Quick Start

```typescript
import { analyze } from "javanese-analyzer-core";

const result = analyze("Kula nedha sekul");

console.log(result);
// {
//   tokens: [
//     { token: "kula", label: "SUBJEK", keterangan: "pronomina diri sendiri" },
//     { token: "nedha", label: "PREDIKAT", keterangan: "verba krama lugu" },
//     { token: "sekul", label: "OBJEK_NOUN", keterangan: "nomina" }
//   ],
//   analisis: {
//     jenis_kalimat: "kalimat tunggal",
//     validitas_sintaksis: "VALID",
//     validitas_unggah_ungguh: "SESUAI"
//   },
//   structure: { /* Parse Tree */ },
//   derivations: [ /* Derivation Steps */ ]
// }
```

## ✨ Features

### ✅ Syntax Analysis (S-P-O-K)

- Tokenization of Javanese Krama/Ngoko words
- Context-Free Grammar (CFG) based parsing
- Support for simple and compound sentences
- Implicit subject detection

### ✅ Unggah-Ungguh Validation

- Politeness level validation
- Detection of Krama Inggil/Lugu usage errors
- Automatic correction suggestions

### ✅ Visualizations

- **Parse Tree**: Hierarchical syntax structure
- **Derivation Trace**: Step-by-step leftmost derivation
- **Token Analysis**: Word-by-word breakdown with annotations

### ✅ Fuzzy Matching

- Automatic typo correction using Levenshtein Distance
- Adaptive threshold based on word length

## 📚 API Reference

### `analyze(sentence: string): AnalysisResult`

Analyzes a Javanese sentence and returns comprehensive results.

**Parameters:**

- `sentence` (string): Javanese sentence to analyze

**Returns:** `AnalysisResult` object containing:

- `tokens`: Array of tokenized words with labels
- `analisis`: Syntax and Unggah-Ungguh validation results
- `structure`: Parse tree structure
- `derivations`: Leftmost derivation steps

### Type Definitions

```typescript
interface AnalysisResult {
  tokens: Token[];
  analisis: {
    jenis_kalimat: string;
    validitas_sintaksis: "VALID" | "TIDAK VALID";
    validitas_unggah_ungguh: "SESUAI" | "TIDAK SESUAI";
    jenis_kesalahan?: string[];
    kalimat_terkoreksi?: string;
    penjelasan?: string;
  };
  structure: ParseNode;
  derivations: string[];
}

interface Token {
  token: string;
  label: string;
  keterangan: string;
}
```

## 🌐 Full Application

For a complete web application with interactive UI, check out:

```bash
npx create-javanese-analyzer my-app
cd my-app
npm run dev
```

Or visit the live demo: [https://javanese-ai.vercel.app](https://javanese-ai.vercel.app)

## 📦 Dictionary

The package includes a comprehensive dictionary of 1000+ Javanese words with:

- Word classifications (nouns, verbs, pronouns, etc.)
- Politeness levels (Krama Inggil, Krama Lugu, Ngoko)
- Subject classifications (SELF, HONORED, NEUTRAL)

## 🤝 Contributing

Contributions are welcome! Please visit the [main repository](https://github.com/LearnWithSuryaa/analyzer-app) for contribution guidelines.

## 📄 License

MIT © [Surya](https://github.com/LearnWithSuryaa)

## 🔗 Links

- [Documentation](https://javanese-ai.vercel.app/docs)
- [GitHub Repository](https://github.com/LearnWithSuryaa/analyzer-app)
- [Report Issues](https://github.com/LearnWithSuryaa/analyzer-app/issues)
- [Live Demo](https://javanese-ai.vercel.app)

---

Made with ❤️ for preserving Javanese language and culture
