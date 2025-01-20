import React from 'react'

export default function CardUpcomming({title,image}) {
  return (
    <div className='w-[13vw] h-[auto] p-[0.5vw] bg-[rgba(44,44,44,0.31)] flex flex-col gap-[1vh] items-center border-[0.1vw] border-[#2F2F2F]'>
            <img src={image} alt='error' className='h-[80%]'/>
        <h1 className=''>{title}</h1>
        <h2 className='text-[0.8vw] text-[#484848]'>Comming Soon</h2>

        {/* <button className='bg-[#008EFF] rounded-lg w-[80%]'>Start Class</button> */}
    </div>
  )
}
