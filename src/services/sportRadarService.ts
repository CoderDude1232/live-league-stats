import { apiClient } from './apiClient';
import { API_CONFIG, NRL_COMPETITION_ID, CURRENT_SEASON_ID } from '../config/api';
import { Match } from '../types/Match';
import { Team as StandingsTeam } from '../types/Standings';
import { Player } from '../types/Player';

export interface SportRadarMatch {
  id: string;
  scheduled: string;
  status: string;
  home_team: {
    id: string;
    name: string;
    abbreviation: string;
  };
  away_team: {
    id: string;
    name: string;
    abbreviation: string;
  };
  home_score?: number;
  away_score?: number;
  venue?: {
    name: string;
    capacity: number;
  };
  attendance?: number;
  period?: {
    number: number;
    type: string;
  };
  clock?: string;
}

export interface SportRadarStandings {
  standings: Array<{
    team: {
      id: string;
      name: string;
      abbreviation: string;
    };
    rank: number;
    played: number;
    wins: number;
    losses: number;
    draws: number;
    points_for: number;
    points_against: number;
    point_differential: number;
    points: number;
  }>;
}

export interface SportRadarPlayerStats {
  players: Array<{
    id: string;
    name: string;
    position: string;
    team: {
      id: string;
      name: string;
      abbreviation: string;
    };
    statistics: {
      tries: number;
      goals: number;
      points: number;
      tackles: number;
      run_meters: number;
      line_breaks: number;
    };
  }>;
}

class SportRadarService {
  private teamLogos: { [key: string]: string } = {
    'penrith': '🐆',
    'melbourne': '⚡',
    'brisbane': '🐎',
    'sydney': '🐓',
    'south sydney': '🐰',
    'parramatta': '🐍',
    'cronulla': '🦈',
    'newcastle': '⚔️',
    'canterbury': '🐕',
    'wests': '🐅',
    'gold coast': '⚡',
    'manly': '🦅',
    'warriors': '⚔️',
    'canberra': '🐸',
    'st george': '🐉',
    'north queensland': '🐄'
  };

  private getTeamLogo(teamName: string): string {
    const key = teamName.toLowerCase();
    for (const [name, logo] of Object.entries(this.teamLogos)) {
      if (key.includes(name)) {
        return logo;
      }
    }
    return '🏉'; // Default rugby ball emoji
  }

  private mapMatchStatus(status: string): 'live' | 'upcoming' | 'finished' {
    switch (status.toLowerCase()) {
      case 'inprogress':
      case 'live':
        return 'live';
      case 'scheduled':
      case 'postponed':
        return 'upcoming';
      case 'closed':
      case 'complete':
        return 'finished';
      default:
        return 'upcoming';
    }
  }

