import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

// Create the context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnloading, setbtnloading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuth, setisAuth] = useState(false);

  //  Login User
  async function loginuser(email, navigate) {
    setbtnloading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/User/login`,
        { email }
      );
      toast.success(data.message);
      // get the token of login
      localStorage.setItem("verifytoken", data.VerifyToken);
      navigate("/verify");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setbtnloading(false);
    }
  }

  //  Verify OTP and login
  async function verifyUser(otp, navigate) {
    // fetch the login token to verify
    const token = localStorage.getItem("verifytoken");
    setbtnloading(true);

    if (!token) {
      toast.error("Token not found");
      setbtnloading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/User/verify`,
        { otp, VerifyToken: token }
      );

      toast.success(data.message);
      // remove the login token
      localStorage.removeItem("verifytoken");
      // geneate the new token of verify
      localStorage.setItem("token", data.token);
      setisAuth(true);
      setUser(data.user);
      
      navigate("/home")
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setbtnloading(false);
    }
  }


   const [loading, setLoading] = useState(true);
  async function fetchUser() {
    const token = localStorage.getItem("token");

    if (!token) {
      setisAuth(false);

      console.log(" No token found in localStorage");
      return;
    }

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/User/me`,
        {
          headers: {
            token: token,
          },
        }
      );

      setisAuth(true);
      setUser(data.user);
      setLoading(false)
    } catch (error) {
      setisAuth(false);
      console.error(
        "❌ Fetch user error:",
        error.response?.data || error.message
      );
      setUser(null);
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ loginuser, verifyUser, setisAuth, user, btnloading,loading }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

// Custom hook to use context
export const Userdata = () => useContext(UserContext);
