import re
import json
import os

# === GRAMMAR DEFINITION (CFG) ===
#
# A. ATURAN KALIMAT (>3 Rules)
#    1. S -> Clause                              (Kalimat Tunggal)
#    2. S -> Clause KONJ Clause                  (Kalimat Majemuk Setara)
#    3. S -> NP VP                               (Explicit structure for clarity)
#    4. S -> NP VP PP                            (Structure with Adjunct)
#
# B. ATURAN FRASA (>=5 Rules)
#    1. NP -> NOUN
#    2. NP -> NOUN ADJ                           (Frasa Adjektival)
#    3. NP -> NOUN NUM                           (Frasa Numeralia)
#    4. NP -> NOUN NOUN                          (Frasa Nominal Majemuk)
#    5. VP -> VERB
#    6. VP -> VERB NP                            (Transitive)
#    7. VP -> VERB PP                            (Intransitive + Ket)
#    8. PP -> PREP NP
#
# C. ATURAN KATA (>=9 Rules)
#    1. SUBJEK (Pronoun/Noun)
#    2. PREDIKAT (Verb)
#    3. OBJEK_NOUN (Noun)
#    4. PREPOSISI (Prep)
#    5. KONJUNGTIF (Conj)
#    6. AUX (Auxiliary)
#    7. WAKTU (Time Adverb)
#    8. ADJEKTIVA (Adjective)
#    9. BILANGAN (Numeral)

# === DERIVATION GENERATOR ===
def generate_leftmost_derivation(tree_root):
    """
    Generates a formal Left-most Derivation trace from the parse tree.
    Format:
    1. S
    2. => Clause
    3. => NP VP
    ...
    """
    steps = []
    
    # Initial State: [RootNode]
    # We represent the "Current String" as a list of Nodes.
    current_string = [tree_root]
    
    # Helper to get string info
    def get_symbol(node):
        # If it's a Terminal/Pre-Terminal (has value but no children, or children are just literal derivation)
        # Actually in our tree:
        # NTs: S, CLAUSE, NP, VP, PP
        # Pre-Terminals: SUBJEK, PREDIKAT, KONJUNGTIF... (They have 'value')
        # We treat S, CLAUSE, NP, VP, PP as Expandable NTs.
        # We treat SUBJEK, PREDIKAT etc as Pre-Terminals that expand to their 'value'.
        
        if node['type'] in ['S', 'CLAUSE', 'NP', 'VP', 'PP']:
            return node['type']
        else:
            # It's a Pre-Terminal (e.g. SUBJEK)
            return node['type']

    def get_full_string(node_list):
        parts = []
        for n in node_list:
            if isinstance(n, str):
                parts.append(n)
            else:
                parts.append(get_symbol(n))
        return " ".join(parts)
        
    # Step 1: S
    steps.append(get_symbol(tree_root))
    
    work_queue = [tree_root] # This logic is tricky for "Left-most".
    # Better approach:
    # 1. We have a list of Objects in the string: [NodeS]
    # 2. Find the FIRST object that is Nontrivial.
    #    - If it has children, replace it with children.
    #    - If it has value but no children (and not yet expanded), expand to value (string).
    #    - If it is a string, skip.
    
    max_steps = 100
    count = 0
    
    while count < max_steps:
        # Find expansion candidate (Left-most NT or Pre-Terminal)
        candidate_idx = -1
        candidate_node = None
        
        for i, item in enumerate(current_string):
            if isinstance(item, str):
                continue
            
            # It's a Node
            if item['type'] in ['S', 'CLAUSE', 'NP', 'VP', 'PP']:
                # Expandable NT
                candidate_idx = i
                candidate_node = item
                break
            elif 'children' in item and item['children']:
                 # Some other NT with children?
                 candidate_idx = i
                 candidate_node = item
                 break
            elif 'value' in item:
                 # Pre-terminal (e.g. SUBJEK) -> expand to word
                 candidate_idx = i
                 candidate_node = item
                 break
        
        if candidate_idx == -1:
            break # All terminals
            
        # Perform Expansion
        if candidate_node['type'] in ['S', 'CLAUSE', 'NP', 'VP', 'PP'] or ('children' in candidate_node and candidate_node['children']):
            # Replace with children
            new_nodes = candidate_node.get('children', [])
            current_string[candidate_idx:candidate_idx+1] = new_nodes
        else:
            # Pre-Terminal -> Terminal
            word = candidate_node['value']
            current_string[candidate_idx] = word
            
        # Record Step
        steps.append("⇒ " + get_full_string(current_string))
        count += 1
        
    return steps

