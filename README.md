# NRL Live Stats

A modern, real-time NRL (National Rugby League) statistics application built with React, TypeScript, and Tailwind CSS. Features live match scores, player statistics, and team standings with Zyla API integration.

## Features

- **Live Match Scores**: Real-time updates of ongoing NRL matches
- **Player Statistics**: Comprehensive player stats including tries, goals, points, tackles, and more
- **Team Standings**: Current NRL ladder with team positions, form, and statistics
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Automatic data refresh with configurable intervals
- **Offline Support**: Graceful handling of network connectivity issues
- **Caching**: Intelligent data caching to reduce API calls and improve performance

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **API**: Zyla Rugby League API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Zyla API key (sign up at [Zyla](https://zylalabs.com))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd live-league-stats
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
VITE_ZYLA_API_KEY=your_zyla_api_key_here
VITE_ZYLA_BASE_URL=https://api.zyla.com/nrl/v1
VITE_API_CACHE_DURATION=300000
VITE_LIVE_UPDATE_INTERVAL=30000
```

5. Start the development server:
```bash
npm run dev
```

## API Configuration

### Zyla Setup

1. Sign up for a Zyla developer account
2. Subscribe to the NRL Rugby League API
3. Get your API key from the dashboard
4. Update the `.env` file with your credentials

### API Endpoints Used

- **Matches**: Season schedules and live match data
- **Standings**: Team ladder and statistics
- **Player Stats**: Individual player performance data
- **Live Updates**: Real-time match events and scores

## Features in Detail

### Live Matches
- Real-time score updates every 30 seconds
- Match status indicators (Live, Upcoming, Finished)
- Venue information and attendance figures
- Team logos and match details

### Player Statistics
- Sortable by different categories (Points, Tries, Run Meters, Tackles)
- Top performers in each category
- Team affiliations and positions
- Season-long statistics

### Team Standings
- Current NRL ladder positions
- Win/loss records and points differential
- Recent form indicators
- Finals qualification markers

### Data Management
- Intelligent caching with configurable duration
- Automatic retry logic with exponential backoff
- Graceful error handling and fallback data
- Network status monitoring

## Development

### Project Structure

```
src/
├── components/          # React components
├── services/           # API services and data fetching
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── config/             # Configuration files
└── index.css           # Global styles
```

### Key Components

- `LiveMatches`: Real-time match display with live updates
- `PlayerStats`: Interactive player statistics with sorting
- `Standings`: Team ladder with form indicators
- `useApiData`: Custom hook for API data management

### API Service Architecture

- `apiClient`: HTTP client with caching and retry logic
- `zylaService`: Zyla API integration
- `useApiData`: React hook for data fetching and state management

## Configuration Options

### Environment Variables

- `VITE_ZYLA_API_KEY`: Your Zyla API key
- `VITE_ZYLA_BASE_URL`: Zyla API base URL
- `VITE_API_CACHE_DURATION`: Cache duration in milliseconds (default: 5 minutes)
- `VITE_LIVE_UPDATE_INTERVAL`: Live data refresh interval (default: 30 seconds)

### Customization

- Update team logos in `zylaService.ts`
- Modify refresh intervals in component configurations
- Adjust caching strategies in `apiClient.ts`

## Building for Production

```bash
npm run build
```

The built application will be in the `dist` directory.

## Running Tests

Execute unit tests with Vitest:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the Zyla API documentation
- Review the error handling in browser console
- Ensure your API key has proper permissions
- Verify network connectivity for live features