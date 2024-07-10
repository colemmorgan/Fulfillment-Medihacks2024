import React, { useState } from "react";
import { motion } from "framer-motion";

type CardFlipProps = {
    question: string,
    answer: string,
};

const CardFlip: React.FC<CardFlipProps> = ({question, answer}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };
  return (
    <div
      className="flip-card w-[500px] h-72 rounded-md"
      onClick={handleFlip}
    >
      <motion.div
        className="flip-card-inner w-full h-full border border-borderColor rounded-md"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 360 }}
        transition={{ duration: 0.3,  ease: "linear", }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <div className="flip-card-front w-full h-full bg-white rounded-md flex justify-center items-center text-2xl px-6 text-center">
            {question}
        </div>
        <div className="flip-card-back w-full h-full bg-white rounded-md flex justify-center items-center text-lg px-6">
            {answer}
        </div>
      </motion.div>
    </div>
  );
};
export default CardFlip;
