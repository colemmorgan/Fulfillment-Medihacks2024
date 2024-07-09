import React, { useState } from "react";
import { LandingNav } from "../components/LandingNav";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useGetUserData from "../firebase/getters/useGetUserData";

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
  const [user] = useAuthState(auth);
  const { userData, loading } = useGetUserData(user?.uid);

  return (
    <>
      <LandingNav />
      <div className="max-w-[1400px] mt-10 mx-auto px-4">
        <h1 className="text-center bold text-[42px]">Courses</h1>
        <ul className="flex gap-8 flex-wrap mt-12">
          <Course
            img="/images/first-responders-course-img.jpg"
            userData={userData}
            id={"test-course"}
          />
          <Course img="/images/wound-care-course-img.jpg" userData={userData}
          id={"test-course"} />
          <Course
            img="/images/mental-health-course-img.jpg"
            userData={userData}
            id={"test-course"}
          />
        </ul>
        <p className="mt-24 text-center text-3xl">More coming soon...</p>
      </div>
    </>
  );
};
export default Courses;

interface CourseProps {
  img: string;
  userData: UserData | null;
  id: string
}

const Course: React.FC<CourseProps> = ({ img, userData, id }) => {
  const [showLoginMessage, setShowLoginMessage] = useState<boolean>(false);
  return (
    <>
      <div className="py-4 px-6 bg-[#f2f4f5] border border-[#CACADD] rounded-xl">
        <figure className="max-w-[360px] rounded-lg overflow-hidden border border-[#CACADD]">
          <img src={img} alt="" />
        </figure>
        <div className="mt-5">
          <p className="semibold text-xl">First Responders Course</p>
          <p className="mt-3 max-w-[360px]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam
            officia dolor nobis iusto sapiente hic neque enim repellat
            perferendis libero?
          </p>
        </div>
        <div className="flex justify-between mt-2 items-center">
          {userData ? (
            <Link to={"/courses/test-course"}>
              <button className=" bg-opaque px-4 py-2.5 semibold rounded-md hover:bg-main transition-all">
                Launch Course
              </button>
            </Link>
          ) : (
            <>
              <button className=" bg-opaque px-4 py-2.5 semibold rounded-md hover:bg-main transition-all" onClick={() => setShowLoginMessage(true)}>
                Launch Course
              </button>
            </>
          )}
          <span className="semibold">{userData ? userData[id] : "0"}%</span>
        </div>
      </div>
      {showLoginMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-20 backdrop-blur-md bg-light bg-opacity-55">
          <div className="w-[450px]  bg-[#f8f8f8] border border-borderColor rounded-xl px-6 py-10 flex flex-col items-center">
            <p className="text-5xl">Wait!</p>
            <p className="text-xl mt-4">You must be signed in to access courses.</p>
            <div className="flex gap-4 mt-6">
              <button className="bg-opaque w-32 py-2.5 rounded-md" onClick={() => setShowLoginMessage(false)}>Go back</button>
              <Link to={"/login"}><button className=" bg-black text-[#f8f8f8] w-32 py-2.5 rounded-md">Login</button></Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
