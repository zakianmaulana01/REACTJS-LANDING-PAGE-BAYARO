<div align="center">

<img src="assets/bayaro-logo-transparent.png" alt="BAYARO POS Logo" height="80" />

# BAYARO POS — Landing Page

**Landing page modern + simulator kasir interaktif untuk solusi POS UMKM Indonesia**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square)](https://tailwindcss.com)
[![Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white&style=flat-square)](https://motion.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Harga Berlangganan: Rp 150.000 / bulan · Tanpa komisi · Tanpa kontrak mengikat**

</div>

---

## Tentang Project

BAYARO POS adalah landing page produk lengkap untuk sistem kasir modern yang dirancang khusus untuk UMKM Indonesia. Project ini mencakup halaman pemasaran yang dibangun penuh dengan React + TypeScript, serta simulator kasir interaktif yang memungkinkan calon pelanggan mencoba langsung sistem sebelum berlangganan.

### Mengapa BAYARO POS?

- **100% Offline** — Sistem kasir berjalan penuh tanpa koneksi internet
- **Data Lokal & Aman** — Tidak ada data yang dikirim ke cloud atau pihak ketiga
- **Auto-save & Backup** — Data tersimpan otomatis, bisa di-backup kapan saja
- **Harga Flat** — Rp 150.000/bulan tanpa potongan komisi per transaksi

---

## Tampilan Halaman

| Bagian | Deskripsi |
|--------|-----------|
| **Header** | Sticky navbar dengan promo bar animasi, mobile hamburger menu |
| **Hero** | Headline kuat + mock preview POS + CTA button langganan |
| **Fitur Utama** | Grid 12 fitur produk dengan CTA section dark background |
| **POS Simulator** | Demo kasir interaktif 4-tab (Kasir, Meja, Riwayat, Laporan) |
| **Trust Section** | Jaminan keamanan data lokal + banner UMKM Indonesia |
| **Pricing** | Satu paket Rp 150k/bulan, checklist fitur lengkap |
| **Registrasi** | Form pendaftaran terintegrasi WhatsApp onboarding |
| **FAQ** | 5 pertanyaan umum dengan accordion interaktif |
| **Footer** | Kontak, navigasi cepat, social media, legal links |

---

## Simulator Kasir Interaktif

Fitur utama project ini adalah simulator POS yang bisa dicoba langsung di browser:

### Tab Kasir
- Katalog menu lengkap: Coffee, Non-Coffee, Tea, Pastry, Main Course (13 item)
- Pencarian menu real-time
- Filter kategori
- Kustomisasi item: suhu (Ice/Hot), tingkat gula, extra shot espresso, pilihan syrup
- Keranjang belanja dengan qty adjuster
- Input nama pelanggan & catatan item
- Perhitungan otomatis: Subtotal + PPN 11% + Service Fee 5%
- Hold pesanan & Bayar sekarang

### Tab Meja
- Visualisasi 9 meja dengan status: Kosong / Terisi / Billed
- Buka meja baru dengan nama pelanggan
- Pindah ke kasir dari meja yang aktif

### Tab Riwayat
- Daftar transaksi tersimpan (pre-populated + transaksi baru)
- Detail struk per transaksi
- Reset data demo

### Tab Laporan (Real-Time)
- Total omset, jumlah transaksi, rata-rata ticket
- Metode pembayaran populer
- Timeline omset penjualan (SVG chart custom)
- Top produk terlaris
- Breakdown per metode pembayaran (QRIS, Tunai, Debit, Kredit)
- Semua update otomatis setelah setiap transaksi selesai

### Checkout
- Pilih metode: QRIS, Tunai, Debit, Kredit
- Input uang tunai + hitung kembalian otomatis
- Struk digital setelah pembayaran
- Auto redirect ke tab Laporan untuk lihat efek real-time

---

## Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|---------|
| [React](https://react.dev) | 19.0 | UI Framework |
| [TypeScript](https://www.typescriptlang.org) | 5.8 | Type safety |
| [Vite](https://vitejs.dev) | 6.2 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com) | 4.1 | Utility-first styling |
| [Framer Motion](https://motion.dev) | 12 | Animasi & transisi |
| [Lucide React](https://lucide.dev) | 0.546 | Ikon SVG |
| [Express.js](https://expressjs.com) | 4.21 | Server backend (opsional) |
| [dotenv](https://github.com/motdotla/dotenv) | 17 | Environment variables |

**Font:** Inter (sans-serif) + JetBrains Mono (monospace) via Google Fonts  
**Warna primer:** Indigo `#4f46e5` | Sekunder: Cyan `#06b6d4`

---

## Struktur Project

```
REACTJS-LANDING-PAGE-BAYARO/
├── assets/
│   └── bayaro-logo-transparent.png   # Logo produk
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Sticky navbar + promo bar + mobile menu
│   │   ├── Hero.tsx             # Hero section + mock POS preview card
│   │   ├── Features.tsx         # Grid 12 fitur + CTA section
│   │   ├── PosSimulator.tsx     # Simulator kasir interaktif (1733 baris)
│   │   ├── TrustSection.tsx     # Keamanan data + banner UMKM
│   │   ├── Pricing.tsx          # Pricing card + feature checklist
│   │   ├── RegistrationForm.tsx # Form daftar + integrasi WhatsApp
│   │   ├── FAQ.tsx              # Accordion FAQ 5 pertanyaan
│   │   └── Logo.tsx             # Komponen logo reusable
│   ├── App.tsx                  # Root app + footer lengkap
│   ├── data.ts                  # Data menu, transaksi, tipe TypeScript
│   ├── main.tsx                 # Entry point React
│   └── index.css                # Global styles + Tailwind theme tokens
├── index.html                   # HTML template
├── metadata.json                # Konfigurasi Google AI Studio
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Instalasi & Menjalankan Lokal

### Prasyarat

Pastikan sudah terinstall di komputer Anda:

- **Node.js** versi 18 ke atas — [Download Node.js](https://nodejs.org)
- **npm** (otomatis ikut saat install Node.js)
- Koneksi internet saat pertama kali install (untuk download dependencies)

Cek versi Node.js yang terpasang:

```bash
node --version   # harus >= v18.0.0
npm --version
```

---

### Langkah 1 — Clone Repository

```bash
git clone https://github.com/zakianmaulana01/REACTJS-LANDING-PAGE-BAYARO.git
cd REACTJS-LANDING-PAGE-BAYARO
```

---

### Langkah 2 — Install Dependencies

```bash
npm install
```

Perintah ini akan mengunduh semua package yang dibutuhkan ke folder `node_modules/`. Proses ini memerlukan koneksi internet dan memakan waktu 1–2 menit tergantung kecepatan internet.

---

### Langkah 3 — Konfigurasi Environment (Opsional)

Project ini memiliki integrasi dengan **Google Gemini AI** yang bersifat opsional. Jika ingin menggunakannya:

1. Buat file `.env.local` di root folder project:

```bash
touch .env.local
```

2. Tambahkan API key Gemini Anda:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> Jika tidak diset, semua fitur landing page dan simulator kasir tetap berjalan normal. API key hanya dibutuhkan untuk fitur AI tambahan.

---

### Langkah 4 — Jalankan Development Server

```bash
npm run dev
```

Buka browser dan akses: **[http://localhost:3000](http://localhost:3000)**

Server berjalan dengan Hot Module Replacement (HMR) aktif — perubahan kode langsung terlihat di browser tanpa reload manual.

---

## Scripts yang Tersedia

| Command | Keterangan |
|---------|-----------|
| `npm run dev` | Jalankan development server di port 3000 |
| `npm run build` | Build project untuk production (output ke folder `dist/`) |
| `npm run preview` | Preview hasil build production secara lokal |
| `npm run lint` | Cek type error TypeScript (tanpa emit file) |
| `npm run clean` | Hapus folder `dist/` dan file `server.js` |

---

## Build untuk Production

```bash
npm run build
```

Hasil build tersimpan di folder `dist/`. Folder ini berisi file statis (HTML, CSS, JS) yang siap di-deploy ke:

- **Vercel** — `vercel deploy`
- **Netlify** — drag & drop folder `dist/`
- **GitHub Pages** — dengan GitHub Actions
- **VPS / Shared Hosting** — upload isi `dist/` ke public_html

---

## Troubleshooting

**Port 3000 sudah dipakai?**
```bash
# Jalankan di port lain
npx vite --port 3001
```

**Node.js versi lama (< 18)?**
```bash
# Install Node.js versi terbaru via nvm
nvm install 20
nvm use 20
```

**Error saat `npm install`?**
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
```

**Gambar tidak muncul di simulator?**

Gambar menu menggunakan URL dari Unsplash. Pastikan koneksi internet aktif saat pertama kali membuka halaman.

---

## Kontak & Informasi Produk

| | |
|--|--|
| **Website** | [bayaropos.com](https://bayaropos.com) |
| **WhatsApp** | [+62 851-7416-0310](https://wa.me/6285174160310) |


---

## Lisensi

Project ini dirilis di bawah [MIT License](LICENSE).

---

<div align="center">

Dibuat dengan untuk UMKM Indonesia

© 2024–2026 BAYARO POS. All rights reserved.

</div>
