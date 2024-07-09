import React from 'react';

type ActivityProps = {};

const Activity: React.FC<ActivityProps> = () => {
    const zerosArray = new Array(31).fill(0);

    return (
        <div className="bg-[#fffffd] box col-span-3 rounded-xl py-7 px-4">
            <p className='text-center text-2xl semibold'>Activity</p>
            <p className='text-center mt-2'>Last 30 days</p>
            <div className="mx-auto mt-2" style={{ width: `calc(7 * 28px + 6 * 4px)` }}>
                <div className="grid grid-cols-7 gap-[3px]">
                    {zerosArray.map((_, index) => (
                        <span key={index} className='h-7 w-7 rounded-md bg-main'></span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Activity;
