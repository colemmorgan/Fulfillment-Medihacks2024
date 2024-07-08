import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

type FriendsProps = {};

const Friends: React.FC<FriendsProps> = () => {
  return (
    <div className="col-span-3 bg-white rounded-xl box py-6 px-5">
      <p className="text-xl text-center semibold">Friends</p>
      <div className="flex flex-col justify-between">
        <ul className="mt-4 flex flex-col gap-2">
          <li className="flex justify-between items-center">
            <p className="text-sm semibold">Cole Morgan</p>
            <p className="text-xs">Last online: 7m ago</p>
          </li>
          <li className="flex justify-between items-center">
            <p className="text-sm semibold">James Garner</p>
            <p className="text-xs">Last online: 2d ago</p>
          </li>
          <li className="flex justify-between items-center">
            <p className="text-sm semibold">John Garner</p>
            <p className="text-xs">Last online: 1h ago</p>
          </li>
        </ul>
        <p className="mt-4 flex underline">Add Friends <span className="ml-2 text-xl text-main"><FaLongArrowAltRight/></span></p>
      </div>
    </div>
  );
};
export default Friends;
