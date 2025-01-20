import React, { useContext } from 'react'
import { MyContext } from '../contextAPI'
export default function Canvas() {
const {ImageState}=useContext(MyContext)


  return (
    <div className='h-[82%] flex flex-col items-center justify-center'>
      <img src={ImageState} alt='error' className='w-full h-full'/>
    </div>
  )
}
