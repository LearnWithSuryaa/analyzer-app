"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenize = tokenize;
exports.analyzeSentence = analyzeSentence;
const kamus_jawa_json_1 = __importDefault(require("./data/kamus_jawa.json"));
// === MEMUAT KOSAKATA ===
const SEMANTIC_MAP = {};
const MEANING_MAP = {};
const WORD_PAIRS = {};
const PATTERNS = [];
const groups = [
    ["SUBJEK", "SUBJEK"],
    ["PREDIKAT", "PREDIKAT"],
    ["OBJEK_NOUN", "OBJEK_NOUN"],
    ["PREPOSISI", "PREPOSISI"],
    ["KONJUNGTIF", "KONJUNGTIF"],
    ["AUX", "AUX"],
    ["WAKTU", "WAKTU"],
    ["ADJEKTIVA", "ADJEKTIVA"],
    ["BILANGAN", "BILANGAN"],
];
groups.forEach(([key, tag]) => {
    const items = kamus_jawa_json_1.default[key];
    const words = [];
    items.forEach((item) => {
        words.push(item.word);
        if (item.level)
            SEMANTIC_MAP[item.word] = item.level;
        if (item.makna)
            MEANING_MAP[item.word] = item.makna;
        if (item.pair)
            WORD_PAIRS[item.word] = item.pair;
    });
    if (words.length > 0) {
        // Escape karakter khusus sebagai antisipasi regex
        const escapedWords = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
        // Urutkan berdasarkan panjang (terpanjang dulu) agar match lebih akurat
        escapedWords.sort((a, b) => b.length - a.length);
        // Buat regex untuk pencocokan eksak
        const pattern = `^(${escapedWords.join("|")})$`;
        PATTERNS.push({ regex: new RegExp(pattern, "i"), tag });
    }
});
// === FUNGSI PEMBANTU ===
function getTokenKeterangan(tokenType, tokenValue) {
    const level = SEMANTIC_MAP[tokenValue];
    if (tokenType === "SUBJEK") {
        if (level === "SELF")
            return "pronomina diri sendiri";
        if (level === "OTHER")
            return "orang lain yang dihormati";
        return "subjek";
    }
    else if (tokenType === "PREDIKAT") {
        if (level === "OTHER")
            return "verba krama inggil";
        if (level === "SELF")
            return "verba krama lugu";
        if (level === "NEUTRAL")
            return "verba netral";
        return "predikat";
    }
    else if (tokenType === "OBJEK_NOUN") {
        return "tempat / nomina";
    }
    else if (tokenType === "KONJUNGTIF") {
        return "konjungsi";
    }
    // Gunakan default jika ada di MEANING_MAP
    if (MEANING_MAP[tokenValue]) {
        return MEANING_MAP[tokenValue];
    }
    return "";
}
// Menghitung jarak Levenshtein (untuk koreksi typo)
function levenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            }
            else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}
