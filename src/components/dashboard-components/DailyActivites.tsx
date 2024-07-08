import React from "react";

type DailyActivitesProps = {};

const DailyActivites: React.FC<DailyActivitesProps> = () => {
  return (
    <div className="col-span-4 bg-[#fffffd] box rounded-xl py-6 px-6">
      <p className="text-center text-2xl semibold">Daily Tasks</p>
      <ul className="mt-3 flex flex-col gap-2">
        <div className="flex items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-main mr-3" />
          <span className="pt-0.5 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
        <div className="flex items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-main mr-3" />
          <span className="pt-0.5 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
        <div className="flex items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-main mr-3" />
          <span className="pt-0.5 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
      </ul>
      <button className="w-full bg-opaque mt-4 py-1.5 rounded-md text-sm">Claim Reward</button>
    </div>
  );
};
export default DailyActivites;
