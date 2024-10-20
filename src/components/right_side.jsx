import React from 'react'
import Presentation from './right_side_components/presentation';
import Video_player from './right_side_components/video_player';
import Browser from './right_side_components/browser';


import { VscCodeOss } from "react-icons/vsc";
import { LuYoutube } from "react-icons/lu";
import { TfiLayoutSliderAlt } from "react-icons/tfi";

import { useDispatch, useSelector } from 'react-redux';
import { set_right_side_state } from "../reduxSlices/check";

export default function Right_side() {
  const Right_side_state = useSelector((state) => state.Check.Right_side_state)
  const dispatch = useDispatch()
  const TrigerPPT = () => {
    dispatch(set_right_side_state("presentation"))
  }

  const TrigerVideoPlayer = () => {
    dispatch(set_right_side_state("VidePlayer"))
  }

  const TrigerBrowser = () => {
    dispatch(set_right_side_state("Browser"))
  }

  return (
    <div className='w-[42vw] h-full border-2 gap-[1%] rounded-md flex flex-col items-center'>


      {Right_side_state === "presentation" ? <Presentation /> : Right_side_state === "VidePlayer" ? <Video_player /> : <Browser />}




      <div className='w-full h-[8%] border-t-2 flex fles=row justify-center gap-[20%] items-center'>
        <TfiLayoutSliderAlt className='text-[2vw] cursor-pointer text-black-500' onClick={TrigerPPT} />
        <LuYoutube className='text-[2vw] cursor-pointer text-gray-500' onClick={TrigerVideoPlayer} />
        <VscCodeOss className='text-[2vw] cursor-pointer text-gray-500' onClick={TrigerBrowser} />

      </div>

    </div>
  )
}
