import { atom} from 'recoil';


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


export const userDataAtom = atom<UserData | null>({
    key: "userDataAtom",
    default: null
})

export const userDataLoading = atom<boolean>({
    key:"userDataLoadingAtom",
    default: false
})