export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  isUser: boolean;
}

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Siti K.", points: 3450, isUser: false },
  { rank: 2, name: "Budi Santoso", points: 1240, isUser: true },
  { rank: 3, name: "Ahmad F.", points: 1100, isUser: false },
  { rank: 4, name: "Dina R.", points: 950, isUser: false },
  { rank: 5, name: "Bima S.", points: 800, isUser: false },
];
