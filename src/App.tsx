import React, { useState } from 'react';
import { SocialMediaProvider } from './context/SocialMediaContext';
import Header from './components/Header';
import Feed from './components/Feed';
import Explore from './components/Explore';
import Profile from './components/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Feed />;
      case 'explore':
        return <Explore />;
      case 'profile':
        return <Profile />;
      default:
        return <Feed />;
    }
  };

  return (
    <SocialMediaProvider>
      <div className="min-h-screen bg-gray-50">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
      </div>
    </SocialMediaProvider>
  );
}

export default App;