import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  currentProblemAtom,
  revealAnswersAtom,
  setSelectedAnswerAtom,
} from "../../atoms/course-atoms";
import { useRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import GradeQuestion from "../../firebase/transactions/GradeQuestion";
import { useReward } from "react-rewards";
import { FaSpinner } from "react-icons/fa";
import { userDataAtom, userDataLoading } from "../../atoms/user-data-atoms";
import grantXP from "../../firebase/transactions/GrantXp";

type CourseNavProps = {};





const CourseNav: React.FC<CourseNavProps> = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [currentProblem] = useRecoilState(currentProblemAtom);
  const [selectedAnswer] = useRecoilState(setSelectedAnswerAtom);
  const [revealAnswers, setRevealAnswers] = useRecoilState(revealAnswersAtom);
  const { reward } = useReward("rewardId", "confetti");
  const [user] = useAuthState(auth)
  const [userData, setUserData] = useRecoilState(userDataAtom)
  const [loading] = useRecoilState(userDataLoading)
  const [updating, setUpdating] = useState<boolean>(false);
  const [showCompletionMessage, setShowCompletionMessage] =
  useState<boolean>(false);

  const checkAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) return;
    if (
      revealAnswers ||
      !currentProblem ||
      !selectedAnswer ||
      !courseId ||
      !userData
    )
      return;

    setUpdating(true);
    setRevealAnswers(true);

    const result = await GradeQuestion(
      currentProblem,
      user.uid,
      courseId,
      selectedAnswer,
      reward
    );

  if (result) {
    const didUserGainXp = await grantXP(user.uid,"course",5)
    if(didUserGainXp) {
      setUserData(prev => ({...prev!, experience: (prev?.experience || 0) + 5}))
    }
    setUserData((prevUserData) => {
      if (prevUserData && prevUserData[`${courseId}Progress`] === 100) {
        return prevUserData; 
      } else {
        return {
          ...prevUserData!,
          [`${courseId}Progress`]: (prevUserData && prevUserData[`${courseId}Progress`] !== undefined ? prevUserData[`${courseId}Progress`] : 0) + 5,
        };
      }
    });
  }

    setUpdating(false);
  };

  useEffect(() => {
    if(!userData || !courseId) return
    if(userData[courseId] === 100) {
      setShowCompletionMessage(true)
    }
  }, [userData]);

  return (
    <><nav className="max-w-[1124px] px-6 mx-auto flex justify-between py-5 items-center">
    <ul className="flex gap-6">
      <Link to={"/"}>
        <li>Home</li>
      </Link>
      <div className="gap-6 hidden md:flex">
      <Link to={"/dashboard"}><li>Dashboard</li></Link>
      <Link to={"/courses"}><li>Courses</li></Link>
      </div>
    </ul>
    <div className="flex items-center">
      <span className="mr-3 text-sm rounded-full border border-main h-12 w-12 flex items-center justify-center pt-0.5">
        {loading || updating ? (
          <FaSpinner className="animate-spin" />
        ) : userData && courseId && userData[`${courseId}Progress`] !== undefined ? (
          `${userData[`${courseId}Progress`]}%`
        ) : (
          <FaSpinner className="animate-spin" />
        )}
      </span>
      <button
        className={`bg-opaque semibold px-6 pt-3 pb-2.5 rounded-md ${
          revealAnswers ? "opacity-40 cursor-not-allowed" : ""
        }`}
        onClick={checkAnswer}
      >
        Submit
      </button>
    </div>
  </nav>
  {showCompletionMessage && (
    <div className="fixed left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 py-8 px-10 bg-white z-30 flex flex-col items-center border border-borderColor max-w-[440px] rounded-md">
      <p className="text-3xl semibold">Congratulations!</p>
      <p className="mt-3 text-xl">You have completed this course!</p>
      <p className="mt-3 text-lg text-center">
        You may have completed the course but your learning doesn't stop
        here.
      </p>
      <div className="flex mt-8 gap-6">
        <button className="w-40 py-2  bg-black text-white rounded-md" onClick={() => setShowCompletionMessage(false)}>
          Keep Practicing
        </button>
        <Link to={"/courses"}>
          <button className="w-40 py-2  bg-opaque rounded-md">
            Courses
          </button>
        </Link>
      </div>
    </div>
  )}</>
  );
};
export default CourseNav;
