import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase"; 
import { toast } from "react-toastify";

type Notecard = {
  question: string;
  answer: string;
};

export const createNotepack = async (cards: Notecard[], title: string, firstName: string, lastName: string) => {
  if (cards.length === 0) {
    toast.error("Please add at least one notecard before publishing.", {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
    });
    return;
  }

  try {
    const notepackData = {
      title: title,
      cards: cards.map(card => ({
        question: card.question,
        answer: card.answer
      })),
      author: {
        firstName: firstName,
        lastName: lastName
      },
      createdAt: new Date()
    };

    const docRef = await addDoc(collection(firestore, "notepacks"), notepackData);
    
    toast.success("Notepack published successfully!", {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
    });

    
    return docRef.id; 
    
  } catch (error) {
    console.error("Error adding document: ", error);
    toast.error("Failed to publish notepack. Please try again.", {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
    });
    throw error;
  }
};
