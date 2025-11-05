# BeautyCare Admin Dashboard

Dashboard admin untuk mengelola penjualan produk kecantikan dengan tampilan glass UI menggunakan Tailwind CSS.

## Fitur

- ✅ Login Page dengan dummy authentication
- ✅ Dashboard dengan chart penjualan menggunakan Chart.js
- ✅ User Management Page
- ✅ Product Management Page
- ✅ Responsive design untuk laptop dan mobile
- ✅ Glass UI design dengan Tailwind CSS
- ✅ Data statis dari JSON lokal

## Teknologi

- Next.js 16.0.1 (Turbopack)
- TypeScript
- Tailwind CSS
- Chart.js
- React Chart.js 2

## Setup dan Instalasi

1. Clone repository ini
2. Install dependencies:

   ```bash
   npm install
   ```
3. Jalankan development server:

   ```bash
   npm run dev
   ```
4. Buka http://localhost:3000 di browser

## Struktur Projek

```text
statistik-app/
├── app/
│   ├── components/
│   │   ├── header.tsx
│   │   └── sidebar.tsx
│   ├── data/
│   │   ├── data_penjualan.json
│   │   ├── data_produk.json
│   │   ├── data_sales.json
│   │   └── data_user.json
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── products/
│   │   └── page.tsx
│   ├── users/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
```