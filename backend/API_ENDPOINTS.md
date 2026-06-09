# API Endpoints Documentation

Dokumen ini menjelaskan endpoint backend yang digunakan untuk fetching data dan interaksi frontend.

## 1. Base URL

- Development: `http://localhost:<PORT>/api/v1`
- Contoh: `http://localhost:3000/api/v1`

## 2. Konvensi Umum

- Semua response JSON mengikuti format:

```json
{
  "status": "success | error",
  "message": "optional",
  "data": "optional"
}
```

- Endpoint yang membutuhkan login menggunakan cookie auth (`accessToken`, `refreshToken`).
- Untuk frontend, gunakan `withCredentials: true` pada axios/fetch.

---

## 3. Auth Endpoints

### 3.1 Register

- Method: `POST`
- Path: `/auth/register`
- Auth: Tidak perlu
- Request body:

```json
{
  "name": "Nama User",
  "email": "user@example.com",
  "password": "password123"
}
```

- Success response `201`:

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Nama User",
    "email": "user@example.com",
    "role": "STUDENT"
  }
}
```

### 3.2 Login

- Method: `POST`
- Path: `/auth/login`
- Auth: Tidak perlu
- Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- Success response `200`:

```json
{
  "status": "success",
  "message": "Login berhasil",
  "data": {
    "id": 1,
    "name": "Nama User",
    "email": "user@example.com",
    "role": "STUDENT"
  }
}
```

### 3.3 Refresh Token

- Method: `POST`
- Path: `/auth/refresh-token`
- Auth: Melalui cookie refresh token
- Success response `200`:

```json
{
  "status": "success",
  "message": "Access Token berhasil diperbarui"
}
```

### 3.4 Logout

- Method: `POST`
- Path: `/auth/logout`
- Auth: Melalui cookie refresh token
- Success response `200`:

```json
{
  "status": "success",
  "message": "Logout berhasil"
}
```

### 3.5 Get Current User

- Method: `GET`
- Path: `/auth/me`
- Auth: Wajib
- Success response `200`:

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Nama User",
    "email": "user@example.com",
    "role": "STUDENT"
  }
}
```

---

## 4. User Endpoints

### 4.1 Get My Profile

- Method: `GET`
- Path: `/users/profile`
- Auth: Wajib
- Success response `200`:

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Nama User",
    "email": "user@example.com",
    "role": "STUDENT"
  }
}
```

### 4.2 Update Profile

- Method: `PUT`
- Path: `/users/profile`
- Auth: Wajib
- Request body:

```json
{
  "name": "Nama Baru",
  "password": "newpassword123"
}
```

- Success response `200`:

```json
{
  "status": "success",
  "message": "Profil berhasil diperbarui",
  "data": {
    "id": 1,
    "name": "Nama Baru",
    "email": "user@example.com",
    "role": "STUDENT"
  }
}
```

### 4.3 Get All Users

- Method: `GET`
- Path: `/users`
- Auth: Wajib, role `ADMIN`
- Success response `200`:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Nama User",
      "email": "user@example.com",
      "role": "STUDENT"
    }
  ]
}
```

### 4.4 Delete User

- Method: `DELETE`
- Path: `/users/:id`
- Auth: Wajib, role `ADMIN`
- Params:
  - `id` (number)
- Success response `200`:

```json
{
  "status": "success",
  "message": "User berhasil dihapus"
}
```

---

## 5. Materials Endpoints

### 5.1 Get Materials

- Method: `GET`
- Path: `/materials`
- Auth: Wajib
- Query params:
  - `gradeLevel` (optional, number)
  - `skillCategory` (optional, enum: `READING | SPEAKING | LISTENING | WRITING`)
- Success response `200`:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "chapter": 1,
      "gradeLevel": 5,
      "skillCategory": "READING",
      "content": "Isi materi",
      "mediaUrl": "/public/uploads/xxx.jpg"
    }
  ]
}
```

### 5.2 Create Material

- Method: `POST`
- Path: `/materials`
- Auth: Wajib, role `ADMIN`
- Content-Type: `multipart/form-data`
- Form fields:
  - `chapter` (number)
  - `gradeLevel` (number, 3-6)
  - `skillCategory` (enum)
  - `content` (string, optional)
  - `media` (file, optional)
- Success response `201`:

```json
{
  "status": "success",
  "message": "Materi berhasil ditambahkan",
  "data": {
    "id": 1,
    "chapter": 1,
    "gradeLevel": 5,
    "skillCategory": "READING",
    "content": "Isi materi"
  }
}
```

### 5.3 Update Material

- Method: `PUT`
- Path: `/materials/:id`
- Auth: Wajib, role `ADMIN`
- Params:
  - `id` (number)
- Content-Type: `multipart/form-data`
- Success response `200`:

```json
{
  "status": "success",
  "message": "Materi berhasil diupdate",
  "data": {
    "id": 1,
    "chapter": 2,
    "gradeLevel": 5,
    "skillCategory": "SPEAKING"
  }
}
```

### 5.4 Delete Material

- Method: `DELETE`
- Path: `/materials/:id`
- Auth: Wajib, role `ADMIN`
- Success response `200`:

```json
{
  "status": "success",
  "message": "Materi berhasil dihapus"
}
```

---

## 6. Vocabulary Endpoints

### 6.1 Get Vocabularies

- Method: `GET`
- Path: `/vocabularies`
- Auth: Wajib
- Query params:
  - `gradeLevel` (optional, number)
- Success response `200`:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "english": "Apple",
      "indonesian": "Apel",
      "gradeLevel": 4,
      "voice_path": "/public/uploads/xxx.mp3",
      "image_path": "/public/uploads/xxx.jpg"
    }
  ]
}
```

