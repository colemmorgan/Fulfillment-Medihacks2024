import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

interface UserData {
  uid: string;
  email: string | null;
  createdAt: number;
  updatedAt: number;
  firstName: string;
  lastName: string;
  level: number;
  experience: number;
  problemsAttempted: number;
  problemsCorrect: number;
  problemsAttempted7D: number;
  problemsCorrect7D: number;
  [key: string]: any;
  course1Progress: number;
  course2Progress: number;
  course3Progress: number;
}

export default function useGetUserData(userId: string | undefined) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const userRef = doc(firestore, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data() as UserData;
          setUserData(data);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return { userData, loading, setUserData };
}
