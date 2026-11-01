import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Sparkles, MailOpen, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/sound';

interface LetterGiftProps {
  onBack: () => void;
}

export const LetterGift: React.FC<LetterGiftProps> = ({ onBack }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Automatically trigger envelope open after slight delay for magical reveal
    const timer = setTimeout(() => {
      setIsOpen(true);
      romanticAudio.playChime();
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#F8BBD0', '#EC407A', '#FCE4EC', '#FFFFFF'],
      });
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  const handleEnvelopeToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      romanticAudio.playChime();
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#F8BBD0', '#EC407A', '#FCE4EC', '#FFFFFF'],
      });
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12 flex flex-col items-center justify-start relative z-10">
      {/* Top Navigation Row */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-6 md:mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 text-pink-700 hover:text-pink-900 hover:bg-pink-50 transition-all shadow-sm hover:shadow focus:outline-none text-xs sm:text-sm font-medium group"
          aria-label="Back to gifts"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Gifts</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-medium text-pink-600 bg-pink-100/70 px-3 py-1.5 rounded-full border border-pink-200/60">
          <Feather className="w-3.5 h-3.5 text-rose-500" />
          <span>Gift 1 of 3</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="text-center mb-6 md:mb-8 animate-in fade-in duration-500">
        <div className="inline-flex items-center gap-1 text-pink-500 text-xs font-medium uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Written Just For You</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h1 className="font-dancing text-4xl sm:text-5xl md:text-6xl font-bold text-pink-800 drop-shadow-sm">
          Letter From My Heart
        </h1>
      </div>

      {/* Envelope & Letter Container */}
      <div className="w-full max-w-2xl mx-auto relative flex flex-col items-center">
        {/* Interactive Envelope Graphic (when not yet fully opened) */}
        {!isOpen && (
          <div
            onClick={handleEnvelopeToggle}
            className="w-full max-w-md bg-rose-100 p-8 rounded-3xl border-2 border-rose-300 shadow-xl cursor-pointer hover:scale-102 transition-transform text-center flex flex-col items-center justify-center my-10 animate-bounce"
          >
            <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg mb-4">
              <MailOpen className="w-8 h-8" />
            </div>
            <h3 className="font-dancing text-2xl font-bold text-rose-800">
              Tap to Open Your Letter 💌
            </h3>
            <p className="text-xs text-rose-600 mt-1 font-poppins">
              Sealed with love and endless adoration
            </p>
          </div>
        )}

        {/* Unfolded Letter Parchment */}
        {isOpen && (
          <div className="w-full relative animate-in fade-in zoom-in-95 duration-700">
            {/* Paper Stack Drop Shadows */}
            <div className="absolute inset-x-2 -bottom-2 h-full bg-pink-100 rounded-3xl transform rotate-1 opacity-70 pointer-events-none" />
            <div className="absolute inset-x-4 -bottom-4 h-full bg-rose-100 rounded-3xl transform -rotate-1 opacity-50 pointer-events-none" />

            {/* Main Letter Paper */}
            <div className="relative paper-texture p-6 sm:p-10 md:p-12 rounded-3xl shadow-2xl border-2 border-pink-200/90 text-pink-950 overflow-hidden">
              {/* Decorative Floral/Corner Borders */}
              <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-pink-400/60 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-pink-400/60 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-pink-400/60 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-pink-400/60 rounded-br-xl pointer-events-none" />

              {/* Watermark Heart in center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
                <Heart className="w-96 h-96 fill-rose-600 text-rose-600" />
              </div>

              {/* Top Letter Stamp / Date Header */}
              <div className="flex items-center justify-between border-b border-pink-200/80 pb-4 mb-6 text-xs sm:text-sm text-pink-700/80 font-poppins">
                <span className="font-dancing text-xl font-bold text-rose-600">
                  With all my love 💌
                </span>
                <span className="font-dancing text-lg">
                  To My Favorite Person 🌸
                </span>
              </div>

              {/* EXACT LETTER CONTENT */}
              <div className="space-y-5 text-slate-800 leading-relaxed font-poppins text-base sm:text-lg">
                <p className="font-dancing text-2xl sm:text-3xl font-bold text-rose-700 animate-in fade-in duration-700">
                  Happy Birthday! On your special day, I just wanted to take a moment to tell you how much you truly mean to me.
                </p>

                <p className="text-pink-950/90 animate-in fade-in duration-700 delay-200 font-normal leading-loose">
                  You have a way of making everything better just by being in it. Your kindness, beauty, and spirit inspire me every day. Having you in my life is one of the greatest gifts I could ever ask for.
                </p>

                <p className="text-pink-950/90 animate-in fade-in duration-700 delay-400 font-normal leading-loose">
                  May this year bring you all the happiness, growth, and wonderful surprises you deserve. I’m so excited to stand beside you as you chase all your dreams.
                </p>

                {/* Closing signature */}
                <div className="pt-4 text-right animate-in fade-in duration-700 delay-600">
                  <p className="font-dancing text-2xl sm:text-3xl font-bold text-rose-700">
                    Always and forever,
                  </p>
                  <p className="font-vibes text-3xl sm:text-4xl text-pink-700 mt-1">
                    Your Love 💕
                  </p>
                </div>
              </div>

              {/* Animated Beating Pink Heart at Bottom */}
              <div className="mt-8 pt-6 border-t border-pink-200/70 flex flex-col items-center justify-center">
                <div className="relative group cursor-pointer" onClick={() => {
                  romanticAudio.playChime();
                  confetti({
                    particleCount: 20,
                    spread: 50,
                    origin: { y: 0.8 },
                    colors: ['#EC407A', '#F8BBD0'],
                  });
                }}>
                  <div className="w-16 h-16 rounded-full bg-pink-100/90 flex items-center justify-center animate-heart-beat shadow-inner">
                    <Heart className="w-10 h-10 fill-rose-500 text-rose-500 drop-shadow" />
                  </div>
                  <div className="absolute -inset-1 rounded-full bg-rose-400/20 blur animate-ping" />
                </div>
                <span className="text-xs text-pink-500 font-dancing text-lg mt-2">
                  forever & always beating for you ♡
                </span>
              </div>
            </div>
          </div>
        )}
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
