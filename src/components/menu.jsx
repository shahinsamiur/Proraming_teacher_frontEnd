import React from 'react'
import { GoHome } from "react-icons/go";

import { VscCodeOss } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";









export default function menu() {
  
  

  
  
  return (
    <div className='w-[3vw] h-[full] bg-[#151515] rounded-md ' >

      <div className='w-full h-[90%]  flex flex-col  items-center py-[4vh] gap-[6vh]'>
        <GoHome className='text-[2vw] text-gray-400 cursor-pointer' />
        <VscCodeOss className='text-[2vw] text-black-700 cursor-pointer' />
      </div>

      <div className='w-full h-[10%]  flex flex-col  items-center'>
        <MdLogout className='text-[2vw] text-gray-400 cursor-pointer' />
      </div>


    </div>
  )
}
