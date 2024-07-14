import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore as db, auth } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { BiCopy } from "react-icons/bi";
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { LandingNav } from "../components/LandingNav";
import { LuLoader2 } from "react-icons/lu";

const toastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  theme: "light",
};


type SpinnyProps = {
  text:string
}

const Spinny: React.FC<SpinnyProps> = ({ text }) => (
  <div className="flex items-center justify-center gap-x-2">
    <div>
      <LuLoader2 className="animate-spin" />
    </div>
    <div className="mt-1">{text}</div>
  </div>
);

const Trivia: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [externalGameId, setExternalGameId] = useState("");
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const startNewGame = async () => {
    if (!user) {
      toast.error("You must be logged in to start a game");
      return;
    }

    setIsLoading(true);
    try {
      const gameRef = await addDoc(collection(db, "games"), {
        createdAt: new Date(),
        players: [],
        status: "waiting",
        currentQuestionIndex: 0,
        scores: {
          [user.uid]: 0,
        },
      });
      setGameId(gameRef.id);
    } catch (error) {
      console.error("Error creating new game:", error);
    }
    setIsLoading(false);
  };

  const joinGame = () => {
    if (gameId) {
      navigate(`/newgame?id=${gameId}`);
    }
  };

  const handleJoinExternalGame = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    const extGameId = externalGameId.trim();

    if (extGameId != "") {
      navigate(`/newgame?id=${extGameId}`);
    } else {
      toast.error("Please enter a non-empty game ID", toastOptions);
    }
  };

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(gameId ?? "");
      toast.success(
        "Successfully copied the game ID to clipboard!",
        toastOptions
      );
    } catch {
      toast.error(
        "Oops! Something went wrong trying to copy the game ID to clipboard!",
        toastOptions
      );
    }
  };

  return (
    <>
      <LandingNav />
      <div className="mt-14 flex flex-col items-center justify-center max-w-[800px] px-6 mx-auto max-sm:text-center">
        <h1 className="text-4xl font-bold mb-10">Welcome to Versus!</h1>
        <div className="">
          {!gameId ? (
            <div className="flex flex-col">
              <button
                onClick={startNewGame}
                disabled={isLoading}
                className={`${
                  isLoading
                    ? "bg-opaque cursor-not-allowed"
                    : "bg-main hover:bg-opaque"
                } py-2 px-4 rounded transition-all text-[#000]`}
              >
                {isLoading ? (
                  <Spinny text={"Creating Game..."} />
                ) : (
                  "Start New Game"
                )}
              </button>

              <div className="h-0.5 my-4 flex self-stretch bg-opaque"></div>

              <div>
                <form onSubmit={handleJoinExternalGame}>
                  <div className="flex gap-x-2">
                    <input
                      className="w-3/4 bg-gray-50 hover:bg-gray-100 border-2 border-opaque outline-main font-bold py-2 px-4 rounded transition-all"
                      type="text"
                      placeholder="Or enter a game ID"
                      value={externalGameId}
                      onChange={(event) =>
                        setExternalGameId(event.target.value)
                      }
                    />
                    <button
                      className="w-1/4 bg-main py-2 px-4 rounded hover:bg-opaque semibold transition-colors duration-200 border-2 border-transparent"
                      type="submit"
                      onClick={handleJoinExternalGame}
                    >
                      Join
                    </button>
                  </div>
                </form>
              </div>
              <img
                src="/images/versus.svg"
                alt=""
                className="max-w-[450px] mt-14 max-sm:w-72"
              />
            </div>
          ) : (
            <div className="text-center">
              <div className="flex gap-x-2 mb-2 justify-center">
                <p>Game ID: {gameId}</p>

                <button
                  className="mb-1"
                  title="Copy to clipboard!"
                  onClick={copyToClipboard}
                >
                  <BiCopy />
                </button>
              </div>
              <p className="mb-4">
                (Send this code to your friend then hit join!)
              </p>
              <button
                onClick={joinGame}
                className="bg-main hover:bg-opaque py-2 px-4 rounded transition-all text-[#000]"
              >
                Join Game
              </button>
              <img
                src="/images/versus.svg"
                alt=""
                className="max-w-[450px] mt-20 max-sm:w-72"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Trivia;
