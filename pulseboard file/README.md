# ANTZ // DIARIUM

Jurnal pekerjaan bertema cyberpunk. Dibangun dengan Next.js (App Router), disimpan
secara persisten ke **Google Sheets** lewat Service Account, siap deploy ke **Vercel**.

Fitur:
- Tambah pekerjaan (judul, deskripsi, deadline, tingkat urgensi: rendah/sedang/tinggi/kritis)
- Tandai pekerjaan selesai / belum selesai
- Hapus pekerjaan
- Statistik ringkas (total, berjalan, selesai, terlambat, kritis)
- Data tersimpan di Google Sheet milikmu — tidak hilang saat refresh atau redeploy

---

## 1. Siapkan Google Sheet + Service Account

Aplikasi ini menulis/membaca data lewat **Service Account** (akun robot Google Cloud),
bukan login akun Gmail pribadi. Ini paling stabil untuk app yang jalan tanpa ada
orang login manual.

### a. Buat project & aktifkan Google Sheets API
1. Buka [Google Cloud Console](https://console.cloud.google.com/) (login pakai
   `antonius.workproj@gmail.com` atau akun manapun).
2. Buat project baru (mis. "pulseboard").
3. Buka **APIs & Services → Library**, cari **Google Sheets API**, klik **Enable**.

### b. Buat Service Account
1. Buka **APIs & Services → Credentials → Create Credentials → Service Account**.
2. Beri nama bebas (mis. `pulseboard-bot`), lanjut sampai selesai (role bisa dikosongkan).
3. Setelah service account dibuat, buka tab **Keys → Add Key → Create new key → JSON**.
4. File JSON akan terdownload. Di dalamnya ada `client_email` dan `private_key` —
   dua nilai ini yang dibutuhkan nanti.

### c. Buat Google Sheet dan share ke service account
1. Login ke `antonius.workproj@gmail.com`, buat Google Sheet baru (boleh kosong,
   sheet "Tasks" akan dibuat otomatis oleh aplikasi saat pertama kali jalan).
2. Klik **Share**, tempel email service account (dari `client_email`, formatnya
   `xxxx@xxxx.iam.gserviceaccount.com`), beri akses **Editor**.
3. Ambil **Sheet ID** dari URL:
   `https://docs.google.com/spreadsheets/d/SHEET_ID_DI_SINI/edit`

---

## 2. Jalankan di komputer sendiri (opsional)

```bash
npm install
cp .env.local.example .env.local
# isi .env.local dengan GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID
npm run dev
```

Buka http://localhost:3000

**Catatan soal `GOOGLE_PRIVATE_KEY`**: nilai di file JSON punya banyak `\n` literal.
Tempel apa adanya di antara tanda kutip, contoh:
```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQ...\n-----END PRIVATE KEY-----\n"
```

---

## 3. Deploy ke Vercel

1. Push folder ini ke GitHub (repo baru).
2. Di [vercel.com](https://vercel.com), **Add New Project**, import repo tersebut.
3. Sebelum klik Deploy, buka **Environment Variables** dan tambahkan 3 variabel:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (tempel apa adanya, termasuk `\n`)
   - `GOOGLE_SHEET_ID`
4. Klik **Deploy**.

Setelah deploy selesai, buka URL Vercel-nya — data yang kamu tambahkan akan langsung
tersimpan di Google Sheet dan tetap ada setiap kali kamu buka lagi (dari device manapun).

---

## Struktur singkat

```
app/
  page.js                 -> halaman utama (dashboard)
  layout.js                -> font + metadata
  globals.css              -> tema visual cyberpunk
  api/tasks/route.js       -> GET (list) & POST (tambah tugas)
  api/tasks/[id]/route.js  -> PATCH (update/selesai) & DELETE (hapus)
lib/sheets.js               -> semua logika baca/tulis ke Google Sheets
components/                 -> Header, StatsBar, TaskList, TaskCard, TaskForm, UrgencyBadge
```

## Catatan
- Kolom di Google Sheet dibuat otomatis: `id, title, description, deadline, urgency, status, createdAt, updatedAt`. Jangan ubah nama header-nya secara manual.
- Kalau butuh reset semua data, cukup hapus baris-baris di sheet (header baris 1 jangan dihapus).
- `npm audit` akan menampilkan 2 peringatan "moderate" dari dependency transitif
  `gaxios` (dipakai oleh library Google Auth) terkait fungsi `uuid` yang jarang
  dipicu di alur pemakaian aplikasi ini — bukan celah pada kode aplikasi sendiri.
