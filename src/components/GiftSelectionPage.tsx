import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Flower2, Camera, Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/sound';

interface GiftSelectionPageProps {
  onSelectGift: (gift: 'letter' | 'rose' | 'memory') => void;
}

interface GiftBoxItem {
  id: 'letter' | 'rose' | 'memory';
  title: string;
  tagline: string;
  icon: React.ReactNode;
  accentColor: string;
  ribbonColor: string;
  previewEmoji: string;
}

export const GiftSelectionPage: React.FC<GiftSelectionPageProps> = ({ onSelectGift }) => {
  const [openingBox, setOpeningBox] = useState<'letter' | 'rose' | 'memory' | null>(null);

  const gifts: GiftBoxItem[] = [
    {
      id: 'letter',
      title: 'A Letter for You 💌',
      tagline: 'Words penned straight from my soul',
      icon: <Mail className="w-6 h-6 text-rose-500" />,
      accentColor: 'from-pink-400 to-rose-400',
      ribbonColor: 'bg-rose-500',
      previewEmoji: '💌',
    },
    {
      id: 'rose',
      title: 'Your Favourite Rose 🌹',
      tagline: 'An everlasting bloom just for you',
      icon: <Flower2 className="w-6 h-6 text-rose-600" />,
      accentColor: 'from-rose-400 to-red-400',
      ribbonColor: 'bg-red-500',
      previewEmoji: '🌹',
    },
    {
      id: 'memory',
      title: 'Our Beautiful Memory 📸',
      tagline: 'A moment frozen in timeless love',
      icon: <Camera className="w-6 h-6 text-pink-600" />,
      accentColor: 'from-pink-300 to-rose-400',
      ribbonColor: 'bg-pink-600',
      previewEmoji: '📸',
    },
  ];

  const handleBoxClick = (id: 'letter' | 'rose' | 'memory') => {
    if (openingBox) return;
    setOpeningBox(id);
    romanticAudio.playChime();

    // Gentle heart burst
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#EC407A', '#F8BBD0', '#AD1457', '#FF80AB'],
    });

    setTimeout(() => {
      onSelectGift(id);
    }, 750);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-16 relative z-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs sm:text-sm font-medium mb-3 shadow-sm">
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
          <span>Surprise Unlocked</span>
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
        </div>

        <h1 className="font-dancing text-4xl sm:text-5xl md:text-6xl font-bold text-pink-700 drop-shadow-sm mb-3">
          You unlocked it cutieee 💗
        </h1>

        <p className="font-poppins text-sm sm:text-base text-pink-900/80 font-normal leading-relaxed max-w-lg mx-auto">
          Three little surprises, each holding a piece of my heart.
        </p>

        <p className="text-xs text-pink-500/80 font-dancing text-lg mt-1">
          (Choose any box below to unwrap its magic ✨)
        </p>
      </div>

      {/* Gift Boxes Container: Horizontal on desktop, vertical on mobile */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-center justify-items-center">
        {gifts.map((gift, idx) => {
          const isOpening = openingBox === gift.id;

          return (
            <div
              key={gift.id}
              onClick={() => handleBoxClick(gift.id)}
              className={`w-full max-w-[290px] sm:max-w-[310px] cursor-pointer group focus:outline-none transition-all duration-500 transform ${
                isOpening ? 'scale-105' : 'hover:-translate-y-2.5'
              }`}
              style={{
                animationDelay: `${idx * 150}ms`,
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleBoxClick(gift.id);
                }
              }}
              aria-label={`Open ${gift.title}`}
            >
              {/* Box Card Wrapper */}
              <div className="relative glass-pink rounded-3xl p-6 text-center shadow-xl border border-pink-200/90 hover:border-pink-300 transition-all duration-300 overflow-hidden flex flex-col items-center">
                {/* Floating ambient glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 to-rose-200 rounded-3xl opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-500 pointer-events-none" />

                {/* 3D Illustrated Gift Box */}
                <div className="relative w-40 h-44 my-4 flex items-center justify-center animate-float">
                  {/* Gift Bow */}
                  <div
                    className={`absolute -top-3 z-30 transition-transform duration-500 ${
                      isOpening ? '-translate-y-8 rotate-12 opacity-80' : 'group-hover:scale-110'
                    }`}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Left Loop */}
                      <div className="w-8 h-8 rounded-full border-4 border-rose-500 bg-rose-400 shadow-md -mr-2 transform -rotate-25 scale-x-75" />
                      {/* Center Knot */}
                      <div className="w-5 h-5 rounded-full bg-rose-600 border border-rose-300 z-10 shadow-sm flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-100" />
                      </div>
                      {/* Right Loop */}
                      <div className="w-8 h-8 rounded-full border-4 border-rose-500 bg-rose-400 shadow-md -ml-2 transform rotate-25 scale-x-75" />
                      {/* Ribbon Tails */}
                      <div className="absolute top-4 -left-1 w-2.5 h-6 bg-rose-500 rounded-b transform -rotate-20 shadow-sm" />
                      <div className="absolute top-4 -right-1 w-2.5 h-6 bg-rose-500 rounded-b transform rotate-20 shadow-sm" />
                    </div>
                  </div>

                  {/* Gift Box Lid */}
                  <div
                    className={`absolute top-4 w-36 h-8 rounded-t-xl bg-gradient-to-r from-pink-300 via-pink-400 to-rose-400 shadow-md border-b-2 border-pink-500 z-20 transition-all duration-500 flex items-center justify-center overflow-hidden ${
                      isOpening ? '-translate-y-12 -rotate-6 opacity-0' : 'group-hover:-translate-y-1'
                    }`}
                  >
                    {/* Horizontal Ribbon on Lid */}
                    <div className="w-full h-2.5 bg-rose-500/80 absolute" />
                    {/* Vertical Ribbon on Lid */}
                    <div className="h-full w-5 bg-rose-500 shadow-sm z-10" />
                  </div>

                  {/* Gift Box Body */}
                  <div className="relative w-32 h-32 rounded-b-2xl bg-gradient-to-br from-pink-200 via-pink-300 to-rose-300 shadow-2xl border-2 border-pink-300 overflow-hidden flex items-center justify-center">
                    {/* Decorative wrapping patterns: subtle heart pattern */}
                    <div className="absolute inset-0 opacity-25 paper-texture" />

                    {/* Vertical Ribbon */}
                    <div className="absolute inset-y-0 w-6 bg-gradient-to-b from-rose-500 to-pink-600 shadow-inner z-10 flex items-center justify-center">
                      <div className="w-0.5 h-full bg-rose-200/50" />
                    </div>

                    {/* Horizontal Ribbon */}
                    <div className="absolute inset-x-0 h-6 bg-gradient-to-r from-rose-500 to-pink-600 shadow-inner z-10 flex items-center justify-center">
                      <div className="h-0.5 w-full bg-rose-200/50" />
                    </div>

                    {/* Center Medal / Tag */}
                    <div className="relative z-20 w-10 h-10 rounded-full bg-white/95 border-2 border-pink-300 shadow-md flex items-center justify-center text-lg group-hover:scale-125 transition-transform duration-300">
                      <span>{gift.previewEmoji}</span>
                    </div>

                    {/* Light sheen overlay */}
                    <div className="absolute -top-12 -left-12 w-28 h-28 bg-white/30 rotate-45 pointer-events-none rounded-full blur-md" />
                  </div>

                  {/* Soft bottom drop shadow */}
                  <div className="absolute -bottom-2 w-28 h-4 bg-pink-900/15 rounded-full blur-md" />
                </div>

                {/* Gift Title */}
                <h3 className="font-dancing text-2xl sm:text-3xl font-bold text-pink-800 mb-1 group-hover:text-rose-600 transition-colors">
                  {gift.title}
                </h3>

                {/* Gift Tagline */}
                <p className="font-poppins text-xs sm:text-sm text-pink-900/70 mb-4 px-2 min-h-[38px] flex items-center justify-center">
                  {gift.tagline}
                </p>

                {/* Open Button / Prompt */}
                <div className="w-full pt-2 border-t border-pink-200/60 flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-600 group-hover:text-rose-700">
                  <Sparkles className="w-3.5 h-3.5 animate-spin [animation-duration:6s]" />
                  <span>{isOpening ? 'Unwrapping...' : 'Tap to Unwrap'}</span>
                  <Sparkles className="w-3.5 h-3.5 animate-spin [animation-duration:6s]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Reminder */}
      <div className="mt-12 text-center text-xs text-pink-500/70 font-dancing text-lg">
        Every little box holds an unforgettable piece of us 💗
      </div>
    </div>
  );
};
