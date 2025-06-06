import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { chatdata } from "../context/Chatcontext";
import { MdDelete } from "react-icons/md";
import { LoadingSpinner } from "./Loading";
import { Userdata } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isopen, toggleSlidebar }) => {
  const{chats,createchat,createLod,setselected, deletechat} = chatdata();
  const{logoutHandler}=Userdata()
    const navigate = useNavigate();

 
  const deleteChatHandler = (id) => {
    if (confirm("are you sure you want to delete this chat")) {
      deletechat(id);
    }
  };

    const handleLogout = () => {
    logoutHandler();     // clear state and token
    navigate("/login");  // then navigate to login
  };
  
  const clickevent=(id)=>{
    setselected(id);
    toggleSlidebar(); // Close the sidebar after selecting a chat
  }

  return (
    <div
      className={`fixed inset-0 bg-gray-800 p-4 transition-transform transform 
        md:relative md:translate-x-0 md:w-1/4 md:block ${
          isopen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* this button is visible only on small/mobile screens */}
      <button
        className="md:hidden p-2 mb-4 bg-gray-700 rounded text-2xl"
        onClick={toggleSlidebar}
      >
        <IoIosCloseCircle />  
      </button>

      <div className="text-2xl font-semibold mb-6">Chatbot</div>

      <div className="mb-4">
        <button onClick={createchat} className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded">
           {createLod?<LoadingSpinner/>: "Create New Chat"}
        </button>
      </div>

      <div>
        <p className="text-lg text-gray-400 mb-2">Recent</p>

        <div className="max-h-[500px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar">

          {/* if the chats exsit then show chat */}
          {chats && chats.length > 0 ? (
            chats.map((e) => (
              <button
                key={e._id}
                className="w-full text-left py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded mt-2 flex justify-between items-center"
                onClick={() =>clickevent(e._id)}
              >
                {/* first 38 character of latest msg */}
                <span>{e.latestMessage.slice(0, 38)}...</span>
                <button
                  className="bg-red-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700"
                  onClick={() => deleteChatHandler(e._id)}
                >
                  <MdDelete />
                </button>
              </button>
            ))
          ) : (
            <p>No chats yet</p>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 mb-6 w-full">
        <button className="bg-red-600 text-white text-xl px-3 py-2 rounded-md" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
