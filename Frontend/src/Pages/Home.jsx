import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../Components/Header";

const Home=()=>{

  const[isopen,setIsopen]=useState(true)

  const toggleSlidebar=()=>{
    setIsopen(!isopen)
  }

  return(
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar isopen={isopen} toggleSlidebar={toggleSlidebar}/>

      <div className="flex flex-1 flex-col">
         <button onClick={toggleSlidebar} className="md:hidden p-4 bg-gray-800 text-2xl"><GiHamburgerMenu/></button>
         <div className="flex-1 p-6 mb-20 md:mb-0"><Header/></div>
         </div>
    </div>
  )

}

export default Home