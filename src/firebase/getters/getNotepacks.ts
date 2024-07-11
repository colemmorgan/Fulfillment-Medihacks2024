import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase"; // adjust this import path as needed
import { toast } from "react-toastify";


type Notecard = {
    question: string;
    answer: string;
  };

type Notepack = {
    id: string;
    title: string;
    cards: Notecard[];
    author: {
      firstName: string;
      lastName: string;
    };
    createdAt: Date;
  };

  
export const getNotepacks = async (): Promise<Notepack[]> => {
  try {
    const notepacksCollection = collection(firestore, "notepacks");
    const notepacksSnapshot = await getDocs(notepacksCollection);
    const notepacksList = notepacksSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        cards: data.cards,
        author: data.author,
        createdAt: data.createdAt.toDate(),
      } as Notepack;
    });

    return notepacksList;
  } catch (error) {
    toast.error("Failed to fetch notepacks. Please try again.", {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
    });
    throw error;
  }
};