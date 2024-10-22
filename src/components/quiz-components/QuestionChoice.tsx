import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  currentProblemAtom,
  revealAnswersAtom,
  setSelectedAnswerAtom,
} from "../../atoms/course-atoms";

type QuestionChoiceProps = {
  value: string;
  index: number;
};

const QuestionChoice: React.FC<QuestionChoiceProps> = ({ value, index }) => {
  const [selectedAnswer, setSelectedAnswer] = useRecoilState(
    setSelectedAnswerAtom
  );
  const [currentProblem] = useRecoilState(currentProblemAtom);
  const [revealAnswers] = useRecoilState(revealAnswersAtom);
  const [letterChoice, setLetterChoice] = useState<string>("")

  const handleClick = () => {
    if (revealAnswers) return;
    if (selectedAnswer === value) {
      setSelectedAnswer(null);
    } else {
      setSelectedAnswer(value);
    }
  };

  useEffect(() => {
    if(index === 0) {
      setLetterChoice("A")
    }
    else if(index === 1) {
      setLetterChoice("B")
    }
    else if(index === 2) {
      setLetterChoice("C")
    }
    else if(index === 3) {
      setLetterChoice("D")
    }
  },[index])

  return (
    <div
      onClick={handleClick}
      className={`relative max-w-[900px] w-full py-4 md:py-5 px-5 md:px-7 lg:px-8 border border-borderColor flex items-center rounded-md cursor-pointer
        ${
          revealAnswers
            ? value === currentProblem?.correctAnswer
              ? "bg-opaque"
              : ""
            : "bg-[#f2f4f5]"
        } ${
        revealAnswers &&
        value === selectedAnswer &&
        selectedAnswer !== currentProblem?.correctAnswer
          ? "bg-red-200"
          : ""
      }`}
    >
      <AnswerBubble letter={letterChoice} value={value} />
      <span className="text-sm sm:text-base">{value}</span>
    </div>
  );
};
export default QuestionChoice;

interface AnswerBubbleProps {
  letter: string;
  onClick?: () => void;
  value: string;
}

const AnswerBubble: React.FC<AnswerBubbleProps> = ({ letter, value }) => {
  const [selectedAnswer] = useRecoilState(setSelectedAnswerAtom);

  return (
    <div
      className={`
          min-w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
          border-2 border-opaque transition-all duration-300 ease-in-out mr-4
          text-black pt-0.5 relative
        `}
      style={{ backgroundColor: selectedAnswer === value ? "#9195F6" : "" }}
    >
      {letter}
    </div>
  );
};