# === LOAD VOCABULARY FROM JSON ===
def load_dictionary(filepath="kamus_jawa.json"):
    if not os.path.exists(filepath):
        print(f"Galat: Berkas kamus '{filepath}' tidak ditemukan.")
        return {}, {}, [], {}

    with open(filepath, 'r') as f:
        data = json.load(f)
    
    semantic_map = {}
    word_pairs = {}
    patterns = []
    
    # Process Groups
    groups = [
        ('SUBJEK', 'SUBJEK'),
        ('PREDIKAT', 'PREDIKAT'),
        ('OBJEK_NOUN', 'OBJEK_NOUN'),
        ('PREPOSISI', 'PREPOSISI'),
        ('KONJUNGTIF', 'KONJUNGTIF'),
        ('AUX', 'AUX'),
        ('WAKTU', 'WAKTU'),
        ('ADJEKTIVA', 'ADJEKTIVA'),
        ('BILANGAN', 'BILANGAN')
    ]

    for key, tag in groups:
        words = [item['word'] for item in data.get(key, [])]
        for item in data.get(key, []):
            semantic_map[item['word']] = item['level']
            if 'pair' in item:
                word_pairs[item['word']] = item['pair']
        if words:
            # Sort by length desc to match longest first (though regex matches boundaries)
            patterns.append((r'\b(' + '|'.join(words) + r')\b', tag))

    return semantic_map, word_pairs, patterns, data

# Initialize Data
SEMANTIC_MAP, WORD_PAIRS, patterns, RAW_DATA = load_dictionary()

class Token:
    def __init__(self, type, value):
        self.type = type
        self.value = value
    
    def __repr__(self):
        return f"Token({self.type}, '{self.value}')"

