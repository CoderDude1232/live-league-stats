export interface Team {
  name: string;
  logo: string;
  score: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  status: 'live' | 'upcoming' | 'finished';
  time: string;
  venue: string;
  attendance: number;
  round: string;
}