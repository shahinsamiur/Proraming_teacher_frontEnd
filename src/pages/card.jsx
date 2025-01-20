import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { MyContext } from '../contextAPI'
export default function Card() {

  const { setisUserIterect } = useContext(MyContext);

  const handleInterection=({})=>{
    setisUserIterect(true)
}

  return (
    <div className='w-[13vw] h-[15vw] p-[0.5vw] bg-[rgba(44,44,44,0.31)] flex flex-col gap-[1vh] items-center border-[0.1vw] border-[#2F2F2F]'>
      <img src='/course_image/python.png' alt='error' className='h-[80%]' />
      <h1 className=''>Python Basic Course</h1>
      <Link onClick={handleInterection} to="/editor" className='bg-[#008EFF] flex justify-center items-center rounded-lg w-[80%]'>Start Class
      </Link>
    </div>
  )
}
