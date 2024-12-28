import React from 'react'
import { Link } from 'react-router-dom'

export default function Course() {

    const Alert = () => {
        alert("this function is not availabe now ")
    }
    return (
        <div className='w-[45%] h-auto flex flex-col items-center justify-center p-[1vw] gap-[5%] rounded-lg border-[0.02vw] border-[#2F2F2F] '>


            <div className='w-[30%] '>
                <img src='/icons/python-logo.png' alt='error' className='w-[100%]' />
            </div>

            <div className='flex flex-col gap-[1vh]'>
                <h1 className='text-[1vw]'>Python basic Course</h1>
                <div className='w-full flex flex-row justify-between'>
                    <Link to="/editor" className='bg-[#7456F1] h-[5vh] w-[40%] text-[1vw] flex justify-center items-center rounded-lg'>Start Class
                    </Link>
                    <button className='bg-[#00BAFF] h-[5vh] w-[40%] text-[1vw] rounded-lg' onClick={Alert}>Learn More</button>
                </div>
            </div>





        </div>
    )
}
