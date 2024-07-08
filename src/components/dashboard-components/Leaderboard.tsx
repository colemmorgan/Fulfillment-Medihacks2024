import React from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";

type LeaderboardProps = {
    
};

const Leaderboard:React.FC<LeaderboardProps> = () => {
    
    return (
        <div className="col-span-5 h-60 bg-white box rounded-xl p-6 px-8">
            <p className='semibold text-xl'>Leaderboard</p>
            <ul className="mt-3 flex flex-col gap-2.5">
                <li className='flex justify-between items-center'>
                    <p className='semibold'><span className='text-main'>1.</span> Cole Morgan</p>
                    <p>Level 4: 384/400 exp</p>
                </li>
                <li className='flex justify-between items-center'>
                    <p className='semibold'><span className='text-main'>2.</span> John Garner</p>
                    <p>Level 4: 324/400 exp</p>
                </li>
                <li className='flex justify-between items-center'>
                    <p className='semibold'><span className='text-main'>3.</span> James Garner</p>
                    <p>Level 3: 284/300 exp</p>
                </li>
                <li className='flex justify-between items-center'>
                    <p className='semibold'><span className='text-main'>4.</span> Jagger Vinson</p>
                    <p>Level 2: 156/200 exp</p>
                </li>
                <p className='semibold underline flex items-center cursor-pointer'>See more <span className='ml-3 text-main text-2xl'><FaLongArrowAltRight/></span></p>
            </ul>
        </div>
    )
}
export default Leaderboard;