import React, { useState } from "react";
import { LandingNav } from "../components/LandingNav";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../atoms/user-data-atoms";
import StaggeredFadeUp from "../components/framer-components/StaggeredFadeUp";

type CoursesProps = {};
interface UserData {
  uid: string;
  email: string | null;
  createdAt: number;
  updatedAt: number;
  firstName: string;
  lastName: string;
  level: number;
  experience: number;
  problemsAttempted: number;
  problemsCorrect: number;
  problemsAttempted7D: number;
  problemsCorrect7D: number;
  [key: string]: any;
  course1Progress: number;
  course2Progress: number;
  course3Progress: number;
}

const Courses: React.FC<CoursesProps> = () => {
  const [userData] = useRecoilState(userDataAtom);

  const courses = [
    {
      id: "cpdflmp",
      title: "Professional Development for Front-Line Medical Professionals",
      desc: "Learn critical protocols for efficient emergency medical response.",
      img: "/images/first-responders-course-img.jpg",
    },
    {
      id: "ebpmm",
      title: "Evidence-Based Practice in Modern Medicine",
      desc: "Explore evidence-based practices for optimal patient care.",
      img: "/images/ebpmm-course-img.jpg",
    },
    {
      id: "merbps",
      title: "Medical Error Reduction: Best Practices and Strategies",
      desc: "Master advanced emergency response strategies.",
      img: "/images/merbps-course-img.jpg",
    },
  ];

  return (
    <>
      <LandingNav />
      <div className="max-w-[1220px] mt-16 mx-auto px-4">
        <h1 className="text-center bold text-[42px]">Courses</h1>
        <ul className="flex gap-6 flex-wrap mt-12">
          {courses.map((course, index) => (
            <StaggeredFadeUp index={index} key={course.title}>
              <Course
                img={course.img}
                title={course.title}
                id={course.id}
                userData={userData}
                desc={course.desc}
              />
            </StaggeredFadeUp>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Courses;

interface CourseProps {
  img: string;
  title: string;
  userData: UserData | null;
  desc: string;
  id: string;
}

const Course: React.FC<CourseProps> = ({ img, title, userData, id, desc }) => {
  const [showLoginMessage, setShowLoginMessage] = useState<boolean>(false);
  return (
    <>
      <div className="py-4 px-6 bg-[#f2f4f5] border border-[#CACADD] rounded-xl max-w-[380px]">
        <Link to={`/courses/${id}`}>
          <figure className="max-w-[330px] max-h-[220px] rounded-lg overflow-hidden border border-[#CACADD]">
            <img
              src={img}
              alt=""
              className=" w-full transition-all hover:scale-105 cursor-pointer"
            />
          </figure>
        </Link>
        <div className="mt-5">
          <p className="semibold text-xl">{title}</p>
          <p className="mt-3 max-w-[330px]">{desc}</p>
        </div>
        <div className="flex justify-between mt-2 items-center">
          {userData ? (
            <Link to={`/courses/${id}`}>
              <button className=" bg-opaque px-4 py-2.5 semibold rounded-md hover:bg-main transition-all text-sm">
                Launch Course
              </button>
            </Link>
          ) : (
            <>
              <button
                className=" bg-opaque px-4 py-2.5 semibold rounded-md hover:bg-main transition-all text-sm"
                onClick={() => setShowLoginMessage(true)}
              >
                Launch Course
              </button>
            </>
          )}
          <span className="semibold">
            {userData ? userData[`${id}Progress`] : "0"}%
          </span>
        </div>
      </div>
      {showLoginMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-20 backdrop-blur-md bg-light bg-opacity-55">
          <div className="w-[450px]  bg-[#f8f8f8] border border-borderColor rounded-xl px-6 py-10 flex flex-col items-center">
            <p className="text-5xl">Wait!</p>
            <p className="text-xl mt-4">
              You must be signed in to access courses.
            </p>
            <div className="flex gap-4 mt-6">
              <button
                className="bg-opaque w-32 py-2.5 rounded-md"
                onClick={() => setShowLoginMessage(false)}
              >
                Go back
              </button>
              <Link to={"/login"}>
                <button className=" bg-black text-[#f8f8f8] w-32 py-2.5 rounded-md">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
