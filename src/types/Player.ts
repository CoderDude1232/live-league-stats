export interface Player {
  name: string;
  team: string;
  teamLogo: string;
  position: string;
  stats: {
    tries: number;
    goals: number;
    points: number;
    tackles: number;
    runMeters: number;
    lineBreaks: number;
  };
}