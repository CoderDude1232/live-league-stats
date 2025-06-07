import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LiveMatches from './components/LiveMatches';
import Standings from './components/Standings';
import PlayerStats from './components/PlayerStats';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('live');

  return (
    <div className="min-h-screen bg-slate-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'live' && <LiveMatches />}
        {activeTab === 'standings' && <Standings />}
        {activeTab === 'stats' && <PlayerStats />}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;