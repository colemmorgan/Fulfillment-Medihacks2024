import React from "react";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../../atoms/user-data-atoms";

type BadgesProps = {};

const Badges: React.FC<BadgesProps> = () => {
    const [userData] = useRecoilState(userDataAtom);
  return (
    <div className="p-6 border border-borderColor w-96 h-64 rounded-md bg-white">
      <p className="semibold text-xl text-center ">Badges</p>
      <div className="mt-4 flex flex-wrap gap-y-4 justify-center">
        {/* <Badge img="/badges/trophy.svg"/>
        <Badge img={"/badges/friends.svg"}/>
        <Badge img={"/badges/star.svg"}/>
        <Badge img={"/badges/window-badge.svg"}/>
        <Badge img={"/badges/simple-badge.svg"}/>
        <Badge img={"/badges/winged-badge.svg"}/>
        <Badge img={"/badges/circle-star-dark.svg"}/>
        <Badge img={"/badges/badge.svg"}/>
        <Badge img={"/badges/earth-badge.svg"}/>
        <Badge img={"/badges/user-badge.svg"}/> */}
      </div>
    </div>
  );
};
export default Badges;




type BadgeProps = {
    img: string,
    desc: string,
};

const Badge:React.FC<BadgeProps> = ({img, desc}) => {
    
    return (
        <div className="relative group  px-2 overflow-visible">
            <img src={img} alt="" className="w-12 relative z-10"/>
            <div className="absolute z-40 bg-main text-xs py-0.5 px-2 rounded-md -bottom-6 hidden group-hover:flex w-40 border border-black">{desc}</div>
        </div>
    )
}
