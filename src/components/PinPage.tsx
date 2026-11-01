import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Lock, KeyRound, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/sound';

interface PinPageProps {
  onUnlock: () => void;
}

export const PinPage: React.FC<PinPageProps> = ({ onUnlock }) => {
  const [digit1, setDigit1] = useState('');
  const [digit2, setDigit2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [imgSrc, setImgSrc] = useState('/assets/aistudio/IMG_20261101_194333_7b17bc63.jpg');

  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus first input on mount
    input1Ref.current?.focus();
  }, []);

  const handleDigit1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 1) {
      setDigit1(val);
      setErrorMessage('');
      if (val.length === 1) {
        input2Ref.current?.focus();
      }
    } else if (val.length === 2) {
      // Pasted 2 digits
      setDigit1(val[0]);
      setDigit2(val[1]);
      setErrorMessage('');
      input2Ref.current?.focus();
    }
  };

  const handleDigit2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 1) {
      setDigit2(val);
      setErrorMessage('');
    }
  };

  const handleKeyDown1 = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowRight' && digit1) {
      input2Ref.current?.focus();
    }
  };

  const handleKeyDown2 = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digit2) {
      input1Ref.current?.focus();
    } else if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const fireHeartConfetti = () => {
    const scalar = 2.5;
    const heart = confetti.shapeFromPath({
      path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -75,-76 -151,-151 -151,-227 0,-42 34,-75 76,-75 38,0 56,18 75,56z',
    });

    confetti({
      shapes: [heart],
      scalar,
      particleCount: 60,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#EC407A', '#F8BBD0', '#AD1457', '#FF80AB', '#FF4081'],
    });

    confetti({
      particleCount: 50,
      spread: 120,
      origin: { y: 0.65 },
      colors: ['#FCE4EC', '#FFF0F5', '#FFD1DC', '#FFC1E3'],
    });
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const pin = `${digit1}${digit2}`.trim();

    if (pin === '43') {
      // Success!
      setIsUnlocking(true);
      setErrorMessage('');
      romanticAudio.playChime();
      fireHeartConfetti();

      // Smoothly start music if not yet started
      if (!romanticAudio.getIsPlaying()) {
        romanticAudio.startMusic();
      }

      setTimeout(() => {
        onUnlock();
      }, 1400);
    } else {
      // Error
      setIsShaking(true);
      setErrorMessage("Oopsie! That's not our secret code, cutie! Try again 💗");
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-16 overflow-hidden">
      {/* Decorative dreamy backdrop glow */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md mx-auto text-center flex flex-col items-center">
        {/* Header Section */}
        <div className="mb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-200/80 text-pink-700 text-xs tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin [animation-duration:10s]" />
            <span className="font-medium">A Special Birthday Surprise</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin [animation-duration:10s]" />
          </div>

          <h1 className="font-dancing text-4xl sm:text-5xl md:text-6xl font-bold text-pink-700 drop-shadow-sm">
            Hey Beautiful! 💗
          </h1>

          <p className="font-poppins text-sm sm:text-base text-pink-900/80 max-w-sm mx-auto leading-relaxed">
            Someone has prepared a little surprise just for you...
          </p>
        </div>

        {/* Polaroid Picture Frame */}
        <div className="relative mb-8 group animate-in zoom-in-95 duration-700 delay-150">
          {/* Glowing Pink Aura */}
          <div className="absolute -inset-2.5 bg-gradient-to-tr from-pink-400 via-rose-300 to-pink-200 rounded-[28px] opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500 pulse-glow" />

          {/* Polaroid Card */}
          <div className="relative bg-white p-3.5 pb-6 sm:p-4 sm:pb-8 rounded-[24px] shadow-2xl border-2 border-pink-200/90 max-w-[270px] sm:max-w-[290px] mx-auto transform hover:rotate-1 transition-transform duration-300">
            {/* Cute scrapbook washi tape at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/80 backdrop-blur-sm border-t border-b border-pink-300/60 shadow-sm rotate-1 z-20 flex items-center justify-center">
              <span className="text-[10px] text-pink-600 font-dancing">for my love ♡</span>
            </div>

            {/* Photo Container */}
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-pink-50 border border-pink-100 shadow-inner">
              <img
                src={imgSrc}
                alt="My Beautiful Girlfriend"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                onError={() => {
                  // Fallback to Google Drive direct export URL if local path fails
                  if (imgSrc !== 'https://drive.google.com/uc?export=view&id=1LMb8hMNVZFoyAitmGw2PLfFwB7GExmXE') {
                    setImgSrc('https://drive.google.com/uc?export=view&id=1LMb8hMNVZFoyAitmGw2PLfFwB7GExmXE');
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-950/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Polaroid caption */}
            <div className="mt-3.5 flex items-center justify-center gap-1.5 text-pink-700">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
              <span className="font-dancing text-xl font-bold">The Birthday Girl ✨</span>
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* PIN Section */}
        <div className={`w-full max-w-xs glass-pink-strong p-6 rounded-3xl shadow-xl transition-all duration-300 ${isShaking ? 'animate-shake border-red-300 bg-red-50/70' : ''}`}>
          <div className="flex items-center justify-center gap-1.5 mb-3 text-pink-700">
            <Lock className="w-4 h-4 text-pink-600" />
            <h2 className="font-dancing text-2xl font-bold tracking-wide">
              enter our secret code
            </h2>
          </div>

          <p className="text-xs text-pink-900/60 font-poppins mb-5">
            Two special digits that unlock our universe
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 2-Digit Input Boxes */}
            <div className="flex items-center justify-center gap-4">
              <input
                ref={input1Ref}
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={digit1}
                onChange={handleDigit1Change}
                onKeyDown={handleKeyDown1}
                className="w-14 h-16 text-center text-3xl font-bold text-pink-700 bg-white/90 border-2 border-pink-300 rounded-2xl shadow-inner focus:border-rose-500 focus:ring-4 focus:ring-pink-300/50 outline-none transition-all placeholder-pink-200 font-poppins"
                placeholder="•"
                aria-label="First digit of secret code"
              />
              <span className="text-pink-300 font-bold text-xl">♡</span>
              <input
                ref={input2Ref}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit2}
                onChange={handleDigit2Change}
                onKeyDown={handleKeyDown2}
                className="w-14 h-16 text-center text-3xl font-bold text-pink-700 bg-white/90 border-2 border-pink-300 rounded-2xl shadow-inner focus:border-rose-500 focus:ring-4 focus:ring-pink-300/50 outline-none transition-all placeholder-pink-200 font-poppins"
                placeholder="•"
                aria-label="Second digit of secret code"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-xs sm:text-sm font-medium text-rose-600 bg-rose-50/90 py-2 px-3 rounded-xl border border-rose-200 animate-in fade-in duration-200 flex items-center justify-center gap-1">
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUnlocking}
              className={`w-full py-3.5 px-6 rounded-2xl font-poppins font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group ${
                isUnlocking
                  ? 'bg-emerald-500 shadow-emerald-200'
                  : 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 shadow-pink-400/40 hover:shadow-xl hover:shadow-pink-400/60 hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {isUnlocking ? (
                <>
                  <KeyRound className="w-5 h-5 animate-spin" />
                  <span>Unlocking Your Heart...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                  <span className="text-base tracking-wide">Unlock My Surprise 💕</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-xs text-pink-400/80 font-dancing text-lg">
          A Little World Made Just for You 💗
        </p>
      </div>
    </div>
  );
};
