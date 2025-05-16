

import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnloading, setbtnloading] = useState(false);

  async function loginuser(email, navigate) {
    setbtnloading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/User/login`,
        { email }
      );
      console.log(data)
      toast.success(data.message);
      localStorage.setItem("verifytoken", data.VerifyToken
);
      navigate("/verify");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setbtnloading(false);
    }
  }

  return (
    <UserContext.Provider value={{ loginuser, btnloading }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const Userdata = () => useContext(UserContext);
