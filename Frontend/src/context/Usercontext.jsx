
import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

// create the context
// This context will be used to provide user-related functions and state
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnloading, setbtnloading] = useState(false);

//   This function handles user login by sending a POST request to the server with the user's email.
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

  const[user,setUser]=useState(null)
  const[isAuth,setisAuth]=useState(false)

  async function verifyUser(otp, navigate) {
    // get the token from userlogin
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
      { otp,VerifyToken:token },
     
    );

    console.log(data);
    toast.success(data.message);
    localStorage.removeItem("verifytoken");
    // generate the new login token after otp verification
    localStorage.setItem("token", data.token);
    navigate("/home");
    setisAuth(true);
    setUser(data.user);
  } catch (error) {
    toast.error(error.response?.data?.message || "Verification failed");
  } finally {
    setbtnloading(false);
  }
}

  return (
    // Provide the loginuser function and btnloading state to all components that consume this context
    // This allows those components to access the loginuser function and the loading state both accessed from the context
    <UserContext.Provider value={{loginuser,verifyUser,setisAuth,user,btnloading}}>
      {children}
      <Toaster/>
    </UserContext.Provider>
  );
};

export const Userdata = () => useContext(UserContext);
