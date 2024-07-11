import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LandingNav } from "../components/LandingNav";
import { AnimatePresence, motion } from "framer-motion";
import CardFlip from "../components/ui/CardFlip";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";

import { getNotepacks } from "../firebase/getters/getNotepacks";
import NotepackLink from "../components/ui/NotepackLink";

type StudyNotepackProps = {};

type Notecard = {
  question: string;
  answer: string;
};

type Notepack = {
  id: string;
  title: string;
  cards: Notecard[];
  author: {
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const StudyNotepack: React.FC<StudyNotepackProps> = () => {
  const location = useLocation();
  const { notepack } = location.state as { notepack: Notepack };
  const [notepacks, setNotepacks] = useState<Notepack[]>();
  const [originalNotepacks, setOriginalNotepacks] = useState<Notepack[]>();

  useEffect(() => {
    const fetchNotepacks = async () => {
      try {
        const notes = await getNotepacks();
        setOriginalNotepacks(notes)
        const filteredNotes = notes.filter((note) => note.id !== notepack.id)
        setNotepacks(filteredNotes);
      } catch (error) {
      } 
    };

    fetchNotepacks();
  }, []);
  

  const [currentNotecardIndex, setCurrentNotecardIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const handleCardChange = (val: number) => {
    setDirection(val);
    if (val === 1) {
      if (currentNotecardIndex === notepack.cards.length - 1) {
        setCurrentNotecardIndex(0);
      } else {
        setCurrentNotecardIndex((prev) => prev + 1);
      }
    } else if (val === -1) {
      if (currentNotecardIndex === 0) {
        setCurrentNotecardIndex(notepack.cards.length - 1);
      } else {
        setCurrentNotecardIndex((prev) => prev - 1);
      }
    }
  };

  useEffect(() => {
    if(!originalNotepacks || !notepack) return
    setNotepacks(originalNotepacks.filter((note) => note.id != notepack.id))
  },[notepack])

  return (
    <>
      <LandingNav />
      <div className="max-w-[1090px] mx-auto mt-12 pb-20 min-h-screen">
        <h3 className="text-center text-3xl semibold">{notepack.title}</h3>
        <div className="w-full flex justify-center max-w-[700px] mx-auto overflow-hidden pt-12 pb-12 overflow-y-hidden h-[448px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentNotecardIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute max-w-[650px] w-full h-[350px]"
            >
              <CardFlip
                question={notepack?.cards[currentNotecardIndex].question}
                answer={notepack?.cards[currentNotecardIndex].answer}
                height={350}
                width={650}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-6 items-center">
          <span className="text-4xl cursor-pointer text-[#404040] hover:text-main transition-all" onClick={() => handleCardChange(-1)}>
            <FaRegArrowAltCircleLeft />
          </span>
          <span className="text-xl min-w-[69px] text-center">
            {currentNotecardIndex + 1} / {notepack?.cards.length}
          </span>
          <span className="text-4xl cursor-pointer text-[#404040] hover:text-main transition-all" onClick={() => handleCardChange(1)}>
            <FaRegArrowAltCircleRight />
          </span>
        </div>
        <div className="mt-20">
            <p className="text-center text-3xl">Keep Studying</p>
            <ul className="flex gap-5 flex-wrap mt-8">
                {notepacks?.slice(0,3).map((pack, index) => (
                   <motion.li
                   key={pack.id}
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{
                     duration: 0.6,
                     ease: "easeOut",
                     delay: 0.1 * index,
                   }}>
                    <NotepackLink notepack={pack} />
                    </motion.li>
                ))}
            </ul>
        </div>
      </div>
    </>
  );
};

export default StudyNotepack;
