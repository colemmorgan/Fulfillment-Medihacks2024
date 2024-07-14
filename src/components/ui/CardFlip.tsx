import React, { useState } from "react";
import { motion } from "framer-motion";

type CardFlipProps = {
    question: string,
    answer: string,
    width: number,
    height: number,
};

const CardFlip: React.FC<CardFlipProps> = ({question, answer, height, width}) => {
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
      className="flip-card rounded-md cursor-pointer w-full"
      style={{height: `${height}px`, maxWidth: `${width}px`}}
      onClick={handleFlip}
    >
      <motion.div
        className="flip-card-inner w-full h-full border border-borderColor rounded-md"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 360 }}
        transition={{ duration: 0.1,  ease: "linear", }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <div className="flip-card-front w-full h-full bg-white rounded-md flex justify-center items-center text-lg md:text-xl lg:text-2xl px-8 text-center overflow-y-auto leading-relaxed">
            {question}
        </div>
        <div className="flip-card-back w-full h-full bg-white rounded-md flex justify-center items-center md:text-lg lg:text-xl px-8 overflow-y-auto leading-relaxed">
            {answer}
        </div>
      </motion.div>
    </div>
  );
};
export default CardFlip;
