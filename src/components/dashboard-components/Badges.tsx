import React from "react";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../../atoms/user-data-atoms";

type BadgesProps = {};

const Badges: React.FC<BadgesProps> = () => {
  const [userData] = useRecoilState(userDataAtom);

  const countCoursesCompleted = (): number => {
    if (!userData) return 0;
    let count: number = 0;
    if (userData.merbpsProgress === 100) count++;
    if (userData.ebpmmProgress === 100) count++;
    if (userData.cpdflmpProgress === 100) count++;
    return count;
  };

  return (
    <div className="p-6 border border-borderColor w-96 h-64 rounded-md bg-white">
      <p className="semibold text-xl text-center ">Badges</p>
      <div className="mt-8 flex flex-wrap gap-y-4 justify-center">
        {userData && (
          <>
            <Badge
              img="/badges/trophy.svg"
              desc="Completed a course!"
              grayscale={countCoursesCompleted() < 1}
            />
            <Badge
              img={"/badges/friends.svg"}
              desc={"Played 10 versus games with friends."}
              grayscale={userData.versusPlayed < 10}
            />
            <Badge
              img={"/badges/star.svg"}
              desc={"Reached level 10!"}
              grayscale={userData.experience / 100 < 9}
            />
            <Badge
              img={"/badges/window-badge.svg"}
              desc={"Create a notecard set!"}
              grayscale={userData.notepacksMade < 1}
            />
            <Badge
              img={"/badges/simple-badge.svg"}
              desc={"Reached level 2!"}
              grayscale={userData.experience / 100 < 1}
            />
            <Badge
              img={"/badges/winged-badge.svg"}
              desc="Won a versus game!"
              grayscale={userData.versusWins < 1}
            />
            <Badge
              img={"/badges/circle-star-dark.svg"}
              desc={"Answered 50 Questions correctly!"}
              grayscale={userData.problemsCorrect < 50}
            />
            <Badge
              img={"/badges/badge.svg"}
              desc={"Created Your Account!"}
              grayscale={false}
            />
            <Badge
              img={"/badges/earth-badge.svg"}
              desc="Reached level 5!"
              grayscale={userData.experience / 100 < 4}
            />
            <Badge
              img={"/badges/user-badge.svg"}
              desc={"Completed 2 courses"}
              grayscale={countCoursesCompleted() < 1}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default Badges;

type BadgeProps = {
  img: string;
  desc: string;
  grayscale: boolean;
};

const Badge: React.FC<BadgeProps> = ({ img, desc, grayscale }) => {
  return (
    <div className={`relative group  px-2 overflow-visible  `}>
      <img
        src={img}
        alt=""
        className={`w-12 ${grayscale ? "filter opacity-60 grayscale" : ""}`}
      />
      <div
        className={`absolute z-50 bg-main/60 backdrop-blur-md text-xs py-1 px-2 rounded-md -bottom-6 left-4 hidden group-hover:flex w-[152px] border border-indigo-400`}
      >
        {desc} {grayscale && "(not earned yet)"}
      </div>
    </div>
  );
};
