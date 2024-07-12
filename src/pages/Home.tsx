// import { useAuthState } from "react-firebase-hooks/auth";

// import { auth } from "../firebase/firebase";
import { LandingNav } from "../components/LandingNav";
import { Link } from "react-router-dom";
import LandingReadings from "../components/LandingNotecard";
import Reveal from "../components/framer-components/Reveal";
import HeroImg from "../components/ui/HeroImg";
import FadeUp from "../components/framer-components/FadeUp";
import Footer from "../components/Footer";

export const Home = () => {
  return (
    <>
      <LandingNav />
      <div className="px-10 mt-16 min-h-[900px]">
        <div className="relative z-20 text-center flex flex-col  items-center">
          <Reveal>
            <p className="text-4xl mb-5 bold ">Introducing</p>
          </Reveal>
          <Reveal>
            <h1 className="text-main text-[116px] font-semibold leading-none black ">
              Fulfillment
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-4xl font-semibold leading-none bold">
              A Medical Education Game
            </p>
          </Reveal>
          <FadeUp>
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
          </FadeUp>
          <HeroImg />
        </div>
      </div>
      <div className=" bg-black -mt-28 text-white flex pt-52">
        <div className="max-w-[1220px] w-full mx-auto flex flex-col items-center">
          <Reveal>
            <h2 className="text-5xl semibold text-center mx-auto">
              Learn Your Way
            </h2>
          </Reveal>
          <div className="flex mt-16 w-full justify-between">
            <div className="px-4 flex flex-col max-w-[580px] items-center">
              <Reveal>
                <h4 className="text-3xl mb-6 text-center">
                  Learn at your own pace.
                </h4>
              </Reveal>
              <FadeUp>
                <div className="">
                  <figure>
                    <img
                      src="/images/sample.png"
                      alt=""
                      className="rounded-xl"
                    />
                  </figure>

                  <p className=" mt-4 leading-relaxed text-lg mb-4">
                  Progress through structured lessons, earning experience by
                  answering questions correctly and mastering the material.
                  </p>
                  <Link to={"/courses"} className="w-full">
                    <p className="bg-main px-6 py-2.5 rounded-md semibold text-black text-center">
                      Go to Courses
                    </p>
                  </Link>
                </div>
              </FadeUp>
            </div>
            <div className=" px-4 flex flex-col items-center max-w-[580px]">
              <Reveal>
                <h4 className="text-3xl mb-6 text-center">
                  Compete against others.
                </h4>
              </Reveal>
              <FadeUp>
               <div className="">
               <figure>
                  <img
                    src="/images/sample.png"
                    alt=""
                    className=" rounded-xl"
                  />
                </figure>
              
              <p className="mt-4 leading-relaxed text-lg mb-4">
              Challenge a friend or another player in real-time trivia battles
              to see who knows more and earns the most points.
              </p>
              <Link to={"/trivia"} className="w-full">
                <span className="bg-main px-6 py-2.5 rounded-md semibold text-black w-full block text-center">
                  Go to Versus
                </span>
              </Link>
               </div>
              </FadeUp>
            </div>
          </div>
          <LandingReadings />
        </div>
      </div>
      <div className="h-[600px] -mt-40 text-black bg-white">ghh</div>
      <Footer/>
    </>
  );
};
