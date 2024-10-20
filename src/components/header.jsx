import React, { useContext } from 'react'
import { IoMdPlay } from "react-icons/io";
import { MyContext } from '../contextAPI';
import {  useSelector } from 'react-redux';









export default function Header() {

    const userData = useSelector((state) => state.UserInfo)



    const { socket, code,timeoutidC } = useContext(MyContext)
    const onRun = () => { 
        if (timeoutidC) clearTimeout(timeoutidC); // Clear previous timeout if any
        
        socket.current.emit("runCode", { code, userData}); }// function for sending code to backend 







    return (
        <div className='flex flex-row  w-full h-[5vw] '>
            <img src='/icons/logo.svg' alt='logo' className='w-[5vw]' />





            <div className='flex flex-row ml-[24vw] gap-[2vw] justify-center items-center w-[30vw] '>


                <div className='flex flex-row items-center justify-center gap-[0.5vw]'>
                    <img src="/icons/python-logo.png" alt="error" className='w-[2vw] h-[2.4vw] ' />
                    <p>Python 3.12.4</p>
                </div>


                <div onClick={onRun} className='w-[3vw] h-[3vw] flex flex-row justify-center cursor-pointer items-center rounded-full border-2'>
                    <IoMdPlay className='text-gray-600' />
                </div>


            </div>





            {/* <div className='flex flex-row justify-center items-center ml-[20vw]  w-[15vw] h-[8vw]'>
                <div className='w-[2vw] h-[2vw] text-[0.8vw] bg-red-400 rounded-full flex flex-row justify-center items-center'>
                    Lisning
                </div>
                <p>Meheroon</p>
            </div> */}


        </div>
    )
}
