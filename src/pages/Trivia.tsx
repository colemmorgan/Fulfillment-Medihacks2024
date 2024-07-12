import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore as db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const Trivia: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [externalGameId, setExternalGameId] = useState("");

  const navigate = useNavigate();

  const startNewGame = async () => {
    setIsLoading(true);
    try {
      const gameRef = await addDoc(collection(db, "games"), {
        createdAt: new Date(),
        players: [],
        status: "waiting",
        currentQuestionIndex: 0,
        scores: {},
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

  const handleJoinExternalGame = (event) => {
    event.preventDefault();
    navigate(`/newgame?id=${externalGameId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Trivia Game</h1>
      {!gameId ? (
        <div className="flex flex-col">
          <button
            onClick={startNewGame}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {isLoading ? "Creating Game..." : "Start New Game"}
          </button>

          <div className="h-0.5 my-4 flex self-stretch bg-blue-300"></div>

          <div>
            <form onSubmit={handleJoinExternalGame}>
              <div className="flex gap-x-2">
                <input
                  className="bg-gray-50 hover:bg-gray-100 text-blue-600 border-2 border-blue-500 font-bold py-2 px-4 rounded"
                  type="text"
                  placeholder="Or enter a game ID"
                  value={externalGameId}
                  onChange={(event) => setExternalGameId(event.target.value)}
                />
                <button
                  className="bg-blue-500 py-2 px-4 rounded text-white hover:bg-blue-600 transition-colors duration-200 border-2 border-transparent"
                  type="submit"
                  onClick={handleJoinExternalGame}
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4">Game ID: {gameId}</p>
          <button
            onClick={joinGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Join Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Trivia;
