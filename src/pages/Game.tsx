import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firestore as db, auth } from "../firebase/firebase";
import { doc, updateDoc, onSnapshot, DocumentData } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import grantXP from "../firebase/transactions/GrantXp";

interface Question {
  id: string;
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
  difficulty: "easy" | "medium" | "hard";
}

const QUESTIONS: Question[] = [
  {
    id: "1",
    question: "What is 2 + 2?",
    incorrectAnswers: ["3", "5", "6"],
    correctAnswer: "4",
    difficulty: "easy",
  },
  {
    id: "2",
    question: "What is 7 x 8?",
    incorrectAnswers: ["54", "62", "58"],
    correctAnswer: "56",
    difficulty: "medium",
  },
  {
    id: "3",
    question: "What is the square root of 144?",
    incorrectAnswers: ["10", "14", "16"],
    correctAnswer: "12",
    difficulty: "hard",
  },
];

const TIME_LIMIT = 15;

const Game: React.FC = () => {
  const [gameData, setGameData] = useState<DocumentData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});

  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [playerAnswered, setPlayerAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [xpGranted, setXpGranted] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const gameId = new URLSearchParams(location.search).get("id");

  const shuffledAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    return [
      ...currentQuestion.incorrectAnswers,
      currentQuestion.correctAnswer,
    ].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const memoizedScores = useMemo(() => {
    if (!gameData || !user) return null;
    const currentUserScore = scores[user.uid] || 0;
    const opponentScore =
      Object.entries(scores).find(([id]) => id !== user.uid)?.[1] || 0;
    return (
      <div className="mt-8">
        <p className="text-xl">You: {currentUserScore}</p>
        <p className="text-xl">Opponent: {opponentScore}</p>
      </div>
    );
  }, [scores, user, gameData]);

  // Use a callback to determine the winner
  const determineWinner = useCallback(() => {
    if (!user || Object.keys(scores).length !== 2) return null;
    const [player1, player2] = Object.entries(scores);
    if (player1[1] === player2[1]) return null; // Tie
    return player1[1] > player2[1] ? player1[0] : player2[0];
  }, [scores, user]);

  // Handle game over and XP granting
  useEffect(() => {
    if (gameOver && user) {
      const gameWinner = determineWinner();
      setWinner(gameWinner);
    }
  }, [gameOver, user, determineWinner]);

  const handleSelectAnswer = (answer: string) => {
    if (!playerAnswered) setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = useCallback(
    async (answer: string | null = selectedAnswer) => {
      if (!gameData || !currentQuestion || !gameId || playerAnswered || !user) {
        return;
      }

      setPlayerAnswered(true);
      setSubmittedAnswer(answer);

      const gameRef = doc(db, "games", gameId);

      try {
        await updateDoc(gameRef, {
          [`answers.${user.uid}`]: answer,
          [`timeouts.${user.uid}`]: answer === null,
        });
        console.log(`Player ${user.uid} answer submitted:`, answer);
      } catch (error) {
        console.error("Error updating game data:", error);
      }
    },
    [gameData, currentQuestion, gameId, playerAnswered, user, selectedAnswer]
  );

  useEffect(() => {
    if (!gameId || !user) {
      console.log("No game ID or user found");
      navigate("/trivia");
      return;
    }

    console.log("Subscribing to game:", gameId);

    const unsubscribe = onSnapshot(
      doc(db, "games", gameId),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          console.log("Game data received:", data);

          setGameData(data);
          setScores(data.scores || {});

          if (data.players.length === 2 && !gameStarted) {
            setGameStarted(true);

            if (data.timeStarted === null) {
              const gameRef = doc(db, "games", gameId);
              updateDoc(gameRef, {
                timeStarted: Date.now(),
              });
            }
          }

          if (data.currentQuestionIndex < QUESTIONS.length) {
            setCurrentQuestion(QUESTIONS[data.currentQuestionIndex]);

            if (data.timeStarted) {
              const elapsedTime = Math.floor(
                (Date.now() - data.timeStarted) / 1000
              );
              setTimeLeft(Math.max(0, TIME_LIMIT - elapsedTime));
            } else {
              setTimeLeft(TIME_LIMIT);
            }

            // Update answer status for both players
            const allPlayersAnswered = data.players.every(
              (playerId: string) =>
                !!data.answers?.[playerId] || data.timeouts?.[playerId]
            );

            setPlayerAnswered(
              !!data.answers?.[user.uid] || data.timeouts?.[user.uid]
            );

            // check if both players have answered
            if (allPlayersAnswered && !data.scoresUpdated) {
              console.log(
                "All players have answered or timed out. Showing answers and preparing to move to next question."
              );
              setShowAnswers(true);

              // Calculate and update scores
              const newScores = { ...data.scores };

              data.players.forEach((playerId: string) => {
                const playerAnswer = data.answers[playerId];

                if (
                  playerAnswer ===
                  QUESTIONS[data.currentQuestionIndex].correctAnswer
                ) {
                  newScores[playerId] = (newScores[playerId] || 0) + 15;
                } else if (playerAnswer !== null) {
                  newScores[playerId] = (newScores[playerId] || 0) - 5;
                } else {
                  newScores[playerId] = (newScores[playerId] || 0) - 10;
                }
              });

              // Update scores in the database
              const gameRef = doc(db, "games", gameId);

              updateDoc(gameRef, {
                scores: newScores,
                scoresUpdated: true,
              });

              // Update scores and move to next question
              setTimeout(() => {
                setShowAnswers(false);
                const nextQuestionIndex = data.currentQuestionIndex + 1;
                updateDoc(gameRef, {
                  currentQuestionIndex: nextQuestionIndex,
                  answers: {},
                  timeouts: {},
                  timeStarted: null,
                  showAnswers: false,
                  scoresUpdated: false, // reset this flag for the next question
                })
                  .then(() => {
                    console.log("Moving to next question:", nextQuestionIndex);
                    return updateDoc(gameRef, { timeStarted: Date.now() });
                  })
                  .catch((error) => {
                    console.error(
                      "Error updating game for next question:",
                      error
                    );
                  });

                // Check if the game is over
                if (nextQuestionIndex >= QUESTIONS.length) {
                  updateDoc(gameRef, { status: "completed" });
                }
              }, 2000); // 2 second delay before moving to next question
            }

            setScores(data.scores || {});
          } else {
            setGameOver(true);
          }
        }
      },
      (error) => {
        console.error("Error fetching game data:", error);
      }
    );

    return () => unsubscribe();
  }, [gameId, navigate, user, gameStarted]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (
      gameStarted &&
      !gameOver &&
      timeLeft > 0 &&
      !playerAnswered &&
      gameData?.timeStarted
    ) {
      timer = setTimeout(
        () => setTimeLeft((prev) => Math.max(0, prev - 1)),
        1000
      );
    } else if (
      gameStarted &&
      !gameOver &&
      timeLeft === 0 &&
      !playerAnswered &&
      gameData?.timeStarted
    ) {
      handleSubmitAnswer(null); // Automatically submit null answer when time runs out
    }
    return () => clearTimeout(timer);
  }, [
    timeLeft,
    gameOver,
    playerAnswered,
    handleSubmitAnswer,
    gameStarted,
    gameData?.timeStarted,
  ]);

  useEffect(() => {
    if (gameOver && !xpGranted && user) {
      let winner;
      if (Object.values(scores).every((score, _, arr) => score === arr[0])) {
        winner = null; // It's a tie
      } else {
        winner = Object.entries(scores).reduce((a, b) =>
          a[1] > b[1] ? a : b
        )[0];
      }

      const xpValue = winner === user.uid ? 50 : 15;
      grantXP(user.uid, "versus", xpValue);
      setXpGranted(true);
    }
  }, [gameOver, xpGranted, user, scores]);

  if (!gameData || !currentQuestion || !user) {
    return <div>Loading...</div>;
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Game Over</h1>
        <p className="text-2xl mb-4">Final Scores:</p>
        {memoizedScores}
        <p className="text-3xl mt-4 mb-6">
          Winner:{" "}
          {winner ? (winner === user?.uid ? "You" : "Opponent") : "It's a tie!"}
        </p>
        <p className="text-xl mb-4">
          XP Earned: {winner === user?.uid ? 50 : 15}
        </p>
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
      <p className="text-xl mb-4">You are {user.uid}</p>
      {!gameStarted ? (
        <p>Waiting for other player to join...</p>
      ) : (
        <>
          <p className="text-xl mb-4">
            Question {gameData.currentQuestionIndex + 1} of {QUESTIONS.length}
          </p>
          <p className="text-lg mb-4">Time left: {timeLeft} seconds</p>
          <p className="text-2xl mb-6">{currentQuestion?.question}</p>
          <div className="grid grid-cols-2 gap-4">
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(answer)}
                disabled={playerAnswered}
                className={`
                  font-bold py-2 px-4 rounded
                  ${playerAnswered ? "opacity-50 cursor-not-allowed" : ""}
                  ${
                    !showAnswers && selectedAnswer === answer
                      ? "ring-2 ring-yellow-500"
                      : ""
                  }
                  ${
                    showAnswers
                      ? answer === currentQuestion.correctAnswer
                        ? "bg-green-500 text-white"
                        : answer === submittedAnswer
                        ? "bg-red-500 text-white ring-2 ring-yellow-500"
                        : "bg-red-500 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }
                `}
              >
                {answer}
              </button>
            ))}
          </div>
          {!playerAnswered && (
            <button
              onClick={() => handleSubmitAnswer()}
              disabled={selectedAnswer === null}
              className={`mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${
                selectedAnswer === null ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Submit Answer
            </button>
          )}

          {playerAnswered ? (
            showAnswers ? (
              <p className="mt-4">
                Answers revealed. Moving to next question...
              </p>
            ) : (
              <p className="mt-4">Waiting for other player...</p>
            )
          ) : (
            <p className="mt-4">Select your answer and submit!</p>
          )}
          <div className="mt-8">{memoizedScores}</div>
        </>
      )}
    </div>
  );
};

export default Game;
