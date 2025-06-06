import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../Components/Header";
import { chatdata } from "../context/Chatcontext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../Components/Loading";
import { IoMdSend } from "react-icons/io";

const Home = () => {
  const [isopen, setIsopen] = useState(true);

  const toggleSlidebar = () => {
    setIsopen(!isopen);
  };

  
  const { fetchresponse, messages, prompt, setPrompt, newrequestloading,loading,chats} = chatdata();
  // Reference to the message container for scrolling
  // This will ensure that the chat scrolls to the bottom when new messages are added
  const messagecontainerRef=useRef()
  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior:'smooth'
      });
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isopen={isopen} toggleSlidebar={toggleSlidebar} />

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        {/* Hamburger menu for small screens */}
        <button
          onClick={toggleSlidebar}
          className="md:hidden p-4 bg-gray-800 text-2xl"
        >
          <GiHamburgerMenu />
        </button>

        {/* Header and Chat Section */}
        <div className="flex-1 p-6 mb-20 md:mb-0">
          <Header />

        {
  loading ? (
    <LoadingBig />
  ) : (

    // it iss used for the scrolling of the data
    <div className="flex-1 p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar" ref={messagecontainerRef}>
      {messages && messages.length > 0 ? (
        messages.map((e, i) => (
          <div key={i}>
            {/* User message */}
            <div className="mb-4 p-4 rounded bg-blue-700 text-white flex items-start gap-2">
              <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                <CgProfile />
              </div>
              <div>{e.question}</div>
            </div>

            {/* Bot response */}
            <div className="mb-4 p-4 rounded bg-gray-700 text-white flex items-start gap-2">
              <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                <FaRobot />
              </div>
              <p dangerouslySetInnerHTML={{ __html: e.answer }}></p>
            </div>
          </div>
        ))
      ) : (
        <p>No chat yet</p>
      )}

      {newrequestloading && <LoadingSmall />}
    </div>
  )
}

        </div>
      </div>

      {/* Prompt Input Section */}
      {
        chats && chats.length===0? "" :<div className="fixed bottom-0 right-0 left-auto p-4 bg-gray-900 w-full md:w-[75%]">
        <form
          className="flex items-center justify-between bg-gray-800 rounded"
          onSubmit={(e) => {
            e.preventDefault();
            fetchresponse();
          }}
        >
          <input
            type="text"
            placeholder="Enter the Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            className="flex-grow p-3 bg-gray-700 text-white rounded-l outline-none"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white text-2xl rounded-r"
          >
            <IoMdSend />
          </button>
        </form>
      </div>
      }
    </div>
  );
};

export default Home;
