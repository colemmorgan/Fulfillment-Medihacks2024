import React from 'react';
import CircleProgress from '../ui/CircleProgress';

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


