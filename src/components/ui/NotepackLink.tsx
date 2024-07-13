import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      className="p-5 pb-4 border border-borderColor w-[350px] h-48  rounded-xl flex flex-col justify-between cursor-pointer
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

export default NotepackLink;