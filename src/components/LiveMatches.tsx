import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import MatchCard from './MatchCard';
import { Match } from '../types/Match';

const LiveMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    // Simulate live data updates
    const mockMatches: Match[] = [
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
      },
      {
        id: '3',
        homeTeam: { name: 'Penrith Panthers', logo: '🐆', score: 0 },
        awayTeam: { name: 'South Sydney Rabbitohs', logo: '🐰', score: 0 },
        status: 'upcoming',
        time: '19:30',
        venue: 'BlueBet Stadium',
        attendance: 0,
        round: 'Round 15'
      },
      {
        id: '4',
        homeTeam: { name: 'Canterbury Bulldogs', logo: '🐕', score: 28 },
        awayTeam: { name: 'Wests Tigers', logo: '🐅', score: 12 },
        status: 'finished',
        time: 'FT',
        venue: 'Accor Stadium',
        attendance: 15678,
        round: 'Round 15'
      }
    ];

    setMatches(mockMatches);

    // Simulate score updates for live matches
    const interval = setInterval(() => {
      setMatches(prev => prev.map(match => {
        if (match.status === 'live' && Math.random() > 0.8) {
          const isHomeScore = Math.random() > 0.5;
          return {
            ...match,
            homeTeam: {
              ...match.homeTeam,
              score: isHomeScore ? match.homeTeam.score + 4 : match.homeTeam.score
            },
            awayTeam: {
              ...match.awayTeam,
              score: !isHomeScore ? match.awayTeam.score + 4 : match.awayTeam.score
            }
          };
        }
        return match;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const liveMatches = matches.filter(match => match.status === 'live');
  const upcomingMatches = matches.filter(match => match.status === 'upcoming');
  const finishedMatches = matches.filter(match => match.status === 'finished');

  return (
    <div className="space-y-8">
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
    </div>
  );
};

export default LiveMatches;