class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0
        self.current_token = self.tokens[self.pos] if self.tokens else None
        self.parse_tree = []
        self.trace_steps = []

    def log_trace(self, rule_name, content):
        self.trace_steps.append(f"{rule_name} -> {content}")

    def eat(self, token_type):
        if self.current_token and self.current_token.type == token_type:
            # self.log_trace("MATCH", f"Token {token_type}: '{self.current_token.value}'")
            self.current_token = self.advance()
        else:
            raise Exception(f"Kesalahan Sintaksis: Diharapkan {token_type}, tetapi ditemukan {self.current_token.type if self.current_token else 'EOF'}")

    def advance(self):
        self.pos += 1
        if self.pos < len(self.tokens):
            return self.tokens[self.pos]
        return None
    
    # === RULES ===
    
    # Helper for lookahead
    def peek(self, n=1):
        target_pos = self.pos + n
        if target_pos < len(self.tokens):
            return self.tokens[target_pos]
        return None

    # S -> Clause (KONJUNGTIF Clause)*
    def parse_S(self):
        self.log_trace("S", "Clause")
        node_s = {"type": "S", "children": []}
        
        # Parse first Clause
        node_s["children"].append(self.parse_Clause())
        
        # Check for Conjunctions joining Clauses (Kalimat Majemuk Setara)
        while self.current_token and self.current_token.type == 'KONJUNGTIF':
             token_konj = self.current_token
             self.log_trace("S", "Clause KONJUNGTIF Clause")
             
             self.eat('KONJUNGTIF')
             node_s["children"].append({"type": "KONJUNGTIF", "value": token_konj.value})
             node_s["children"].append(self.parse_Clause())
             
        return node_s

    # Clause -> NP VP
    def parse_Clause(self):
        self.log_trace("Clause", "NP VP")
        node_clause = {"type": "CLAUSE", "children": []}
        
        # NP (Subject)
        node_np = self.parse_NP(is_subject=True)
        node_clause["children"].append(node_np)
        
        # VP (Predicate + Object/Ket)
        node_vp = self.parse_VP()
        node_clause["children"].append(node_vp)
        
        return node_clause

    # NP -> (SUBJEK|OBJEK_NOUN|WAKTU) (KONJUNGTIF ...)* [ADJ|NUM]*
    def parse_NP(self, is_subject=False):
        if not self.current_token:
            raise Exception("Akhir Input yang Tidak Diharapkan pada NP")
        
        # Parse first noun
        first_token = self.current_token
        # NP Head can be SUBJEK, OBJEK_NOUN, or WAKTU (as noun usage)
        if first_token.type in ['SUBJEK', 'OBJEK_NOUN', 'WAKTU']:
            self.log_trace("NP", f"{first_token.type} (Start)")
            self.eat(first_token.type)
            node_np = {"type": "NP", "value": first_token.value, "children": []}
            # Add Head Noun to children for Derivation Tree
            node_np['children'].append({"type": first_token.type, "value": first_token.value})
            
            # Check for:
            # 1. Conjunction (lan ...) -> Compound NP
            # 2. Noun Modifier (Compound Noun)
            # 3. Adjective Modifier (ADJEKTIVA)
            # 4. Numeral Modifier (BILANGAN)
            while self.current_token: 
                tk = self.current_token
                
                if tk.type == 'KONJUNGTIF':
                    # Only check for new clause start if NOT in Subject position due to ambiguity
                    if not is_subject:
                        # LOOKAHEAD for Clause Boundary
                        next_tok = self.peek(1)
                        next_next = self.peek(2)
                        is_new_clause_start = False
                        if next_tok and next_next:
                            if next_tok.type in ['SUBJEK', 'OBJEK_NOUN', 'WAKTU'] and next_next.type == 'PREDIKAT':
                                is_new_clause_start = True
                        if is_new_clause_start:
                            break 
                    
                    t_konj = tk
                    self.log_trace("NP", "NP KONJ NP (Compound)")
                    self.eat('KONJUNGTIF')
                    
                    if self.current_token and self.current_token.type in ['SUBJEK', 'OBJEK_NOUN', 'WAKTU']:
                        t_next = self.current_token
                        self.eat(t_next.type)
                        node_np['value'] += f" {t_konj.value} {t_next.value}"
                    else:
                        raise Exception(f"Kesalahan Sintaksis: Diharapkan Kata Benda setelah '{t_konj.value}'")

                elif tk.type in ['OBJEK_NOUN', 'WAKTU']:
                     # Compound noun
                     self.log_trace("NP", "NP NOUN (Compound)")
                     self.eat(tk.type)
                     node_np['value'] += f" {tk.value}"
                     
                elif tk.type == 'ADJEKTIVA':
                     # NP -> NP Adj
                     self.log_trace("NP", "NP ADJEKTIVA")
                     self.eat('ADJEKTIVA')
                     node_np['value'] += f" {tk.value}"
                     # Add child node for explicit structure visibility
                     node_np['children'].append({"type": "ADJ", "value": tk.value})

                elif tk.type == 'BILANGAN':
                     # NP -> NP Num
                     self.log_trace("NP", "NP BILANGAN")
                     self.eat('BILANGAN')
                     node_np['value'] += f" {tk.value}"
                     node_np['children'].append({"type": "NUM", "value": tk.value})
                     
                else:
                    # Not part of NP
                    break

            return node_np
            
        else:
            raise Exception(f"Kesalahan Sintaksis di NP: token tidak diharapkan {first_token}")

    # VP -> (AUX)? PREDIKAT [NP] [PP|WAKTU]*
    def parse_VP(self):
        self.log_trace("VP", "Start Parsing")
        node_vp = {"type": "VP", "children": []}
        
        # Check for optional Auxiliary Verb (Kata Bantu)
        if self.current_token and self.current_token.type == 'AUX':
            self.log_trace("VP", "AUX PREDIKAT ...")
            t_aux = self.current_token
            self.eat('AUX')
            node_vp["children"].append({"type": "AUX", "value": t_aux.value})
        
        token = self.current_token
        if token and token.type == 'PREDIKAT':
            self.log_trace("VP", "PREDIKAT ...")
            self.eat('PREDIKAT')
            node_vp["children"].append({"type": "V", "value": token.value})
            
            # Check for Object (NP)
            if self.current_token and self.current_token.type in ['OBJEK_NOUN', 'SUBJEK']:
                 self.log_trace("VP", "PREDIKAT NP (Object)")
                 node_vp["children"].append(self.parse_NP())
            
            # Check for Keterangan (PP or WAKTU)
            while self.current_token and self.current_token.type in ['PREPOSISI', 'WAKTU']:
                if self.current_token.type == 'PREPOSISI':
                    self.log_trace("VP", "VP PP")
                    node_vp["children"].append(self.parse_PP())
                elif self.current_token.type == 'WAKTU':
                    self.log_trace("VP", "VP WAKTU")
                    node_vp["children"].append(self.parse_NP()) # Use parse_NP for Waktu phrase
                
        else:
            raise Exception(f"Kesalahan Sintaksis di VP: Diharapkan PREDIKAT, ditemukan {token}")
            
        return node_vp

    # PP -> PREPOSISI NP
    def parse_PP(self):
        self.log_trace("PP", "PREPOSISI NP")
        node_pp = {"type": "PP", "children": []}
        
        token = self.current_token
        if token.type == 'PREPOSISI':
            self.eat('PREPOSISI')
            node_pp["children"].append({"type": "P", "value": token.value})
            
            # Followed by NP (Location/Time)
            # Use parse_NP. Note: parse_NP now handles WAKTU too.
            node_pp["children"].append(self.parse_NP())
        else:
             raise Exception(f"Kesalahan Sintaksis di PP: Diharapkan PREPOSISI")
             
        return node_pp

