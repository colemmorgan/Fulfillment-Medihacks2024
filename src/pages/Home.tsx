
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase/firebase";
import { LandingNav } from "../components/LandingNav";

export const Home = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <LandingNav/>
      <div className="px-10 mt-20 pb-32">
        <div className="relative z-20 text-center flex flex-col justify-center">
          <p className=" text-[42px] ml-2 mb-6 bold ">Introducing</p>
          <h1 className="text-main text-[140px] font-semibold leading-none black ">
            Fulfillment
          </h1>
          <p className=" text-[52px] font-semibold leading-none bold">
            A Medical Education Game
          </p>
          <div className="mt-5 flex justify-center gap-4  pl-2">
            <span className="semibold text-xl bg-opaque pt-2.5 pb-1.5 w-44 rounded-full">
              Get Started
            </span>
            <span className="semibold text-xl bg-opaque pt-2.5 pb-1.5 w-44 rounded-full">
              Login
            </span>
          </div>
         <div className="p-6 pt-0 border border-[#CACADD] rounded-2xl max-w-[1164px] mx-auto mt-16 bg-[#f2f4f5]">
         <div className="w-full h-8 flex justify-start items-center space-x-2 px-3 ">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
          </div>
         <figure className="max-w-[1100px] mx-auto  rounded-xl overflow-hidden border border-[#CACADD]">
            <img src="/images/dashboard.png" alt="" className=""/>
          </figure>
         </div>
        </div>
      </div>
    </>
  );
};
