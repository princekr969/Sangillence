import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const Timer = ({ 
  initialMinutes, 
  initialSeconds, 
  label,
  variant = 'primary'
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const getTimerStyle = () => {
    if (isExpired) {
      return 'bg-red-50 border-red-200';
    }
    if (variant === 'secondary') {
      return 'bg-blue-50 border-blue-200';
    }
    return 'bg-white border-gray-200';
  };

  const getTextColor = () => {
    if (isExpired) {
      return 'text-red-600';
    }
    if (minutes === 0 && seconds <= 30) {
      return 'text-orange-600';
    }
    return 'text-gray-800';
  };

  return (
    <div className={`rounded-lg p-4 border transition-colors ${getTimerStyle()}`}>
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <Clock size={16} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className={`text-2xl font-bold transition-colors ${getTextColor()}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      {isExpired && (
        <div className="text-xs text-red-500 mt-1 font-medium">
          Waktu Habis!
        </div>
      )}
    </div>
  );
};
