import React from 'react';
import Account from '../components/dashboard-components/Account';
import Activity from '../components/dashboard-components/Activity';
import DailyActivites from '../components/dashboard-components/DailyActivites';

type DashboardProps = {
    
};

const Dashboard:React.FC<DashboardProps> = () => {
    

    return (
        <div className="bg-[#f2f4f5] min-h-screen">
            <div className="py-20 max-w-[1324px] mx-auto px-6">
            <h1 className='text-center semibold text-5xl'>Dashboard</h1>
            <div className="">
                <div className="grid grid-cols-12 gap-2 mt-10">
                    <Account/>
                    <Activity/>
                    <DailyActivites/>
                    <Account/>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Dashboard;