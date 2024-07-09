import React from "react";

type WeeklyProblemCountProps = { attempted: number | undefined,
  correct: number | undefined};

const WeeklyProblemCount: React.FC<WeeklyProblemCountProps> = ({attempted, correct}) => {
  return (
    <div className="box col-span-3 bg-white rounded-xl p-6 text-center flex flex-col justify-between">
      <p className="semibold text-xl">Weekly Problem Count</p>
      <p className="text-main text-8xl semibold max-h-24">{correct}</p>
      <p className="flex gap-4 justify-center">
        <span>Correct: {correct}</span>
        <span>Attempted: {attempted}</span>
      </p>
    </div>
  );
};
export default WeeklyProblemCount;
