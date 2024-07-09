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
    problemsAttempted7D: number;
    problemsCorrect7D: number;
    course1Progress: number;
    course2Progress: number;
    course3Progress: number;
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
        problemsAttempted7D: 0,
        problemsCorrect7D: 0,
        course1Progress: 0,
        course2Progress: 0,
        course3Progress: 0,
    };
    
    return userData
}


export default createUser

