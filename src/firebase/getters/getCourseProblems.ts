
import {
  collection,
  getDocs,
  CollectionReference,
  DocumentData,
} from "@firebase/firestore";
import { firestore } from "../firebase";

interface Question {
  id: string;
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
  difficulty: string;
}

const fetchQuestions = async (courseId: string | undefined): Promise<Question[] | undefined> => {
  if (!courseId) {
    return undefined;
  }

  try {
    const questionsCollection = collection(
      firestore,
      courseId
    ) as CollectionReference<DocumentData>;
    const querySnapshot = await getDocs(questionsCollection);
    const fetchedQuestions: Question[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Question, "id">),
    }));
    return fetchedQuestions;
  } catch (err) {
    console.error("Error fetching questions: ", err);
    return undefined;
  }
};
  
  export default fetchQuestions;