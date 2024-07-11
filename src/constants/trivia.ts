export const SIMULATE_SECOND_PLAYER = false;
export const TIME_LIMIT = 15;

export enum GamePoints {
  CORRECT_ANSWER = +15,
  MISSED_ANSWER = -10,
  WRONG_ANSWER = -5,
}

export interface Question {
  id: string;
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
  difficulty: "easy" | "medium" | "hard";
}

export const QUESTIONS: Question[] = [
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
