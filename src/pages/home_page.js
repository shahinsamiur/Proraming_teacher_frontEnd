import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MyContext } from "../contextAPI"
import AlertComponents from "../components/alert/alert"
export default function HomePage() {
    const { alert, setAlert } = useContext(MyContext)
    const handleClick = () => {
        if (alert) setAlert(false)
        else setAlert(true)

    }

    return (
        <div className='w-full h-[100vh] flex flex-col justify-center items-center  gap-6'>Hello This is a Home Page
            <Link to="/editor">
                <button className='bg-blue-400 p-4 rounded-md'> go to editor</button>
            </Link>

            <button className='bg-blue-400 p-4 rounded-md' onClick={handleClick}>show alert</button>
            {alert === true ? <AlertComponents /> : null}
        </div>

    )
}
