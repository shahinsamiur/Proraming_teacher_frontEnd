import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import "./styles.css";

export default function Slider() {
  return (
    <>
      <Swiper className="mySwiper  w-[48vw] h-[full] flex flex-col justify-center items-center">
        <SwiperSlide className=" w-[50vw] h-[100vh] bg-slate-400">
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
    </>
  );
}
