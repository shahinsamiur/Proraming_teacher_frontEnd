import React,{useContext} from 'react'
import DropdownComponent from "./header_dropDown";
import { IoPlaySharp } from "react-icons/io5";
import { MyContext } from '../contextAPI';

export default function Nav() {
  const {code,socket}=useContext(MyContext) // getting value from context API
    const onRun = () => socket.current.emit("runCode", { code }); // function for sending code to backend 
    


  return (
    <div className='flex flex-row justify-center items-center gap-[5vw] pb-[1vh]'>
    <DropdownComponent />
    <button onClick={onRun} className='bg-[#242424] w-[3vw] h-[3vw] flex justify-center items-center rounded-full'>
      <IoPlaySharp />
    </button>
  </div>
  )
}
