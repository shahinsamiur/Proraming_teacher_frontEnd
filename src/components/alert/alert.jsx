import React,{useContext} from 'react'
import { MyContext } from "../../contextAPI"
export default function Alert() {

    const { alert, setAlert } = useContext(MyContext)
    const handleClick = () => {
        if(alert)setAlert(false)
            else setAlert(true)
        
    }
    return (
        <div className="bg-[rgba(21,21,21,0.69)] w-full right-0 z-50 absolute
                                 h-full flex justify-center 
                                 overflow-hidden 
                                 items-center "
        >


            <div className='bg-[rgba(21,21,21,1)] w-[70%]  z-50 
                                 h-[60%] flex flex-col justify-center 
                                 overflow-hidden 
                                 items-center text-white gap-[4vh]'>

                <h1 className='text-[2vw]'>  are you sure to logout ?</h1>

                <div className='flex flex-row gap-[2vw]'>
                <button className='bg-gray-400 p-1 w-[8vw] h-[4vw] rounded-md hover:bg-red-500' onClick={handleClick}>Logout</button>
                <button className='bg-gray-400 p-1 w-[8vw] h-[4vw] rounded-md hover:bg-red-500' onClick={handleClick}>Cencle</button>
                </div>
        
            </div>

        </div>
    )
}
