import React,{useContext} from 'react'
import { FaLaptopCode } from "react-icons/fa";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { IoChatboxOutline } from "react-icons/io5";
import { MyContext } from '../../contextAPI';

export default function ExMenu() {

        const {simpleState, setsimpleState}=useContext(MyContext)
        const TrigerPPT = () => {
            setsimpleState("code")
          }
        
          const TrigerVideoPlayer = () => {
            setsimpleState("presentation")
          }
        
          const TrigerBrowser = () => {
            setsimpleState("inbox")
          }

    return (
        <div className='bg-[#151515] p-[0.3vw] border-[0.01vw] border-[#2f2f2f] w-[12vw] h-[5%] gap-[3vw] top-[86vh] right-[44vw] rounded-md absolute z-50 flex items-center justify-center'
        >
            <FaLaptopCode className={`text-[2vw] cursor-pointer ${
                            simpleState === "code" ? "text-[#31b8d6]" : "text-[#08618e]"
                        }`}
                        onClick={TrigerPPT}
                        
                        
                        />
            <TfiLayoutSliderAlt className={`text-[2vw] cursor-pointer ${
                            simpleState === "presentation" ? "text-[#31b8d6]" : "text-[#08618e]"
                        }`}
                        onClick={TrigerVideoPlayer}
                        
                        />
            <IoChatboxOutline className={`text-[2vw] cursor-pointer ${
                            simpleState === "inbox" ? "text-[#31b8d6]" : "text-[#08618e]"
                        }`}
                        
                        
                        onClick={TrigerBrowser}
                        />
        </div>
    )
}
