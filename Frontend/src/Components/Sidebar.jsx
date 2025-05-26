
import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

const Sidebar = ({ isopen, toggleSlidebar }) => {
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
        <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded">
          New Chat
        </button>
      </div>

      <div>
        <p className="text-lg text-gray-400 mb-2">Recent</p>

        <div className="max-h-[500px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar">
          {/* Static chat history buttons */}
          <button className="w-full text-left py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded mt-2 flex justify-center items-center">
            Hello how are you
         </button>

        </div>
      </div>
      <div className="absolute bottom-0 mb-6 w-full"><button className="bg-red-600 text-white text-xl px-3 py-2 rounded-md">Logout</button></div>
    </div>
  );
};

export default Sidebar;
