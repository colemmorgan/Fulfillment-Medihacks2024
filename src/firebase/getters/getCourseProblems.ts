import { firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Question {
    id: string;
    question: string;
    incorrectAnswers: string[];
    correctAnswer: string;
    difficulty: string;
}

interface QuestionCollection {
    id: string;
    title: string;
    questions: Question[];
}

async function fetchQuestions(collectionId: string): Promise<QuestionCollection | null> {
  const collectionDoc = doc(firestore, 'questions', collectionId);

  try {
    const docSnap = await getDoc(collectionDoc);

    if (docSnap.exists()) {
      return docSnap.data() as QuestionCollection;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching document: ', error);
    return null;
  }
}

export default fetchQuestions ;
