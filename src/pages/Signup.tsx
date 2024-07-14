import { Link, useNavigate } from "react-router-dom";
import { PiHandWavingBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import createUser from "../firebase/schema/CreateUser";
import { doc, setDoc } from "@firebase/firestore";

export const Signup = () => {
  const navigate = useNavigate();
  interface FormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  const [inputs, setInputs] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [createUserWithEmailAndPassword, _, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.firstName ||
      !inputs.lastName
    )
      return toast.error("Please fill out all fields", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
    try {
      toast.loading("Creating your account", {
        position: "top-center",
        toastId: "loadingToast",
      });
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      const userData = createUser(newUser, inputs);
      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      navigate("/");
    } catch (error: any) {
      toast.dismiss("loadingToast");
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
    } finally {
      toast.dismiss("loadingToast");
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
            <Link to={"/login"}>
              <li>Login</li>
            </Link>
          </ul>
        </div>
      </nav>
      <div className="flex max-w-[1200px] mx-auto gap-32 max-lg:gap-14 items-center px-4 pt-8 lg:pt-20 max-lg:flex-col-reverse">
        <div className="relative flex flex-col items-center">
          <p className="mb-12 semibold text-4xl text-center sm:pl-16">
            Nice to meet you!
          </p>
          <img
            src="/images/signup.svg"
            alt=""
            className="max-w-[475px] max-lg:w-72"
          />
        </div>
        <div className=" max-w-[450px] w-full flex flex-col items-center">
          <span className="text-main text-5xl">
            <PiHandWavingBold />
          </span>
          <p className="mb-6 mt-4 semibold text-3xl">Sign Up</p>
          <form
            action=""
            className=" w-full semibold flex flex-col gap-5"
            onSubmit={handleRegister}
          >
            <div className="flex">
              <div className="w-1/2 pr-1">
                <label htmlFor="" className="mb-1 block">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={inputs.firstName}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="John"
                  className="block border border-opaque rounded-md px-4 py-2.5 text-sm outline-main max-w-[95%] w-full"
                />
              </div>
              <div className="w-1/2 pl-1">
                <label htmlFor="" className="mb-1 block">
                  First Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={inputs.lastName}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Doe"
                  className="block border border-opaque rounded-md px-4 py-2.5 text-sm outline-main w-full"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="" className="mb-1 inline-block">
                Email:
              </label>
              <input
                type="text"
                name="email"
                value={inputs.email}
                onChange={(e) => handleInputChange(e)}
                placeholder="email@email.com"
                className="w-full inline-block border border-opaque rounded-md px-4 py-2.5 text-sm outline-main"
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
                onChange={(e) => handleInputChange(e)}
                placeholder="Top Secret"
                className="w-full inline-block border border-opaque rounded-md px-4 py-2.5 text-sm outline-main"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-opaque hover:bg-main transition-all text-sm py-2 rounded-md -mt-1 "
            >
              <span className="mt-1 bold">
                {loading ? "Registering..." : "Register"}
              </span>
            </button>
          </form>
          <p className="mt-5">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-main semibold">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
