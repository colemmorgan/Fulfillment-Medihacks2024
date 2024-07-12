import React, { useState } from "react";
import { userDataAtom } from "../atoms/user-data-atoms";
import { useRecoilState } from "recoil";
import CircleProgress from "./ui/CircleProgress";
import { FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import FadeUp from "./framer-components/FadeUp";
import Reveal from "./framer-components/Reveal";

type DashboardAltProps = {};

const DashboardAlt: React.FC<DashboardAltProps> = () => {
  return (
    <>
      <Profile />
      <GameModes />
      <Stats />

      <div className="mt-8 border-b border-borderColor">
        <p className="text-2xl">Other</p>
        <div className="flex"></div>
      </div>
    </>
  );
};
export default DashboardAlt;

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const [userData] = useRecoilState(userDataAtom);
  const [hideTab, setHideTab] = useState<boolean>(false);
  return (
      <div className="mt-6 border-b border-borderColor pb-4">
        <div className="flex justify-between">
          <p className="text-2xl">Profile</p>
          <p
            className="flex text-[#888888] items-center gap-3 cursor-pointer"
            onClick={() => setHideTab(!hideTab)}
          >
            {hideTab ? "Expand" : "Collapse"}
            <span className={`transition-all ${hideTab ? "rotate-180" : ""}`}>
              <FaChevronUp />
            </span>
          </p>
        </div>
        {!hideTab && (
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
            <div className="p-6 border border-borderColor w-96 h-64 rounded-md">
              <p className="semibold text-xl text-center">Badges</p>
            </div>
          </div>
        )}
      </div>
  );
};

type StatsProps = {};

const Stats: React.FC<StatsProps> = () => {
  const [userData] = useRecoilState(userDataAtom);
  const [hideTab, setHideTab] = useState<boolean>(false);
  return (
      <div className="mt-8 border-b border-borderColor pb-4">
        <div className="flex justify-between">
          <p className="text-2xl">Stats</p>
          <p
            className="flex text-[#888888] items-center gap-3 cursor-pointer"
            onClick={() => setHideTab(!hideTab)}
          >
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

type GameModesProps = {};

const GameModes: React.FC<GameModesProps> = () => {
  const [userData] = useRecoilState(userDataAtom);
  const [hideTab, setHideTab] = useState<boolean>(false);
  return (
        <div className="mt-8 border-b border-borderColor pb-4">
      <div className="flex justify-between">
        <p className="text-2xl">Game Modes</p>
        <p
          className="flex text-[#888888] items-center gap-3 cursor-pointer"
          onClick={() => setHideTab(!hideTab)}
        >
          {hideTab ? "Expand" : "Collapse"}
          <span className={`transition-all ${hideTab ? "rotate-180" : ""}`}>
            <FaChevronUp />
          </span>
        </p>
      </div>
      {!hideTab && (
        <div className="flex my-3 gap-4">
          <div className="p-6 pb-4 border border-borderColor w-96 h-64 rounded-md flex flex-col justify-between">
            <p className="semibold text-xl text-center">Courses</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
              dignissimos necessitatibus hic maxime consectetur earum.
            </p>
            <Link to={"/courses"}>
              <button className="bg-main text-center rounded-md py-1.5 text-sm w-full">
                Launch Gamemode
              </button>
            </Link>
          </div>
          <div className="p-6 pb-4 border border-borderColor w-96 h-64 rounded-md flex flex-col justify-between">
            <p className="semibold text-xl text-center">Notecards</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
              dignissimos necessitatibus hic maxime consectetur earum.
            </p>
            <Link to={"/notepacks"}>
              <button className="bg-main text-center rounded-md py-1.5 text-sm w-full">
                Launch Gamemode
              </button>
            </Link>
          </div>
          <div className="p-6 pb-4 border border-borderColor w-96 h-64 rounded-md flex flex-col justify-between">
            <p className="semibold text-xl text-center">Versus</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
              dignissimos necessitatibus hic maxime consectetur earum.
            </p>
            <Link to={"/courses"}>
              <button className="bg-main text-center rounded-md py-1.5 text-sm w-full">
                Launch Gamemode
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
