import axios from "axios";
import { set } from "mongoose";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Create the context
const Chatcontext = createContext();

// Provider component
export const ChatProvider = ({ children }) => {
  // for storing messages, prompt, and loading states
  // messages: array of chat messages
  const [messages, setMessages] = useState([]);
  // prompt will be empty initially and will be used to store user input
  // setPrompt: function to update the prompt state
  const [prompt, setPrompt] = useState("");
  const [newrequestloading, setnewrequestLoading] = useState(false);

  // Fetch response from Gemini API
  async function fetchresponse() {
    if (prompt.trim() === "") return alert("Please enter a prompt");

    setnewrequestLoading(true);
    const userPrompt = prompt; // store prompt before resetting
    setPrompt(""); // clear input field

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBnU2aUf4uEmvPWqxfaarUSVGn8v3eDE2M",
        method: "POST",
        data: {
          contents: [{ parts: [{ text: userPrompt }] }],
        },
      });

      const message = {
        question: userPrompt,
        answer: response.data.candidates[0].content.parts[0].text,
      };

      setMessages((prev) => [...prev, message]);



if (!selected) {
  alert("No chat selected. Please select or create a chat.");
  setnewrequestLoading(false);
  return;
}


      // it is used to add the question and answer to the database
      const{data}=await axios.post(`${import.meta.env.VITE_BASE_URL}/Chat/add/${selected}`,{
        question: userPrompt,
        answer: response.data.candidates[0].content.parts[0].text

      },{
        headers:{
          token:localStorage.getItem('token')
        }
      })
    } catch (error) {
      alert("Error fetching response, please try again later.");
      console.error("Error fetching response:", error);
    } finally {
      setnewrequestLoading(false);
    }
  }

  const [chats, setchats] = useState([]);
  const [selected, setselected] = useState(null);

async function fetchats() {
  try {
    // to get the token from local storage 
    const token = localStorage.getItem("token");

    // Check if token is valid before sending request
    if (!token) {
      console.error("No token found");
      return;
    }


    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/Chat/getallchat`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setchats(data.chats);

    // select the first chat if none is selected
    if (data.chats.length > 0) {
      setselected(data.chats[0]._id);
    }
  } catch (error) {
    console.error("Error fetching ATS data:", error);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Message:", error.response.data?.message);
    }
  }
}


  // It is used to create the chat
  const [createLod, setcreateLod] = useState(false);
  async function createchat() {
    setcreateLod(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/Chat/create`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      fetchats();  // it is used to refetch all the chats after creating the new chats 
      setcreateLod(false);
    } catch (error) {
      toast.error("Error creating chat, please try again later.");
      setcreateLod(false);
      console.error("Error creating chat:", error);
    }
  }

  const [loading, setloading] = useState(false);
  

// to get the messages of the selected chat
async function fetchmessages() {
  setloading(true);

  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/Chat/getchat/${selected}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    setMessages(data.conversation);

  } catch (error) {
    console.error("Error fetching messages:", error);

    if (error.response) {
      console.log("Error status:", error.response.status);
      console.log("Error message:", error.response.data?.message);

      if (error.response.status === 404) {
        setMessages([]); // Clear old messages
        return; 
      }
    }

    toast.error("Error fetching messages. Please try again later.");
  } finally {
    setloading(false);
  }
}

  useEffect(() => {
    fetchats();
  }, []);


useEffect(() => {
  if (selected) {
    fetchmessages();
  }
}, [selected]);


const deletechat = async (id) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/chat/delete/${id}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    toast.success(data.message || "Chat deleted successfully");
    fetchats(); // Refresh chats after deletion
    window.location.reload(); // Reload the page to reflect changes
  } catch (error) {
    console.error("Error deleting chat:", error);

    // Safe access using optional chaining and fallback
    const message =
      error?.response?.data?.message || "Error deleting chat. Please try again later.";
      
    toast.error(message);
  }
};

  return (
    <Chatcontext.Provider
      value={{
        fetchresponse,
        messages,
        prompt,
        setPrompt,
        newrequestloading,
        chats,
        createchat,
        createLod,
        selected,
        setselected,
        loading,
        setloading,
        deletechat,
        fetchats
      }}
    >
      {children}
    </Chatcontext.Provider>
  );
};

// Custom hook for using the context
export const chatdata = () => useContext(Chatcontext);
