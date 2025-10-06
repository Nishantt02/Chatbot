import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Create the context
const Chatcontext = createContext();

// Provider component
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newrequestloading, setnewrequestLoading] = useState(false);

  const [chats, setchats] = useState([]);
  const [selected, setselected] = useState(null);
  const [createLod, setcreateLod] = useState(false);
  const [loading, setloading] = useState(false);

  const BASE_URL = "https://chatbot-3-zs91.onrender.com";

  // Fetch response from Gemini API
  async function fetchresponse() {
    if (prompt.trim() === "") return alert("Please enter a prompt");

    if (!selected) {
      alert("No chat selected. Please select or create a chat.");
      return;
    }

    setnewrequestLoading(true);
    const userPrompt = prompt;
    setPrompt("");

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBv9-iA3-M06RCLxE9YK8ELKMCEnYUvD2Y",
        {
          contents: [{ parts: [{ text: userPrompt }] }],
        }
      );

      const message = {
        question: userPrompt,
        answer: response.data.candidates[0].content.parts[0].text,
      };

      setMessages((prev) => [...prev, message]);

      // Add question and answer to the backend
      await axios.post(
        `${BASE_URL}/Chat/add/${selected}`,
        {
          question: userPrompt,
          answer: response.data.candidates[0].content.parts[0].text,
        },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
    } catch (error) {
      alert("Error fetching response, please try again later.");
      console.error("Error fetching response:", error);
    } finally {
      setnewrequestLoading(false);
    }
  }

  // Fetch all chats
  async function fetchats() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.get(`$https://chatbot-3-zs91.onrender.com/Chat/getallchat`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setchats(data.chats);
      if (data.chats.length > 0 && !selected) setselected(data.chats[0]._id);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }

  // Create a new chat
  async function createchat() {
    setcreateLod(true);
    try {
      await axios.post(
        `${BASE_URL}/Chat/create`,
        {},
        { headers: { token: localStorage.getItem("token") } }
      );
      fetchats();
    } catch (error) {
      toast.error("Error creating chat, please try again later.");
      console.error("Error creating chat:", error);
    } finally {
      setcreateLod(false);
    }
  }

  // Fetch messages of selected chat
  async function fetchmessages() {
    setloading(true);
    try {
      const { data } = await axios.get(`$https://chatbot-3-zs91.onrender.com/Chat/getchat/${selected}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setMessages(data.conversation);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
      toast.error("Error fetching messages. Please try again later.");
    } finally {
      setloading(false);
    }
  }

  // Delete a chat
  const deletechat = async (id) => {
    try {
      const { data } = await axios.delete(`$https://chatbot-3-zs91.onrender.com/chat/delete/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      toast.success(data.message || "Chat deleted successfully");
      fetchats();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error(
        error?.response?.data?.message || "Error deleting chat. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchats();
  }, []);

  useEffect(() => {
    if (selected) fetchmessages();
  }, [selected]);

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
        fetchats,
      }}
    >
      {children}
    </Chatcontext.Provider>
  );
};

// Custom hook for using the context
export const chatdata = () => useContext(Chatcontext);
