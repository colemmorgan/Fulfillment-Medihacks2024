import React, { useEffect, useState } from "react";
import { LandingNav } from "../components/LandingNav";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getNotepacks } from "../firebase/getters/getNotepacks";
import NotepackLink from "../components/ui/NotepackLink";

type NotecardHomeProps = {};

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

const NotecardHome: React.FC<NotecardHomeProps> = () => {
  const [notepacks, setNotepacks] = useState<Notepack[]>();

  useEffect(() => {
    const fetchNotepacks = async () => {
      try {
        const notes = await getNotepacks();
        setNotepacks(notes);
      } catch (error) {}
    };

    fetchNotepacks();
  }, []);

  return (
    <>
      <LandingNav />
      <div className="max-w-[1200px] mx-auto mt-12">
        <h3 className="text-center text-7xl bold">Notes!</h3>
        <p className="max-w-[400px] mx-auto text-center text-xl mt-3">
          Study community made notecards or create your own{" "}
          <Link to={"/notepack-maker"} className="underline">
            here +
          </Link>
          .
        </p>
        <ul className="mt-10 flex gap-4 flex-wrap max-w-[1098px] mx-auto">
          {notepacks?.map((notepack, index) => (
            <motion.li
              key={notepack.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.1 * index,
              }}
            >
              <NotepackLink notepack={notepack} />
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default NotecardHome;
