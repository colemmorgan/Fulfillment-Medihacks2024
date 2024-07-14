import React, { useState } from "react";
import SmoothOpen from "../framer-components/SmoothOpen";
import { FaChevronUp } from "react-icons/fa";
import { userDataAtom } from "../../atoms/user-data-atoms";
import { useRecoilState } from "recoil";
import CircleProgress from "../ui/CircleProgress";
import { IoIosStats } from "react-icons/io";

type StatsProps = {};

const Stats: React.FC<StatsProps> = () => {
  const [userData] = useRecoilState(userDataAtom);
  const [hideTab, setHideTab] = useState<boolean>(false);

  const problemsCorrect = userData?.problemsCorrect ?? 0;
  const problemsAttempted = userData?.problemsAttempted ?? 1;
  const percentage = Math.round((problemsCorrect / problemsAttempted) * 100);
  return (
    <div className="mt-8 border-b border-borderColor pb-4">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <span className="text-2xl pb-1 text-main">
            <IoIosStats />
          </span>
          <p className="text-2xl">Stats</p>
        </div>
        <p
          className="flex text-[#888888] items-center gap-3 cursor-pointer text-sm"
          onClick={() => setHideTab(!hideTab)}
        >
          {hideTab ? "Expand" : "Collapse"}
          <span className={`transition-all ${hideTab ? "rotate-180" : ""}`}>
            <FaChevronUp />
          </span>
        </p>
      </div>

      <SmoothOpen isHidden={hideTab}>
        <div className="flex my-3 flex-wrap gap-4">
          <div className="p-6 border border-borderColor w-96 h-64 rounded-md flex flex-col justify-between items-center bg-white">
            <p className="text-lg">Question Stats</p>
            <CircleProgress percentage={percentage || 0} />
            <div className="flex gap-4">
              <p>Correct: {userData?.problemsCorrect}</p>
              <p>Attempted: {userData?.problemsAttempted}</p>
            </div>
          </div>
          <div className="p-6 border border-borderColor w-96 h-64 rounded-md flex flex-col justify-between items-center bg-white">
            <p className="text-lg">Problems Correct (7d)</p>
            <p className="text-main text-8xl semibold">
              {userData?.problemsCorrect}
            </p>
            <div className="flex gap-4">
              <p>Correct: {userData?.problemsCorrect}</p>
              <p>Attempted: {userData?.problemsAttempted}</p>
            </div>
          </div>
          <div className="p-6 border border-borderColor w-96 h-64 rounded-md flex flex-col  bg-white">
            <p className="text-lg text-center">Game Mode Stats</p>
            <div className="mt-3 flex flex-col gap-2.5">
              <div className="">
                <p className="semibold mb-1">Versus</p>
                <div className="flex gap-4 text-sm">
                  <p>Wins: {userData?.versusWins}</p>
                  <p>Games Played: {userData?.versusPlayed}</p>
                </div>
              </div>
              <div className="">
                <p className="semibold mb-1">Courses</p>
                <div className="flex gap-4 text-sm">
                  <p>Correct: {userData?.problemsCorrect}</p>
                  <p>Attempted: {userData?.problemsAttempted}</p>
                </div>
              </div>
              <div className="">
                <p className="semibold mb-1">Notecards</p>
                <div className="flex gap-4 text-sm">
                  <p>Sets Created: 0</p>
                  <p>Notecard XP: {userData?.notecardXP}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SmoothOpen>
    </div>
  );
};
export default Stats;
