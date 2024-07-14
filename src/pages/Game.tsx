// FIX ONE DONE

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { firestore as db, auth } from "../firebase/firebase";
import { doc, updateDoc, onSnapshot, DocumentData } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import grantXP from "../firebase/transactions/GrantXp";
import fetchQuestions from "../firebase/getters/getCourseProblems";
import incrementVersusStats from "../firebase/transactions/IncrementVersusStats";

interface Question {
  id: string;
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
  difficulty: string;
}

const TIME_LIMIT = 25;

const Game: React.FC = () => {
  // get questions

  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    const fetchQuestionsData = async () => {
      try {
        const fetchedQuestions = await fetchQuestions("trivia");
        if (fetchedQuestions && fetchedQuestions.questions.length > 0) {
          setQuestions(fetchedQuestions.questions);
        }
      } catch (err) {
        // pass
      }
    };
    fetchQuestionsData();
  }, []);

  //
  const [gameData, setGameData] = useState<DocumentData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [_, setSubmittedAnswer] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});

  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [playerAnswered, setPlayerAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [xpGranted, setXpGranted] = useState(false);
  const [versusIncremented, setVersusIncremented] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const gameId = new URLSearchParams(location.search).get("id");

  const calculateTimeLeft = (startTime: number): number => {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    return Math.max(0, TIME_LIMIT - elapsed);
  };

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
      <div className="mt-4 flex gap-4">
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

          if (data.players.length === 2) {
            const gameRef = doc(db, "games", gameId);
            setGameStarted(true);
            if (data.timeStarted === null) {
              updateDoc(gameRef, {
                timeStarted: Date.now(),
              });
            }
          }

          if (data.timeStarted) {
            const calculatedTimeLeft = calculateTimeLeft(data.timeStarted);
            setTimeLeft(calculatedTimeLeft);
          }

          if (data.currentQuestionIndex < 3) {
            setCurrentQuestion(questions[data.currentQuestionIndex]);

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
                  questions[data.currentQuestionIndex].correctAnswer
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
                    setSelectedAnswer(null);

                    return updateDoc(gameRef, { timeStarted: Date.now() });
                  })
                  .catch((error) => {
                    console.error(
                      "Error updating game for next question:",
                      error
                    );
                  });

                // Check if the game is over
                if (nextQuestionIndex >= 4) {
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
  }, [gameId, navigate, user, gameStarted, questions]);

  // Timer useEffect
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameStarted && !gameOver && gameData?.timeStarted) {
      timer = setInterval(() => {
        const calculatedTimeLeft = calculateTimeLeft(gameData.timeStarted);
        setTimeLeft(calculatedTimeLeft);

        if (calculatedTimeLeft === 0 && !playerAnswered) {
          handleSubmitAnswer(null);
        }
      }, 100); // Update every 100ms for smoother countdown
    }

    return () => clearInterval(timer);
  }, [
    gameOver,
    playerAnswered,
    handleSubmitAnswer,
    gameStarted,
    gameData?.timeStarted,
  ]);

  useEffect(() => {
    if (gameOver && !xpGranted && !versusIncremented && user) {
      let winner;
      if (Object.values(scores).every((score, _, arr) => score === arr[0])) {
        winner = null; // It's a tie
      } else {
        winner = Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
      }
  
      const handleXPAndStats = async () => {
        try {
          await incrementVersusStats(user.uid, winner === user.uid);
          setVersusIncremented(true);
          console.log("[game:trigger] versus increment");
  
          const xpValue = winner === user.uid ? 50 : 15;
          await grantXP(user.uid, "versus", xpValue);
          setXpGranted(true);
          console.log(`[game:trigger] xp increment (${xpValue})`);
        } catch (error) {
          console.error("Error updating XP and stats:", error);
        }
      };
  
      handleXPAndStats();
    }
  }, [gameOver]);
  
  if (!gameData || !currentQuestion || !user) {
    return <div>Loading...</div>;
  }

  if (gameOver) {
    return (
      <div className="max-w-[550px] px-4 mx-auto flex flex-col items-center pt-24">
        <h1 className="text-5xl font-semibold">Game Over</h1>
        <p className="mt-4 text-3xl">
          {winner
            ? winner === user?.uid
              ? "You Win!"
              : "Try Again!"
            : "It's a tie!"}
        </p>
        {memoizedScores}
        <div className="flex gap-3 mt-8 max-sm:grid">
          <button
            onClick={() => navigate("/trivia")}
            className="bg-main hover:bg-opaque transition-all semibold py-2 px-4 rounded w-44"
          >
            Play Again
          </button>
          <Link to={"/"}>
            <button className="bg-black text-white hover:bg-opacity-80 transition-all w-44 semibold py-2 px-4 rounded">
              Home
            </button>
          </Link>
        </div>
        <img
          src="/images/game-over.svg"
          alt=""
          className="max-w-[420px] mt-20 max-sm:w-72"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center pt-20 max-w-[800px] px-3 mx-auto">
      <h1 className="text-4xl font-bold mb-6">Versus Mode</h1>
      {/* <p className="text-xl mb-4">You are {user.uid}</p> */}
      {!gameStarted ? (
        <div className="grid place-items-center gap-y-3">
          <p>Waiting for other player to join...</p>
          <span className="text-balance text-center text-gray-600">
            Seeing something wrong? Click on the button below to head back to
            trivia page and start a new game
          </span>
          <div>
            <button
              className="bg-main hover:bg-opaque py-2 px-4 rounded transition-all text-[#000]"
              onClick={() => navigate("/trivia")}
            >
              Go back to trivia page
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-xl mb-4">
            Question {gameData.currentQuestionIndex + 1} of {3}
          </p>
          <p className="text-lg mb-4">Time left: {timeLeft} seconds</p>
          <p className="text-2xl mb-6 ">{currentQuestion?.question}</p>
          <div className="flex flex-col gap-4  w-full">
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                disabled={playerAnswered}
                onClick={() => handleSelectAnswer(answer)}
                className={`relative  w-full py-5 px-8 border border-borderColor flex items-center rounded-md cursor-pointer
                ${
                  showAnswers
                    ? answer === currentQuestion.correctAnswer
                      ? "bg-green-300"
                      : ""
                    : "bg-[#f2f4f5]"
                } ${
                  showAnswers && answer !== currentQuestion.correctAnswer
                    ? "bg-red-200"
                    : ""
                } ${
                  !showAnswers && selectedAnswer === answer
                    ? "ring-2 ring-yellow-500"
                    : ""
                }`}
              >
                <span>{answer}</span>
              </button>
            ))}
          </div>
          {!playerAnswered && (
            <button
              onClick={() => handleSubmitAnswer()}
              disabled={selectedAnswer === null}
              className={`mt-4 w-full bg-main hover:bg-opaque py-2 px-4 rounded transition-all text-[#000] ${
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
              <p className="mt-6">Waiting for other player...</p>
            )
          ) : (
            <></>
          )}
          <div className="mt-8">{memoizedScores}</div>
        </>
      )}
    </div>
  );
};

export default Game;
