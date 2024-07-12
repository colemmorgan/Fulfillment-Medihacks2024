import { UserCredential } from "firebase/auth";

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
    versusWins: number;
    versusPlayed: number;
    notepacksMade: number;
    notepacksViewed: number;
    cpdflmpProgress: number;
    ebpmmProgress: number;
    merbpsProgress: number;
    versusXP: number;
    notecardXP: number;
    courseXP: number;
}

interface FormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const createUser = (newUser: UserCredential, inputs: FormState): UserData => {
    const userData: UserData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        level: 1,
        experience: 0,
        problemsAttempted: 0,
        problemsCorrect: 0,
        versusWins: 0,
        versusPlayed: 0,
        notepacksMade: 0,
        notepacksViewed: 0,
        cpdflmpProgress: 0,
        ebpmmProgress: 0,
        merbpsProgress: 0,
        versusXP: 0,
        notecardXP:0,
        courseXP: 0,
    };
    
    return userData;
};

export default createUser;
