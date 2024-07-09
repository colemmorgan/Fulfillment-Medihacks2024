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
import useGetUserData from "../../firebase/getters/useGetUserData";
import { FaSpinner } from "react-icons/fa";

type CourseNavProps = {};
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

const CourseNav: React.FC<CourseNavProps> = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [currentProblem] = useRecoilState(currentProblemAtom);
  const [selectedAnswer] = useRecoilState(setSelectedAnswerAtom);
  const [revealAnswers, setRevealAnswers] = useRecoilState(revealAnswersAtom);
  const { reward } = useReward("rewardId", "confetti");
  const [user] = useAuthState(auth);
  const { userData, loading, setUserData } = useGetUserData(user?.uid);
  const [updating, setUpdating] = useState<boolean>(false);

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
      setUserData((prev: UserData | null) => {
        if (prev && prev[courseId] === 100) {
          return prev;
        } else {
          return {
            ...prev!,
            [courseId]:
              (prev && prev[courseId] !== undefined ? prev[courseId] : 0) + 5,
          };
        }
      });
    }

    setUpdating(false);
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <nav className="max-w-[1124px] px-3 mx-auto flex justify-between py-5 items-center">
      <ul className="flex gap-6">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <li>Dashboard</li>
        <li>Courses</li>
      </ul>
      <div className="flex items-center">
        <span className="mr-3 text-sm rounded-full border border-main h-12 w-12 flex items-center justify-center pt-0.5">
          {loading || updating ? (
            <FaSpinner className="animate-spin" />
          ) : userData && courseId && userData[courseId] !== undefined ? (
            `${userData[courseId]}%`
          ) : (
            <FaSpinner className="animate-spin" />
          )}
        </span>
        <button
          className={`bg-opaque semibold px-6 py-3 rounded-md ${
            revealAnswers ? "opacity-40 cursor-not-allowed" : ""
          }`}
          onClick={checkAnswer}
        >
          Submit
        </button>
      </div>
    </nav>
  );
};
export default CourseNav;
