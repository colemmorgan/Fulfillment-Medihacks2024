import React, { useEffect, useState } from "react";
import { LandingNav } from "../components/LandingNav";
import { Link, useNavigate } from "react-router-dom";
import { getNotepacks } from "../firebase/getters/getNotepacks";

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
      } catch (error) {
      } 
    };

    fetchNotepacks();
  }, []);

  useEffect(() => {
    console.log(notepacks)
  },[notepacks])
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
          {notepacks?.map((notepack) => (
            <NotepackLink notepack={notepack}/>
          ))}
        </ul>
      </div>
    </>
  );
};
export default NotecardHome;

type NotepackLinkProps = {
    notepack: Notepack
};

const NotepackLink: React.FC<NotepackLinkProps> = ({notepack}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/notepacks/${notepack.id}`, { state: { notepack } });
      };
  return (
    <li
      className="p-5 pb-4 border border-borderColor max-w-[350px] h-48 w-full rounded-xl flex flex-col justify-between cursor-pointer
     hover:border-opaque transition-all notepack-link"
     onClick={handleClick}
    >
      <div className="">
        <p className="text-lg semibold mb-2">{notepack.title}</p>
        <span className=" bg-opaque py-1.5 px-3 text-xs rounded-full">
          {notepack.cards.length} cards
        </span>
      </div>
      <p>Author: {notepack.author.firstName} {notepack.author.lastName}</p>
    </li>
  );
};
