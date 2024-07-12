import React, { useState } from "react";
import { userDataAtom } from "../atoms/user-data-atoms";
import { useRecoilState } from "recoil";
import CircleProgress from "./ui/CircleProgress";
import { FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import SmoothOpen from "./framer-components/SmoothOpen";
import Profile from "./dashboard-components/Profile";

type DashboardAltProps = {};

const DashboardAlt: React.FC<DashboardAltProps> = () => {
  return (
    <div className="min-h-screen">
      <Profile />
      <GameModes />
      <Stats />

      <div className="mt-8 border-b border-borderColor">
        <p className="text-2xl">Other</p>
        <div className="flex"></div>
      </div>
    </div>
  );
};
export default DashboardAlt;



type StatsProps = {};

const Stats: React.FC<StatsProps> = () => {
  const [userData] = useRecoilState(userDataAtom);
  const [hideTab, setHideTab] = useState<boolean>(false);
  return (
    <div className="mt-8 border-b border-borderColor pb-4">
      <div className="flex justify-between">
        <p className="text-2xl">Stats</p>
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
            <CircleProgress percentage={84} />
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
                  <p>Wins: 0</p>
                  <p>Games Played: 0</p>
                </div>
              </div>
              <div className="">
                <p className="semibold mb-1">Courses</p>
                <div className="flex gap-4 text-sm">
                  <p>Correct: 0</p>
                  <p>Attempted: 0</p>
                </div>
              </div>
              <div className="">
                <p className="semibold mb-1">Notecards</p>
                <div className="flex gap-4 text-sm">
                  <p>Sets Made: 0</p>
                  <p>Sets Studied: 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SmoothOpen>
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
        <div className="flex my-3 gap-4">
          <div className="p-6 pb-4 border border-borderColor w-96 h-64 rounded-md flex flex-col justify-between bg-white">
            <p className="semibold text-xl text-center">Courses</p>
            <p className="leading-relaxed">
              Progress through structured lessons, earning experience by
              answering questions correctly and mastering the material.
            </p>
            <Link to={"/courses"}>
              <button className="bg-main text-center rounded-md py-1.5 text-sm w-full">
                Launch Gamemode
              </button>
            </Link>
          </div>
          <div className="p-6 pb-4 border border-borderColor w-96 h-64 rounded-md flex flex-col justify-between bg-white">
            <p className="semibold text-xl text-center">Notecards</p>
            <p className="leading-relaxed">
              Review and test your knowledge with interactive flashcards,
              perfect for quick study sessions and memorization.
            </p>
            <Link to={"/notepacks"}>
              <button className="bg-main text-center rounded-md py-1.5 text-sm w-full">
                Launch Gamemode
              </button>
            </Link>
          </div>
          <div className="p-6 pb-4 border border-borderColor w-96 h-64 rounded-md flex flex-col justify-between bg-white">
            <p className="semibold text-xl text-center">Versus</p>
            <p className="leading-relaxed">
              Challenge a friend or another player in real-time trivia battles
              to see who knows more and earns the most points.
            </p>
            <Link to={"/courses"}>
              <button className="bg-main text-center rounded-md py-1.5 text-sm w-full">
                Launch Gamemode
              </button>
            </Link>
          </div>
        </div>
      </SmoothOpen>
    </div>
  );
};
