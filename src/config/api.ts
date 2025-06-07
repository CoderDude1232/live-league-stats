export const API_CONFIG = {
  ZYLA: {
    BASE_URL: import.meta.env.VITE_ZYLA_BASE_URL || 'https://api.zyla.com/nrl/v1',
    API_KEY: import.meta.env.VITE_ZYLA_API_KEY || '',
    ENDPOINTS: {
      COMPETITIONS: '/competitions',
      SEASONS: '/competitions/{competition_id}/seasons',
      STANDINGS: '/seasons/{season_id}/standings',
      MATCHES: '/seasons/{season_id}/matches',
      // Endpoint for currently live matches
      LIVE_MATCHES: '/seasons/{season_id}/matches/live',
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

// NRL Competition ID (obtain from your Zyla dashboard)
export const NRL_COMPETITION_ID = 'zyla:competition:1234'; // Replace with actual NRL competition ID
export const CURRENT_SEASON_ID = 'zyla:season:5678'; // Replace with current season ID
