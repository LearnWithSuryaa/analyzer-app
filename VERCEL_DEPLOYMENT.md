# Vercel Deployment Configuration

## Masalah

Vercel tidak bisa mendeteksi Next.js karena mencari di root `package.json`, padahal Next.js ada di workspace `web/`.

## Solusi: Configure Root Directory di Vercel Dashboard

### Langkah-langkah:

1. **Buka Vercel Dashboard** → Pilih project Anda
2. **Settings** → **General**
3. **Root Directory** → Ubah dari `.` menjadi `web`
4. **Save**
5. **Redeploy** (Deployments → klik titik tiga → Redeploy)

### Konfigurasi Lengkap:

- **Framework Preset**: Next.js (auto-detect)
- **Root Directory**: `web`
- **Build Command**: (kosongkan, biarkan default)
- **Output Directory**: (kosongkan, biarkan default `.next`)
- **Install Command**: (kosongkan, biarkan default `npm install`)

### Cara Kerja:

Dengan Root Directory = `web`:

1. Vercel akan `cd web` terlebih dahulu
2. Jalankan `npm install` di folder `web/` → Ini akan otomatis install dependencies dari parent monorepo karena NPM workspaces
3. Deteksi Next.js dari `web/package.json` ✅
4. Build dengan `next build`
5. Deploy dari `web/.next`

### Catatan Penting:

- File `vercel.json` di root **TIDAK DIPERLUKAN** lagi setelah setting Root Directory
- NPM workspaces akan tetap bekerja karena `web/package.json` memiliki dependency `@javanese-ai/core: "*"`
- Saat `npm install` di folder `web/`, NPM akan naik ke parent untuk resolve workspace

---

**Alternatif (jika setting di dashboard tidak bekerja):**
Tambahkan `installCommand` khusus di `vercel.json`:

```json
{
  "installCommand": "cd .. && npm install && cd web"
}
```
