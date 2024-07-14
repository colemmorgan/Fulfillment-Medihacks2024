import React from "react";
import CourseNav from "./CourseNav";
import QuestionChoice from "./QuestionChoice";

type CourseLoadingProps = {};

const CourseLoading: React.FC<CourseLoadingProps> = () => {
  return (
    <>
      <CourseNav />

      <div className="max-w-[924px] px-3 mx-auto mt-14">
        <p className="semibold text-3xl h-9"></p>
        <ul className="flex flex-col items-center gap-4 mt-10">
          <QuestionChoice value={""} index={1}/>
          <QuestionChoice value={""} index={1}/>
          <QuestionChoice value={""} index={1}/>
          <QuestionChoice value={""} index={1}/>
        </ul>
      </div>
    </>
  );
};
export default CourseLoading;
