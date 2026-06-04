# 📋 BLUEPRINT UI/UX FINAL: MONSTER ENGLISH ACADEMY
**Konsep: Casual Learning (Ala Duolingo), Kamus Tematik & Gamifikasi Rapor Siswa**

Aplikasi ini menggunakan sistem **Per-Chapter**. Siswa tidak dipaksa menyelesaikan seluruh materi dalam satu waktu. Mereka bebas memilih kelas dan *chapter* (topik) yang ingin dimainkan. Progres dan skor (maksimal 100 poin per kuis) akan dihitung dengan sistem **Highest Score** (Skor Tertinggi) yang disimpan otomatis setiap kali siswa menyelesaikan 10 soal di sebuah *chapter*.

---

### 📱 SCREEN 1: Halaman Login & Register
*   **Fungsi:** Gerbang masuk dan autentikasi pengguna.
*   **Elemen Visual:**
    *   Logo/Maskot Aplikasi.
    *   Kolom *input* Email/Username & Password.
    *   Tombol aksi utama: **"Masuk"** dan **"Daftar"**.
*   **Alur UX:** Setelah siswa memasukkan data, *backend* memvalidasi Token JWT. Jika berhasil, sistem mengarahkan layar ke **Screen 2**.

---

### 📱 SCREEN 2: Halaman Home (Pilih Kelas & Ringkasan Akun)
*   **Fungsi:** Titik aman utama pengguna. Tempat siswa melihat pencapaian global dan menentukan tingkat kesulitan kelas.
*   **Elemen Visual Utama:**
    *   **Header Bar (Bisa Diklik):** Menampilkan Avatar/Foto Profil Siswa, Nama (Username), dan **Total Skor Keseluruhan** (akumulasi bintang/poin dari semua *highest score* yang dimiliki).
    *   **Konten Utama:** 4 Kartu/Tombol besar bertuliskan **Kelas 3, Kelas 4, Kelas 5, dan Kelas 6**.
*   **Alur Cabang (Branching UX):**
    *   Jika bagian Header (Avatar/Nama) diklik -> Layar berpindah ke **Screen 2B (Halaman Profil)**.
    *   Jika salah satu Kartu Kelas diklik -> Layar berpindah ke **Screen 3 (Pilih Chapter)**.

---

### 📱 SCREEN 2B: Halaman Profil & Rapor Siswa (BARU)
*   **Fungsi:** Pusat pengaturan identitas siswa dan buku rapor (*progress tracker*) terperinci untuk setiap kelas yang pernah dimainkan.
*   **Elemen Visual - Bagian Pengaturan Akun:**
    *   Foto Avatar (Bisa diubah/diklik).
    *   Kolom *input* **Username** (Bisa diedit).
    *   Kolom *input* **Email** (*Disabled/Read-only* - Tidak bisa diubah).
    *   Kolom *input* **Password** (*Disabled/Read-only* - Tersembunyi).
    *   Tombol **"Simpan Perubahan"**.
*   **Elemen Visual - Bagian Rincian Skor (Buku Rapor):**
    *   Tabel atau susunan kartu (*Card List*) yang menampilkan *Highest Score* (Skor Tertinggi) per materi.
    *   *Contoh Tampilan:*
        *   Kelas 3 - Reading: 100 Poin ⭐
        *   Kelas 3 - Listening: 80 Poin
        *   Kelas 4 - Speaking: 0 Poin (Belum Dikerjakan)
*   **Tombol Navigasi:** Ikon **"Kembali"** di pojok layar untuk mundur ke **Screen 2 (Home)**.

---

### 📱 SCREEN 3: Halaman Pilih Chapter (Materi)
*   **Fungsi:** Tempat siswa memilih jenis keterampilan atau mode belajar khusus untuk kelas yang telah dipilih.
*   **Elemen Visual Utama:**
    *   Header: Judul kelas yang sedang diakses (Misal: *"Materi Kelas 3"*).
    *   5 Kartu/Tombol Ikonik: **Reading, Listening, Writing, Speaking,** dan **Vocabulary**.
    *   Tombol navigasi: Ikon **"Kembali"** (Back) di pojok layar untuk mundur ke Home.
*   **Alur Cabang (Branching UX):**
    *   Jika tombol **Vocabulary** diklik -> Layar pindah ke **Screen 4A (Mode Kamus)**.
    *   Jika tombol **4 Skill Lainnya** diklik -> Layar pindah ke **Screen 4B (Mode Kuis)**.

---

