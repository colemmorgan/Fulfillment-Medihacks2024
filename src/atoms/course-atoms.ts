import { atom} from 'recoil';

interface Question {
  id: string;
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
  difficulty: string;
}

export const currentProblemAtom = atom<Question | null>({
  key: "currentProblemAtom",
  default: null
})

export const setSelectedAnswerAtom = atom<string | null>({
  key: "selectedAnswerAtom",
  default: null
})

export const revealAnswersAtom = atom<boolean>({
  key:"revealAnswersAtom",
  default: false
})