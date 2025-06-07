import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Team {
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

const Standings: React.FC = () => {
  const teams: Team[] = [
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
    },
    {
      position: 2,
      name: 'Melbourne Storm',
      logo: '⚡',
      played: 15,
      wins: 11,
      losses: 4,
      draws: 0,
      points: 22,
      differential: 98,
      form: ['W', 'L', 'W', 'W', 'W'],
      change: 'up'
    },
    {
      position: 3,
      name: 'Brisbane Broncos',
      logo: '🐎',
      played: 15,
      wins: 10,
      losses: 5,
      draws: 0,
      points: 20,
      differential: 67,
      form: ['W', 'W', 'L', 'W', 'L'],
      change: 'down'
    },
    {
      position: 4,
      name: 'Sydney Roosters',
      logo: '🐓',
      played: 15,
      wins: 9,
      losses: 6,
      draws: 0,
      points: 18,
      differential: 45,
      form: ['L', 'W', 'W', 'L', 'W'],
      change: 'up'
    },
    {
      position: 5,
      name: 'South Sydney Rabbitohs',
      logo: '🐰',
      played: 15,
      wins: 8,
      losses: 7,
      draws: 0,
      points: 16,
      differential: 23,
      form: ['W', 'L', 'L', 'W', 'W'],
      change: 'same'
    },
    {
      position: 6,
      name: 'Parramatta Eels',
      logo: '🐍',
      played: 15,
      wins: 8,
      losses: 7,
      draws: 0,
      points: 16,
      differential: 12,
      form: ['L', 'W', 'L', 'L', 'W'],
      change: 'down'
    },
    {
      position: 7,
      name: 'Cronulla Sharks',
      logo: '🦈',
      played: 15,
      wins: 7,
      losses: 8,
      draws: 0,
      points: 14,
      differential: -8,
      form: ['W', 'L', 'W', 'L', 'L'],
      change: 'up'
    },
    {
      position: 8,
      name: 'Newcastle Knights',
      logo: '⚔️',
      played: 15,
      wins: 6,
      losses: 9,
      draws: 0,
      points: 12,
      differential: -34,
      form: ['L', 'L', 'W', 'L', 'W'],
      change: 'down'
    }
  ];

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">NRL Ladder</h2>
        <div className="text-sm text-slate-600">
          Updated: {new Date().toLocaleDateString()}
        </div>
      </div>

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
    </div>
  );
};

export default Standings;