def tokenize(text):
    tokens = []
    text = text.lower()
    # Simple split might fail with punctuation like comma. 
    # But current regex \b handles patterns. 
    # Better to findall with the patterns.
    # However, existing logic splits by space then matches.
    # We should stick to split but maybe replace comma with space first.
    text = text.replace(',', ' ')
    words = text.split()
    
    for word in words:
        matched = False
        for pattern, tag in patterns:
            if re.fullmatch(pattern, word):
                tokens.append(Token(tag, word))
                matched = True
                break
        if not matched:
            tokens.append(Token('UNKNOWN', word))
    return tokens


def print_tree_pretty(node, prefix="", is_last=True):
    """
    Prints the parse tree using ASCII box-drawing characters for a cleaner look.
    """
    marker = "└── " if is_last else "├── "
    
    # Check if it's a leaf node or has value
    content = f"{node['type']}"
    if 'value' in node:
        content += f": {node['value']}"
        
    print(prefix + marker + content)
    
    prefix += "    " if is_last else "│   "
    
    if 'children' in node:
        child_count = len(node['children'])
        for i, child in enumerate(node['children']):
            is_last_child = (i == child_count - 1)
            print_tree_pretty(child, prefix, is_last_child)

# === SEMANTIC RULES (Unggah-Ungguh) ===
# Validations are performed using the loaded SEMANTIC_MAP and WORD_PAIRS.
# 1. SELF (Krama Andhap/Lugu) - Used for oneself.
# 2. OTHER (Krama Inggil/Alus) - Used for respected others.
# 3. NEUTRAL - Can be used by anyone.

# === HELPER FOR KETERANGAN ===
def get_token_keterangan(token_type, token_value):
    level = SEMANTIC_MAP.get(token_value)
    if token_type == 'SUBJEK':
        if level == 'SELF': return "pronomina diri sendiri"
        if level == 'OTHER': return "orang lain yang dihormati"
        return "subjek"
    elif token_type == 'PREDIKAT':
        if level == 'OTHER': return "verba krama inggil"
        if level == 'SELF': return "verba krama lugu"
        if level == 'NEUTRAL': return "verba netral"
        # Since we swapped dictionary, SELF/OTHER logic applies
        return "predikat"
    elif token_type == 'OBJEK_NOUN':
        return "tempat / nomina"
    elif token_type == 'KONJUNGTIF':
        return "konjungsi"
    return ""

