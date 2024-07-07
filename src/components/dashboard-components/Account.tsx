import React from "react";

type AccountProps = {};

const Account: React.FC<AccountProps> = () => {
  return (
    <div className="col-span-5 border  rounded-xl py-7 px-6 bg-[#fffffd] box">
      <div className="flex items-center gap-4">
        <p className="semibold text-3xl">Cole Morgan</p>
        <p className="text-lg text-main">He/Him</p>
      </div>
      <div className="mt-4 w-full border border-opaque px-4 py-4 rounded-lg">
        <p className="mb-4">Level 1: 90/100 experience</p>
        <div className="bg-gray-400 rounded-full overflow-hidden">
          <div className="h-1 bg-main w-[90%]"></div>
        </div>
      </div>
      <div className="mt-4 mb-2">Badges:</div>
      <p className="text-center my-4">No badges yet!</p>
    </div>
  );
};
export default Account;
