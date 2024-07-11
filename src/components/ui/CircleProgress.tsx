import React from 'react';

interface CircleProgressProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
  }
  
  const CircleProgress: React.FC<CircleProgressProps> = ({
    percentage,
    size = 100,
    strokeWidth = 8,
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
    return (
      <div className="relative">
        <svg className="w-full h-full max-h-28 relative" viewBox={`0 0 ${size} ${size}`}>
          <circle
            className="text-gray-300"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="text-main"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl semibold">
          {Math.round(percentage)}%
        </div>
      </div>
    );
  };
export default CircleProgress;