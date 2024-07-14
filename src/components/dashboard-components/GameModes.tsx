import { FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import SmoothOpen from "../framer-components/SmoothOpen";
import { IoGameController } from "react-icons/io5";

type GameModesProps = {};

const GameModes: React.FC<GameModesProps> = () => {
  const [hideTab, setHideTab] = useState<boolean>(false);
  return (
    <div className="mt-8 border-b border-borderColor pb-4">
      <div className="flex justify-between">
      <div className="flex gap-2 items-center">
            <span className='text-2xl pb-1 text-main'><IoGameController/></span>
        <p className="text-2xl">Game Modes</p>
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
        <div className="flex flex-wrap my-3 gap-4">
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
            <Link to={"/trivia"}>
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

export default GameModes