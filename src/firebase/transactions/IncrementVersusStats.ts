import {  doc, updateDoc, increment } from "firebase/firestore";
import { firestore } from "../firebase";

const incrementVersusStats = async (uid: string, won: boolean): Promise<void> => {
    const userDocRef = doc(firestore, "users", uid);
  
    try {
      const updateData: { versusPlayed: any; versusWins?: any } = {
        versusPlayed: increment(1),
      };
  
      if (won) {
        updateData.versusWins = increment(1);
      }
  
      await updateDoc(userDocRef, updateData);
      console.log("User versus stats updated successfully.");
    } catch (error) {
      console.error("Error updating user versus stats: ", error);
    }
  };
  
  export default incrementVersusStats;
