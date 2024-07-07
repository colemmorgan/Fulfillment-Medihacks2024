import React, { useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import { PiSignOut } from "react-icons/pi";

export const LandingNav = () => {
  const [user] = useAuthState(auth);
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
  const [signOut, loading, error] = useSignOut(auth);
  const handleLogout = () => {
    signOut();
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
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-full px-4 relative">
          <p className="semibold text-xl">Fulfillment</p>
          <ul className="semibold flex gap-6 items-center">
            <li>Home</li>
            <li>About</li>
            {user ? (
              <li
                className="py-3 px-5 bg-opaque rounded-md cursor-pointer"
                onClick={() => setShowAccountMenu(!showAccountMenu)}
              >
                <span className="pt-1">Logout</span>
              </li>
            ) : (
              <Link to={"/login"}>
                <li className="py-3 px-5 bg-opaque rounded-md ">
                  <span className="pt-1">Login</span>
                </li>
              </Link>
            )}
          </ul>
          <AccountMenu showAccountMenu={showAccountMenu} handleLogout={handleLogout}/>
        </div>
      </nav>
    </>
  );
};

interface AccountMenuProps {
  showAccountMenu: boolean;
  handleLogout: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ showAccountMenu, handleLogout }) => {
  return (
    <>
      {showAccountMenu && (
        <div className="absolute  bg-opacity-50 border border-main rounded-lg right-4 top-20 z-40 overflow-hidden">
          <div className=" py-5 border-b border-opaque flex items-center px-6">
            <Link to={"/account"}>
              <div className="h-10 w-10 rounded-full bg-main cursor-pointer"></div>
            </Link>
            <div className="ml-5">
              <Link to={"/account"}>
                <p className=" cursor-pointer semibold mb-0.5">Cole Morgan</p>
              </Link>
              <p className="text-sm">colemmorgann@gmail.com</p>
            </div>
          </div>
          <div
            className="py-4 flex text-dull items-center cursor-pointer hover:bg-main hover:bg-opacity-25 transition-all px-8"
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