import { useRecoilState } from "recoil";
import { userDataAtom } from "../../atoms/user-data-atoms";
import SmoothOpen from "../framer-components/SmoothOpen";
import { FaChevronUp } from "react-icons/fa";
import { useState } from "react";


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
        <p className="text-2xl">Profile</p>
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
          <div className="flex my-3 gap-4">
            <div className="p-6 border border-borderColor w-96 h-64 rounded-md bg-white">
              <p className="text-xl semibold">
                {userData?.firstName} {userData?.lastName}
              </p>
              <p className="mt-1">{userData.email}</p>
              <p className="mt-0.5">Account Created: {convertTimestampToDate(userData.createdAt)}</p>
              
            </div>
            <div className="p-6 border border-borderColor w-96 h-64 rounded-md bg-white">
              <p className="semibold text-xl text-center">Badges</p>
            </div>
            <div className="p-6 border border-borderColor w-96 h-64 rounded-md bg-white">
              <p className="semibold text-xl text-center">Badges</p>
            </div>
          </div>
        </SmoothOpen>
      )}
    </div>
  );
};

export default Profile;
