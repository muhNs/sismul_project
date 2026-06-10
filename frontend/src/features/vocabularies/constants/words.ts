export interface WordItem {
  english: string;
  indonesian: string;
  image: string;
  category: string;
  highlighted?: boolean;
}

export const wordsData: WordItem[] = [
  {
    english: "Elephant",
    indonesian: "Gajah",
    category: "animals",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsTPplKGIf2hnVGrNj2FVlkLihn8QBPXzCrBXuecBRMKaxUEBRpMlvkNxdJ8zwD94trDWj3OtRMaBL5v3F7oCmDwL3-OOJl2QAOVvgeU9RvPy7Q_6Eh38-eKB_GeahmNkMlh3c1s_pkP8uzYzZ0cx_6JrC4HEGTbzZ_93_3WyRjgmv4UL_7cFGSdie6SHr2vy4ESjFSH9n34CAahK9bPI5GmwFttnfkHm2uQ5d5cYWd9eiKhFF6fXrEqZbzdhH7bSgoY8br1hM6JE",
  },
  {
    english: "Tiger",
    indonesian: "Harimau",
    category: "animals",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDazu3A7g6hpjkSJhzKdJCKCnqoiij8lvdGZWh3pDxDFKkmSfHL-kKKK0To9lbqRQ2LxMy5OjdIf2nx6mN0CCjVbHClXJj1F4JQojTu7xPsImGp4_inZ1M4d_RGwh6gw9ZGDTR30E0yQjmsyO8Afni0jynPFBDOy6thtEX8dWyvBRsoT8N1EgaoVPrKUENVBWQFZlvnmNbtJLBQ9s3HfMT7yu6itQQOTLBldE-Fb8iz2ObZWIOwdm5Xaaz84iCrNe8OrFJkW4u2c9E",
  },
  {
    english: "Owl",
    indonesian: "Burung Hantu",
    category: "animals",
    highlighted: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh3-lf8GXwOkuSuxJMBlgqnpaDsYsC0QydfEf96VmHga6MgHQ_DcZWia5hOno-6_4h0wJrS1vQWQj9vzzcOaUFGmIZ5_Xf9-st9wYA9qzg7FVWvlnxqqK76tyPxAN2gY2rTT85U6I9Jj01ImDSN6stHLrCAFdyKOy16Y9Uoz6RJOlT9c7AH0hk24fRYrUZ_WdBDhrdQ4HXxzihc225NbfE4E7Lfc7w5VDwMhRYD3exoS1BU0BqBrV9o1FR9brWyKxx77abFYdFAiQ",
  },
  {
    english: "Rabbit",
    indonesian: "Kelinci",
    category: "animals",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA78ceBrgBLCuF1DszwV1Gk3EPHtOCbEemn3Dg7NRfq1oB3wrL3aI03goKfkRUS_mg160USm2bsDyyhxnxdVFhbykbx4WJx7JztEjRKLxCt1Nkzdsam0emiQV6flNLlfiwcLGJ3VVqNLDyxerppj3Yi1ucsAcebNaaxKj71TI37d306AmNxdrbWR1vDLDa1uwmNa9Q_sG_rdlF984xRSgivAz14OF07B-70FG-u1H4Q03ZNIKcvacJQrEsJmEd0FdH6mt6ZaDqvnJw",
  },
  {
    english: "Apple",
    indonesian: "Apel",
    category: "food",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWik5nXVvd4r3SlZKQy4ByjJYCZsLw9NCeXpbkgKGovI0_Vci_bXvjjtSz5ab8LSB6NtP1cl4ureFkjoDgO9QKeGvutycvXY-baQ5wv3aX4MCorEJ5zDO9F58DHCfKmn8ZZGgb2wRYE97fQxJagYiw8hYPFkkNP9uHvZXyaXuWJ6hTxqEtwEIjE-N9mCZk2u0zekpEq3jkkdjBx2-5KBsMuUK2tlE7lifrZDoCPCC-exStlULOctqzE0BKl2JwyydrW6RsTl5rQp4",
  },
  {
    english: "Bread",
    indonesian: "Roti",
    category: "food",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5HqHAaZNLTfclUGp_6vJlXmDj3Hwmwghc28-nmrv36aY2Bmj1BjlGLdtDdwgFwwRt7HA1kN1XvrGYUo0Ygxgptks2SfrwpnklUUbm-WWn3Sn9O6SHThupJX6mFO24_TBus8vR8ZAXBt7qihTzFTOOWE_mNuYlHcXjiL0O6HS8T2adc8Azg2OUj78T9dfnZ6at0gZaJf2chbuWHKX-J3egeLIhO-uHTk1DYTchfpz7qhYacowZQZ8PEBjlrcXcQHPf19upEByhXL8",
  },
];
