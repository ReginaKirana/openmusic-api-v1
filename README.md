# OpenMusic API

OpenMusic API adalah sebuah layanan RESTful API untuk pengelolaan lagu dan album musik. Proyek ini dibangun menggunakan Node.js, Hapi framework (awalnya, namun kode saat ini menggunakan Express), dan database PostgreSQL.

## Teknologi yang Digunakan

- **Node.js**: Runtime environment untuk JavaScript.
- **Express**: Framework web minimalis untuk Node.js.
- **PostgreSQL**: Sistem manajemen basis data relasional.
- **node-pg-migrate**: Alat migrasi database untuk PostgreSQL.
- **dotenv**: Modul untuk memuat variabel lingkungan.

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (Versi LTS disarankan)
- [PostgreSQL](https://www.postgresql.org/)

## Instalasi

1. **Clone repository ini:**
   ```bash
   git clone <repository-url>
   cd openmusic-api-v1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable:**
   Buat file `.env` di direktori root proyek dan sesuaikan dengan konfigurasi database Anda. Anda bisa melihat contoh konfigurasi di bawah ini:

   ```env
   # Server configuration
   PORT=5000
   HOST=localhost

   # PostgreSQL configuration
   PGUSER=developer
   PGHOST=localhost
   PGPASSWORD=supersecretpassword
   PGDATABASE=openmusic
   PGPORT=5432
   ````

4. **Jalankan Migrasi Database:**
   Pastikan database `openmusic` (atau nama yang Anda set di `.env`) sudah dibuat di PostgreSQL, lalu jalankan migrasi untuk membuat tabel yang dibutuhkan:
   ```bash
   npm run migrate up
   ```

## Penggunaan

Untuk menjalankan server dalam mode produksi:

```bash
npm start
```

Untuk menjalankan server dalam mode pengembangan (dengan nodemon):

```bash
npm run start:dev
```
*(Catatan: Pastikan script `start:dev` ada di `package.json` jika ingin menggunakannya, atau gunakan `npx nodemon src/server.js`)*

Server akan berjalan pada port yang didefinisikan di file `.env` (default: 5000).

## Endpoint API

API ini menyediakan berbagai endpoint untuk mengelola resource musik. Beberapa endpoint utama meliputi:

### Albums
- `POST /albums`: Menambahkan album baru.
- `GET /albums/{id}`: Mendapatkan detail album berdasarkan ID.
- `PUT /albums/{id}`: Memperbarui data album.
- `DELETE /albums/{id}`: Menghapus album.

### Songs
- `POST /songs`: Menambahkan lagu baru.
- `GET /songs`: Mendapatkan daftar seluruh lagu.
- `GET /songs/{id}`: Mendapatkan detail lagu berdasarkan ID.
- `PUT /songs/{id}`: Memperbarui data lagu.
- `DELETE /songs/{id}`: Menghapus lagu.

## Struktur Proyek

```
openmusic-api-v1/
├── migrations/         # File migrasi database
├── src/
│   ├── exceptions/     # Custom error classes
│   ├── middlewares/    # Middleware Express
│   ├── routes/         # Definisi rute API
│   ├── services/       # Logika bisnis dan interaksi database
│   ├── validators/     # Skema validasi data
│   └── server.js       # Entry point aplikasi
├── .env                # File konfigurasi environment (tidak di-commit)
├── package.json        # Manifest proyek
└── README.md           # Dokumentasi proyek
```
