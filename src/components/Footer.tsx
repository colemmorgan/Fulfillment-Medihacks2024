import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-black text-white py-28">
      <div className=" px-6 flex flex-col lg:flex-row justify-center items-center mx-auto max-sm:grid">
        <div className="lg:pr-16 lg:border-r  border-borderColor max-sm:mb-6 max-sm:pb-8 mb-12 lg:mb-0">
          <p className="text-xl semibold">Fulfillment</p>
          <a
            href="https://github.com/colemmorgan/Medihacks2024"
            target="_blank"
          >
            <p className="flex gap-3 items-center mt-4 text-lg">
              <span className="pb-1 text-xl">
                <FaGithub />
              </span>
              Github
            </p>
          </a>
          <p className="text-[#D1D1D1] text-sm mt-3">
            © Copyright 2024 Fufillment. All <br />
            Commercial Rights Reserved.
          </p>
        </div>
        <div className="ml-16 max-sm:ml-1 flex max-sm:grid max-sm:gap-y-4 border-t border-borderColor pt-4 lg:border-t-0">
          <div className="w-36 flex flex-col">
            <p>Features</p>
            <div className="mt-2 text-sm flex flex-col gap-2 text-[#D1D1D1]">
              <Link to={"/trivia"}>
                <p className="">Versus</p>
              </Link>
              <Link to={"/courses"}>
                <p>Courses</p>
              </Link>
              <Link to={"/notepacks"}>
                {" "}
                <p className="">Notescards</p>
              </Link>
            </div>
          </div>
          <div className="w-36 flex flex-col">
            <p>Other</p>
            <div className="mt-2 text-sm flex flex-col gap-2 text-[#D1D1D1]">
              <Link to={"/dashboard"}>
                <p className="">Dashboard</p>
              </Link>
              <Link to={"/"}>
                <p className="">Home</p>
              </Link>
            </div>
          </div>
          <div className="w-36 flex flex-col">
            <p>Auth</p>
            <div className="mt-2 text-sm flex flex-col gap-2 text-[#D1D1D1]">
              <Link to={"/login"}>
                <p className="">Login</p>
              </Link>
              <Link to={"/signup"}>
                <p className="">Sign Up</p>
              </Link>
            </div>
          </div>
          <div className="w-36 flex flex-col">
            <p>Legal</p>
            <div className="mt-2 text-sm flex flex-col gap-2 text-[#D1D1D1]">
              <p className="cursor-not-allowed">Terms of Use</p>
              <p className="cursor-not-allowed">Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
