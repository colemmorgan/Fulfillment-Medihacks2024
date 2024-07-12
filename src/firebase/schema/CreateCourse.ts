import { firestore } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

interface Question {
    id: string;
    question: string;
    incorrectAnswers: string[];
    correctAnswer: string;
    difficulty: string;
}

async function populateQuestions(collectionId: string, title: string, questions: Question[]) {
  const collectionDoc = doc(firestore, 'questions', collectionId);

  const data = {
    id: collectionId,
    title: title,
    questions: questions
  };

  try {
    await setDoc(collectionDoc, data);
    console.log(`Collection created/updated: ${collectionId}`);
  } catch (error) {
    console.error('Error creating/updating document: ', error);
  }
}

export { populateQuestions };
