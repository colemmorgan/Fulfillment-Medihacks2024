import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';


interface Question {
    id: string;
    question: string;
    incorrectAnswers: string[];
    correctAnswer: string;
    difficulty: string;
  }
  
async function populateQuestions(collectionName: string, questions: Question[]) {
  const questionsCollection = collection(firestore, collectionName);

  for (const question of questions) {
    try {
      await addDoc(questionsCollection, question);
      console.log(`Question added: ${question.id}`);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }
}

export { populateQuestions };
