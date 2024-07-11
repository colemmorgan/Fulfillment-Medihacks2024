// import { useAuthState } from "react-firebase-hooks/auth";

// import { auth } from "../firebase/firebase";
import { LandingNav } from "../components/LandingNav";
import { Link } from "react-router-dom";
import LandingReadings from "../components/LandingNotecard";

export const Home = () => {
  return (
    <>
      <LandingNav />
      <div className="px-10 mt-16">
        <div className="relative z-20 text-center flex flex-col justify-center">
          <p className="text-4xl mb-5 bold ">Introducing</p>
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
              <img src="/images/dash3.png" alt="" className="" />
            </figure>
          </div>
        </div>
      </div>
      <div className=" bg-black -mt-28 text-white flex pt-52 pb-[485px] relative">
        <div className="max-w-[1220px] w-full mx-auto">
          <h2 className="text-5xl semibold text-center">Learn Your Way</h2>
          <div className="flex mt-16 w-full justify-between">
            <div className="px-4 flex flex-col max-w-[580px] ">
              <h4 className="text-3xl mb-6 text-center">
                Learn at your own pace.
              </h4>
              <img
                src="/images/sample.png"
                alt=""
                className="rounded-xl"
              />
              <p className=" mt-4 leading-relaxed text-lg mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                itaque quisquam sapiente aliquid, iusto corporis nihil vero
                aliquam consectetur nam.
              </p>
              <Link to={"/courses"}><span className="bg-main px-6 py-2.5 rounded-md semibold text-black w-full block text-center">Go to Courses</span></Link>
            </div>
            <div className=" px-4 flex flex-col max-w-[580px]">
              <h4 className="text-3xl mb-6 text-center">Compete against others.</h4>
              <img
                src="/images/sample.png"
                alt=""
                className=" rounded-xl"
              />
              <p className="mt-4 leading-relaxed text-lg mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                itaque quisquam sapiente aliquid, iusto corporis nihil vero
                aliquam consectetur nam.
              </p>
              <Link to={"/courses"}><span className="bg-main px-6 py-2.5 rounded-md semibold text-black w-full block text-center">Go to Versus</span></Link>
            </div>
          </div>
          <LandingReadings/>
        </div>
      </div>
      <div className="h-screen"></div>
    </>
  );
};
