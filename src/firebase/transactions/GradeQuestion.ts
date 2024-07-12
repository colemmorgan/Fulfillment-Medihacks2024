import { doc, increment, runTransaction } from "@firebase/firestore";
import { firestore } from "../firebase";

interface Question {
  id: string;
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
  difficulty: string;
}

const GradeQuestion = async (
  currentProblem: Question,
  id: string,
  courseId: string,
  selectedAnswer: string,
  rewardFunction: () => void
): Promise<boolean> => {
  try {
    let answerCorrect = false;

    await runTransaction(firestore, async (transaction) => {
      const userRef = doc(firestore, "users", id);
      const userDoc = await transaction.get(userRef);

      if (!userDoc.exists) {
        throw new Error("User document does not exist!");
      }

      const userData = userDoc.data();
      if (!userData) return false;
      const updates: { [key: string]: any } = {
        problemsAttempted: increment(1),
      };

      if (selectedAnswer === currentProblem.correctAnswer) {
        rewardFunction();
        updates.problemsCorrect = increment(1);

        if (userData[`${courseId}Progress`] < 100) {
          updates[`${courseId}Progress`] = increment(5);
        }

        answerCorrect = true;
      }

      transaction.update(userRef, updates);
    });

    return answerCorrect;
  } catch (error) {
    return false;
  }
};

export default GradeQuestion;
