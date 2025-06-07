import React from 'react';
import { TrendingUp, TrendingDown, Minus, RefreshCw, AlertCircle } from 'lucide-react';
import { Team } from '../types/Standings';
import { sportRadarService } from '../services/sportRadarService';
import { useApiData } from '../hooks/useApiData';

const Standings: React.FC = () => {
  const {
    data: teams,
    loading,
    error,
    lastUpdated,
    refresh
  } = useApiData(sportRadarService.getStandings, {
    refreshInterval: 300000 // Refresh every 5 minutes for standings
  });

  const getChangeIcon = (change: string) => {
    switch (change) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getFormColor = (result: string) => {
    return result === 'W' ? 'bg-green-500' : result === 'L' ? 'bg-red-500' : 'bg-gray-400';
  };

  if (loading && !teams) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-nrl-blue mx-auto mb-4" />
          <p className="text-slate-600">Loading standings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">NRL Ladder</h2>
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <div className="text-sm text-slate-600">
              Updated: {lastUpdated.toLocaleDateString()}
            </div>
          )}
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-nrl-blue text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <p className="text-yellow-800 text-sm">
              {error} - Showing cached data
            </p>
          </div>
        </div>
      )}

      {teams && teams.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-nrl-blue to-blue-700 text-white px-6 py-4">
            <div className="grid grid-cols-12 gap-4 items-center text-sm font-semibold">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Team</div>
              <div className="col-span-1 text-center">P</div>
              <div className="col-span-1 text-center">W</div>
              <div className="col-span-1 text-center">L</div>
              <div className="col-span-1 text-center">Pts</div>
              <div className="col-span-1 text-center">+/-</div>
              <div className="col-span-2 text-center">Form</div>
            </div>
          </div>

          {/* Teams */}
          <div className="divide-y divide-slate-200">
            {teams.map((team, index) => (
              <div
                key={team.name}
                className={`px-6 py-4 hover:bg-slate-50 transition-colors ${
                  index < 8 ? 'border-l-4 border-l-green-500' : ''
                }`}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 flex items-center space-x-2">
                    <span className="font-bold text-lg">{team.position}</span>
                    {getChangeIcon(team.change)}
                  </div>
                  
                  <div className="col-span-4 flex items-center space-x-3">
                    <div className="text-2xl">{team.logo}</div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{team.name}</h3>
                    </div>
                  </div>
                  
                  <div className="col-span-1 text-center font-medium">{team.played}</div>
                  <div className="col-span-1 text-center font-medium text-green-600">{team.wins}</div>
                  <div className="col-span-1 text-center font-medium text-red-600">{team.losses}</div>
                  <div className="col-span-1 text-center font-bold text-lg">{team.points}</div>
                  <div className={`col-span-1 text-center font-medium ${
                    team.differential > 0 ? 'text-green-600' : team.differential < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {team.differential > 0 ? '+' : ''}{team.differential}
                  </div>
                  
                  <div className="col-span-2 flex justify-center space-x-1">
                    {team.form.map((result, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${getFormColor(result)}`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-green-500 rounded"></div>
                <span>Finals Position (Top 8)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>P: Played</span>
                <span>W: Wins</span>
                <span>L: Losses</span>
                <span>Pts: Points</span>
                <span>+/-: Points Differential</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600">No standings data available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Standings;