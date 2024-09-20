import React, { useRef, useState, useEffect ,useContext} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MyContext } from "../contextAPI";
// Import Swiper styles
import "swiper/css";

export default function Slider() {
  const {Slides,setSlides}=useContext(MyContext)
  // const [slideIndex, setSlideIndex] = useState(1)
  const swiperRef = useRef(null); // useRef to reference Swiper instance
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(Slides); // Move to specific slide when slideIndex changes
    }
  }, [Slides]);


  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };


  // const handleTest=()=>{
  //   console.log(Slides)
  //   setSlides(Slides+1)
  // }




  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="flex gap-[2vh] flex-col items-center">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Save Swiper instance
        className="mySwiper w-[38vw] h-[full] border-2 flex flex-col justify-center items-center"
      >
        <SwiperSlide className="w-[40vw] h-[100vh] bg-slate-400">
          <img src="/output/s-01.jpg" alt="error" className="w-[full] h-[full]" />
        </SwiperSlide>

        <SwiperSlide className="w-[50vw] h-[50vh]">
          <img src="/output/s-02.jpg" alt="error" className="w-[full] h-[full]" />
        </SwiperSlide>

        <SwiperSlide className="w-[50vw] h-[50vh]">
          <img src="/output/s-03.jpg" alt="error" className="w-[full] h-[full]" />
        </SwiperSlide>

        <SwiperSlide className="w-[50vw] h-[50vh]">
          <img src="/output/s-04.jpg" alt="error" className="w-[full] h-[full]" />
        </SwiperSlide>
      </Swiper>

      <div className="w-[50%] rounded-lg h-[5vh] flex flex-row justify-center items-center border-2 gap-[30%]">
        <IoIosArrowBack
          className="text-[1.4vw] text-gray-400 cursor-pointer"
          onClick={handlePrevSlide} // Go to previous slide on click
        />
        <IoIosArrowForward
          className="text-[1.4vw] text-gray-400 cursor-pointer"
          onClick={handleNextSlide} // Go to next slide on click
        />

  
      </div>
    </div>
  );
}
