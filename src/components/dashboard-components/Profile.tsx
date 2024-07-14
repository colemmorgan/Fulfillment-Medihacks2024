import { useRecoilState } from "recoil";
import { userDataAtom } from "../../atoms/user-data-atoms";
import SmoothOpen from "../framer-components/SmoothOpen";
import { FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import Badges from "./Badges";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const [userData] = useRecoilState(userDataAtom);
  const [hideTab, setHideTab] = useState<boolean>(false);

  function convertTimestampToDate(timestamp: number) {
    const date = new Date(timestamp);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  }

  return (
    <div className="mt-6 border-b border-borderColor pb-4">
      <div className="flex justify-between">
        <p className="text-2xl flex gap-3">
          <span className="text-main pt-0.5">
            <FaRegUserCircle />
          </span>
          Profile
        </p>
        <p
          className="flex text-[#888888] items-center gap-3 cursor-pointer text-sm"
          onClick={() => setHideTab(!hideTab)}
        >
          {hideTab ? "Expand" : "Collapse"}
          <span className={`transition-all ${hideTab ? "rotate-180" : ""}`}>
            <FaChevronUp />
          </span>
        </p>
      </div>

      {userData && (
        <SmoothOpen isHidden={hideTab}>
          <ul className="flex flex-wrap my-3 gap-4">
            <div className="p-6 border border-borderColor w-96 h-64 rounded-md bg-white flex flex-col justify-between">
              <div className="">
                <p className="text-xl semibold">
                  {userData?.firstName} {userData?.lastName}
                </p>
                <p className="mt-1">{userData?.email}</p>
                <p className="mt-1 text-sm">
                  Account Created:{" "}
                  {convertTimestampToDate(userData?.createdAt || 0)}
                </p>
              </div>
              <div className="">
                <div className="flex gap-4 mb-2">
                  <p>Level: {Math.floor(userData.experience / 100) + 1}</p>
                  <p>Experience: {userData.experience % 100}/100</p>
                </div>
                <div className="w-full h-2 bg-gray-400 rounded-full overflow-hidden border border-borderColor">
                  <div
                    className="h-full bg-main"
                    style={{ width: `${userData?.experience % 100 || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <Badges />

            <div className="p-6 border border-borderColor w-96 h-64 rounded-md bg-white">
              <p className="semibold text-xl text-center">XP Breakdown</p>
              <div className="flex flex-col gap-1 mt-4">
                <div className="flex justify-between">
                  <div>Lifetime XP</div>{" "}
                  <div className="text-secondary font-semibold">
                    {userData.experience}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>XP from Courses</div>{" "}
                  <div className="text-secondary font-semibold">
                    {userData.courseXP}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>XP from Notecards</div>{" "}
                  <div className="text-secondary font-semibold">
                    {userData.notecardXP}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>XP from Versus</div>{" "}
                  <div className="text-secondary font-semibold">
                    {userData.versusXP}
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </SmoothOpen>
      )}
    </div>
  );
};

export default Profile;
