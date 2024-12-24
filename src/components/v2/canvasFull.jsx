import { useState,useContext } from "react"
import React from 'react'
import { MyContext } from "../../contextAPI"
export default function CanvasFull() {

    const {ImageState}=useContext(MyContext)



  return (
    <div className='h-[82%] flex flex-col items-center justify-center'>
    <img src={ImageState} alt='error' className='w-[60%] h-full'/>
  </div>
  )
}
