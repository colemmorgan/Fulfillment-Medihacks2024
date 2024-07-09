import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firestore as db } from "../firebase/firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import {
  Question,
  QUESTIONS,
  SIMULATE_SECOND_PLAYER,
  TIME_LIMIT,
} from "../constants/trivia";

const Game: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gameData, setGameData] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [playerAnswered, setPlayerAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const gameId = new URLSearchParams(location.search).get("id");
  const playerId = localStorage.getItem("playerId") || "player1";

  // shuffle questions
  // not needed, but harder to guess
  const shuffledAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    return [
      ...currentQuestion.incorrectAnswers,
      currentQuestion.correctAnswer,
    ].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleAnswer = useCallback(
    async (answer: string | null) => {
      if (!gameData || !currentQuestion || !gameId || playerAnswered) return;

      setPlayerAnswered(true);

      let newScore = scores[playerId] || 0;
      if (answer === currentQuestion.correctAnswer) {
        newScore += 15;
      } else if (answer === null) {
        newScore -= 10;
      } else {
        newScore -= 5;
      }

      const gameRef = doc(db, "games", gameId);

      try {
        await updateDoc(gameRef, {
          [`scores.${playerId}`]: newScore,
          [`answers.${playerId}`]: answer,
        });

        if (SIMULATE_SECOND_PLAYER) {
          // simulate an answer here (0.7 is randomness threshold)
          const simulatedAnswer =
            Math.random() < 0.7
              ? currentQuestion.correctAnswer
              : currentQuestion.incorrectAnswers[0];
          const simulatedScore =
            simulatedAnswer === currentQuestion.correctAnswer ? 15 : -5;

          await updateDoc(gameRef, {
            [`scores.player2`]: (scores.player2 || 0) + simulatedScore,
            [`answers.player2`]: simulatedAnswer,
            currentQuestionIndex: gameData.currentQuestionIndex + 1,
            answers: {},
          });

          if (gameData.currentQuestionIndex + 1 >= QUESTIONS.length) {
            await updateDoc(gameRef, { status: "completed" });
          }
        }
      } catch (error) {
        console.error("Error updating game data:", error);
      }
    },
    [gameData, currentQuestion, gameId, playerAnswered, scores, playerId]
  );

  useEffect(() => {
    // no game? off you go
    if (!gameId) {
      console.log("No game ID found");
      navigate("/trivia");
      return;
    }

    console.log("Subscribing to game:", gameId);

    const unsubscribe = onSnapshot(
      doc(db, "games", gameId),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          console.log("Game data received:", data);
          setGameData(data);
          setScores(data.scores || {});

          if (data.currentQuestionIndex < QUESTIONS.length) {
            setCurrentQuestion(QUESTIONS[data.currentQuestionIndex]);
            setTimeLeft(TIME_LIMIT);
            setPlayerAnswered(false);
          } else {
            setGameOver(true);
          }
        } else {
          // not a valid game id? off you go again
          console.log("Game document does not exist");
          navigate("/trivia");
        }
      },
      (error) => {
        console.error("Error fetching game data:", error);
      }
    );

    return () => unsubscribe();
  }, [gameId, navigate]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!gameOver && timeLeft > 0 && !playerAnswered) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (!gameOver && timeLeft === 0 && !playerAnswered) {
      handleAnswer(null);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver, playerAnswered, handleAnswer]);

  if (!gameData || !currentQuestion) {
    return <div>Loading...</div>;
  }

  if (gameOver) {
    const winner = Object.entries(scores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Game Over</h1>
        <p className="text-2xl mb-4">Final Scores:</p>
        {Object.entries(scores).map(([player, score]) => (
          <p key={player} className="text-xl mb-2">
            {player}: {score}
          </p>
        ))}
        <p className="text-3xl mt-4 mb-6">Winner: {winner}</p>
        <button
          onClick={() => navigate("/trivia")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Trivia Game</h1>
      <p className="text-xl mb-4">
        Question {gameData.currentQuestionIndex + 1} of {QUESTIONS.length}
      </p>
      <p className="text-lg mb-4">Time left: {timeLeft} seconds</p>
      <p className="text-2xl mb-6">{currentQuestion.question}</p>
      <div className="grid grid-cols-2 gap-4">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            disabled={playerAnswered}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
              playerAnswered ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {answer}
          </button>
        ))}
      </div>
      {playerAnswered && <p className="mt-4">Waiting for other player...</p>}
      <div className="mt-8">
        {Object.entries(scores).map(([player, score]) => (
          <p key={player} className="text-xl">
            {player}: {score}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Game;
