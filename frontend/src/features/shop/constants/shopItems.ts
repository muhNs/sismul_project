export interface ShopItemData {
  id: string;
  title: string;
  desc: string;
  price: number;
  icon: string;
  color: string;
}

export const shopItemsData: ShopItemData[] = [
  {
    id: "freeze",
    title: "Pembeku Streak",
    desc: "Lindungi streak belajarmu dari 1 hari kosong.",
    price: 200,
    icon: "ac_unit",
    color: "secondary",
  },
  {
    id: "double",
    title: "XP Ganda",
    desc: "Dapatkan poin 2x lipat selama 15 menit.",
    price: 450,
    icon: "bolt",
    color: "tertiary",
  },
  {
    id: "outfit",
    title: "Kacamata Pintar",
    desc: "Aksesoris keren untuk avatarmu.",
    price: 1500,
    icon: "eyeglasses",
    color: "primary",
  },
];
