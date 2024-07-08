import React from "react";
import { LandingNav } from "../components/LandingNav";

type CoursesProps = {};

const Courses: React.FC<CoursesProps> = () => {
  return (
    <>
      <LandingNav />
      <div className="max-w-[1400px] mt-10 mx-auto px-4">
        <h1 className="text-center bold text-5xl">Courses</h1>
        <ul className="flex gap-8 flex-wrap mt-10">
          <Course img="/images/first-responders-course-img.jpg"/>
          <Course img="/images/wound-care-course-img.jpg"/>
          <Course img="/images/mental-health-course-img.jpg"/>
        </ul>
        <p className="mt-20 text-center text-4xl">More coming soon...</p>
      </div>
    </>
  );
};
export default Courses;

interface CourseProps {
    img: string
}

const Course: React.FC<CourseProps> = ({img}) => {
  return (
    <div className="py-4 px-6 bg-[#f2f4f5] border border-[#CACADD] rounded-xl">
        <figure className="max-w-[360px] rounded-lg overflow-hidden border border-[#CACADD]">
            <img src={img} alt="" />
        </figure>
        <div className="mt-5">
            <p className="semibold text-xl">First Responders Course</p>
            <p className="mt-3 max-w-[360px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam officia dolor nobis iusto sapiente hic neque enim repellat perferendis libero?</p>
        </div>
        <div className="flex justify-between mt-2 items-center">
        <button className=" bg-opaque px-4 py-2.5 semibold rounded-md hover:bg-main transition-all">Launch Course</button>
        <span className="semibold">0%</span>
        </div>
    </div>
  );
};
