export interface Team {
  position: number;
  name: string;
  logo: string;
  played: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;
  differential: number;
  form: string[];
  change: 'up' | 'down' | 'same';
}