export const dummyUser = {
  name: "Budi Santoso",
  username: "budis",
  email: "budi@email.com",
  level: 5,
  points: 1240,
  streak: 7,
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD30A-CsMsJs5ASw4s-5QvvbymzzCbEYiOiRSv7F7ld-5CJwG-aWRBc_qa00bQIAYzKTVviNfSZuHh6ZpUeE9reGsLtyegJ_2RdQx55ju00q3f687k5KYvbZffp8QlaE-qMC-mlSW8gtjxO60sDOZxcFoDZxKUEqMZCu78StSUomSo3WCCSDIooby2XUNk4dB_DD7KFiDW-5JesbUV2oBg8D35PQATItzMnR3hLCpfK1xt9XzRgSeSY_CX20_qe-FHCUjO9F28hhTA",
};

export const classesData = [
  {
    id: "3",
    name: "Kelas 3",
    icon: "rocket_launch",
    variant: "green" as const,
    description: "Mulai belajar dasar membaca, mendengar, dan kosakata baru.",
    progress: 75,
  },
  {
    id: "4",
    name: "Kelas 4",
    icon: "biotech",
    variant: "blue" as const,
    description: "Tingkatkan kemampuan bahasa dengan cerita yang lebih seru.",
    progress: 30,
  },
  {
    id: "5",
    name: "Kelas 5",
    icon: "explore",
    variant: "orange" as const,
    description: "Latihan menulis dan berbicara yang lebih menantang.",
    progress: 0,
  },
  {
    id: "6",
    name: "Kelas 6",
    icon: "school",
    variant: "green" as const,
    description: "Persiapan menghadapi ujian dengan materi lanjutan.",
    progress: 0,
  },
];

export const chaptersData = [
  {
    id: "reading",
    title: "Reading",
    description: "Latihan membaca cerita seru",
    icon: "menu_book",
    variant: "primary" as const,
    progress: 65,
    estimatedMinutes: 5,
    totalQuestions: 5,
  },
  {
    id: "listening",
    title: "Listening",
    description: "Melatih pendengaran dari audio",
    icon: "headphones",
    variant: "secondary" as const,
    progress: 0,
    estimatedMinutes: 8,
    totalQuestions: 5,
  },
  {
    id: "writing",
    title: "Writing",
    description: "Latihan merangkai kata",
    icon: "edit",
    variant: "tertiary" as const,
    progress: 0,
    estimatedMinutes: 10,
    totalQuestions: 3,
  },
  {
    id: "speaking",
    title: "Speaking",
    description: "Ayo bicara dengan lantang",
    icon: "record_voice_over",
    variant: "error" as const,
    progress: 0,
    estimatedMinutes: 5,
    totalQuestions: 5,
  },
  {
    id: "vocabulary",
    title: "Vocabulary",
    description: "Kamus kata baru",
    icon: "library_books",
    variant: "on-secondary-fixed-variant" as const,
    progress: 100,
    estimatedMinutes: 5,
    totalQuestions: 10,
  },
];

export const quizQuestions = {
  reading: [
    {
      id: 1,
      question: "Apa makanan kesukaan burung hantu?",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCu3szECAhoZo74vcppT8pe-G0WHz8BDLPGOa21iI392pI8V3fN5VXqrxXXXOkW5vr5aAOMbj8mqL39Kq9j8UmdznKNKc43UGpndghNMaAAs2HeAK5M0gYwTwYbkPB7DvgRkh4qJI8bjYGyoKqk-rDvPobOPNuXfTPxX--KZE8rlwnIxsfsODplJac869hEAGBcJM9rwAexn-zvlg2I34oSmiTA7HhrC5_rXw2ykjwYwikrzg5xWwb7iBhwzj4rSbH-G5SEmKMfC8A",
      textContext: "Burung hantu adalah hewan yang sangat cerdas. Mereka aktif di malam hari dan memiliki pendengaran yang luar biasa tajam untuk mencari makan seperti tikus atau serangga.",
      options: [
        { id: "A", label: "A", text: "Buah-buahan" },
        { id: "B", label: "B", text: "Tikus dan serangga" },
        { id: "C", label: "C", text: "Sayuran hijau" },
        { id: "D", label: "D", text: "Ikan laut" },
      ],
      correctAnswer: "B"
    },
    {
      id: 2,
      question: "Kapan burung hantu biasanya mencari makan?",
      textContext: "Karena tergolong hewan nokturnal, burung hantu akan tidur di siang hari dan baru mulai berburu mangsa ketika hari sudah gelap.",
      options: [
        { id: "A", label: "A", text: "Pagi Hari" },
        { id: "B", label: "B", text: "Siang Hari" },
        { id: "C", label: "C", text: "Malam Hari" },
        { id: "D", label: "D", text: "Sore Hari" },
      ],
      correctAnswer: "C"
    },
    {
      id: 3,
      question: "Apa kelebihan utama burung hantu?",
      options: [
        { id: "A", label: "A", text: "Bisa berenang" },
        { id: "B", label: "B", text: "Berlari sangat cepat" },
        { id: "C", label: "C", text: "Pendengaran dan penglihatan tajam" },
        { id: "D", label: "D", text: "Bisa meniru suara manusia" },
      ],
      correctAnswer: "C"
    }
  ]
};
