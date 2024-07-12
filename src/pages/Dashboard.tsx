import React, { useEffect } from 'react';
import { LandingNav } from '../components/LandingNav';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import DashboardAlt from '../components/DashboardAlt';

type DashboardProps = {
    
};

const Dashboard:React.FC<DashboardProps> = () => {

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
            <div className="pt-8 max-w-[1324px] mx-auto px-6">
            <h1 className='text-center semibold text-4xl'>Dashboard</h1>
            
            <DashboardAlt/>



            
        </div>
        </div>
    )
}
export default Dashboard;