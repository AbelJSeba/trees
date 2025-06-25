import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

interface PowerStatesProps {
  mode: 'sleep' | 'restart' | 'shutdown' | null;
  onWakeUp: () => void;
  onRestartComplete: () => void;
  onPowerOn: () => void;
}

export function PowerStates({ mode, onWakeUp, onRestartComplete, onPowerOn }: PowerStatesProps) {
  const [restartProgress, setRestartProgress] = useState(0);
  const [sleepAnimation, setSleepAnimation] = useState(null);

  useEffect(() => {
    if (mode === 'restart') {
      setRestartProgress(0);
      const interval = setInterval(() => {
        setRestartProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onRestartComplete();
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [mode, onRestartComplete]);

  useEffect(() => {
    if (mode === 'sleep') {
      fetch('/animations/sleeping.lottie')
        .then(response => response.json())
        .then(data => setSleepAnimation(data))
        .catch(error => console.error('Error loading sleep animation:', error));
    }
  }, [mode]);

  if (!mode) return null;

  if (mode === 'sleep') {
    return (
      <motion.div
        className="fixed inset-0 bg-black flex items-center justify-center z-[99999] cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        onClick={onWakeUp}
      >
        {sleepAnimation ? (
          <Lottie
            animationData={sleepAnimation}
            loop={true}
            style={{ width: 400, height: 400 }}
          />
        ) : (
          <motion.div
            className="text-white text-8xl"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            🌙
          </motion.div>
        )}
      </motion.div>
    );
  }

  if (mode === 'restart') {
    const circumference = 2 * Math.PI * 40;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (restartProgress / 100) * circumference;

    return (
      <motion.div
        className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[99999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-white mb-8">
          <img src="/icons/apple-logo.svg" alt="Apple" className="w-16 h-16 mx-auto mb-4 opacity-80" />
        </div>
        
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="4"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="white"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.1s ease-in-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-sm font-medium">{Math.round(restartProgress)}%</span>
          </div>
        </div>

        <div className="text-white mt-6 text-center">
          <p className="text-lg font-medium">Restarting...</p>
          <p className="text-sm opacity-70 mt-1">Askie OS</p>
        </div>
      </motion.div>
    );
  }

  if (mode === 'shutdown') {
    return (
      <motion.div
        className="fixed inset-0 bg-black z-[99999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <button
          onClick={onPowerOn}
          className="w-16 h-16 bg-gray-800 rounded-full border-2 border-gray-600 hover:bg-gray-700 transition-colors flex items-center justify-center"
        >
          <div className="w-6 h-6 border-2 border-white rounded-full border-r-transparent animate-spin"></div>
        </button>
      </motion.div>
    );
  }

  return null;
}