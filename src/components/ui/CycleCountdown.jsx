import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CycleCountdown = ({ endsAt, title }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endsAt) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [endsAt]);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) return null;

    return (
      <div key={interval} className="flex flex-col items-center bg-white border border-zinc-200/80 rounded-2xl p-3 min-w-[70px] shadow-sm">
        <span className="text-xl font-black text-zinc-900 tracking-tight">
          {String(timeLeft[interval]).padStart(2, '0')}
        </span>
        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
          {interval}
        </span>
      </div>
    );
  });

  if (timerComponents.length === 0) {
    return (
      <div className="bg-zinc-900 text-zinc-400 text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-2xl border border-zinc-800 inline-block text-center shadow-lg">
        🔒 Voting Term Expired & Sealed
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-zinc-50 to-zinc-100/60 border border-zinc-200/60 rounded-3xl p-6 max-w-xl mx-auto text-center shadow-sm mb-8">
      <span className="text-[10px] bg-orange-600 text-white font-black tracking-widest uppercase px-2.5 py-1 rounded-md">
        Active Election: {title}
      </span>
      <h3 className="text-zinc-800 font-bold text-sm mt-3 mb-4 tracking-tight">Ballot boxes lock automatically in:</h3>
      <div className="flex gap-2 justify-center">
        {timerComponents}
      </div>
    </div>
  );
};