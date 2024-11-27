import React from 'react';
import "../../css/listen.css"
const Saving = () => {
  return (
    <div className=" flex flex-row w-[2vw] h-[0.5vw] items-center justify-center  gap-[0.4vw] overflow-hidden">
      <span className=" w-[0.2vw] h-[0.2vw] bg-white animate-blink">.</span>
      <span className=" w-[0.2vw] h-[0.2vw] bg-white animate-blink two_point">.</span>
      <span className=" w-[0.2vw] h-[0.2vw] bg-white animate-blink three_point">.</span>
    </div>
  );
};

export default Saving;
