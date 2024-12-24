import React from 'react'
import Course from './upcomming_courses';
import "../../App.css"


export default function DashboardRight() {
  return (
    <div className='w-1/2 bg-inherit p-[2vw] flex flex-col gap-[2vw]  h-full'>
      <div>
        <h1>Upcoming Courses</h1>
        <input type='text' placeholder='Search Now ' className='w-full rounded-3xl p-[0.5vw] px-[2vw] bg-[#151515] border-[0.2vw] border-[#2C2C2C] outline-none' />
      </div>

      <div className='flex-1 flex flex-wrap gap-4 overflow-auto no-scrollbar'>
        <Course />
        <Course />
        <Course />


      </div>




    </div>
  )
}
