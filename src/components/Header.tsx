import React from 'react';
import { Trophy, Activity, BarChart3 } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'live', label: 'Live Scores', icon: Activity },
    { id: 'standings', label: 'Standings', icon: Trophy },
    { id: 'stats', label: 'Player Stats', icon: BarChart3 },
  ];

  return (
    <header className="gradient-bg text-white shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Trophy className="w-7 h-7 text-nrl-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">NRL Live Stats</h1>
              <p className="text-blue-100 text-sm">Real-time Rugby League Coverage</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1 bg-white/10 rounded-xl p-1 backdrop-blur-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-nrl-blue shadow-lg'
                      : 'text-blue-100 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-1 bg-white/10 rounded-xl p-1 backdrop-blur-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-nrl-blue shadow-lg'
                      : 'text-blue-100 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;