### 📱 SCREEN 4A: Halaman Vocabulary (Kamus Tematik Kelas)
*   **Fungsi:** Mode belajar mandiri tanpa kuis. Berisi daftar kosakata yang **hanya relevan/khusus untuk kelas yang sedang dipilih** (Tampilan Vocabulary Kelas 3 akan berbeda dengan Kelas 6).
*   **Elemen Visual Utama:**
    *   Daftar Kartu Kosakata (*List/Grid* yang bisa di-*scroll*).
    *   *Setiap kartu kosakata memuat:*
        1.  Gambar Ilustrasi (Format WebP).
        2.  Kata Bahasa Inggris (Teks tebal).
        3.  Arti Bahasa Indonesia (Teks reguler).
        4.  Ikon Speaker/Audio (Untuk mendengarkan cara baca/*pronunciation*).
    *   *(Opsional):* Kolom pencarian (*Search Bar*) di bagian atas.
*   **Tombol Aksi:** Tombol **"Kembali"** untuk mundur ke Screen 3. Halaman ini murni untuk eksplorasi, tidak ada perhitungan skor.

---

### 📱 SCREEN 4B: Halaman Persiapan (Siap Mulai Kuis)
*   **Fungsi:** Layar transisi agar siswa siap mental sebelum memasuki arena kuis.
*   **Elemen Visual Utama:**
    *   Ilustrasi maskot memberikan semangat.
    *   Teks deskripsi: *"Ada 10 soal di chapter ini. Sudah siap?"*
    *   Tombol aksi besar: **"Mulai Belajar!"**.
*   **Alur UX:** Saat diklik, sistem *backend*/CMS akan menarik 10 set materi+soal secara acak, lalu layar berpindah ke **Screen 5**.

---

### 📱 SCREEN 5: Arena Belajar & Kuis (Looping 10 Halaman)
*(Mengadopsi UI Duolingo: Materi ringkas dan soal digabung dalam 1 layar. Muncul berurutan sebanyak 10 kali).*

**Bagian Atas Layar (Sajian Materi Ringkas):**
*   **Jika Reading:** Tampilkan teks bacaan singkat & Gambar WebP.
*   **Jika Listening:** Tampilkan UI *Audio Player* (memutar *file* rahasia MP3 ber-JWT).
*   **Jika Writing:** Tampilkan panduan tata bahasa/rumus singkat.
*   **Jika Speaking:** Tampilkan Ikon Mikrofon & Animasi *Visualizer* Gelombang Suara (Signal Processing).

**Bagian Bawah Layar (Soal & Interaksi):**
*   Teks Pertanyaan (berkaitan dengan materi di atasnya).
*   Opsi Jawaban (Pilihan Ganda A, B, C, D atau Kotak Isian).
*   Tombol **"Cek Jawaban"**.

**Interaksi UX Kuis (Wajib Diimplementasikan):**
*   Siswa memilih jawaban lalu menekan "Cek Jawaban".
*   *Skenario Jawaban BENAR:* Layar merespons dengan warna HIJAU, muncul animasi/suara sukses, dan teks pop-up **"+10 Poin"**.
*   *Skenario Jawaban SALAH:* Layar merespons dengan warna MERAH, tombol jawaban yang salah bergetar (*shake*), sistem menunjukkan kunci jawaban yang benar, dan teks pop-up **"0 Poin"**.
*   Setelah merespons (baik benar maupun salah), tombol di bawah berubah tulisan menjadi **"Lanjut"** (Next).
*   Siswa mengeklik "Lanjut" untuk masuk ke soal berikutnya. Layar tidak akan terkunci di soal yang salah.

---

### 📱 SCREEN 6: Fase 2 - Simpan Skor & Opsi Akhir
*   **Fungsi:** Selebrasi penyelesaian *chapter* dan penyimpanan data ke *database*.
*   **Alur Sistem Backend (Highest Score Logic):** Setelah soal ke-10 selesai, *backend* menghitung total poin kuis saat ini (Misal: 8 Benar = 80 Poin). Sistem lalu membandingkannya dengan *Highest Score* di *database*. **Jika skor baru lebih besar, data di-update. Jika lebih kecil, abaikan (skor tertinggi lama tetap aman).**
*   **Elemen Visual Utama:**
    *   Teks besar: *"Chapter Selesai!"*
    *   Animasi bintang, piala, atau maskot merayakan.
    *   Angka **Total Skor** yang baru saja didapatkan.
*   **Tombol Navigasi (3 Pilihan Aksi):**
    1.  **Main Lagi:** Mereset dan mengacak 10 soal baru di *chapter* yang sama (kembali ke Screen 4B).
    2.  **Pilih Chapter:** Mengembalikan siswa ke **Screen 3** (untuk memilih *skill* lain).
    3.  **Home:** Mengembalikan siswa ke **Screen 2** (Halaman Pilih Kelas).