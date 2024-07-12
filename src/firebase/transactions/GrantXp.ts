import { runTransaction, doc } from "firebase/firestore";
import { firestore } from "../firebase";
import { toast } from "react-toastify";

interface UserData {
    uid: string;
    experience: number;
    courseXP: number;
    versusXP: number;
    notecardsXP: number;
    [key: string]: number | string;
}

const grantXP = async (uid: string, gameMode: string, value: number): Promise<boolean> => {
    const userRef = doc(firestore, "users", uid);
    let xpUpdated = false;

    try {
        await runTransaction(firestore, async (transaction) => {
            const userSnap = await transaction.get(userRef);

            if (!userSnap.exists()) {
                return xpUpdated
            }

            const userData = userSnap.data() as UserData;

            const newExperience = userData.experience + value;
            transaction.update(userRef, { experience: newExperience });

            const gameModeXPKey = `${gameMode.toLowerCase()}XP`;
            if (gameModeXPKey in userData) {
                const currentXP = userData[gameModeXPKey];
                if (typeof currentXP === 'number') {
                    const newGameModeXP = currentXP + value;
                    transaction.update(userRef, { [gameModeXPKey]: newGameModeXP });
                    xpUpdated = true;
                } else {
                    throw new Error(`${gameModeXPKey} is not a number.`);
                }
                toast.success(`${value} XP gained !`, {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light",
                  });

            } else {
                throw new Error(`User data does not have ${gameModeXPKey} attribute.`);
            }
        });
        return xpUpdated;
    } catch (error) {
        throw error; 
    }
};

export default grantXP;
