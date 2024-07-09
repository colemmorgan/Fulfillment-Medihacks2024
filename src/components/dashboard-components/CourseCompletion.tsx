import React from "react";
import { FaCheckCircle, FaLongArrowAltRight } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../../atoms/user-data-atoms";
import { Link } from "react-router-dom";

type CourseCompletionProps = {};

const CourseCompletion: React.FC<CourseCompletionProps> = () => {
  const [userData] = useRecoilState(userDataAtom);
  return (
    <div className="col-span-3 bg-white rounded-xl box py-6 px-5">
      <p className="text-center text-xl semibold">Course Completion</p>
      <ul className="flex flex-col gap-3 mt-5">
        <li className="flex justify-between items-center">
          <span className="">First Responders Training</span>
          <span className="text-xl text-main">
            <FaCheckCircle />
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span className="">Wound Care</span>
          <span className="text-xl text-main">
            <FaCheckCircle />
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span className="">Mental Health</span>
          <span className="text-xl text-main">
            <FaCheckCircle />
          </span>
        </li>
      </ul>
      <Link to={"/courses"}>
        {" "}
        <p className="flex mt-5 semibold items-center underline">
          Go to courses{" "}
          <span className="ml-2 text-2xl text-main pb-0.5">
            <FaLongArrowAltRight />
          </span>
        </p>
      </Link>
    </div>
  );
};
export default CourseCompletion;
