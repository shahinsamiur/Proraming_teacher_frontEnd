import React from 'react'
import { CgProfile } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import NameCard from './nameCard';
import Course from './course';


export default function DashboardLeft() {

    const data = [
        {
            "fild_name": "name",
            "value": "samiur shahin"
        },
        {
            "fild_name": "age",
            "value": "21"
        }, {
            "fild_name": "phone",
            "value": "01997063720"
        },
        {
            "fild_name": "ongoing courses",
            "value": "01997063720"
        },
        {
            "fild_name": "Languge",
            "value": "English"
        }, {
            "fild_name": "class hours",
            "value": "1.33 h"
        }, {
            "fild_name": "Payment Methods",
            "value": "Bikash"
        },
    ]







    return (
        <div className='w-1/2  h-full '>

            {/* user info section  */}
            <div className='w-full font-thin p-[1vw]  h-auto border-[0.2vw] border-[#2F2F2F]'>
                {/* header  */}
                <div className='w-full h-auto flex flex-row  justify-between'>
                    <div className='flex flex-row gap-[0.5vw] items-center justify-center'>
                        <CgProfile className='text-[2.5vw]  ' />
                        <h1 className='text-[1.2vw]'>samiur shahin</h1>
                    </div>
                    <FaEdit className='text-[1.5vw] text-[#0087FF] cursor-pointer' />
                </div>

                {/* infoes  */}
                {/* <div className="flex flex-wrap gap-4  p-4">
                {data.map((item, index) => (
                        <NameCard 
                            key={index} // Add a unique key here
                            fild_name={item.fild_name} 
                            value={item.value} 
                        />
                    ))}
                </div> */}









            </div>




            {/* enrolled courses  */}
            <div className='w-full h-2/4 p-[1vw] flex flex-col gap-[1vw]'>
                <div>
                    <h1>Enrolled Courses</h1>
                    <div className='w-full h-[0.2vw] bg-[#2F2F2F]'></div>

                </div>

                <Course />
            </div>




        </div>
    )
}
