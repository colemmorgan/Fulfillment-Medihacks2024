import React from 'react';
import { useLocation } from 'react-router-dom';

type StudyNotepackProps = {
    
};

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

const StudyNotepack:React.FC<StudyNotepackProps> = () => {
    const location = useLocation();
  const { notepack } = location.state as { notepack: Notepack };
    return (
        <div className=""></div>
    )
}
export default StudyNotepack;