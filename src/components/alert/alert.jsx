import React, { useContext } from 'react'
import { MyContext } from "../../contextAPI"
import { IoMdClose } from "react-icons/io";
export default function Alert() {

    const { alert, setAlert } = useContext(MyContext)
    const handleClick = () => {
        if (alert) setAlert(false)
        else setAlert(true)

    }

const closeAlert=()=>{setAlert(false)}


    return (
        <div className="bg-[rgba(21,21,21,0.69)] w-full right-0 z-50 absolute
                                 h-full flex justify-center 
                                 overflow-hidden 
                                 items-center "
        >


            <div className='bg-[rgba(21,21,21,1)] w-[57%]  z-50 
                                 h-[60%] flex flex-col justify-center 
                                 overflow-hidden 
                                 items-center text-white gap-[4vh] border-[0.2vw] border-[#2C2C2C]'>


                <div className='w-full px-[5%] h-[13%] flex items-end justify-end'>


                    <IoMdClose className='text-[2vw] cursor-pointer text-[#08618E]' onClick={closeAlert}/>
                </div>

                <div className='flex-1 flex flex-col gap-[10%] items-center justify-center'>
                    <h1 className='text-[2vw] '>  Are You Sure To Logout ?</h1>

                    <div className='flex flex-row gap-[2vw]'>
                        <button className='border-[0.2vw] border-[#2C2C2C] p-1 w-[8vw] h-[4vw] rounded-md hover:bg-[#08618E]' onClick={handleClick}>Logout</button>
                        <button className='border-[0.2vw] border-[#2C2C2C] p-1 w-[8vw] h-[4vw] rounded-md hover:bg-[#08618E]' onClick={handleClick}>Cancel</button>
                    </div>

                </div>




            </div>

        </div>
    )
}