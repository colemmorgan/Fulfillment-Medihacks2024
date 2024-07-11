import React, { useState } from "react";
import { userDataAtom } from "../atoms/user-data-atoms";
import { useRecoilState } from "recoil";
import Reveal from "./framer-components/Reveal";
import CircleProgress from "./ui/CircleProgress";
import { FaChevronUp } from "react-icons/fa";

type DashboardAltProps = {};

const DashboardAlt: React.FC<DashboardAltProps> = () => {
  const [userData] = useRecoilState(userDataAtom);
  return (
    <>
      <div className="mt-8 border-b border-borderColor">
        <p className="text-2xl">Profile</p>
        <div className="flex my-3 gap-4">
          <div className="p-6 border border-borderColor w-96 h-64 rounded-md">
            <p className="text-xl semibold">
              {userData?.firstName} {userData?.lastName}
            </p>
            <p>{userData?.createdAt}</p>
          </div>
          <div className="p-6 border border-borderColor w-96 h-64 rounded-md">
            <p className="semibold text-xl text-center">Badges</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-b border-borderColor">
        <p className="text-2xl">Game Modes</p>
        <div className="flex my-3 gap-4">
        <div className="p-6 border border-borderColor w-96 h-64 rounded-md">
            <p className="semibold text-xl text-center">Courses</p>
          </div>
          <div className="p-6 border border-borderColor w-96 h-64 rounded-md">
            <p className="semibold text-xl text-center">Courses</p>
          </div>
          <div className="p-6 border border-borderColor w-96 h-64 rounded-md">
            <p className="semibold text-xl text-center">Courses</p>
          </div>
        </div>
        
      </div>

      <Stats />

      <div className="mt-8 border-b border-borderColor">
        <p className="text-2xl">Other</p>
        <div className="flex"></div>
      </div>
    </>
  );
};
export default DashboardAlt;

type StatsProps = {};

const Stats: React.FC<StatsProps> = () => {
  const [userData] = useRecoilState(userDataAtom);
  const [hideTab, setHideTab] = useState<boolean>(false);
  return (
    <div className="mt-12 border-b border-borderColor">
      <div className="flex justify-between">
        <p className="text-2xl">Stats</p>
        <p className="flex text-[#888888] items-center gap-3 cursor-pointer" onClick={() => setHideTab(!hideTab)}>
          {hideTab ? "Expand" : "Collapse"}
          <span className={`transition-all ${hideTab ? "rotate-180" : ""}`}>
            <FaChevronUp />
          </span>
        </p>
      </div>
      {!hideTab && (
        <div className="flex my-3 flex-wrap gap-4">
          <div className="p-6 border border-borderColor w-96 h-64 rounded-md flex flex-col justify-between items-center ">
            <p className="text-lg">Question Stats</p>
            <CircleProgress percentage={84} />
            <div className="flex gap-4">
              <p>Correct: {userData?.problemsCorrect}</p>
              <p>Attempted: {userData?.problemsAttempted}</p>
            </div>
          </div>
          <div className="p-6 border border-borderColor w-96 h-64 rounded-md flex flex-col justify-between items-center ">
            <p className="text-lg">Problems Correct (7d)</p>
            <p className="text-main text-8xl semibold">
              {userData?.problemsCorrect}
            </p>
            <div className="flex gap-4">
              <p>Correct: {userData?.problemsCorrect}</p>
              <p>Attempted: {userData?.problemsAttempted}</p>
            </div>
          </div>
          <div className="p-6 border border-borderColor w-96 h-64 rounded-md flex flex-col  ">
            <p className="text-lg text-center">Game Mode Stats</p>
            
          </div>
        </div>
      )}
    </div>
  );
};
