import React from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../Usercontext";

const Register = ({ handleOpenClose, handleRegister }) => {
  const { setUser } = useContext(userContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [redirect, setRedirect] = useState(false);

  // REGISTRACIJA
  async function handleRegistration(e) {
    e.preventDefault();
    await axios.post("/register", {
      email,
      password,
      username,
    });
    await axios.post("/login", {
      email,
      password,
    });
    setUser({ random: "biro" });
    setRedirect(true);
  }
  if (redirect) {
    handleOpenClose();
    setRedirect(false);
  }
  return (
    <>
      <div className="w-[350px] fl md:w-[450px] h-[600px] bg-white">
        <div className="h-16 flex justify-end  w-full p-4">
          <button onClick={handleOpenClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="text-center font-bold"> Register </div>
        <form
          className="flex-col mt-8   w-[80%] h-[75%]"
          onSubmit={handleRegistration}
        >
          <div className=" ">
            <h1 className="text-gray-300">Email</h1>
            <input
              type="email"
              className="mt-1 w-full bg-transparent bg-gray-300 bg-opacity-30 h-12 pl-4"
              placeholder="Insert your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-1 ">
            <input
              type="text"
              className="w-full bg-transparent bg-gray-300 bg-opacity-30 h-12 pl-4"
              placeholder="Insert your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-1 ">
            <input
              type="password"
              className="w-full bg-transparent bg-gray-300 bg-opacity-30 h-12 pl-4"
              placeholder="Insert your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className=" bg-gray-200 w-full  text-gray-400 p-2 mt-10">
            Register
          </button>
        </form>
        <div className="border-t-2 border-opacity-30 text-sm border-gray-300 w-full p-4 text-center">
          {" "}
          Already a member?{" "}
          <button onClick={handleRegister}>
            <span className="text-red-500">Log in!</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