def validate_clause(clause_node):
    """
    Validates a single CLAUSE node (NP VP).
    Returns: (is_valid, reason_str, correction_dict, error_detail_list)
    """
    # Clause -> NP VP
    node_np = clause_node['children'][0] # NP (Subject)
    node_vp = clause_node['children'][1] # VP
    
    # Extract Subject Word
    full_subject_text = node_np.get('value', '').lower()
    subject_word = full_subject_text.split()[0]
    
    # Extract Predicate Word
    if not node_vp['children']:
        return True, "Kata Kerja tidak ditemukan", {}, []
    
    node_v = None
    for child in node_vp['children']:
        if child.get('type') == 'V':
            node_v = child
            break
            
    if not node_v:
        return True, "Kata Kerja Utama tidak ditemukan", {}, []
        
    verb_word = node_v.get('value', '').lower()
    
    # Extract Object Word
    object_word = None
    if len(node_vp['children']) > 1:
        second_child = node_vp['children'][1]
        if second_child['type'] == 'NP':
             object_word = second_child.get('value', '').lower()
             object_word = object_word.split()[0]
    
    # Check Categories
    subj_cat = SEMANTIC_MAP.get(subject_word)
    verb_cat = SEMANTIC_MAP.get(verb_word)
    
    errors = []
    
    # --- RULE 1: SUBJECT vs PREDICATE ---
    if subj_cat and verb_cat:
        suggest_verb = WORD_PAIRS.get(verb_word, None)
        
        # Case A: Subjek SELF (Krama Andhap/Lugu)
        if subj_cat == 'SELF':
            if verb_cat == 'OTHER':
                # Error: Diri sendiri pakai Inggil
                reason = f"Subjek '{subject_word}' (Diri Sendiri) tidak boleh pakai kata Inggil '{verb_word}'."
                suggestion = suggest_verb if suggest_verb else f"(cari ganti {verb_word})"
                
                error_obj = {
                    "token": verb_word,
                    "masalah": "krama inggil digunakan untuk subjek diri sendiri",
                    "subjek_terkait": subject_word,
                    "aturan": "krama inggil hanya untuk orang yang dihormati"
                }
                return False, reason, {verb_word: suggestion}, [error_obj]
                
        # Case B: Subjek OTHER (Krama Inggil)
        elif subj_cat == 'OTHER':
            if verb_cat == 'SELF':
                # Error: Orang lain dikasih Ngoko/Andhap
                reason = f"Subjek '{subject_word}' (Orang Lain) harus dihormati, jangan pakai '{verb_word}'."
                suggestion = suggest_verb if suggest_verb else f"(cari ganti {verb_word})"
                
                error_obj = {
                    "token": verb_word,
                    "masalah": "penghalusan kurang untuk subjek yang dihormati",
                    "subjek_terkait": subject_word,
                    "aturan": "gunakan krama inggil untuk orang yang dihormati"
                }
                return False, reason, {verb_word: suggestion}, [error_obj]
    
    return True, "", {}, []

def validate_semantics(tree):
    """
    Traverses the tree to find all CLAUSE nodes and validates them.
    Returns: (is_valid, reasons_list, corrections_dict, all_errors)
    """
    all_valid = True
    messages = []
    corrections = {}
    all_errors = []
    
    # Traverse tree to find CLAUSE nodes
    clauses = []
    def find_clauses(node):
        if node['type'] == 'CLAUSE':
            clauses.append(node)
        if 'children' in node:
            for child in node['children']:
                find_clauses(child)
    
    find_clauses(tree)
    
    for clause in clauses:
        is_valid, reason, correction, errors = validate_clause(clause)
        if not is_valid:
            all_valid = False
            messages.append(reason)
            corrections.update(correction)
            all_errors.extend(errors)
            
    return all_valid, messages, corrections, all_errors

def analyze_to_json(text):
    tokens = tokenize(text)
    
    # Tokenisasi output
    token_output = []
    for t in tokens:
        item = {
            "token": t.value,
            "label": t.type
        }
        ket = get_token_keterangan(t.type, t.value)
        if ket:
            item["keterangan"] = ket
        token_output.append(item)
    
    parser = Parser(tokens)
    try:
        tree = parser.parse_S()
        is_valid, reasons, corrections, errors = validate_semantics(tree)
        
        # Validitas Unggah-Ungguh
        validitas_uu = "SESUAI" if is_valid else "TIDAK SESUAI"
        
        # Jenis Kalimat
        # Check direct children of S: CLAUSE (KONJ CLAUSE)*
        clause_count = sum(1 for c in tree['children'] if c['type'] == 'CLAUSE')
        jenis_kalimat = "kalimat majemuk setara" if clause_count > 1 else "kalimat tunggal"
        
        # Kalimat Koreksi
        kalimat_koreksi = {}
        if not is_valid:
            corrected_tokens = []
            for t in tokens:
                word = t.value.lower()
                if word in corrections:
                    corrected_tokens.append(corrections[word])
                else:
                    corrected_tokens.append(t.value)
            
            kalimat_koreksi = {
                "hasil": " ".join(corrected_tokens),
                "penjelasan": "; ".join(reasons) if reasons else "Perbaikan unggah-ungguh."
            }
        
        result = {
            "tokenisasi": token_output,
            "analisis": {
                "jenis_kalimat": jenis_kalimat,
                "validitas_sintaksis": "VALID",
                "validitas_unggah_ungguh": validitas_uu,
                "jenis_kesalahan": errors
            }
        }
        
        if kalimat_koreksi:
           result["kalimat_koreksi"] = kalimat_koreksi
           
        return result

    except Exception as e:
        return {
            "error": str(e)
        }

