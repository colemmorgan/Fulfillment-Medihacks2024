import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { firestore as db } from "../firebase/firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";

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
  const [gameData, setGameData] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [playerAnswered, setPlayerAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerNumber, setPlayerNumber] = useState<1 | 2 | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const gameId = new URLSearchParams(location.search).get("id");
  const playerId = localStorage.getItem("playerId") || "Player 1";

  const [player1Answered, setPlayer1Answered] = useState(false);
  const [player2Answered, setPlayer2Answered] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const shuffledAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    return [
      ...currentQuestion.incorrectAnswers,
      currentQuestion.correctAnswer,
    ].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleSelectAnswer = (answer: string) => {
    if (!playerAnswered) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = useCallback(async () => {
    if (
      !gameData ||
      !currentQuestion ||
      !gameId ||
      playerAnswered ||
      playerNumber === null ||
      selectedAnswer === null
    )
      return;

    setPlayerAnswered(true);

    const gameRef = doc(db, "games", gameId);

    try {
      await updateDoc(gameRef, {
        [`answers.Player ${playerNumber}`]: selectedAnswer,
      });
      console.log(`Player ${playerNumber} answer submitted:`, selectedAnswer);
    } catch (error) {
      console.error("Error updating game data:", error);
    }
  }, [
    gameData,
    currentQuestion,
    gameId,
    playerAnswered,
    playerNumber,
    selectedAnswer,
  ]);

  // The useEffect hook that listens for game updates
  useEffect(() => {
    if (!gameId) {
      console.log("No game ID found");
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

          // determine player number
          if (playerNumber === null) {
            if (data.players[0] === playerId) {
              setPlayerNumber(1);
            } else if (data.players[1] === playerId) {
              setPlayerNumber(2);
            }
          }

          if (data.players.length === 2 && !gameStarted) {
            setGameStarted(true);
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

            // update answer status for both players
            const player1Answered = !!data.answers?.["Player 1"];
            const player2Answered = !!data.answers?.["Player 2"];
            setPlayer1Answered(player1Answered);
            setPlayer2Answered(player2Answered);

            // update playerAnswered state
            setPlayerAnswered(!!data.answers?.[`Player ${playerNumber}`]);

            // check if both players have answered
            if (player1Answered && player2Answered) {
              console.log(
                "Both players answered. Calculating scores and preparing to move to next question."
              );

              // then calculate and update scores
              const newScores = { ...data.scores };
              ["Player 1", "Player 2"].forEach((player) => {
                const playerAnswer = data.answers[player];
                if (
                  playerAnswer ===
                  QUESTIONS[data.currentQuestionIndex].correctAnswer
                ) {
                  newScores[player] = (newScores[player] || 0) + 15;
                } else if (playerAnswer !== null) {
                  newScores[player] = (newScores[player] || 0) - 5;
                } else {
                  newScores[player] = (newScores[player] || 0) - 10;
                }
              });

              // update scores and move to next question
              setTimeout(() => {
                const nextQuestionIndex = data.currentQuestionIndex + 1;
                console.log("Moving to next question:", nextQuestionIndex);
                updateDoc(doc(db, "games", gameId), {
                  currentQuestionIndex: nextQuestionIndex,
                  answers: {},
                  timeStarted: Date.now(),
                  scores: newScores,
                })
                  .then(() => {
                    console.log("Database updated for next question");
                  })
                  .catch((error) => {
                    console.error(
                      "Error updating database for next question:",
                      error
                    );
                  });

                // check if the game is over
                if (nextQuestionIndex >= QUESTIONS.length) {
                  updateDoc(doc(db, "games", gameId), { status: "completed" });
                }
              }, 2000); // 2 second delay before moving to next question (can be updated later)
            }

            setScores(data.scores || {});
          } else {
            setGameOver(true);
          }
        } else {
          console.log("Game document does not exist");
          navigate("/trivia");
        }
      },
      (error) => {
        console.error("Error fetching game data:", error);
      }
    );

    return () => unsubscribe();
  }, [gameId, navigate, playerId, playerNumber, gameStarted]);

  // timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameOver && timeLeft > 0 && !playerAnswered) {
      timer = setTimeout(
        () => setTimeLeft((prev) => Math.max(0, prev - 1)),
        1000
      );
    } else if (gameStarted && !gameOver && timeLeft === 0 && !playerAnswered) {
      handleSubmitAnswer(); // auto submit null answer when time runs out
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver, playerAnswered, handleSubmitAnswer, gameStarted]);

  if (!gameData || !currentQuestion || playerNumber === null) {
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
      <p className="text-xl mb-4">You are Player {playerNumber}</p>
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
                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
                  playerAnswered ? "opacity-50 cursor-not-allowed" : ""
                } ${selectedAnswer === answer ? "ring-4 ring-yellow-500" : ""}`}
              >
                {answer}
              </button>
            ))}
          </div>
          {!playerAnswered && (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={`mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${
                selectedAnswer === null ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Submit Answer
            </button>
          )}
          {playerAnswered ? (
            player1Answered && player2Answered ? (
              <p className="mt-4">
                Both players answered. Moving to next question...
              </p>
            ) : (
              <p className="mt-4">Waiting for other player...</p>
            )
          ) : (
            <p className="mt-4">Select your answer and submit!</p>
          )}
          <div className="mt-8">
            {Object.entries(scores).map(([player, score]) => (
              <p key={player} className="text-xl">
                {player}: {score}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
