import React, { useContext } from 'react'
import DropdownComponent from "./header_dropDown";
import { IoPlaySharp } from "react-icons/io5";
import { MyContext } from '../contextAPI';
import { useDispatch, useSelector } from 'react-redux';

export default function Nav() {

  const userData = useSelector((state) => state.UserInfo)
  const { socket,code} = useContext(MyContext)
  const onRun = () => {
    
    if(userData.re_request==="code")  socket.current.emit("check_code", { code });
    else    socket.current.emit("runCode", { code });

  
  }// function for sending code to backend 
  return (
    <div className='flex flex-row justify-center items-center gap-[5vw] pb-[1vh]'>
      <DropdownComponent />
      <button onClick={onRun} className='bg-[#242424] w-[3vw] h-[3vw] flex justify-center items-center rounded-full'>
        <IoPlaySharp />
      </button>
    </div>
  )
}
