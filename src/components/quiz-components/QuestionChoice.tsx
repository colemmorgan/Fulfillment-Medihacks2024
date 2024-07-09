import React from "react";
import { useRecoilState } from "recoil";
import {
  currentProblemAtom,
  revealAnswersAtom,
  setSelectedAnswerAtom,
} from "../../atoms/course-atoms";

type QuestionChoiceProps = {
  value: string;
};

const QuestionChoice: React.FC<QuestionChoiceProps> = ({ value }) => {
  const [selectedAnswer, setSelectedAnswer] = useRecoilState(
    setSelectedAnswerAtom
  );
  const [currentProblem] = useRecoilState(currentProblemAtom);
  const [revealAnswers] = useRecoilState(revealAnswersAtom);

  const handleClick = () => {
    if (revealAnswers) return;
    if (selectedAnswer === value) {
      setSelectedAnswer(null);
    } else {
      setSelectedAnswer(value);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative max-w-[900px] w-full py-6 px-8 border border-borderColor flex items-center rounded-md cursor-pointer
        ${
          revealAnswers
            ? value === currentProblem?.correctAnswer
              ? "bg-opaque"
              : "bg-red-200"
            : "bg-[#f2f4f5]"
        }`}
    >
      <AnswerBubble letter={"A"} value={value} />
      <span>{value}</span>
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
