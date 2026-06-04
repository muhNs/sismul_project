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
      question: "Apa arti dari kalimat 'The cat is sleeping on the sofa'?",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD30A-CsMsJs5ASw4s-5QvvbymzzCbEYiOiRSv7F7ld-5CJwG-aWRBc_qa00bQIAYzKTVviNfSZuHh6ZpUeE9reGsLtyegJ_2RdQx55ju00q3f687k5KYvbZffp8QlaE-qMC-mlSW8gtjxO60sDOZxcFoDZxKUEqMZCu78StSUomSo3WCCSDIooby2XUNk4dB_DD7KFiDW-5JesbUV2oBg8D35PQATItzMnR3hLCpfK1xt9XzRgSeSY_CX20_qe-FHCUjO9F28hhTA",
      textContext: "Look at the picture! The cat is very lazy today. The cat is sleeping on the sofa.",
      options: [
        { id: "A", label: "A", text: "Kucing itu sedang makan di sofa" },
        { id: "B", label: "B", text: "Kucing itu sedang tidur di sofa" },
        { id: "C", label: "C", text: "Kucing itu sedang melompat" },
        { id: "D", label: "D", text: "Anjing itu sedang tidur" },
      ],
      correctAnswer: "B"
    },
    {
      id: 2,
      question: "Kata mana yang berarti 'malas' dalam teks di atas?",
      textContext: "Look at the picture! The cat is very lazy today. The cat is sleeping on the sofa.",
      options: [
        { id: "A", label: "A", text: "Look" },
        { id: "B", label: "B", text: "Picture" },
        { id: "C", label: "C", text: "Lazy" },
        { id: "D", label: "D", text: "Today" },
      ],
      correctAnswer: "C"
    },
    {
      id: 3,
      question: "Pilih jawaban yang benar: The cat ___ very lazy today.",
      options: [
        { id: "A", label: "A", text: "am" },
        { id: "B", label: "B", text: "are" },
        { id: "C", label: "C", text: "is" },
        { id: "D", label: "D", text: "were" },
      ],
      correctAnswer: "C"
    }
  ]
};
