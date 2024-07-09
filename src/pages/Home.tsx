// import { useAuthState } from "react-firebase-hooks/auth";

// import { auth } from "../firebase/firebase";
import { LandingNav } from "../components/LandingNav";
import { Link } from "react-router-dom";

export const Home = () => {
 
  return (
    <>
      <LandingNav />
      <div className="px-10 mt-16 pb-32">
        <div className="relative z-20 text-center flex flex-col justify-center">
          <p className="text-4xl ml-2 mb-6 bold ">Introducing</p>
          <h1 className="text-main text-[116px] font-semibold leading-none black ">
            Fulfillment
          </h1>
          <p className="text-4xl font-semibold leading-none bold">
            A Medical Education Game
          </p>
          <div className="mt-5 flex justify-center gap-4  pl-2">
            <Link to={"/courses"}>
              <button className="semibold text-lg bg-opaque pt-2 pb-1.5 w-36 rounded-full">
                Courses
              </button>
            </Link>
           <Link to={"/login"}>
           <button className="semibold text-lg bg-opaque pt-2 pb-1.5 w-36 rounded-full">
              Login
            </button>
           </Link>
          </div>
          <div className="p-6 pt-0 border border-borderColor rounded-2xl max-w-[1032px] mx-auto mt-12 bg-[#f2f4f5]">
            <div className="w-full h-7 flex justify-start items-center space-x-2 px-3 ">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
            </div>
            <figure className=" mx-auto  rounded-xl overflow-hidden border border-borderColor">
              <img src="/images/dash2.png" alt="" className="" />
            </figure>
          </div>
        </div>
      </div>
    </>
  );
};
