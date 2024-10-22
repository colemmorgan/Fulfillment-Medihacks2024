import React, { useEffect, useState } from "react";
import QuestionChoice from "../components/quiz-components/QuestionChoice";
import { useNavigate, useParams } from "react-router-dom";
import {
    currentProblemAtom,
    revealAnswersAtom,
    setSelectedAnswerAtom,
} from "../atoms/course-atoms";
import { useRecoilState } from "recoil";
import CourseNav from "../components/quiz-components/CourseNav";
import CourseLoading from "../components/quiz-components/CourseLoading";
import fetchQuestions from "../firebase/getters/getCourseProblems";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";



interface Question {
  id: string;
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
  difficulty: string;
}



const Quiz: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [currentProblem, setCurrentProblem] =
        useRecoilState(currentProblemAtom);
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
    const [_, setSelectedAnswer] = useRecoilState(setSelectedAnswerAtom);
    const [revealAnswers, setRevealAnswers] = useRecoilState(revealAnswersAtom);

    const resetStates = () => {
        setSelectedAnswer(null);
        setRevealAnswers(false);
    };

    const nextProblem = () => {
        if (!revealAnswers) return;
        resetStates();
        setProblem();
    };

    const skipProblem = () => {
        if (revealAnswers) return;
        resetStates();
        setProblem();
    };

    const setProblem = () => {
        if (questions.length > 0) {
            const newProblem =
                questions[Math.floor(Math.random() * questions.length)];
            setCurrentProblem(newProblem);
            setShuffledAnswers(
                shuffleArray([newProblem.correctAnswer, ...newProblem.incorrectAnswers])
            );
        }
    };

    const shuffleArray = (arr: string[]): string[] => {
        const newArr = [...arr];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    useEffect(() => {
        const fetchQuestionsData = async () => {
            if (!courseId) return;
            setLoading(true);
            setError(null);
            try {
                const fetchedQuestions = await fetchQuestions(courseId);
                if (fetchedQuestions && fetchedQuestions.questions.length > 0) {
                    setQuestions(fetchedQuestions.questions);
                } else {
                    setError("No questions found for this course.");
                }
            } catch (err) {
                setError("Failed to fetch questions. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestionsData();

        return () => {
            resetStates();
        };
    }, [courseId]);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [loading, user, navigate]);

    useEffect(() => {
        setProblem();
    }, [questions]);

    if (loading) {
        return <CourseLoading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <CourseNav />
            <div className="max-w-[924px] px-3 mx-auto mt-12">
                <p className="semibold text-2xl md:text-3xl">
                    {currentProblem && currentProblem.question}
                </p>
                <ul className="flex flex-col items-center gap-4 mt-10">
                    {shuffledAnswers.map((item, index) => (
                        <QuestionChoice key={index} value={item} index={index}/>
                    ))}
                </ul>
                <div className="flex justify-between items-center mt-12 bg-[#f2f4f5] py-3 px-4 border border-borderColor rounded-md">
                    <button
                        className={`px-2  md:text-lg ${
                            revealAnswers ? "opacity-0" : "cursor-pointer"
                        }`}
                        onClick={skipProblem}
                    >
                        Skip Problem
                    </button>
                    <button
                        className={`bg-opaque px-4 text-sm md:text-base md:px-6 py-2.5 rounded-md ${
                            revealAnswers ? "" : "opacity-0 cursor-not-allowed"
                        }`}
                        onClick={nextProblem}
                        id="rewardId"
                    >
                        Next Problem
                    </button>
                </div>
            </div>
        </>
    );
};

export default Quiz;