const ALL_WORDS = [];
groups.forEach(([key]) => {
    const items = kamus_jawa_json_1.default[key];
    items.forEach((item) => {
        ALL_WORDS.push(item.word);
    });
});
// Daftar kata benda yang menyatakan lokasi/tempat (Dimuat dinamis dari data)
const LOCATIVE_NOUNS = new Set();
kamus_jawa_json_1.default.OBJEK_NOUN.forEach((item) => {
    if (item.is_location) {
        LOCATIVE_NOUNS.add(item.word);
    }
});
// Daftar kata yang bisa berfungsi sebagai Konjungsi maupun Preposisi
const AMBIGUOUS_CONJ_PREP = new Set(["kaliyan", "sareng", "kalian", "kalihan"]);
// Daftar kata kerja intransitif (Dimuat dinamis)
const INTRANSITIVE_VERBS = new Set();
kamus_jawa_json_1.default.PREDIKAT.forEach((item) => {
    if (item.transitive === false) {
        INTRANSITIVE_VERBS.add(item.word);
    }
});
function tokenize(text) {
    const tokens = [];
    const cleanedText = text.toLowerCase().replace(/,/g, " ");
    const words = cleanedText.split(/\s+/).filter((w) => w.trim().length > 0);
    for (const word of words) {
        let matched = false;
        for (const { regex, tag } of PATTERNS) {
            if (regex.test(word)) {
                tokens.push({ type: tag, value: word });
                matched = true;
                break;
            }
        }
        if (!matched) {
            // Cari kata yang paling mirip (fuzzy match)
            let closestWord = "";
            let minDistance = Infinity;
            // Hanya lakukan fuzzy match jika panjang kata wajar untuk menghindari noise
            if (word.length > 2) {
                for (const dictWord of ALL_WORDS) {
                    const dist = levenshteinDistance(word, dictWord);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestWord = dictWord;
                    }
                }
            }
            // Batas toleransi: jarak harus kecil relatif terhadap panjang kata
            // cth: jarak <= 1 untuk kata pendek, <= 2 untuk kata panjang
            const threshold = word.length <= 4 ? 1 : 2;
            if (minDistance <= threshold) {
                tokens.push({ type: "UNKNOWN", value: word, suggestion: closestWord });
            }
            else {
                tokens.push({ type: "UNKNOWN", value: word });
            }
        }
    }
    return tokens;
}
// === PARSER (PENGURAI SINTAKSIS) ===
class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.pos = 0;
        this.traceSteps = [];
    }
    get currentToken() {
        return this.pos < this.tokens.length ? this.tokens[this.pos] : null;
    }
    logTrace(ruleName, content) {
        this.traceSteps.push(`${ruleName} -> ${content}`);
    }
    eat(tokenType) {
        if (this.currentToken && this.currentToken.type === tokenType) {
            this.pos++;
        }
        else {
            throw new Error(`Kesalahan Sintaksis: Diharapkan ${tokenType}, tetapi ditemukan ${this.currentToken ? this.currentToken.type : "EOF"}`);
        }
    }
    peek(n = 1) {
        const target = this.pos + n;
        return target < this.tokens.length ? this.tokens[target] : null;
    }
    // S -> Klausa (KONJUNGTIF Klausa)*
    parse_S() {
        this.logTrace("S", "Clause");
        const nodeS = { type: "S", children: [] };
        nodeS.children.push(this.parse_Clause());
        // Loop untuk menangani klausa majemuk, baik dengan konjungsi maupun implisit
        while (this.currentToken) {
            if (this.currentToken.type === "KONJUNGTIF") {
                const tokenKonj = this.currentToken;
                this.logTrace("S", "Clause KONJUNGTIF Clause");
                this.eat("KONJUNGTIF");
                nodeS.children.push({ type: "KONJUNGTIF", value: tokenKonj.value });
                nodeS.children.push(this.parse_Clause());
            }
            else if (this.isStartOfClause()) {
                // Implicit conjunction (koma atau spasi pemisah klausa)
                this.logTrace("S", "Clause (Implicit) Clause");
                // Opsional: Tambahkan node separator imajiner jika perlu, tapi langsung klausa juga oke
                nodeS.children.push(this.parse_Clause());
            }
            else {
                // Token tersisa tidak bisa memulai klausa baru
                break;
            }
        }
        return nodeS;
    }
    // Cek apakah token saat ini bisa memulai sebuah klausa baru
    isStartOfClause() {
        if (!this.currentToken)
            return false;
        const type = this.currentToken.type;
        // Klausa bisa dimulai dengan NP (Subjek/Waktu/Objek) atau VP (Predikat/Aux - Subjek Implisit)
        return ["SUBJEK", "OBJEK_NOUN", "WAKTU", "PREDIKAT", "AUX"].includes(type);
    }
    // Clause -> (NP)? VP (Klausa -> [Frasa Nomina] + Frasa Verba)
    // NP menjadi opsional untuk menangani subjek implisit pada kalimat majemuk
    parse_Clause() {
        this.logTrace("Clause", "(NP)? VP");
        const nodeClause = { type: "CLAUSE", children: [] };
        // Cek apakah ada Subjek Eksplisit (NP)
        // Jika token adalah PREDIKAT atau AUX, berarti subjek implisit -> langsung VP
        if (this.currentToken &&
            !["PREDIKAT", "AUX"].includes(this.currentToken.type)) {
            // NP (Subjek)
            try {
                nodeClause.children.push(this.parse_NP(true));
            }
            catch (e) {
                // Jika gagal parse NP, mungkin memang bukan NP tapi juga struktur lain yg tidak valid
                // Tapi logic 'includes' di atas harusnya sudah memfilter kasus umum.
                // Re-throw jika error beneran.
                throw e;
            }
        }
        else {
            this.logTrace("Clause", "Implicit Subject detected");
        }
        // VP
        nodeClause.children.push(this.parse_VP());
        return nodeClause;
    }
    // NP -> (SUBJEK|OBJEK_NOUN|WAKTU) ...
    parse_NP(isSubject = false) {
        if (!this.currentToken) {
            throw new Error("Akhir Input yang Tidak Diharapkan pada NP");
        }
        const firstToken = this.currentToken;
        if (["SUBJEK", "OBJEK_NOUN", "WAKTU"].includes(firstToken.type)) {
            this.logTrace("NP", `${firstToken.type} (Start)`);
            this.eat(firstToken.type);
            const nodeNP = {
                type: "NP",
                value: firstToken.value,
                children: [],
            };
            nodeNP.children.push({ type: firstToken.type, value: firstToken.value });
            while (this.currentToken) {
                const tk = this.currentToken;
                // Cek Konjungtif ATAU Preposisi Ambigu (misal: kaliyan)
                const isKonjungtif = tk.type === "KONJUNGTIF" ||
                    (tk.type === "PREPOSISI" && AMBIGUOUS_CONJ_PREP.has(tk.value));
                if (isKonjungtif) {
                    if (!isSubject) {
                        const nextTok = this.peek(1);
                        const nextNext = this.peek(2);
                        let isNewClauseStart = false;
                        if (nextTok && nextNext) {
                            if (["SUBJEK", "OBJEK_NOUN", "WAKTU"].includes(nextTok.type) &&
                                nextNext.type === "PREDIKAT") {
                                isNewClauseStart = true;
                            }
                        }
                        if (isNewClauseStart)
                            break;
                    }
                    this.logTrace("NP", "NP KONJ/PREP NP (Compound)");
                    // Makan token apapun tipenya (KONJ atau PREP)
                    this.eat(tk.type);
                    if (this.currentToken &&
                        ["SUBJEK", "OBJEK_NOUN", "WAKTU"].includes(this.currentToken.type)) {
                        const tNext = this.currentToken;
                        this.eat(tNext.type);
                        nodeNP.value += ` ${tk.value} ${tNext.value}`;
                        // Simpan sebagai KONJUNGTIF di tree untuk konsistensi struktur
                        nodeNP.children.push({ type: "KONJUNGTIF", value: tk.value });
                        nodeNP.children.push({ type: tNext.type, value: tNext.value });
                    }
                    else {
                        throw new Error(`Kesalahan Sintaksis: Diharapkan Kata Benda setelah '${tk.value}'`);
                    }
                }
                else if (["OBJEK_NOUN", "WAKTU"].includes(tk.type)) {
                    this.logTrace("NP", "NP NOUN (Compound)");
                    this.eat(tk.type);
                    nodeNP.value += ` ${tk.value}`;
                }
                else if (tk.type === "ADJEKTIVA") {
                    this.logTrace("NP", "NP ADJEKTIVA");
                    this.eat("ADJEKTIVA");
                    nodeNP.value += ` ${tk.value}`;
                    nodeNP.children.push({ type: "ADJ", value: tk.value });
                }
                else if (tk.type === "BILANGAN") {
                    this.logTrace("NP", "NP BILANGAN");
                    this.eat("BILANGAN");
                    nodeNP.value += ` ${tk.value}`;
                    nodeNP.children.push({ type: "NUM", value: tk.value });
                }
                else {
                    break;
                }
            }
            return nodeNP;
        }
        else {
            throw new Error(`Kesalahan Sintaksis di NP: token tidak diharapkan ${firstToken.value}`);
        }
    }
    // VP
    parse_VP() {
        this.logTrace("VP", "Start Parsing");
        const nodeVP = { type: "VP", children: [] };
        if (this.currentToken && this.currentToken.type === "AUX") {
            this.logTrace("VP", "AUX PREDIKAT ...");
            const tAux = this.currentToken;
            this.eat("AUX");
            nodeVP.children.push({ type: "AUX", value: tAux.value });
        }
        const token = this.currentToken;
        if (token && token.type === "PREDIKAT") {
            this.logTrace("VP", "PREDIKAT ...");
            const tV = token; // Store the verb token
            this.eat("PREDIKAT");
            nodeVP.children.push({ type: "V", value: tV.value });
            // Cek Transitivity
            const isIntransitive = INTRANSITIVE_VERBS.has(tV.value);
            if (this.currentToken) {
                // Jika Intransitif, cek apakah ada Locative Noun (Implicit Preposition)
                if (isIntransitive) {
                    const nextTok = this.currentToken;
                    if (["OBJEK_NOUN"].includes(nextTok.type) &&
                        LOCATIVE_NOUNS.has(nextTok.value)) {
                        // Treat as PP (Implicit)
                        this.logTrace("VP", "Implicit Preposition (Locative Noun)");
                        const nodePP = {
                            type: "PP",
                            value: nextTok.value, // e.g., "peken"
                            children: [],
                            // Optional: Mark as implicit
                        };
                        // Disini kita memalsukan struktur PP seolah-olah ada preposisi
                        // Atau cukup simpan NP di dalam PP
                        // Untuk konsistensi dengan 'wonten pawon' (P NP), kita bisa buat:
                        // children: [ {type: 'P_IMPLICIT', value: ''}, {type: NP...} ]
                        // Tapi user mungkin lebih suka node PP langsung membungkus NP
                        // Parse sebagai NP dulu
                        const nodeNP = this.parse_NP();
                        nodePP.children.push(nodeNP);
                        nodeVP.children.push(nodePP);
                        nodeVP.value += ` ${nodeNP.value}`;
                    }
                    // Jika bukan Locative, maka Intransitif tidak boleh ambil Objek
                    // Break loop (kembali ke parse_Clause)
                }
                // Jika Transitif (Default), coba parse NP Object
                else if (["SUBJEK", "OBJEK_NOUN", "WAKTU"].includes(this.currentToken.type)) {
                    // ... Logic lama ...
                    // Cek Ambigu Wonten (sudah ada) -> tapi ini di loop PP/WAKTU di bawah
                    // Tapi kita perlu handle Object disini
                    const nodeNP = this.parse_NP();
                    nodeVP.children.push(nodeNP);
                    nodeVP.value += ` ${nodeNP.value}`;
                }
            }
            while (this.currentToken &&
                ["PREPOSISI", "WAKTU", "PREDIKAT"].includes(this.currentToken.type)) {
                if (this.currentToken.type === "PREPOSISI") {
                    this.logTrace("VP", "VP PP");
                    nodeVP.children.push(this.parse_PP());
                }
                else if (this.currentToken.type === "WAKTU") {
                    this.logTrace("VP", "VP WAKTU");
                    nodeVP.children.push(this.parse_NP());
                }
                else if (this.currentToken.type === "PREDIKAT" &&
                    this.currentToken.value === "wonten") {
                    // Context-Sensitive Gating:
                    // Jika "wonten" diikuti oleh Lokasi, maka anggap sebagai Preposisi (PP),
                    // bukan sebagai Predikat baru (Klausa baru).
                    const nextToken = this.peek(1);
                    if (nextToken &&
                        ["OBJEK_NOUN"].includes(nextToken.type) &&
                        LOCATIVE_NOUNS.has(nextToken.value)) {
                        this.logTrace("VP", "VP PP (Gated: wonten + Location)");
                        // Konsumsi "wonten" tapi bungkus sebagai PP
                        const tWonten = this.currentToken;
                        this.eat("PREDIKAT"); // Eat 'wonten'
                        const nodePP = { type: "PP", children: [] };
                        nodePP.children.push({ type: "P", value: tWonten.value }); // Re-tag as P
                        nodePP.children.push(this.parse_NP()); // Parse location NP
                        nodeVP.children.push(nodePP);
                    }
                    else {
                        // Jika bukan lokasi, biarkan loop berhenti.
                        // Token "wonten" akan diproses oleh parse_S sebagai klausa baru.
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }
        else {
            throw new Error(`Kesalahan Sintaksis di VP: Diharapkan PREDIKAT, ditemukan ${token ? token.value : "EOF"}`);
        }
        return nodeVP;
    }
    // PP
    parse_PP() {
        this.logTrace("PP", "PREPOSISI NP");
        const nodePP = { type: "PP", children: [] };
        const token = this.currentToken;
        if (token && token.type === "PREPOSISI") {
            this.eat("PREPOSISI");
            nodePP.children.push({ type: "P", value: token.value });
            nodePP.children.push(this.parse_NP());
        }
        else {
            throw new Error("Kesalahan Sintaksis di PP: Diharapkan PREPOSISI");
        }
        return nodePP;
    }
}
// === GENERATOR DERIVASI (RIWAYAT PENURUNAN) ===
function generateLeftmostDerivation(treeRoot) {
    const steps = [];
    let currentString = [treeRoot];
    function getSymbol(node) {
        if (["S", "CLAUSE", "NP", "VP", "PP"].includes(node.type)) {
            return node.type;
        }
        return node.type; // Pre-Terminal (Kata Asli)
    }
    function getFullString(list) {
        return list
            .map((item) => {
            if (typeof item === "string")
                return item;
            return getSymbol(item);
        })
            .join(" ");
    }
    steps.push(getSymbol(treeRoot));
    let count = 0;
    const maxSteps = 100;
    while (count < maxSteps) {
        let candidateIdx = -1;
        let candidateNode = null;
        for (let i = 0; i < currentString.length; i++) {
            const item = currentString[i];
            if (typeof item === "string")
                continue;
            if (["S", "CLAUSE", "NP", "VP", "PP"].includes(item.type) ||
                (item.children && item.children.length > 0) ||
                item.value) {
                candidateIdx = i;
                candidateNode = item;
                break;
            }
        }
        if (candidateIdx === -1)
            break;
        if (candidateNode) {
            if (["S", "CLAUSE", "NP", "VP", "PP"].includes(candidateNode.type) ||
                (candidateNode.children && candidateNode.children.length > 0)) {
                // Ekspansi anak node
                const newNodes = candidateNode.children || [];
                // Sisipkan kembali ke string saat ini
                currentString.splice(candidateIdx, 1, ...newNodes);
            }
            else {
                // Pre-Terminal tanpa anak, ekspansi ke nilai katanya (kata dasar)
                const word = candidateNode.value || "";
                currentString[candidateIdx] = word;
            }
        }
        steps.push("⇒ " + getFullString(currentString));
        count++;
    }
    return steps;
}
// === VALIDATOR SEMANTIK (UNGGAH-UNGGUH) ===
function validateClause(clauseNode) {
    /* Perbaikan: Cari children berdasarkan tipe, jangan asumsi index fix */
    // Struktur: [NP, VP] atau [VP] (implisit subjek)
    const nodeNP = clauseNode.children?.find((c) => c.type === "NP");
    const nodeVP = clauseNode.children?.find((c) => c.type === "VP");
    if (!nodeVP) {
        /* Jika VP tidak ada sama sekali, struktur kacau -> anggap valid/ignore agar tidak crash */
        return { isValid: true, reason: "", correction: {}, errors: [] };
    }
    // Jika Subjek Implisit (nodeNP undefined), kita tidak bisa validasi relasi Subjek-Predikatnya
    // Kecuali kita bisa tarik konteks dari klausa sebelumnya (fitur advanced).
    // Untuk sekarang, jika implisit, kita skip validasi unggah-ungguh level Subjek-Predikat.
    if (!nodeNP) {
        return {
            isValid: true,
            reason: "", // Implicit subject, assume valid or inherits previous context
            correction: {},
            errors: [],
        };
    }
    const fullSubjectText = (nodeNP.value || "").toLowerCase();
    const subjectWord = fullSubjectText.split(/\s+/)[0];
    if (!nodeVP.children)
        return {
            isValid: true,
            reason: "Kata Kerja tidak ditemukan",
            correction: {},
            errors: [],
        };
    const nodeV = nodeVP.children.find((c) => c.type === "V");
    if (!nodeV)
        return {
            isValid: true,
            reason: "Kata Kerja Utama tidak ditemukan",
            correction: {},
            errors: [],
        };
    const verbWord = (nodeV.value || "").toLowerCase();
    // Cek kategori unggah-ungguh
    const subjCat = SEMANTIC_MAP[subjectWord];
    const verbCat = SEMANTIC_MAP[verbWord];
    if (subjCat && verbCat) {
        const suggestVerb = WORD_PAIRS[verbWord];
        if (subjCat === "SELF") {
            if (verbCat === "OTHER") {
                const reason = `Subjek '${subjectWord}' (Diri Sendiri) tidak boleh pakai kata Inggil '${verbWord}'.`;
                const suggestion = suggestVerb || `(cari ganti ${verbWord})`;
                return {
                    isValid: false,
                    reason,
                    correction: { [verbWord]: suggestion },
                    errors: [
                        {
                            token: verbWord,
                            masalah: "krama inggil digunakan untuk subjek diri sendiri",
                            subjek_terkait: subjectWord,
                            aturan: "krama inggil hanya untuk orang yang dihormati",
                        },
                    ],
                };
            }
        }
        else if (subjCat === "OTHER") {
            if (verbCat === "SELF") {
                const reason = `Subjek '${subjectWord}' (Orang Lain) harus dihormati, jangan pakai '${verbWord}'.`;
                const suggestion = suggestVerb || `(cari ganti ${verbWord})`;
                return {
                    isValid: false,
                    reason,
                    correction: { [verbWord]: suggestion },
                    errors: [
                        {
                            token: verbWord,
                            masalah: "Kata kerja ini kurang halus untuk Subjek yang dihormati",
                            subjek_terkait: subjectWord,
                            aturan: "Gunakan Krama Inggil untuk menghormati orang lain (Bapak/Ibu/Simbah)",
                        },
                    ],
                };
            }
        }
    }
    return { isValid: true, reason: "", correction: {}, errors: [] };
}
function validateSemantics(tree) {
    let allValid = true;
    const messages = [];
    const corrections = {};
    const allErrors = [];
    const clauses = [];
    function findClauses(node) {
        if (node.type === "CLAUSE")
            clauses.push(node);
        if (node.children)
            node.children.forEach(findClauses);
    }
    findClauses(tree);
    for (const clause of clauses) {
        const { isValid, reason, correction, errors } = validateClause(clause);
        if (!isValid) {
            allValid = false;
            messages.push(reason);
            Object.assign(corrections, correction);
            allErrors.push(...errors);
        }
    }
    return { isValid: allValid, reasons: messages, corrections, allErrors };
}
// === ANALISIS UTAMA (MAIN) ===
function analyzeSentence(text) {
    const tokens = tokenize(text);
    const tokenOutput = tokens.map((t) => ({
        token: t.value,
        label: t.type,
        keterangan: getTokenKeterangan(t.type, t.value) || undefined,
    }));
    const unknownTokens = tokens.filter((t) => t.type === "UNKNOWN");
    if (unknownTokens.length > 0) {
        return {
            tokens: tokenOutput,
            analisis: {
                jenis_kalimat: "-",
                validitas_sintaksis: "TIDAK VALID",
                validitas_unggah_ungguh: "TIDAK SESUAI",
                jenis_kesalahan: unknownTokens.map((t) => ({
                    token: t.value,
                    masalah: "Kata tidak dikenali dalam kamus",
                    suggestion: t.suggestion,
                })),
            },
            structure: { type: "ERROR" },
            derivations: [],
            error: `Kata tidak dikenali: ${unknownTokens
                .map((t) => t.value +
                (t.suggestion ? ` (Mungkin maksud Anda: ${t.suggestion}?)` : ""))
                .join(", ")}`,
        };
    }
    const parser = new Parser(tokens);
    try {
        const tree = parser.parse_S();
        if (parser.pos < parser.tokens.length) {
            throw new Error("Masih ada token tersisa yang tidak valid di akhir kalimat.");
        }
        const { isValid, reasons, corrections, allErrors } = validateSemantics(tree);
        const clauseCount = tree.children?.filter((c) => c.type === "CLAUSE").length || 0;
        const jenisKalimat = clauseCount > 1 ? "kalimat majemuk setara" : "kalimat tunggal";
        let kalimatKoreksi = undefined;
        if (!isValid) {
            const correctedTokens = tokens.map((t) => corrections[t.value.toLowerCase()] || t.value);
            kalimatKoreksi = {
                hasil: correctedTokens.join(" "),
                penjelasan: reasons.join("; ") || "Perbaikan unggah-ungguh.",
            };
        }
        const derivations = generateLeftmostDerivation(tree);
        return {
            tokens: tokenOutput,
            analisis: {
                jenis_kalimat: jenisKalimat,
                validitas_sintaksis: "VALID",
                validitas_unggah_ungguh: isValid
                    ? "SESUAI"
                    : reasons.some((r) => r.includes("Diri Sendiri"))
                        ? "AMBIGU"
                        : "TIDAK SESUAI",
                jenis_kesalahan: allErrors,
            },
            kalimat_koreksi: kalimatKoreksi,
            structure: tree,
            derivations: derivations,
        };
    }
    catch (e) {
        return {
            tokens: tokenOutput,
            analisis: {
                jenis_kalimat: "-",
                validitas_sintaksis: "TIDAK VALID",
                validitas_unggah_ungguh: "TIDAK SESUAI",
                jenis_kesalahan: [{ token: "Syntax Error", masalah: e.message }],
            },
            structure: { type: "ERROR" },
            derivations: [],
            error: e.message,
        };
    }
}
