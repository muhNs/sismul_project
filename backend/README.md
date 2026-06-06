# Backend Quickstart

Dokumentasi cepat ini menjelaskan cara menyiapkan dan menjalankan backend `project-sismul`.

## Prasyarat

- Node.js 20+ / NPM 10+
- PostgreSQL aktif dan dapat diakses
- Terminal atau command prompt

## Struktur Utama

- `src/App.ts` - entry point aplikasi Express
- `src/routes/routes.ts` - definisi router API
- `lib/prisma.ts` - konfigurasi Prisma client
- `prisma/schema.prisma` - skema model dan enum Prisma
- `prisma.config.ts` - konfigurasi Prisma untuk schema dan migrations
- `generated/prisma` - output Prisma Client generated

## Instalasi

1. Buka folder backend:

```bash
cd backend
```

2. Install dependency:

```bash
npm install
```

3. Generate Prisma Client:

```bash
npx prisma generate
```

> Jalankan ulang `npx prisma generate` setiap kali `prisma/schema.prisma` diubah.

## Konfigurasi Environment

1. Copy file contoh `.env.example` ke `.env`:

```bash
cp .env.example .env
```

> Jika Anda menggunakan Windows PowerShell, gunakan:

```powershell
Copy-Item .env.example .env
```

2. Buka file `.env` dan sesuaikan nilai:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/nama_database"
PORT=4000
JWT_SECRET=super_secret_jwt_key_development
```

- `DATABASE_URL` wajib diisi agar Prisma dapat terhubung ke database.
- `PORT` adalah port server Express.
- `JWT_SECRET` digunakan untuk menandatangani token JWT.

## Menjalankan Migrasi

Jika database belum disiapkan, jalankan:

```bash
npx prisma migrate deploy
```

Untuk membuat migrasi baru setelah mengubah schema:

```bash
npx prisma migrate dev --name init
```

## Menjalankan Server

Jalankan server backend dalam mode watch:

```bash
npm run dev
```

Server akan berjalan pada port yang ditentukan di `.env`.

## Endpoint Utama

Semua endpoint tersedia di bawah prefix:

```text
/api/v1
```

Contoh:

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

## Catatan Penting

- CORS dibatasi ke origin lokal yang ditentukan di `src/App.ts`.
- Middleware autentikasi dan otorisasi menggunakan JWT di `src/shared/auth.utils.ts`.
- Prisma client terhubung menggunakan adapter `@prisma/adapter-pg` di `lib/prisma.ts`.

## Troubleshooting

- Jika `PORT` tidak ditemukan, pastikan file `.env` sudah dibuat dan `dotenv.config()` bekerja di `src/App.ts`.
- Jika error `Role` atau enum Prisma muncul, jalankan ulang `npx prisma generate`.
- Jika database tidak terhubung, periksa kembali `DATABASE_URL` dan status PostgreSQL.
