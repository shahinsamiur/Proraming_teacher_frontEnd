import React from 'react'
import { IoMdPlay } from "react-icons/io";
import ToggleButton from '../toggle';
import Speaking from "../animation_compo/speacking"
import Lisnting from "../animation_compo/listen"
import Thinking from "../animation_compo/thinking"
import { MyContext } from '../../contextAPI';
import { useContext } from 'react';
import {  useSelector } from 'react-redux';
export default function Header() {
    const userData = useSelector((state) => state.UserInfo)
    const { botStatus ,socket, code,timeoutidC,} = useContext(MyContext);
    const onRun = () => { 
        if (timeoutidC) clearTimeout(timeoutidC); // Clear previous timeout if any
        
        socket.current.emit("runCode", { code, userData}); }// function for sending code to backend 

    return (
        <div className="flex flex-row gap-[29%] font-thin ">
            {/* logo */}
            <div className="font-thin text-[2vw] flex flex-row gap-[0.1vw] ">
                <span className=''>Lily</span>
                <span className='text-[0.9vw]  flex flex-row justify-center items-end tracking-[0.15vw] font-extralight'>{botStatus} </span>
                <div className='flex flex-row justify-center items-end'>

                    {botStatus==="speacking"?<Speaking />:<Lisnting />}
                    
                </div>



            </div>
            {/* speack think and listening animation */}

            {/* middle languge's logo and code run button  */}
            <div className='flex flex-row   justify-center items-center  '>


                <div className='flex flex-row items-center justify-center gap-[1.5vw] w-[15vw] '>
                    <img src="/icons/python-logo.png" alt="error" className='w-[2vw] h-[2.4vw] ' />
                    <p>Python 3.12.4</p>
                </div>


                <div onClick={onRun} className='w-[2vw] h-[2vw] flex flex-row justify-center cursor-pointer items-center rounded-full '>
                    <IoMdPlay className='text-gray-300' />
                </div>


            </div>


            {/* network streanth indicator */}
            <ToggleButton />

            {/* Additional UI elements */}









        </div>

    )
}