### 6.2 Create Vocabulary

- Method: `POST`
- Path: `/vocabularies`
- Auth: Wajib, role `ADMIN`
- Content-Type: `multipart/form-data`
- Form fields:
  - `english` (string)
  - `indonesian` (string)
  - `gradeLevel` (number, 3-6)
  - `voice` (file, optional)
  - `image` (file, optional)
- Success response `201`:

```json
{
  "status": "success",
  "message": "Kosakata berhasil ditambahkan",
  "data": {
    "id": 1,
    "english": "Apple",
    "indonesian": "Apel",
    "gradeLevel": 4
  }
}
```

### 6.3 Update Vocabulary

- Method: `PUT`
- Path: `/vocabularies/:id`
- Auth: Wajib, role `ADMIN`
- Success response `200`:

```json
{
  "status": "success",
  "message": "Kosakata berhasil diupdate",
  "data": {
    "id": 1,
    "english": "Apple",
    "indonesian": "Apel",
    "gradeLevel": 4
  }
}
```

### 6.4 Delete Vocabulary

- Method: `DELETE`
- Path: `/vocabularies/:id`
- Auth: Wajib, role `ADMIN`
- Success response `200`:

```json
{
  "status": "success",
  "message": "Kosakata berhasil dihapus"
}
```

---

## 7. Quiz Endpoints

### 7.1 Get Admin Quizzes

- Method: `GET`
- Path: `/quizzes/admin/:materialId`
- Auth: Wajib, role `ADMIN | TEACHER`
- Params:
  - `materialId` (number)
- Success response `200`:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "material_id": 10,
      "questionType": "MULTIPLE_CHOICE",
      "questionText": "Apa jawaban benar?",
      "correctAnswer": "A",
      "optionA": "Opsion A",
      "optionB": "Opsion B"
    }
  ]
}
```

### 7.2 Get Student Quizzes

- Method: `GET`
- Path: `/quizzes/student/:materialId`
- Auth: Wajib
- Params:
  - `materialId` (number)
- Success response `200`:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "material_id": 10,
      "questionType": "MULTIPLE_CHOICE",
      "questionText": "Apa jawaban benar?"
    }
  ]
}
```

### 7.3 Create Quiz

- Method: `POST`
- Path: `/quizzes`
- Auth: Wajib, role `ADMIN | TEACHER`
- Content-Type: `multipart/form-data`
- Success response `201`:

```json
{
  "status": "success",
  "message": "Soal berhasil ditambahkan",
  "data": {
    "id": 1,
    "material_id": 10,
    "questionType": "MULTIPLE_CHOICE"
  }
}
```

### 7.4 Update Quiz

- Method: `PUT`
- Path: `/quizzes/:id`
- Auth: Wajib, role `ADMIN | TEACHER`
- Success response `200`:

```json
{
  "status": "success",
  "message": "Soal berhasil diupdate",
  "data": {
    "id": 1,
    "questionText": "Soal baru"
  }
}
```

### 7.5 Delete Quiz

- Method: `DELETE`
- Path: `/quizzes/:id`
- Auth: Wajib, role `ADMIN | TEACHER`
- Success response `200`:

```json
{
  "status": "success",
  "message": "Soal berhasil dihapus"
}
```

### 7.6 Check Answer

- Method: `POST`
- Path: `/quizzes/:id/check`
- Auth: Wajib
- Request body:

```json
{
  "answer": "jawaban user"
}
```

- Success response `200`:

```json
{
  "status": "success",
  "data": {
    "isCorrect": true,
    "score": 100
  }
}
```

---

## 8. Score Endpoints

### 8.1 Save Score

- Method: `POST`
- Path: `/scores`
- Auth: Wajib
- Request body:

```json
{
  "material_id": 10,
  "score": 85
}
```

- Success response `201`:

```json
{
  "status": "success",
  "message": "Skor berhasil disimpan",
  "data": {
    "id": 1,
    "user_id": 1,
    "material_id": 10,
    "score": 85
  }
}
```

### 8.2 Get My Scores

- Method: `GET`
- Path: `/scores/my-scores`
- Auth: Wajib
- Success response `200`:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "material_id": 10,
      "score": 85,
      "createdAt": "2026-06-09T00:00:00.000Z"
    }
  ]
}
```

### 8.3 Get Scores by Material

- Method: `GET`
- Path: `/scores/material/:materialId`
- Auth: Wajib, role `ADMIN | TEACHER`
- Params:
  - `materialId` (number)
- Success response `200`:

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "user_id": 2,
      "material_id": 10,
      "score": 90
    }
  ]
}
```

---

## 9. Rekomendasi Frontend Fetch

Gunakan helper axios seperti ini:

```ts
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});
```

Untuk endpoint yang membutuhkan auth, kirim cookie secara otomatis dengan `withCredentials: true`.