  private formatMatchTime(match: SportRadarMatch): string {
    if (match.status === 'inprogress' && match.clock) {
      return match.clock;
    }
    if (match.status === 'scheduled') {
      return new Date(match.scheduled).toLocaleTimeString('en-AU', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    if (match.status === 'closed') {
      return 'FT';
    }
    return 'TBD';
  }

  getMatches = async (): Promise<Match[]> => {
    try {
      const url = API_CONFIG.SPORTRADAR.ENDPOINTS.MATCHES
        .replace('{season_id}', CURRENT_SEASON_ID);
      
      const response = await apiClient.get<{ schedules: SportRadarMatch[] }>(url);
      
      return response.schedules.map((match): Match => ({
        id: match.id,
        homeTeam: {
          name: match.home_team.name,
          logo: this.getTeamLogo(match.home_team.name),
          score: match.home_score || 0
        },
        awayTeam: {
          name: match.away_team.name,
          logo: this.getTeamLogo(match.away_team.name),
          score: match.away_score || 0
        },
        status: this.mapMatchStatus(match.status),
        time: this.formatMatchTime(match),
        venue: match.venue?.name || 'TBD',
        attendance: match.attendance || 0,
        round: `Round ${match.period?.number || 'TBD'}`
      }));
    } catch (error) {
      console.error('Error fetching matches:', error);
      // Return fallback mock data
      return this.getMockMatches();
    }
  }

  getLiveMatches = async (): Promise<Match[]> => {
    try {
      const url = API_CONFIG.SPORTRADAR.ENDPOINTS.LIVE_MATCHES
        .replace('{season_id}', CURRENT_SEASON_ID);
      
      const response = await apiClient.get<{ matches: SportRadarMatch[] }>(url, {}, false); // Don't cache live data
      
      return response.matches.map((match): Match => ({
        id: match.id,
        homeTeam: {
          name: match.home_team.name,
          logo: this.getTeamLogo(match.home_team.name),
          score: match.home_score || 0
        },
        awayTeam: {
          name: match.away_team.name,
          logo: this.getTeamLogo(match.away_team.name),
          score: match.away_score || 0
        },
        status: 'live',
        time: this.formatMatchTime(match),
        venue: match.venue?.name || 'TBD',
        attendance: match.attendance || 0,
        round: `Round ${match.period?.number || 'TBD'}`
      }));
    } catch (error) {
      console.error('Error fetching live matches:', error);
      return [];
    }
  }

  getStandings = async (): Promise<StandingsTeam[]> => {
    try {
      const url = API_CONFIG.SPORTRADAR.ENDPOINTS.STANDINGS
        .replace('{season_id}', CURRENT_SEASON_ID);
      
      const response = await apiClient.get<SportRadarStandings>(url);
      
      return response.standings.map((standing): StandingsTeam => ({
        position: standing.rank,
        name: standing.team.name,
        logo: this.getTeamLogo(standing.team.name),
        played: standing.played,
        wins: standing.wins,
        losses: standing.losses,
        draws: standing.draws,
        points: standing.points,
        differential: standing.point_differential,
        form: ['W', 'W', 'L', 'W', 'L'], // This would need additional API calls to get recent form
        change: 'same' as const
      }));
    } catch (error) {
      console.error('Error fetching standings:', error);
      // Return fallback mock data
      return this.getMockStandings();
    }
  }

  getPlayerStats = async (): Promise<Player[]> => {
    try {
      const url = API_CONFIG.SPORTRADAR.ENDPOINTS.PLAYER_STATS
        .replace('{season_id}', CURRENT_SEASON_ID);
      
      const response = await apiClient.get<SportRadarPlayerStats>(url);
      
      return response.players.map((player): Player => ({
        name: player.name,
        team: player.team.name,
        teamLogo: this.getTeamLogo(player.team.name),
        position: player.position,
        stats: {
          tries: player.statistics.tries,
          goals: player.statistics.goals,
          points: player.statistics.points,
          tackles: player.statistics.tackles,
          runMeters: player.statistics.run_meters,
          lineBreaks: player.statistics.line_breaks
        }
      }));
    } catch (error) {
      console.error('Error fetching player stats:', error);
      // Return fallback mock data
      return this.getMockPlayerStats();
    }
  }

  // Fallback mock data methods
  private getMockMatches(): Match[] {
    return [
      {
        id: '1',
        homeTeam: { name: 'Sydney Roosters', logo: '🐓', score: 18 },
        awayTeam: { name: 'Melbourne Storm', logo: '⚡', score: 14 },
        status: 'live',
        time: '67:32',
        venue: 'Allianz Stadium',
        attendance: 42156,
        round: 'Round 15'
      },
      {
        id: '2',
        homeTeam: { name: 'Brisbane Broncos', logo: '🐎', score: 22 },
        awayTeam: { name: 'Parramatta Eels', logo: '🐍', score: 16 },
        status: 'live',
        time: '45:18',
        venue: 'Suncorp Stadium',
        attendance: 38942,
        round: 'Round 15'
      }
    ];
  }

  private getMockStandings(): StandingsTeam[] {
    return [
      {
        position: 1,
        name: 'Penrith Panthers',
        logo: '🐆',
        played: 15,
        wins: 12,
        losses: 3,
        draws: 0,
        points: 24,
        differential: 156,
        form: ['W', 'W', 'W', 'L', 'W'],
        change: 'same'
      }
    ];
  }

  private getMockPlayerStats(): Player[] {
    return [
      {
        name: 'Nathan Cleary',
        team: 'Penrith Panthers',
        teamLogo: '🐆',
        position: 'Halfback',
        stats: { tries: 8, goals: 45, points: 122, tackles: 234, runMeters: 1456, lineBreaks: 12 }
      }
    ];
  }
}

export const sportRadarService = new SportRadarService();