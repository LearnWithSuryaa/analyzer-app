export type TokenType =
  | "SUBJEK"
  | "PREDIKAT"
  | "OBJEK_NOUN"
  | "PREPOSISI"
  | "KONJUNGTIF"
  | "AUX"
  | "WAKTU"
  | "ADJEKTIVA"
  | "BILANGAN"
  | "UNKNOWN";

export interface Token {
  type: TokenType;
  value: string;
  suggestion?: string;
}

export interface ParseNode {
  type: string;
  value?: string;
  children?: ParseNode[];
}

export interface SemanticError {
  token: string;
  masalah: string;
  subjek_terkait?: string;
  aturan?: string;
  suggestion?: string;
}

export interface AnalysisResult {
  tokens: { token: string; label: string; keterangan?: string }[];
  analisis: {
    jenis_kalimat: string;
    validitas_sintaksis: "VALID" | "TIDAK VALID";
    validitas_unggah_ungguh: "SESUAI" | "TIDAK SESUAI" | "AMBIGU";
    jenis_kesalahan: SemanticError[];
  };
  kalimat_koreksi?: {
    hasil: string;
    penjelasan: string;
  };
  structure: ParseNode;
  derivations: string[];
  error?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content?: string;
  result?: AnalysisResult;
  timestamp: number;
}
