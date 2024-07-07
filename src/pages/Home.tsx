import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { LandingNav } from "../components/LandingNav";

export const Home = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <LandingNav/>
      <div className="px-12 mt-24">
        <div className="relative z-20 text-center flex flex-col justify-center">
          <p className=" text-5xl ml-2 mb-6 bold ">Introducing</p>
          <h1 className="text-main text-[145px] font-semibold leading-none black ">
            Fulfillment
          </h1>
          <p className=" text-[60px] font-semibold leading-none bold">
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
        </div>
      </div>
    </>
  );
};
