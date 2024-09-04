import React from 'react'
import Slider from './swiper'

import { VscCodeOss } from "react-icons/vsc";
import { LuYoutube } from "react-icons/lu";
import { TfiLayoutSliderAlt } from "react-icons/tfi";




export default function right_side() {
  return (
    <div className='w-[42vw] h-full border-2 gap-[1%] rounded-md flex flex-col items-center'>

      <div className='h-[90%] flex flex-col items-center'>
        <div className='w-full h-[3vw] flex justify-center items-center border-b-2  rounded-md mb-[1vw] font-Moderustic'>Presentation</div>
        <Slider />
        <p className=' text-center  text-[1vw] w-[80%] text-gray-500 mt-[2vh]'>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</p>

      </div>



      <div className='w-full h-[8%] border-t-2 flex fles=row justify-center gap-[20%] items-center'>
      <TfiLayoutSliderAlt className='text-[2vw] cursor-pointer text-black-500'/>
        <VscCodeOss  className='text-[2vw] cursor-pointer text-gray-500'/>
        <LuYoutube className='text-[2vw] cursor-pointer text-gray-500'/>
   
      </div>



    </div>
  )
}
