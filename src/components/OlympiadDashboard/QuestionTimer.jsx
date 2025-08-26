import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

export const QuestionTimer = ({
  initialMinutes,
  initialSeconds,
  onTimeUp,
  isActive,
  onReset
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (onReset) {
      setMinutes(initialMinutes);
      setSeconds(initialSeconds);
    }
  }, [onReset, initialMinutes, initialSeconds]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      if (seconds < 59) {
        setSeconds(seconds + 1);
      }else if(seconds == 59){
        setSeconds(0);
        setMinutes(minutes + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds, isActive, onTimeUp]);


  return (
    <div className={`rounded-lg p-4 border transition-all duration-300 bg-blue-50 border-blue-200`}>
      <div className="flex items-center gap-2 mb-2">
        
        <Clock size={16} className="text-blue-500" />
      
        <span className="text-sm font-medium text-gray-600">
          Question Timer
        </span>
      </div>
      <div className={`text-xl font-bold transition-colors text-blue-500`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      
    </div>
  );
};
