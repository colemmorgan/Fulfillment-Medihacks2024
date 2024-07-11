import React, { useEffect } from 'react';
import Account from '../components/dashboard-components/Account';
import Activity from '../components/dashboard-components/Activity';
import DailyActivites from '../components/dashboard-components/DailyActivites';
import { LandingNav } from '../components/LandingNav';
import QuestionsStats from '../components/dashboard-components/QuestionsStats';
import DashboardCourses from '../components/dashboard-components/DashboardCourses';
import Leaderboard from '../components/dashboard-components/Leaderboard';
import WeeklyProblemCount from '../components/dashboard-components/WeeklyProblemCount';
import { useRecoilState } from 'recoil';
import { userDataAtom } from '../atoms/user-data-atoms';
import CourseCompletion from '../components/dashboard-components/CourseCompletion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import DashboardAlt from '../components/DashboardAlt';

type DashboardProps = {
    
};

const Dashboard:React.FC<DashboardProps> = () => {

    const [userData] = useRecoilState(userDataAtom)
    const [user,loading] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if(!user && !loading) {
            navigate("/login")
        }
    },[user, loading])
    if (loading) {
        return <></>;
      }
    
    return (
        <div className="bg-[#f2f4f5] min-h-screen pb-20">
            <LandingNav/>
            <div className="pt-6 max-w-[1324px] mx-auto px-6">
            <h1 className='text-center semibold text-4xl'>Dashboard</h1>
            {/* <div className="">
                <div className="grid grid-cols-12 gap-2 mt-10">
                    <Account/>
                    <Activity/>
                    <DailyActivites/>
                    <QuestionsStats correct={userData?.problemsCorrect} attempted={userData?.problemsAttempted}/>
                    <DashboardCourses/>
                    <CourseCompletion/>
                    <Leaderboard/>
                    <WeeklyProblemCount correct={userData?.problemsCorrect} attempted={userData?.problemsAttempted}/>
                    <div className="box col-span-4 bg-white rounded-xl flex flex-col  items-center px-8 py-6">
                        <p className='semibold text-2xl '>Versus </p>
                        <p className='mt-3 text-lg text-center'>Answer medical trivia against other players in real time!</p>
                        <div className="flex gap-4 mt-3">
                            <span>Wins: 0</span>
                            <span>Games: 0</span>
                        </div>
                        <button className='mt-7 bg-opaque py-1.5 w-full rounded-md text-sm'>Launch Gamemode</button>
                    </div>
                </div>
            </div> */}
            <DashboardAlt/>



            
        </div>
        </div>
    )
}
export default Dashboard;