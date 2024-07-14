import React from "react";
import FadeUp from "../framer-components/FadeUp";


type HeroImgProps = {};

const HeroImg: React.FC<HeroImgProps> = () => {
 
  return (
 <div className="px-3 hidden md:block">
  <FadeUp>
     <div
      className="p-6 pt-0 border border-borderColor rounded-2xl max-w-[1032px] mx-auto mt-12 bg-[#f2f4f5]"
    >
      <div className="w-full h-7 flex justify-start items-center space-x-2 px-3 ">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
      </div>
      <figure className=" mx-auto  rounded-xl overflow-hidden border border-borderColor">
        <img src="/images/dash3.png" alt="" className="" />
      </figure>
    </div>
 </FadeUp>
 </div>
  );
};

export default HeroImg;
