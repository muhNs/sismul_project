# 🔧 Troubleshooting - Speaking Feature

Panduan mengatasi masalah umum pada fitur Speaking.

---

## ❌ Error: "no-speech"

### Penyebab:
- Web Speech API tidak mendeteksi suara dalam waktu tertentu (timeout ~3-5 detik)
- Mikrofon tidak menangkap audio dengan baik
- Background noise terlalu tinggi/rendah

### Solusi:

#### 1. Cek Mikrofon Hardware
```
✓ Pastikan mikrofon terhubung dengan baik
✓ Test di aplikasi lain (Windows Voice Recorder)
✓ Cek volume mikrofon di Windows Settings
```

#### 2. Cek Permission Browser
**Chrome:**
1. Klik ikon gembok di address bar
2. Pastikan Microphone = "Allow"
3. Refresh halaman

**Edge:**
1. Klik ikon gembok di address bar
2. Pastikan Microphone = "Allow"
3. Refresh halaman

#### 3. Tips Berbicara
```
✓ Klik tombol mikrofon
✓ TUNGGU 1 detik (tunggu status berubah "Mendengarkan...")
✓ Berbicara dengan JELAS dan TIDAK TERLALU CEPAT
✓ Jarak mulut ke mikrofon: 10-20 cm
✓ Kurangi background noise (tutup jendela, matikan AC/kipas)
```

#### 4. Test Mikrofon
Buka: `http://localhost:3000/test-speech.html`
- Jika di sini juga gagal = masalah hardware/permission
- Jika di sini berhasil = masalah di kode

---

## ❌ Error: "network"

### Penyebab:
**Web Speech API membutuhkan koneksi internet!**
- Google's speech recognition service berjalan di cloud
- Tidak ada koneksi internet
- Firewall/proxy memblokir koneksi ke Google

### Solusi:

#### 1. Cek Koneksi Internet
```bash
# Windows CMD
ping google.com

# PowerShell
Test-NetConnection google.com
```

#### 2. Cek Firewall
- Nonaktifkan sementara firewall/antivirus
- Pastikan Chrome/Edge tidak di-block

#### 3. Cek Proxy Settings
**Windows:**
1. Settings → Network & Internet → Proxy
2. Pastikan "Automatically detect settings" ON
3. Jika pakai proxy, pastikan tidak memblokir Google services

#### 4. Alternatif (Jika Tetap Gagal)
Gunakan **offline speech recognition library** seperti:
- **Vosk** (offline, gratis)
- **Whisper.cpp** (offline, AI-based)
- **Web Speech API Polyfill**

---

## ❌ Error: "not-allowed"

### Penyebab:
Browser tidak diizinkan mengakses mikrofon

### Solusi:

#### Chrome/Edge:
1. Buka `chrome://settings/content/microphone`
2. Pastikan "Sites can ask to use your microphone" ENABLED
3. Cek bagian "Blocked" - pastikan localhost tidak ada di sini
4. Jika ada, klik ikon trash untuk hapus

#### Windows Security:
1. Settings → Privacy & Security → Microphone
2. Pastikan "Microphone access" ON
3. Pastikan "Let apps access your microphone" ON
4. Pastikan Chrome/Edge di-allow

---

## ❌ File Audio/Gambar 404

### Penyebab:
File audio (`/audio/speaking/*.mp3`) dan gambar (`/images/speaking/*.jpg`) belum ada

### Solusi Sementara (Development):
Sudah diatasi! Audio dan gambar URL dikosongkan untuk fokus ke Web Speech API.

### Solusi Production:
Upload file audio dan gambar ke folder:
```
frontend/public/audio/speaking/
frontend/public/images/speaking/
```

**Format File:**
- Audio: MP3, max 5MB, bitrate 128kbps
- Gambar: JPG/PNG/WebP, max 500KB, resolusi 800x600px

---

## ❌ Transcript Tidak Akurat

### Penyebab:
- Pronunciation kurang jelas
- Background noise
- Aksen terlalu kental
- Web Speech API tidak sempurna

### Solusi:

#### 1. Improve Pronunciation
```
✓ Berbicara lebih LAMBAT
✓ Artikulasi lebih JELAS
✓ Praktik dengan native speaker audio
```

#### 2. Reduce Background Noise
```
✓ Rekam di ruangan tenang
✓ Tutup jendela/pintu
✓ Matikan AC, kipas, TV
✓ Gunakan headset dengan noise cancellation
```

#### 3. Adjust Keyword Threshold
Edit file `SpeakingArena.tsx`:
```typescript
// Default: 70% keyword match
if (keywordMatchRatio >= 0.7) {
  return { isCorrect: true };
}

// Lebih longgar: 50%
if (keywordMatchRatio >= 0.5) {
  return { isCorrect: true };
}
```

---

## ❌ Visualizer Tidak Muncul

### Penyebab:
- Canvas API error
- Browser tidak support
- Permission audio tidak diberikan

### Solusi:

#### 1. Cek Browser Console
Buka DevTools (F12) → Console tab
Lihat error message

#### 2. Cek getUserMedia Permission
```javascript
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    console.log('✅ Microphone access granted');
  })
  .catch(err => {
    console.error('❌ Microphone error:', err);
  });
```

---

## 🔍 Debugging Tools

### 1. Browser DevTools
```
F12 → Console tab
Lihat error messages dan logs
```

### 2. Network Tab
```
F12 → Network tab
Cek API calls ke backend
```

### 3. Test Speech HTML
```
http://localhost:3000/test-speech.html
Minimal testing environment
```

### 4. Backend Logs
```bash
cd backend
node server.js

# Lihat console output
```

---

## 📊 Expected Behavior

### ✅ Normal Flow:
```
1. User klik mikrofon merah
2. Status: "Mendengarkan... Silakan berbicara sekarang!"
3. Visualizer menampilkan gelombang (bars bergerak)
4. User berbicara: "The girl is reading a book"
5. Recording stop otomatis
6. Status: "Rekaman selesai! Silakan cek jawaban."
7. Transcript muncul di kotak "Anda mengatakan"
8. User klik "Cek Jawaban"
9. Modal feedback muncul (hijau/merah)
10. User klik "Lanjut"
11. Pindah ke soal berikutnya
```

---

## 🆘 Masih Bermasalah?

### Cek Versi Browser:
```
Chrome: Minimal versi 33+
Edge: Minimal versi 79+
```

### Update Browser:
```
chrome://settings/help
edge://settings/help
```

### Hard Refresh:
```
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

### Clear Cache:
```
Ctrl + Shift + Delete
Pilih: Cached images and files
Clear data
```

---

## 💡 Best Practices

### Untuk User:
1. ✅ Gunakan headset untuk akurasi lebih baik
2. ✅ Rekam di ruangan tenang
3. ✅ Berbicara dengan jelas, tidak terlalu cepat
4. ✅ Coba beberapa kali jika gagal (speech recognition tidak sempurna)

### Untuk Developer:
1. ✅ Selalu cek console untuk error
2. ✅ Test dengan berbagai aksen
3. ✅ Tambahkan more acceptable variations
4. ✅ Consider offline speech recognition untuk production
5. ✅ Add analytics untuk track success rate

---

## 🔗 Resources

- [Web Speech API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Chrome Speech Recognition](https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API)
- [Can I Use - Speech Recognition](https://caniuse.com/speech-recognition)

---

Jika masih ada masalah, hubungi tim development dengan menyertakan:
1. Screenshot error
2. Console logs
3. Browser & OS version
4. Steps to reproduce