def analyze_sentence(text):
    print(f"\n{'='*60}")
    print(f"Kalimat : \"{text}\"")
    print(f"{'-'*60}")
    
    tokens = tokenize(text)
    
    # Check for unknown tokens
    unknowns = [t for t in tokens if t.type == 'UNKNOWN']
    if unknowns:
        print(f"[!] Error: Kata tidak dikenali: {', '.join([t.value for t in unknowns])}")
        print(f"{'='*60}\n")
        return

    # Show tokens nicely
    token_str = " -> ".join([f"[{t.type}: {t.value}]" for t in tokens])
    print(f"Token   : {token_str}")
    
    parser = Parser(tokens)
    try:
        tree = parser.parse_S()
        if parser.current_token is not None:
             print("[!] Error: Masih ada token tersisa yang tidak valid di akhir kalimat.")
        else:
            # Semantic Analysis
            is_valid, reasons, corrections, errors = validate_semantics(tree)
            
            # Print Output in Human-Readable Format
            print(f"Kalimat Asli      : \"{text}\"")
            
            if is_valid:
                print(f"Status Awal       : \033[92mVALID\033[0m")
                print(f"Penjelasan        : Sintaksis & Unggah-Ungguh Sesuai")
            else:
                status_label = "TIDAK VALID"
                for r in reasons:
                    if "Diri Sendiri" in r: 
                        status_label = "AMBIGU" # Or TIDAK SESUAI
                        break
                
                print(f"Status Awal       : \033[91m{status_label}\033[0m")
                print(f"Jenis Kesalahan   : Pelanggaran Unggah-Ungguh Basa")
                
                # Reconstruct sentence
                corrected_tokens = []
                for t in tokens:
                    word = t.value.lower()
                    if word in corrections:
                        corrected_tokens.append(f"\033[92m{corrections[word]}\033[0m")
                    else:
                        corrected_tokens.append(t.value)
                
                corrected_sentence = " ".join(corrected_tokens)
                print(f"Kalimat Koreksi   : \"{corrected_sentence}\"")
                print(f"Penjelasan        : {'; '.join(reasons)}")
            
            print(f"Struktur          :")
            print_tree_pretty(tree, is_last=True)
            
            print(f"\nProses Derivasi (Left-most) :")
            derivations = generate_leftmost_derivation(tree)
            for i, step in enumerate(derivations, 1):
                 print(f"{i}. {step}")
                
    except Exception as e:
        print(f"Kalimat Asli      : \"{text}\"")
        print(f"Status Awal       : \033[91mERROR\033[0m")
        print(f"Jenis Kesalahan   : Syntax Error")
        print(f"Penjelasan        : {e}")
    
    print(f"{'='*60}\n")

def title_screen():
    print(r"""
  ____       _                         ____  _                         
 |  _ \     | |                       |  _ \(_)                        
 | |_) | __ | |__   __ _ ___  __ _    | | | |_  __ ___      ____ _    
 |  _ < / _` | '_ \ / _` / __|/ _` |  | | | | |/ _` \ \ /\ / / _` |   
 | |_) | (_| | | | | (_| \__ \ (_| |  | |_| | | (_| |\ V  V / (_| |   
 |____/ \__,_|_| |_|\__,_|___/\__,_|  |____/| |\__,_| \_/\_/ \__,_|   
                                            / |                       
                                           |__/                        
    Syntax Analyzer Bahasa Jawa Krama (S-P-O-K)
    """)

if __name__ == "__main__":
    title_screen()
    print("Selamat datang di Syntax Analyzer Bahasa Jawa Krama.")
    print("Ketik kalimat Anda untuk dianalisis. Ketik 'keluar' atau 'exit' untuk berhenti.\n")
    
    while True:
        try:
            user_input = input("Masukan Kalimat > ").strip()
            
            if user_input.lower() in ['keluar', 'exit', 'quit']:
                print("Matur nuwun! Sampai jumpa.")
                break
            
            if not user_input:
                continue
                
            analyze_sentence(user_input)
            
        except KeyboardInterrupt:
            print("\nProgram dihentikan paksa. Matur nuwun!")
            break
        except Exception as e:
            print(f"Terjadi kesalahan: {e}")
