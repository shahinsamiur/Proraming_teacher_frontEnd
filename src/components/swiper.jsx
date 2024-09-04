import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack } from "react-icons/io"; 
import { IoIosArrowForward } from "react-icons/io";
// Import Swiper styles
import "swiper/css";

// import "./styles.css";

export default function Slider() {
  return (
    <div className="flex gap-[2vh] flex-col items-center">
      <Swiper className="mySwiper  w-[38vw] h-[full] border-2 flex flex-col justify-center items-center ">
        <SwiperSlide className=" w-[40vw] h-[100vh] bg-slate-400">
          <img src="/output/s-01.jpg" alt="error" 
        className="w-[full] h-[full]"/>
        </SwiperSlide>
      

        <SwiperSlide className=" w-[50vw] h-[50vh]">
          <img src="/output/s-02.jpg" alt="error" 
        className="w-[full] h-[full]"/>
        </SwiperSlide>
      



        <SwiperSlide className=" w-[50vw] h-[50vh]">
          <img src="/output/s-03.jpg" alt="error" 
        className="w-[full] h-[full]"/>
        </SwiperSlide>
      

        <SwiperSlide className=" w-[50vw] h-[50vh]">
          <img src="/output/s-04.jpg" alt="error" 
        className="w-[full] h-[full]"/>
        </SwiperSlide>
      



      </Swiper>

      <div className=" w-[50%] rounded-lg h-[5vh] flex flex-row justify-center items-center border-2 gap-[60%]">
      <IoIosArrowBack className="text-[1.4vw] text-gray-400 cursor-pointer"/>
        <IoIosArrowForward className="text-[1.4vw] text-gray-400 cursor-pointer"/>
      </div>





    </div>
  );
}
