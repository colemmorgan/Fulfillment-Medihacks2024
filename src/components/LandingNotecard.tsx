import React from "react";

import CardFlip from "./ui/CardFlip";
import { Link } from "react-router-dom";
import FadeUp from "./framer-components/FadeUp";

type LandingNotecardProps = {};

const LandingNotecard: React.FC<LandingNotecardProps> = () => {
  return (
    <div className="w-full px-2">
      <FadeUp>
      <div className="bg-offWhite p-4 sm:p-6 pt-0 border border-borderColor max-w-[850px] w-full mx-auto rounded-2xl mt-32 ">
        <div className="w-full h-7 flex justify-start items-center space-x-2 px-3 ">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
        </div>
        <div className="max-w-[802px] w-full border border-borderColor rounded-xl py-8  text-black">
          <div className="p-1.5 sm:p-3 border-b border-borderColor w-full text-center">
            <p className=" text-2xl sm:text-4xl semibold">Still not satisfied?</p>
            <p className="mt-2 text-lg sm:text-xl">
              Create notecards for others to study!
            </p>
          </div>
          <div className="mt-6 flex flex-col items-center p-2 sm:p-4">
            <p className="text-xl mb-8">Click to flip card!</p>
            <CardFlip
              question="How long do you have to be in cold water to get hypothermia?"
              answer="Hypothermia usually occurs within 20-30 minutes in cold water."
              height={288}
              width={500}
            />
            <Link to={"/notepacks"} className="max-w-[500px] w-full">
              <p className="mt-8 bg-main py-2  w-full text-center rounded-md">
                Go to notecards
              </p>
            </Link>
          </div>
        </div>
      </div>
    </FadeUp>
    </div>
  );
};

export default LandingNotecard;
