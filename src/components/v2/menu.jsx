import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import {useContext } from "react";
import { MyContext } from '../../contextAPI';

export default function Menu() {
    const {setting_open, set_setting_open, alert, setAlert}=useContext(MyContext)

    const handle_logout = () => {
        if(alert==="logout")setAlert(false)
            else setAlert("logout")
        
    }
    const handle_setting=()=>{
        if(setting_open) set_setting_open(false)
        else set_setting_open(true)
    }


    const handle_home=()=>{
        if(alert==="homeAlert") setAlert(false)
            else setAlert("homeAlert")
    }

    return (
        <div className="w-[2.42vw] h-[90vh] bg-[#151515] rounded-lg  py-[1.5vw]">
            <div className='w-full  h-[50%] flex items-center justify-start flex-col gap-[3vh]'>
                <div className="w-[1.5vw] h-[1.5vw] bg-gray-300   flex justify-center items-center overflow-hidden">
                    <img src='/icons/logo.svg' alt='logo' className='w-[100%]  h-[100%]' />
                </div>
                
                <IoHomeOutline className='w-[1.5vw] h-[1.5vw] text-[#08618e]  rounded-full cursor-pointer' 
                onClick={handle_home}
                />
                


                <CiSettings className='w-[2vw] h-[2vw] text-[#08618e]  rounded-full cursor-pointer' onClick={handle_setting}/>
            </div>



            <div className='w-full  h-[50%] flex items-center justify-end flex-col gap-[3vh]'>
                <div className='w-[1.5vw] h-[1.5vw] bg-gray-300  rounded-full cursor-pointer flex justify-center items-center'>
                    <CiUser className='text-gray-500' />
                </div>
                <MdLogout className='w-[1.5vw] h-[1.5vw] text-[#08618e]  rounded-full cursor-pointer' onClick={handle_logout}/>



            </div>


        </div>

    )
}
