import React from 'react';
import { Trophy, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-nrl-blue text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Trophy className="w-6 h-6 text-nrl-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold">NRL Live Stats</h3>
                <p className="text-blue-200 text-sm">Real-time Coverage</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Your ultimate destination for live NRL scores, statistics, and comprehensive rugby league coverage.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="#" className="hover:text-white transition-colors">Live Scores</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ladder</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Player Stats</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fixtures</a></li>
            </ul>
          </div>

          {/* Teams */}
          <div>
            <h4 className="font-semibold mb-4">Popular Teams</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="#" className="hover:text-white transition-colors">Penrith Panthers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Melbourne Storm</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Brisbane Broncos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sydney Roosters</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-blue-200 text-sm">
            © 2024 NRL Live Stats. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-blue-200 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>for rugby league fans</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;