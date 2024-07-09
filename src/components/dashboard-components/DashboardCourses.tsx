import React from "react";
import { Link } from "react-router-dom";

type DashboardCoursesProps = {};

const DashboardCourses: React.FC<DashboardCoursesProps> = () => {
  return (
    <div className="col-span-6 bg-white box rounded-xl p-6">
      <p className="text-xl semibold">Courses</p>
      <ul className="mt-3 flex gap-5">
        <Link to={"/courses"}>
          <li className="max-w-44 cursor-pointer">
            <p className="text-center text-sm mb-2">
              First Responders Training
            </p>
            <img
              src="/images/first-responders-course-img.jpg"
              alt=""
              className="rounded-lg opacity-95"
            />
          </li>
        </Link>
        <Link to={"/courses"}>
          <li className="max-w-44 cursor-pointer">
            <p className="text-center text-sm mb-2">Wound Care</p>
            <img
              src="/images/wound-care-course-img.jpg"
              alt=""
              className="rounded-lg opacity-95"
            />
          </li>
        </Link>
        <Link to={"/courses"}>
          <li className="max-w-44 cursor-pointer">
            <p className="text-center text-sm mb-2">Mental Health</p>
            <img
              src="/images/mental-health-course-img.jpg"
              alt=""
              className="rounded-lg opacity-95"
            />
          </li>
        </Link>
      </ul>
    </div>
  );
};
export default DashboardCourses;
