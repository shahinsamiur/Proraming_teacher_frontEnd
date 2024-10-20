import React from 'react'
import Slider from '../swiper'
export default function Presentation() {
  return (
    <div className='h-[90%] flex flex-col items-center'>
      <div className='w-full h-[3vw] flex justify-center items-center border-b-2  rounded-md mb-[1vw] font-Moderustic'>Presentation</div>
      <Slider />
      <p className=' text-center  text-[1vw] w-[80%] text-gray-500 mt-[2vh]'>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</p>
    </div>
  )
}
