import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { currentProblemAtom, revealAnswersAtom, setSelectedAnswerAtom } from '../../atoms/course-atoms';
import { useRecoilState } from 'recoil';
import { useReward } from 'react-rewards';

type CourseNavProps = {
    
};

const CourseNav:React.FC<CourseNavProps> = () => {

  const [currentProblem] =
    useRecoilState(currentProblemAtom);
  const [selectedAnswer] = useRecoilState(
    setSelectedAnswerAtom
  );

  const [revealAnswers, setRevealAnswers] = useRecoilState(revealAnswersAtom)
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean>(false)
  const { reward } = useReward('rewardId', 'confetti');

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(revealAnswers) return
    if(!currentProblem) return
    if(!selectedAnswer) return
  
    setRevealAnswers(true)
    if (selectedAnswer === currentProblem.correctAnswer) {
      reward()
    }
    else {
      console.log("false")
    }
  }
    
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
          <span className="mr-3 rounded-full border border-main h-12 w-12 flex items-center justify-center pt-0.5">
            0%
          </span>
          <button className={`bg-opaque semibold px-6 py-3 rounded-md ${revealAnswers ? "opacity-40 cursor-not-allowed" : ""}`} onClick={checkAnswer} >
            Submit
          </button>
        </div>
      </nav>
    )
}
export default CourseNav;