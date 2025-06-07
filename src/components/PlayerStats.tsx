import React, { useState } from 'react';
import { Award, Target, Zap, Shield } from 'lucide-react';

interface Player {
  name: string;
  team: string;
  teamLogo: string;
  position: string;
  stats: {
    tries: number;
    goals: number;
    points: number;
    tackles: number;
    runMeters: number;
    lineBreaks: number;
  };
}

const PlayerStats: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('points');

  const players: Player[] = [
    {
      name: 'Nathan Cleary',
      team: 'Penrith Panthers',
      teamLogo: '🐆',
      position: 'Halfback',
      stats: { tries: 8, goals: 45, points: 122, tackles: 234, runMeters: 1456, lineBreaks: 12 }
    },
    {
      name: 'Jahrome Hughes',
      team: 'Melbourne Storm',
      teamLogo: '⚡',
      position: 'Fullback',
      stats: { tries: 12, goals: 32, points: 112, tackles: 189, runMeters: 2134, lineBreaks: 18 }
    },
    {
      name: 'Reece Walsh',
      team: 'Brisbane Broncos',
      teamLogo: '🐎',
      position: 'Fullback',
      stats: { tries: 15, goals: 28, points: 116, tackles: 156, runMeters: 1987, lineBreaks: 22 }
    },
    {
      name: 'James Tedesco',
      team: 'Sydney Roosters',
      teamLogo: '🐓',
      position: 'Fullback',
      stats: { tries: 10, goals: 0, points: 40, tackles: 201, runMeters: 2456, lineBreaks: 25 }
    },
    {
      name: 'Cody Walker',
      team: 'South Sydney Rabbitohs',
      teamLogo: '🐰',
      position: 'Five-eighth',
      stats: { tries: 9, goals: 25, points: 86, tackles: 167, runMeters: 1234, lineBreaks: 14 }
    }
  ];

  const categories = [
    { id: 'points', label: 'Points', icon: Award, key: 'points' },
    { id: 'tries', label: 'Tries', icon: Target, key: 'tries' },
    { id: 'runMeters', label: 'Run Meters', icon: Zap, key: 'runMeters' },
    { id: 'tackles', label: 'Tackles', icon: Shield, key: 'tackles' }
  ];

  const getSortedPlayers = (category: string) => {
    return [...players].sort((a, b) => {
      const aValue = a.stats[category as keyof typeof a.stats];
      const bValue = b.stats[category as keyof typeof b.stats];
      return bValue - aValue;
    });
  };

  const formatStat = (value: number, category: string) => {
    if (category === 'runMeters') {
      return `${value.toLocaleString()}m`;
    }
    return value.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">Player Statistics</h2>
        <div className="text-sm text-slate-600">
          Season 2024
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-nrl-blue text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Stats Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-nrl-blue to-blue-700 text-white px-6 py-4">
          <div className="grid grid-cols-12 gap-4 items-center text-sm font-semibold">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-2 text-center">Team</div>
            <div className="col-span-2 text-center">Position</div>
            <div className="col-span-2 text-center">
              {categories.find(c => c.id === activeCategory)?.label}
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {getSortedPlayers(activeCategory).map((player, index) => (
            <div
              key={player.name}
              className="px-6 py-4 hover:bg-slate-50 transition-colors"
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    index === 2 ? 'bg-orange-100 text-orange-800' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                
                <div className="col-span-5">
                  <h3 className="font-semibold text-slate-800">{player.name}</h3>
                </div>
                
                <div className="col-span-2 flex items-center justify-center space-x-2">
                  <span className="text-xl">{player.teamLogo}</span>
                  <span className="text-sm text-slate-600 hidden sm:block">{player.team}</span>
                </div>
                
                <div className="col-span-2 text-center text-sm text-slate-600">
                  {player.position}
                </div>
                
                <div className="col-span-2 text-center">
                  <span className="text-xl font-bold text-nrl-blue">
                    {formatStat(player.stats[activeCategory as keyof typeof player.stats], activeCategory)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          const topPlayer = getSortedPlayers(category.id)[0];
          return (
            <div key={category.id} className="bg-white rounded-xl shadow-lg p-6 card-hover">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-nrl-blue/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-nrl-blue" />
                </div>
                <h3 className="font-semibold text-slate-800">{category.label} Leader</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{topPlayer.teamLogo}</span>
                  <span className="font-bold text-lg text-slate-800">{topPlayer.name}</span>
                </div>
                <div className="text-2xl font-bold text-nrl-blue">
                  {formatStat(topPlayer.stats[category.key as keyof typeof topPlayer.stats], category.id)}
                </div>
                <div className="text-sm text-slate-600">{topPlayer.team}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerStats;