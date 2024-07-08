import React from "react";

type WeeklyProblemCountProps = {};

const WeeklyProblemCount: React.FC<WeeklyProblemCountProps> = () => {
  return (
    <div className="box col-span-3 bg-white rounded-xl p-6 text-center flex flex-col justify-between">
      <p className="semibold text-xl">Weekly Problem Count</p>
      <p className="text-main text-8xl semibold max-h-24">34</p>
      <p className="flex gap-4 justify-center">
        <span>Correct: 28</span>
        <span>Attempted: 34</span>
      </p>
    </div>
  );
};
export default WeeklyProblemCount;
