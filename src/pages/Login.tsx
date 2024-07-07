import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { PiHandWavingBold } from "react-icons/pi";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password)
      return toast.error("Please fill out all fields", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
    try {
      const user = signInWithEmailAndPassword(inputs.email, inputs.password);
      if (!user) return;
      toast.success("Successfully logged in!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
      navigate("/");
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    if (error)
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
  }, [error]);
  return (
    <>
      <nav>
        <div className="max-w-[1200px] mx-auto h-20 flex items-center justify-between px-4">
          <p className="text-xl semibold">Fulfillment</p>
          <ul className="flex semibold gap-8">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <li>Sign Up</li>
          </ul>
        </div>
      </nav>
      <div className="flex max-w-[1200px] mx-auto gap-32 items-center px-4">
        <div className="relative flex flex-col  pt-32 ">
          <p className="mb-12 semibold text-5xl text-center">Welcome Back!</p>
          <img src="/images/login.svg" alt="" className="max-w-[550px]" />
        </div>
        <div className="pt-32 max-w-[450px] w-full flex flex-col items-center">
          <span className="text-main text-6xl">
            <PiHandWavingBold />
          </span>
          <p className="my-4 semibold text-4xl">Login</p>
          <form
            action=""
            className=" w-full semibold flex flex-col gap-5"
            onSubmit={handleLogin}
          >
            <div className="">
              <label htmlFor="" className="mb-1 inline-block text-lg">
                Email:
              </label>
              <input
                type="text"
                name="email"
                value={inputs.email}
                onChange={handleInputChange}
                placeholder="email@email.com"
                className="w-full inline-block border border-opaque rounded-md px-4 py-3 outline-main"
              />
            </div>
            <div className="">
              <label htmlFor="" className="mb-1 inline-block text-lg">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleInputChange}
                placeholder="Top Secret"
                className="w-full inline-block border border-opaque rounded-md px-4 py-3 outline-main"
              />
            </div>
            <button
              className="w-full bg-opaque text-sm py-2.5 rounded-md -mt-1"
              type="submit"
            >
              <span className="mt-1 bold">
                {loading ? "Logging In..." : "Login"}
              </span>
            </button>
          </form>
          <p className="mt-5">
            Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="text-main semibold">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};