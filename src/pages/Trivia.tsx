import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore as db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const Trivia: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Trivia Game</h1>
      {!gameId ? (
        <button
          onClick={startNewGame}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isLoading ? "Creating Game..." : "Start New Game"}
        </button>
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
