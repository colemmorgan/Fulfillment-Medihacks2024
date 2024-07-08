import React from 'react';
import Account from '../components/dashboard-components/Account';
import Activity from '../components/dashboard-components/Activity';
import DailyActivites from '../components/dashboard-components/DailyActivites';
import { LandingNav } from '../components/LandingNav';
import QuestionsStats from '../components/dashboard-components/QuestionsStats';
import DashboardCourses from '../components/dashboard-components/DashboardCourses';
import Leaderboard from '../components/dashboard-components/Leaderboard';
import Friends from '../components/dashboard-components/Friends';
import WeeklyProblemCount from '../components/dashboard-components/WeeklyProblemCount';

type DashboardProps = {
    
};

const Dashboard:React.FC<DashboardProps> = () => {
    

    return (
        <div className="bg-[#f2f4f5] min-h-screen">
            <LandingNav/>
            <div className="pt-8 max-w-[1324px] mx-auto px-6">
            <h1 className='text-center semibold text-5xl'>Dashboard</h1>
            <div className="">
                <div className="grid grid-cols-12 gap-2 mt-8">
                    <Account/>
                    <Activity/>
                    <DailyActivites/>
                    <QuestionsStats/>
                    <DashboardCourses/>
                    <Friends/>
                    <Leaderboard/>
                    <WeeklyProblemCount/>
                    <div className="box col-span-4 bg-white rounded-xl flex flex-col justify-center items-center">
                        <p className='black text-5xl text-main'>Fullfillment</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Dashboard;