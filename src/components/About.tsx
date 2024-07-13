import React from "react";
import Reveal from "./framer-components/Reveal";
import {
  PiNumberCircleOneFill,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeFill,
} from "react-icons/pi";
import StaggeredFadeUp from "./framer-components/StaggeredFadeUp";
import { Link } from "react-router-dom";

type AboutProps = {};

const About: React.FC<AboutProps> = () => {
  return (
    <div className=" -mt-40 text-black bg-white pt-64  pb-40 flex flex-col items-center">
      <Reveal>
        <h4 className="text-center text-3xl semibold">
          Earn Micro-Credentials, XP, and More!
        </h4>
      </Reveal>
      <div className="flex max-w-[1220px] w-full mx-auto gap-4 mt-16">
        <div className="w-1/3 px-4">
          <StaggeredFadeUp index={0}>
            <div className="flex flex-col items-center">
              <p className="flex gap-3 text-2xl items-center ">
                <span className="text-main text-4xl pb-1">
                  <PiNumberCircleOneFill />
                </span>
                Pick a Game Mode
              </p>
              <ul className="mt-5 list-disc flex flex-col gap-5 text-lg">
                <li>
                  For casual learners, choose{" "}
                  <Link to={"/notepacks"} className="underline">
                    notecards.
                  </Link>
                </li>
                <li>
                  For studious learners, choose{" "}
                  <Link to={"/courses"} className="underline">
                    courses.
                  </Link>
                </li>
                <li>
                  For competitive learners, choose{" "}
                  <Link to={"/trivia"} className="underline">
                    versus.
                  </Link>
                </li>
              </ul>
            </div>
          </StaggeredFadeUp>
        </div>

        <div className="w-1/3 px-4">
          <StaggeredFadeUp index={2}>
            <div className="flex flex-col items-center">
              <p className="flex gap-3 text-2xl items-center">
                <span className="text-main text-4xl pb-1">
                  <PiNumberCircleTwoFill />
                </span>
                Earn Experience
              </p>
              <ul className="mt-5 list-disc flex flex-col gap-5 text-lg">
                <li>View and create notecard sets.</li>
                <li>Correctly answer course questions.</li>
                <li>Play versus games with others.</li>
              </ul>
            </div>
          </StaggeredFadeUp>
        </div>
        <div className="w-1/3 px-4">
          <StaggeredFadeUp index={4}>
            <div className="flex flex-col items-center">
              <p className="flex gap-3 text-2xl items-center justify-center">
                <span className="text-main text-4xl pb-1">
                  <PiNumberCircleThreeFill />
                </span>
                Gain Badges and Levels!
              </p>
              <ul className="mt-5 list-disc flex flex-col gap-5 text-lg">
                <li>Gain badges for accomplishments.</li>
                <li>Continue your lifelong-learning.</li>
                <li>Compete and show off with your friends!</li>
              </ul>
            </div>
          </StaggeredFadeUp>
        </div>
      </div>
    </div>
  );
};
export default About;
