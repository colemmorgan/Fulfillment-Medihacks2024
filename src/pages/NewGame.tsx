import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { firestore as db } from "../firebase/firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

const SIMULATE_SECOND_PLAYER = true; // dev only thing

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

    if (SIMULATE_SECOND_PLAYER) {
      // this simulates both players joining at once (dev only)
      await updateDoc(gameRef, {
        players: ["player1", "player2"],
        status: "ready",
        currentQuestionIndex: 0,
        scores: { player1: 0, player2: 0 },
      });
    } else {
      // normal flow for when we have a real second player
      // TODO: haven't tested this. might work, maybe?
      const updatedPlayers = [...gameData.players, "player"];
      await updateDoc(gameRef, {
        players: updatedPlayers,
        status: updatedPlayers.length === 2 ? "ready" : "waiting",
        currentQuestionIndex: 0,
        scores: {
          ...gameData.scores,
          [updatedPlayers.length === 1 ? "player1" : "player2"]: 0,
        },
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
