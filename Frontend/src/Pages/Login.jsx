
import React, { useState } from "react";
import { Userdata } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
//   get the loginuser function and btnloading state from the Userdata context
//   This allows us to use the loginuser function to handle user login and btnloading to manage loading state
  const { loginuser, btnloading } = Userdata(); //  fixed destructuring
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault(); //  prevents reload
    loginuser(email, navigate); 
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit" //  restored
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          disabled={btnloading}
        >
          {btnloading ? "Please wait..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
