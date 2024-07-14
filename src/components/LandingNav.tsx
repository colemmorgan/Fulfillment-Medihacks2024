import React, { useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import { PiSignOut } from "react-icons/pi";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../atoms/user-data-atoms";
import { IoMdMenu, IoIosCloseCircle } from "react-icons/io";

export const LandingNav = () => {
  const [user] = useAuthState(auth);

  const [_, setUserData] = useRecoilState(userDataAtom);
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);
  const [signOut] = useSignOut(auth);
  const handleLogout = () => {
    signOut();
    setUserData(null);
    setShowAccountMenu(false);
    toast.success("Successfully logged out", {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
    });
  };
  return (
    <>
      <nav className=" h-20 text-black relative">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-full px-6 relative">
          <p className="semibold text-xl">Fulfillment</p>
          <div
            className="text-4xl cursor-pointer lg:hidden"
            onClick={() => setShowMobileNav(true)}
          >
            <IoMdMenu />
          </div>
          <div className="hidden lg:block">
            <ul className=" flex gap-5 items-center text-[15px]">
              <Link to={"/"}>
                <li>Home</li>
              </Link>
              <Link to={"/dashboard"}>
                <li>Dashboard</li>
              </Link>
              <Link to={"/notepacks"}>
                <li>Notecards</li>
              </Link>
              <Link to={"/trivia"}>
                <li>Versus</li>
              </Link>
              <Link to={"/courses"}>
                <li>Courses</li>
              </Link>
              {user ? (
                <li
                  className="py-2.5 pb-2 px-5 bg-opaque rounded-md cursor-pointer"
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                >
                  <span className="pt-1">Logout</span>
                </li>
              ) : (
                <Link to={"/login"}>
                  <li className="pt-2.5 pb-2 px-5 bg-opaque rounded-md ">
                    <span className="">Login</span>
                  </li>
                </Link>
              )}
            </ul>
            <AccountMenu
              showAccountMenu={showAccountMenu}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </nav>
      {showMobileNav && (
        <div className="fixed inset-0 bg-white z-50 ">
          <div className="h-full w-full relative ">
            <span
              className="absolute right-4 top-4 text-5xl cursor-pointer"
              onClick={() => setShowMobileNav(false)}
            >
              <IoIosCloseCircle />
            </span>
            <ul className="h-full w-full flex flex-col justify-center gap-10 semibold items-center text-3xl">
              <Link to={"/dashboard"}>Dashboard</Link>
              <Link to={"/notepacks"}>Notecards</Link>
              <Link to={"/courses"}>Courses</Link>
              <Link to={"/trivia"}>Versus</Link>
              <Link to={"/login"}>Login</Link>
              <Link to={"/signup"}>Signup</Link>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

interface AccountMenuProps {
  showAccountMenu: boolean;
  handleLogout: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
  showAccountMenu,
  handleLogout,
}) => {
  const [userData] = useRecoilState(userDataAtom);
  return (
    <>
      {showAccountMenu && (
        <div className="absolute  border border-main rounded-lg right-4 top-[72px] z-40 overflow-hidden bg-white min-w-72">
          <div className=" py-5 border-b border-opaque flex items-center px-6">
            <Link to={"/dashboard"}>
              <div className="h-10 w-10 rounded-full bg-main cursor-pointer"></div>
            </Link>
            <div className="ml-4">
              <Link to={"/dashboard"}>
                <p className=" cursor-pointer semibold mb-0.5">
                  {userData?.firstName} {userData?.lastName}
                </p>
              </Link>
              <p className="text-sm ">{userData?.email}</p>
            </div>
          </div>
          <div
            className="py-4 flex text-dull items-center cursor-pointer hover:bg-main hover:bg-opacity-25 transition-all px-6"
            onClick={handleLogout}
          >
            <span className="mr-2 text-lg -mt-0.5">
              <PiSignOut />
            </span>
            <span className="text-sm">Sign Out</span>
          </div>
        </div>
      )}
    </>
  );
};
