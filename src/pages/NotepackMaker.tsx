import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { createNotepack } from "../firebase/schema/CreateNotepack";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userDataAtom, userDataLoading } from "../atoms/user-data-atoms";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import grantXP from "../firebase/transactions/GrantXp";

type NotepackMakerProps = {};

type Notecard = {
  question: string;
  answer: string;
};

const NotepackMaker: React.FC<NotepackMakerProps> = () => {
  const [notecards, setNoteCards] = useState<Notecard[]>([]);
  const [ user, userLoading] = useAuthState(auth)
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [notepackTitle, setNotepackTitle] =
    useState<string>("untitled notepack");
  const [showPublishConfirmation, setShowPublishConfirmation] =
    useState<boolean>(false);
  const [userData] = useRecoilState(userDataAtom);
  const [loading] = useRecoilState(userDataLoading);
  const navigate = useNavigate();

  const createNotecard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answer === "" || question === "") {
      toast.error("Please fill out all fields.", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }
    const doesQuestionExist = notecards.filter(
      (card) => card.question.toLowerCase() === question.trim().toLowerCase()
    );

    if (doesQuestionExist.length > 0) {
      toast.error("Question already exists!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    setNoteCards((prev) => [
      ...prev,
      { question: question.trim(), answer: answer.trim() },
    ]);
    setQuestion("");
    setAnswer("");
  };

  const deleteNotecard = (questionToDelete: string) => {
    setNoteCards((prevCards) =>
      prevCards.filter(
        (card) => card.question.toLowerCase() !== questionToDelete.toLowerCase()
      )
    );
  };

  const editNotecard = (question: string, answer: string) => {
    setQuestion(question);
    setAnswer(answer);
    deleteNotecard(question);
  };

  const publishNotepack = () => {
    if (!userData?.firstName || !userData.lastName || !user) return;
    createNotepack(
      notecards,
      notepackTitle,
      userData.firstName,
      userData.lastName
    );
    setShowPublishConfirmation(false);
    grantXP(user.uid, "notecard", 75)
  };

  useEffect(() => {
    if (!loading && !userData && !userLoading && !user) {
      navigate("/login");
    }
  }, [userData, user, loading, userLoading]);

  if (loading) {
    return <></>;
  }

 

  return (
    <>
      <nav className="max-w-[1200px] mx-auto px-4 h-20 flex justify-between items-center">
        <Link to={"/notepacks"} className="flex  gap-2">
          <span className="text-lg pt-0.5">
            <FaLongArrowAltLeft />
          </span>
          <span>Back to notecards</span>
        </Link>
        <button
          className="bg-opaque px-4 text-sm sm:text-base sm:px-6 py-1.5 rounded-md"
          onClick={() => setShowPublishConfirmation(true)}
        >
          Publish Set
        </button>
      </nav>
      <div className="max-w-[1000px] w-full mx-auto mt-10 pb-24 px-4">
        <div className="flex items-center  gap-3">
          <p className="text-base md:text-xl">Name your notepack:</p>
          <input
            type="text"
            className="bg-offWhite border border-borderColor rounded-md py-1 px-2 md:w-60 outline-none"
            value={notepackTitle}
            onChange={(e) => setNotepackTitle(e.target.value)}
          />
        </div>
        <div className="max-w-[1000px] w-full bg-offWhite  mx-auto rounded-xl border border-borderColor mt-8 py-6 px-6 md:px-12">
          <p className="text-base sm:text-lg">
            Enter your question and answer then hit create!
          </p>
          <form className="" onSubmit={(e) => createNotecard(e)}>
            <div className="flex flex-col mt-3 text-sm sm:text-base">
              <label htmlFor="">Question:</label>
              <textarea
                name=""
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="mt-1 py-2.5 px-3 border border-borderColor outline-none rounded-md h-[88px] resize-none leading-tight"
              ></textarea>
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="">Answer:</label>
              <textarea
                name=""
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="mt-1 py-2.5 px-3 border border-borderColor outline-none rounded-md h-[88px] resize-none leading-tight"
              ></textarea>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-opaque py-1.5 text-sm px-4 sm:text-base sm:px-6 rounded-md"
                >
                  Create Card
                </button>
              </div>
            </div>
          </form>
        </div>
        {notecards.length > 0 && (
          <div className="mt-10 text-3xl">Notecards:</div>
        )}
        <ul className="mt-6 flex flex-col gap-4">
          {notecards
            .slice()
            .reverse()
            .map((notecard) => (
              <Notecard
                question={notecard.question}
                answer={notecard.answer}
                deleteCard={deleteNotecard}
                editNotecard={editNotecard}
                key={`${notecard.question}-${notecard.answer}`}
              />
            ))}
        </ul>
      </div>
      {showPublishConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-20 backdrop-blur-sm bg-light bg-opacity-30">
          <div className="w-[450px]  bg-[#f8f8f8] border border-borderColor rounded-xl px-6 py-10 flex flex-col items-center">
            <p className="text-5xl">Wait!</p>
            <p className="text-xl mt-4 text-center">
              Are you sure you want to publish this notepack?
            </p>
            <div className="flex gap-4 mt-6">
              <button
                className="bg-opaque w-32 py-2.5 rounded-md"
                onClick={() => setShowPublishConfirmation(false)}
              >
                Go back
              </button>
              <button
                className=" bg-black text-[#f8f8f8] w-32 py-2.5 rounded-md"
                onClick={publishNotepack}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default NotepackMaker;

type NotecardProps = {
  question: string;
  answer: string;
  deleteCard: (question: string) => void;
  editNotecard: (question: string, answer: string) => void;
};

const Notecard: React.FC<NotecardProps> = ({
  question,
  answer,
  deleteCard,
  editNotecard,
}) => {
  return (
    <div className="w-full bg-offWhite px-6 py-4 border border-borderColor rounded-xl">
      <div className="mb-4 flex justify-between text-xl">
        <span
          className=" text-main cursor-pointer"
          onClick={() => editNotecard(question, answer)}
        >
          <MdEdit />
        </span>
        <span
          className=" text-red-500 cursor-pointer"
          onClick={() => deleteCard(question)}
        >
          <FaRegTrashAlt />
        </span>
      </div>
      <p className="semibold">{question}</p>
      <p className="mt-1">{answer}</p>
    </div>
  );
};
