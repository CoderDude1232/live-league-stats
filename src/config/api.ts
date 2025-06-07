export const API_CONFIG = {
  SPORTRADAR: {
    BASE_URL: import.meta.env.VITE_SPORTRADAR_BASE_URL || 'https://api.sportradar.us/rugby-league/trial/v2/en',
    API_KEY: import.meta.env.VITE_SPORTRADAR_API_KEY || '',
    ENDPOINTS: {
      COMPETITIONS: '/competitions',
      SEASONS: '/competitions/{competition_id}/seasons',
      STANDINGS: '/seasons/{season_id}/standings',
      MATCHES: '/seasons/{season_id}/schedules',
      LIVE_MATCHES: '/seasons/{season_id}/live_standings',
      MATCH_SUMMARY: '/matches/{match_id}/summary',
      PLAYER_STATS: '/seasons/{season_id}/players',
      TEAM_STATS: '/seasons/{season_id}/teams'
    }
  },
  CACHE_DURATION: parseInt(import.meta.env.VITE_API_CACHE_DURATION || '300000'), // 5 minutes
  LIVE_UPDATE_INTERVAL: parseInt(import.meta.env.VITE_LIVE_UPDATE_INTERVAL || '30000'), // 30 seconds
  REQUEST_TIMEOUT: 10000, // 10 seconds
  MAX_RETRIES: 3
};

// NRL Competition ID (this would be obtained from SportRadar)
export const NRL_COMPETITION_ID = 'sr:competition:1234'; // Replace with actual NRL competition ID
export const CURRENT_SEASON_ID = 'sr:season:5678'; // Replace with current season ID