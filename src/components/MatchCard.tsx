import React from 'react';
import { MapPin, Users, Clock } from 'lucide-react';
import { Match } from '../types/Match';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'text-red-600 bg-red-50 border-red-200';
      case 'upcoming': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'finished': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string, time: string) => {
    switch (status) {
      case 'live': return `${time} LIVE`;
      case 'upcoming': return `${time}`;
      case 'finished': return 'Full Time';
      default: return time;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg card-hover border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">{match.round}</span>
          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(match.status)}`}>
            {match.status === 'live' && <span className="live-indicator mr-2"></span>}
            {getStatusText(match.status, match.time)}
          </div>
        </div>
      </div>

      {/* Teams and Scores */}
      <div className="px-6 py-6">
        <div className="space-y-4">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{match.homeTeam.logo}</div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{match.homeTeam.name}</h3>
                <span className="text-sm text-slate-500">Home</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {match.status === 'upcoming' ? '-' : match.homeTeam.score}
            </div>
          </div>

          {/* VS Divider */}
          <div className="flex items-center justify-center">
            <div className="w-full h-px bg-slate-200"></div>
            <span className="px-4 text-sm font-medium text-slate-400 bg-white">VS</span>
            <div className="w-full h-px bg-slate-200"></div>
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{match.awayTeam.logo}</div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{match.awayTeam.name}</h3>
                <span className="text-sm text-slate-500">Away</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {match.status === 'upcoming' ? '-' : match.awayTeam.score}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{match.venue}</span>
          </div>
          {match.attendance > 0 && (
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{match.attendance.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;