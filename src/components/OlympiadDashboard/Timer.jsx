import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ type, resetTrigger, className = '' }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (type === 'question') {
      setSeconds(0);
    }
  }, [resetTrigger, type]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (type === 'global') {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${secs
        .toString()
        .padStart(2, '0')}`;
    }
  };

  const getTimerLabel = () => (type === 'global' ? 'Total Time' : 'Question Time');

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Clock size={16} className='text-blue-600' />
      <div className="text-sm">
        <div className="font-medium text-gray-700">{getTimerLabel()}</div>
        <div className={`font-mono font-bold text-blue-600`}>
          {formatTime(seconds)}
        </div>
      </div>
    </div>
  );
};

export default Timer;
