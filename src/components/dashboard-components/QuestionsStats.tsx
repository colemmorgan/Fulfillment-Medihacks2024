import React from 'react';

type QuestionsStatsProps = {
    attempted: number | undefined,
    correct: number | undefined
};

const QuestionsStats:React.FC<QuestionsStatsProps> = ({attempted, correct}) => {

  const percentage = (attempted && correct) ? Math.round((correct / attempted) * 100) : 0;
    
    return (
        <div className="bg-white col-span-3 rounded-xl box p-5">
            <p className='text-center text-xl mb-4 semibold'>Question Rate</p>
            <CircleProgress percentage={percentage}/>
            <div className="flex gap-3 mt-5 justify-center">
                <p>Correct: {correct}</p>
                <p>Attempted: {attempted}</p>
            </div>
        </div>
    )
}
export default QuestionsStats;


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
      <div className="relative  bg-white">
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