import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Heart, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/sound';

interface RoseGiftProps {
  onBack: () => void;
}

export const RoseGift: React.FC<RoseGiftProps> = ({ onBack }) => {
  const [bloomCount, setBloomCount] = useState(0);

  const messages = [
    {
      id: 1,
      text: "For the one who makes my world bloom.",
      posDesktop: "left",
      delay: "delay-100",
    },
    {
      id: 2,
      text: "Just like this rose, my love for you grows more beautiful every day",
      posDesktop: "left",
      delay: "delay-300",
    },
    {
      id: 3,
      text: "To the prettiest flower in the garden of my life",
      posDesktop: "right",
      delay: "delay-500",
    },
    {
      id: 4,
      text: "Every petal holds a reason why I love you",
      posDesktop: "right",
      delay: "delay-700",
    },
  ];

  const handleRoseClick = () => {
    setBloomCount((c) => c + 1);
    romanticAudio.playChime();

    // Burst of rose petals
    confetti({
      particleCount: 25,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#D81B60', '#E91E63', '#F48FB1', '#C2185B', '#880E4F'],
    });
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12 flex flex-col items-center justify-start relative z-10 overflow-hidden">
      {/* Top Navigation Row */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 text-pink-700 hover:text-pink-900 hover:bg-pink-50 transition-all shadow-sm hover:shadow focus:outline-none text-xs sm:text-sm font-medium group"
          aria-label="Back to gifts"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Gifts</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-medium text-pink-600 bg-pink-100/70 px-3 py-1.5 rounded-full border border-pink-200/60">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>Gift 2 of 3</span>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-6 md:mb-8 animate-in fade-in duration-500">
        <div className="inline-flex items-center gap-1.5 text-pink-500 text-xs font-medium uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>An Everlasting Bloom</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h1 className="font-dancing text-4xl sm:text-5xl md:text-6xl font-bold text-pink-800 drop-shadow-sm">
          Your Favourite Rose 🌹
        </h1>
        <p className="text-xs sm:text-sm text-pink-900/70 font-poppins mt-1">
          (Tap the rose to share a little love sparkle ✨)
        </p>
      </div>

      {/* Main Experience Layout:
          Desktop: 2 messages Left | Rose Center | 2 messages Right
          Mobile: 2 messages Top | Rose Center | 2 messages Bottom
      */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 my-auto">
        {/* Left Messages on Desktop / Top Messages on Mobile */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 sm:gap-6 order-1">
          {messages.slice(0, 2).map((msg) => (
            <div
              key={msg.id}
              className={`glass-pink p-5 sm:p-6 rounded-3xl shadow-lg border border-pink-200/80 hover:border-pink-300 transition-all duration-300 animate-float hover:shadow-pink-200/50 ${msg.delay}`}
            >
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-rose-400 rotate-180 shrink-0 mt-0.5" />
                <div>
                  <p className="font-dancing text-xl sm:text-2xl font-bold text-pink-800 leading-snug">
                    "{msg.text}"
                  </p>
                  <div className="flex items-center gap-1 mt-2.5 text-xs text-pink-400">
                    <Heart className="w-3 h-3 fill-pink-400" />
                    <span className="font-poppins text-[11px]">forever in love</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Animated Rose */}
        <div
          onClick={handleRoseClick}
          className="w-full lg:w-1/3 flex flex-col items-center justify-center relative cursor-pointer group py-4 order-2"
          role="button"
          tabIndex={0}
          aria-label="Animated blooming red rose"
        >
          {/* Ambient Glowing Halo */}
          <div className="absolute w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-tr from-rose-300/40 via-pink-400/30 to-red-400/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

          {/* Sparkles floating around rose */}
          <div className="absolute top-10 -left-4 text-pink-400 animate-ping [animation-duration:3s]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="absolute top-24 -right-4 text-rose-400 animate-ping [animation-duration:2.5s] delay-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="absolute bottom-32 -left-6 text-pink-300 animate-ping [animation-duration:3.5s] delay-700">
            <Sparkles className="w-4 h-4" />
          </div>

          {/* SVG Animated Rose */}
          <div className="relative animate-rose-sway transition-transform duration-500 group-hover:scale-105">
            <svg
              viewBox="0 0 320 440"
              className="w-64 h-88 sm:w-72 sm:h-96 drop-shadow-2xl overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Petal Gradients */}
                <radialGradient id="roseCoreGrad" cx="50%" cy="45%" r="50%">
                  <stop offset="0%" stopColor="#FF4081" />
                  <stop offset="40%" stopColor="#E91E63" />
                  <stop offset="80%" stopColor="#C2185B" />
                  <stop offset="100%" stopColor="#880E4F" />
                </radialGradient>

                <radialGradient id="outerPetalGrad" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#F48FB1" />
                  <stop offset="35%" stopColor="#E91E63" />
                  <stop offset="85%" stopColor="#AD1457" />
                  <stop offset="100%" stopColor="#4A0020" />
                </radialGradient>

                <radialGradient id="centerBudGrad" cx="45%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#FF80AB" />
                  <stop offset="45%" stopColor="#D81B60" />
                  <stop offset="90%" stopColor="#880E4F" />
                </radialGradient>

                {/* Stem & Leaves Gradients */}
                <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4CAF50" />
                  <stop offset="50%" stopColor="#2E7D32" />
                  <stop offset="100%" stopColor="#1B5E20" />
                </linearGradient>

                <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#81C784" />
                  <stop offset="60%" stopColor="#388E3C" />
                  <stop offset="100%" stopColor="#1B5E20" />
                </linearGradient>

                <filter id="petalShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#4A0020" floodOpacity="0.35" />
                </filter>
              </defs>

              {/* 1. Growing Stem */}
              <g className="animate-in fade-in duration-1000">
                {/* Curved stem with natural taper */}
                <path
                  d="M160,200 C158,250 166,310 160,420"
                  fill="none"
                  stroke="url(#stemGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />

                {/* Thorn 1 */}
                <path
                  d="M162,260 Q170,256 174,250 Q168,264 163,268 Z"
                  fill="#2E7D32"
                />
                {/* Thorn 2 */}
                <path
                  d="M158,320 Q150,316 146,310 Q152,324 157,328 Z"
                  fill="#2E7D32"
                />

                {/* 2. Left Leaf */}
                <g className="animate-in fade-in zoom-in-50 duration-700 delay-300 origin-[160px_280px]">
                  <path
                    d="M160,280 C120,270 90,290 80,310 C100,325 140,320 160,288 Z"
                    fill="url(#leafGrad)"
                    filter="url(#petalShadow)"
                  />
                  {/* Leaf vein */}
                  <path
                    d="M160,285 Q125,295 85,310"
                    fill="none"
                    stroke="#A5D6A7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </g>

                {/* 3. Right Leaf */}
                <g className="animate-in fade-in zoom-in-50 duration-700 delay-500 origin-[160px_230px]">
                  <path
                    d="M160,230 C200,215 230,235 240,255 C220,270 180,265 160,238 Z"
                    fill="url(#leafGrad)"
                    filter="url(#petalShadow)"
                  />
                  {/* Leaf vein */}
                  <path
                    d="M160,235 Q195,242 235,255"
                    fill="none"
                    stroke="#A5D6A7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </g>

                {/* Sepals directly beneath bud */}
                <path
                  d="M148,198 C138,215 125,225 110,232 C128,222 144,212 152,202 Z"
                  fill="#2E7D32"
                />
                <path
                  d="M172,198 C182,215 195,225 210,232 C192,222 176,212 168,202 Z"
                  fill="#2E7D32"
                />
                <path
                  d="M160,202 C160,220 162,230 164,242 C162,230 160,220 160,202 Z"
                  fill="#1B5E20"
                  strokeWidth="3"
                />
              </g>

              {/* 4. Rose Flower Petals (Blooming Animation) */}
              <g className="animate-in fade-in zoom-in-75 duration-1000 origin-[160px_140px]">
                {/* Outermost Petals (Unfolded wide) */}
                <path
                  d="M160,195 C90,195 70,140 100,90 C125,120 145,140 160,195 Z"
                  fill="url(#outerPetalGrad)"
                  filter="url(#petalShadow)"
                  className="transition-all duration-700"
                />
                <path
                  d="M160,195 C230,195 250,140 220,90 C195,120 175,140 160,195 Z"
                  fill="url(#outerPetalGrad)"
                  filter="url(#petalShadow)"
                  className="transition-all duration-700"
                />

                {/* Bottom cradling petal */}
                <path
                  d="M110,145 C110,210 210,210 210,145 C190,185 130,185 110,145 Z"
                  fill="url(#roseCoreGrad)"
                  filter="url(#petalShadow)"
                />

                {/* Left sweeping middle petal */}
                <path
                  d="M160,185 C105,175 95,115 130,80 C145,115 155,145 160,185 Z"
                  fill="url(#outerPetalGrad)"
                  filter="url(#petalShadow)"
                />

                {/* Right sweeping middle petal */}
                <path
                  d="M160,185 C215,175 225,115 190,80 C175,115 165,145 160,185 Z"
                  fill="url(#outerPetalGrad)"
                  filter="url(#petalShadow)"
                />

                {/* Inner cupped petals */}
                <path
                  d="M130,120 C125,75 180,65 190,105 C175,125 150,135 130,120 Z"
                  fill="url(#roseCoreGrad)"
                />

                <path
                  d="M190,110 C195,65 140,55 130,95 C145,115 170,125 190,110 Z"
                  fill="url(#roseCoreGrad)"
                />

                {/* Center Core Spiral / Bud */}
                <path
                  d="M142,95 C142,70 178,70 178,95 C178,115 142,115 142,95 Z"
                  fill="url(#centerBudGrad)"
                  filter="url(#petalShadow)"
                />

                {/* Rose bud tight whorl swirl */}
                <path
                  d="M150,88 C150,78 170,78 170,88 C170,98 155,102 153,92"
                  fill="none"
                  stroke="#FF80AB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Dewdrop highlight on petal */}
                <circle cx="125" cy="118" r="3.5" fill="#FFFFFF" opacity="0.8" />
                <circle cx="126" cy="117" r="1.5" fill="#FFFFFF" />
              </g>
            </svg>
          </div>

          {/* Interactive Tap Prompt */}
          <div className="mt-2 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/90 border border-rose-200/80 text-rose-700 text-xs font-medium shadow-sm group-hover:bg-rose-200 transition-colors">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
              <span>{bloomCount === 0 ? "Touch my rose 🌹" : `Bloomed with ${bloomCount} kisses 💋`}</span>
            </span>
          </div>
        </div>

        {/* Right Messages on Desktop / Bottom Messages on Mobile */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 sm:gap-6 order-3">
          {messages.slice(2, 4).map((msg) => (
            <div
              key={msg.id}
              className={`glass-pink p-5 sm:p-6 rounded-3xl shadow-lg border border-pink-200/80 hover:border-pink-300 transition-all duration-300 animate-float hover:shadow-pink-200/50 ${msg.delay}`}
            >
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-rose-400 rotate-180 shrink-0 mt-0.5" />
                <div>
                  <p className="font-dancing text-xl sm:text-2xl font-bold text-pink-800 leading-snug">
                    "{msg.text}"
                  </p>
                  <div className="flex items-center gap-1 mt-2.5 text-xs text-pink-400">
                    <Heart className="w-3 h-3 fill-pink-400" />
                    <span className="font-poppins text-[11px]">forever in love</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Back Button */}
      <div className="mt-10 mb-6">
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
