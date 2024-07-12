import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { firestore as db } from "../firebase/firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { SIMULATE_SECOND_PLAYER } from "../constants/trivia";

const NewGame: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gameData, setGameData] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const gameId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    if (!gameId) {
      setError("Invalid game ID");
      return;
    }

    const fetchGame = async () => {
      const gameRef = doc(db, "games", gameId);
      const gameSnap = await getDoc(gameRef);

      if (gameSnap.exists()) {
        setGameData(gameSnap.data());
      } else {
        setError("Game not found");
      }
    };

    fetchGame();

    const unsubscribe = onSnapshot(doc(db, "games", gameId), (doc) => {
      if (doc.exists()) {
        setGameData(doc.data());
      }
    });

    return () => unsubscribe();
  }, [gameId]);

  const handleReady = async () => {
    if (!gameData || !gameId) return;

    const gameRef = doc(db, "games", gameId);

    let playerNumber;
    if (gameData.players.length === 0) {
      playerNumber = 1;
    } else if (gameData.players.length === 1) {
      playerNumber = 2;
    } else {
      console.error("Game is full");
      return;
    }

    const playerId = `Player ${playerNumber}`;
    localStorage.setItem("playerId", playerId);

    const updatedPlayers = [...(gameData.players || []), playerId];
    await updateDoc(gameRef, {
      players: updatedPlayers,
      status: updatedPlayers.length === 2 ? "ready" : "waiting",
      [`scores.${playerId}`]: 0,
    });

    if (updatedPlayers.length === 2) {
      // If this is the second player, initialize the game
      await updateDoc(gameRef, {
        currentQuestionIndex: 0,
        answers: {},
        timeStarted: null, // Set timeStarted to null initially
        gameStartTime: Date.now(), // Add a gameStartTime field
      });
    }

    setIsReady(true);
  };

  useEffect(() => {
    if (gameData && gameData.status === "ready") {
      navigate(`/game?id=${gameId}`);
    }
  }, [gameData, gameId, navigate]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">New Game</h1>
      <p className="mb-4">Game ID: {gameId}</p>
      <p className="mb-4">Players: {gameData.players.length}/2</p>
      {!isReady ? (
        <button
          onClick={handleReady}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          I'm Ready
        </button>
      ) : (
        <p>
          {SIMULATE_SECOND_PLAYER
            ? "Simulating second player... Game will start automatically."
            : "Waiting for other player..."}
        </p>
      )}
      {SIMULATE_SECOND_PLAYER && (
        <p className="mt-4 text-yellow-600">
          Developer mode: Simulating second player
        </p>
      )}
    </div>
  );
};

export default NewGame;
