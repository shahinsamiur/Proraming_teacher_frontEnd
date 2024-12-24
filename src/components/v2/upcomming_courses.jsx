import React from 'react'

export default function upcommingCourse() {
    return (
        <div className='w-[45%] h-[60%] flex flex-col items-center justify-center p-[1vw] gap-[5%] rounded-lg border-[0.02vw] border-[#2F2F2F] '>


            <div className='w-[30%] '>
                <img src='/icons/python-logo.png' alt='error' className='w-[100%]'/>
            </div>

            <div className='flex flex-col gap-[1vh]'>
                <h1 className='text-[1vw]'>Python basic Course</h1>
                <p className='text-[0.8vw]'>Lorem Ipsum is simply dummy text of the printing and typesetti......</p>
                <div className='w-full flex flex-row justify-between'>
                    <button className='bg-[#7456F1] h-[5vh] w-[40%] text-[1vw] rounded-lg'>Start Class</button>
                    <button className='bg-[#00BAFF] h-[5vh] w-[40%] text-[1vw] rounded-lg'>Learn More</button>
                </div>
            </div>





        </div>
    )
}
