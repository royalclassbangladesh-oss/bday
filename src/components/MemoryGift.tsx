import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Heart, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/sound';
import memoryPhoto from '../assets/IMG20230217124557_bf217a32.jpg';

interface MemoryGiftProps {
  onBack: () => void;
}

export const MemoryGift: React.FC<MemoryGiftProps> = ({ onBack }) => {
  const [imgSrc, setImgSrc] = useState<string>(memoryPhoto);
  const [isLoved, setIsLoved] = useState(false);

  const handlePhotoHeart = () => {
    setIsLoved(true);
    romanticAudio.playChime();
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#EC407A', '#F8BBD0', '#FF80AB', '#FF4081'],
    });
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12 flex flex-col items-center justify-start relative z-10 overflow-hidden">
      {/* Top Navigation Row */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 text-pink-700 hover:text-pink-900 hover:bg-pink-50 transition-all shadow-sm hover:shadow focus:outline-none text-xs sm:text-sm font-medium group"
          aria-label="Back to gifts"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Gifts</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-medium text-pink-600 bg-pink-100/70 px-3 py-1.5 rounded-full border border-pink-200/60">
          <Calendar className="w-3.5 h-3.5 text-rose-500" />
          <span>Gift 3 of 3</span>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-6 md:mb-8 animate-in fade-in duration-500">
        <div className="inline-flex items-center gap-1.5 text-pink-500 text-xs font-medium uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cherished Forever</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h1 className="font-dancing text-4xl sm:text-5xl md:text-6xl font-bold text-pink-800 drop-shadow-sm">
          Our Beautiful Memory 💞
        </h1>
        <p className="text-xs sm:text-sm text-pink-900/70 font-poppins mt-1">
          Where our hands touched and our worlds aligned
        </p>
      </div>

      {/* Center Nostalgic Scrapbook Polaroid Container */}
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        {/* Scrapbook Container */}
        <div className="relative group animate-in zoom-in-95 duration-700">
          {/* Ambient warm romantic backlight */}
          <div className="absolute -inset-3 bg-gradient-to-tr from-pink-300 via-rose-300 to-pink-200 rounded-[32px] opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-700 pulse-glow" />

          {/* Floating decorative elements around photo */}
          <div className="absolute -top-3 -right-3 z-30 bg-white/90 p-2 rounded-full shadow-md border border-pink-200 animate-float">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          </div>

          <div className="absolute top-1/2 -left-4 z-30 bg-white/90 p-1.5 rounded-full shadow-md border border-pink-200 animate-float delay-500">
            <Sparkles className="w-4 h-4 text-pink-500" />
          </div>

          {/* Polaroid Frame */}
          <div
            onClick={handlePhotoHeart}
            className="relative bg-white p-4 pb-7 sm:p-5 sm:pb-9 rounded-[28px] shadow-2xl border-2 border-pink-200/90 cursor-pointer transform hover:rotate-1 transition-transform duration-300"
          >
            {/* Scrapbook Washi Tape on corners */}
            <div className="absolute -top-3 left-6 w-20 h-6 bg-pink-200/85 backdrop-blur-sm border-t border-b border-pink-300/60 shadow-sm -rotate-6 z-20 flex items-center justify-center">
              <span className="text-[10px] text-pink-700 font-dancing">our beginning ♡</span>
            </div>

            <div className="absolute -top-3 right-6 w-20 h-6 bg-rose-200/85 backdrop-blur-sm border-t border-b border-rose-300/60 shadow-sm rotate-6 z-20 flex items-center justify-center">
              <span className="text-[10px] text-rose-700 font-dancing">you & me ✨</span>
            </div>

            {/* Photo Container */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-pink-50 border border-pink-100 shadow-inner group">
              <img
                src={imgSrc}
                alt="Our Beautiful Memory - The Day Our Hands Found Each Other"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                onError={() => {
                  // Fallback to Google Drive URL if local path fails
                  if (imgSrc !== 'https://drive.google.com/uc?export=view&id=1JPLcwyNZfnsG1kk2K2LRW4BIR3tHvynY') {
                    setImgSrc('https://drive.google.com/uc?export=view&id=1JPLcwyNZfnsG1kk2K2LRW4BIR3tHvynY');
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-950/25 via-transparent to-transparent pointer-events-none" />

              {/* Heart icon on tap */}
              {isLoved && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-rose-500/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Heart className="w-10 h-10 fill-white text-white animate-ping" />
                  </div>
                </div>
              )}
            </div>

            {/* DATE: Directly underneath photo */}
            <div className="mt-4 text-center">
              <div className="inline-block relative">
                <p className="font-dancing text-2xl sm:text-3xl font-bold text-pink-700 tracking-wide pulse-glow px-4 py-1 rounded-full bg-pink-50/80 border border-pink-200/60">
                  17th February 2023 💗
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ROMANTIC MESSAGE CARD */}
        <div className="w-full mt-8 glass-pink p-6 sm:p-8 rounded-3xl shadow-xl border border-pink-200/90 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="flex items-center justify-center gap-1.5 mb-2 text-rose-500">
            <Heart className="w-4 h-4 fill-current" />
            <span className="font-dancing text-xl font-bold">From That Day to Eternity</span>
            <Heart className="w-4 h-4 fill-current" />
          </div>

          {/* EXACT ROMANTIC MESSAGE */}
          <blockquote className="font-dancing text-2xl sm:text-3xl font-bold text-pink-900 leading-relaxed max-w-md mx-auto">
            "The day we met, and the moment my hand found yours for the first time. Out of all the places in the world, right next to you has been my favorite place ever since."
          </blockquote>

          <div className="mt-4 pt-4 border-t border-pink-200/60 flex items-center justify-center gap-2 text-xs font-poppins text-pink-600">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Forever holding your hand</span>
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          </div>
        </div>
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Gift Boxes</span>
        </button>
      </div>
    </div>
  );
};
