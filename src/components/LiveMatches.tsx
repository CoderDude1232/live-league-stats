import React, { useState } from 'react';
import { Clock, MapPin, Users, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import MatchCard from './MatchCard';
import { Match } from '../types/Match';
import { sportRadarService } from '../services/sportRadarService';
import { useApiData } from '../hooks/useApiData';

const LiveMatches: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Fetch all matches
  const {
    data: allMatches,
    loading: matchesLoading,
    error: matchesError,
    lastUpdated: matchesLastUpdated,
    refresh: refreshMatches
  } = useApiData(() => sportRadarService.getMatches(), {
    refreshInterval: 60000 // Refresh every minute for general matches
  });

  // Fetch live matches more frequently
  const {
    data: liveMatchesData,
    loading: liveLoading,
    error: liveError,
    lastUpdated: liveLastUpdated,
    refresh: refreshLive
  } = useApiData(() => sportRadarService.getLiveMatches(), {
    refreshInterval: 30000 // Refresh every 30 seconds for live matches
  });

  // Monitor online status
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Merge live data with all matches data
  const matches = React.useMemo(() => {
    if (!allMatches) return [];
    
    let mergedMatches = [...allMatches];
    
    // Update with live data if available
    if (liveMatchesData) {
      liveMatchesData.forEach(liveMatch => {
        const index = mergedMatches.findIndex(match => match.id === liveMatch.id);
        if (index !== -1) {
          mergedMatches[index] = liveMatch;
        } else {
          mergedMatches.push(liveMatch);
        }
      });
    }
    
    return mergedMatches;
  }, [allMatches, liveMatchesData]);

  const liveMatches = matches.filter(match => match.status === 'live');
  const upcomingMatches = matches.filter(match => match.status === 'upcoming');
  const finishedMatches = matches.filter(match => match.status === 'finished');

  const handleRefresh = () => {
    refreshMatches();
    refreshLive();
  };

  if (matchesLoading && !matches.length) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-nrl-blue mx-auto mb-4" />
          <p className="text-slate-600">Loading match data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Status Bar */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Wifi className="w-5 h-5 text-green-600" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-600" />
              )}
              <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                {isOnline ? 'Connected' : 'Offline'}
              </span>
            </div>
            
            {matchesLastUpdated && (
              <div className="text-sm text-slate-600">
                Last updated: {matchesLastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={matchesLoading || liveLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-nrl-blue text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${(matchesLoading || liveLoading) ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
        
        {(matchesError || liveError) && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">
              {matchesError || liveError} - Showing cached data
            </p>
          </div>
        )}
      </div>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-slate-800">Live Now</h2>
            </div>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {liveMatches.length} match{liveMatches.length !== 1 ? 'es' : ''}
            </span>
            {liveLastUpdated && (
              <span className="text-sm text-slate-500">
                Updated {liveLastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {liveMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Matches */}
      {upcomingMatches.length > 0 && (
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">Upcoming</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Results */}
      {finishedMatches.length > 0 && (
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Recent Results</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {finishedMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {matches.length === 0 && !matchesLoading && (
        <div className="text-center py-12">
          <p className="text-slate-600">No matches available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default LiveMatches;