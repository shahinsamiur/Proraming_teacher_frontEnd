import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div className='w-full h-[100vh] flex flex-col justify-center items-center  gap-6'>Hello This is a Home Page
            <Link to="/editor">
                <button className='bg-blue-400 p-4 rounded-md'> go to editor</button>
            </Link>



        </div>

    )
}
