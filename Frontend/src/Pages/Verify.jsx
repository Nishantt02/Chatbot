import React, { useState } from 'react'

const Verify = () => {
  const [otp, setotp] = useState("");
  
  const submitHandler = (e) => {
    e.preventDefault();  // avoid reloading of page 
    console.log(otp);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="otp">
                OTP
          </label>
          <input
            type="otp"
            id="otp"
            value={otp}
            onChange={(e) => setotp(e.target.value)}
            className="border p-2 w-full rounded outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Verify
