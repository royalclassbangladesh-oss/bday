/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { AudioPlayer } from './components/AudioPlayer';
import { PinPage } from './components/PinPage';
import { GiftSelectionPage } from './components/GiftSelectionPage';
import { LetterGift } from './components/LetterGift';
import { RoseGift } from './components/RoseGift';
import { MemoryGift } from './components/MemoryGift';

type ViewState = 'pin' | 'gifts' | 'letter' | 'rose' | 'memory';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('pin');

  const handleUnlock = () => {
    setIsUnlocked(true);
    setCurrentView('gifts');
  };

  const handleSelectGift = (gift: 'letter' | 'rose' | 'memory') => {
    setCurrentView(gift);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGifts = () => {
    setCurrentView('gifts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#FFF0F5] text-slate-800 flex flex-col font-poppins selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden">
      {/* Background Animated Particle Canvas (Petals, Hearts, Butterflies, Sparkles) */}
      <BackgroundEffects />

      {/* Persistent Romantic Audio Toggle Player */}
      <AudioPlayer />

      {/* Main Content Router */}
      <main className="flex-1 w-full relative z-10">
        {!isUnlocked || currentView === 'pin' ? (
          <PinPage onUnlock={handleUnlock} />
        ) : currentView === 'gifts' ? (
          <GiftSelectionPage onSelectGift={handleSelectGift} />
        ) : currentView === 'letter' ? (
          <LetterGift onBack={handleBackToGifts} />
        ) : currentView === 'rose' ? (
          <RoseGift onBack={handleBackToGifts} />
        ) : currentView === 'memory' ? (
          <MemoryGift onBack={handleBackToGifts} />
        ) : null}
      </main>

      {/* Subtle Romantic Footer */}
      <footer className="relative z-10 py-4 px-4 text-center text-xs text-pink-400 font-dancing text-base sm:text-lg">
        <span>Made with all my heart for your special day 💗 Happy Birthday my love</span>
      </footer>
    </div>
  );
}
