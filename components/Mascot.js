'use client';

import { useEffect, useRef, useState } from 'react';

const CYCLE = [
  { state: 'idle', duration: 3200 },
  { state: 'typing', duration: 3000 },
  { state: 'idle', duration: 2600 },
  { state: 'reading', duration: 3200 },
  { state: 'idle', duration: 2600 },
  { state: 'egg', duration: 1800 },
];

const EGG_EMOJI = ['✨', '💡', '☕', '⭐', '❤️'];

export default function Mascot() {
  const [state, setState] = useState('idle');
  const [egg, setEgg] = useState(null);
  const [burstId, setBurstId] = useState(0);
  const [wiggling, setWiggling] = useState(false);
  const cycleIndex = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const runCycle = () => {
      const step = CYCLE[cycleIndex.current % CYCLE.length];
      setState(step.state);
      if (step.state === 'egg') {
        setEgg(EGG_EMOJI[Math.floor(Math.random() * EGG_EMOJI.length)]);
      }
      cycleIndex.current += 1;
      timeoutRef.current = setTimeout(runCycle, step.duration);
    };
    runCycle();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleClick = () => {
    setWiggling(true);
    setEgg(EGG_EMOJI[Math.floor(Math.random() * EGG_EMOJI.length)]);
    setBurstId((n) => n + 1);
    setTimeout(() => setWiggling(false), 500);
  };

  const isTyping = state === 'typing';
  const isReading = state === 'reading';
  const isEgg = state === 'egg';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="TTC-Infotech mascot"
      title="👋"
      className="group absolute bottom-4 right-4 z-10 hidden h-24 w-20 cursor-pointer select-none sm:block"
    >
      <div
        className={`relative h-full w-full animate-mascot-bob ${wiggling ? 'animate-mascot-wiggle' : ''} ${
          isReading ? 'animate-mascot-nod' : ''
        }`}
      >
        {/* Easter-egg particle (auto cycle) */}
        {isEgg && egg && (
          <span
            key={`cycle-${egg}-${state}`}
            className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 animate-mascot-float-fade text-lg"
          >
            {egg}
          </span>
        )}
        {/* Easter-egg particle (click burst) */}
        {burstId > 0 && (
          <span
            key={`burst-${burstId}`}
            className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 animate-mascot-float-fade text-lg"
          >
            {egg}
          </span>
        )}

        {/* Document (reading state) */}
        <div
          className={`absolute -left-3 top-7 h-6 w-5 rounded-sm bg-mist-50 shadow-soft transition-all duration-300 ${
            isReading ? 'animate-mascot-pop opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <div className="mt-1.5 space-y-1 px-1">
            <div className="h-0.5 w-full rounded-full bg-navy-800/40" />
            <div className="h-0.5 w-3/4 rounded-full bg-navy-800/40" />
            <div className="h-0.5 w-full rounded-full bg-navy-800/40" />
          </div>
        </div>

        {/* Keyboard (typing state) */}
        <div
          className={`absolute left-1/2 top-[52px] h-3.5 w-11 -translate-x-1/2 rounded-[3px] bg-navy-800 shadow-soft transition-all duration-300 ${
            isTyping ? 'animate-mascot-pop opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <div className="grid grid-cols-5 gap-[1.5px] p-[2px]">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="h-[2px] rounded-[1px] bg-cyan-300/70" />
            ))}
          </div>
        </div>

        {/* Left arm */}
        <div
          className={`absolute left-[6px] top-8 h-5 w-2 origin-top rounded-full bg-white shadow-soft ${
            isTyping ? 'animate-mascot-tap-l' : ''
          }`}
        />
        {/* Right arm */}
        <div
          className={`absolute right-[6px] top-8 h-5 w-2 origin-top rounded-full bg-white shadow-soft ${
            isTyping ? 'animate-mascot-tap-r' : ''
          }`}
        />

        {/* Body / head block */}
        <div className="absolute left-1/2 top-0 h-14 w-11 -translate-x-1/2 rounded-2xl bg-white shadow-glow">
          {/* Glasses (reading state) */}
          <div
            className={`absolute left-1/2 top-[18px] flex -translate-x-1/2 items-center gap-[3px] transition-all duration-300 ${
              isReading ? 'animate-mascot-pop opacity-100' : 'scale-0 opacity-0'
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-navy-800" />
            <span className="h-[1.5px] w-1 bg-navy-800" />
            <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-navy-800" />
          </div>

          {/* Eyes */}
          <div className="absolute left-1/2 top-5 flex -translate-x-1/2 gap-[7px]">
            <span className="block h-2 w-1.5 animate-mascot-blink rounded-[1px] bg-navy-900" />
            <span className="block h-2 w-1.5 animate-mascot-blink rounded-[1px] bg-navy-900" />
          </div>

          {/* Blush / cheeks */}
          <div className="absolute left-1/2 top-8 flex -translate-x-1/2 gap-5">
            <span className="block h-1 w-1.5 rounded-full bg-brand-400/30" />
            <span className="block h-1 w-1.5 rounded-full bg-brand-400/30" />
          </div>
        </div>

        {/* Feet */}
        <div className="absolute left-1/2 top-[52px] flex -translate-x-1/2 gap-2">
          <span className="block h-2 w-3 rounded-full bg-white/90" />
          <span className="block h-2 w-3 rounded-full bg-white/90" />
        </div>
      </div>
    </button>
  );
}
