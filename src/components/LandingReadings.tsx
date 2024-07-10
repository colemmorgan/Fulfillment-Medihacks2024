
import React from "react";

import CardFlip from "./ui/CardFlip";

type LandingReadingsProps = {};

const LandingReadings: React.FC<LandingReadingsProps> = () => {
  return (
    <div className="bg-offWhite p-6 pt-0 border border-borderColor max-w-[800px] mx-auto rounded-2xl absolute w-full left-1/2 -translate-x-1/2 -bottom-[350px] z-40">
      <div className="w-full h-7 flex justify-start items-center space-x-2 px-3 ">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
      </div>
      <div className="w-full  border border-borderColor rounded-xl py-8  text-black">
        <div className="pb-6 border-b border-borderColor w-full text-center">
          <p className="text-4xl semibold">Still not satisfied?</p>
          <p className="mt-2 text-xl">Create notecards for others to study!</p>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <p className="text-xl mb-8">Click to flip card!</p>
          <CardFlip question="How long do you have to be in cold water to get hypothermia?"answer="Hypothermia usually occurs within 20-30 minutes in cold water." />
          <span className="mt-8 bg-main py-2 max-w-[475px] w-full text-center rounded-md semibold">Go to notecards</span>
        </div>
      </div>
    </div>
  );
};

export default LandingReadings;
