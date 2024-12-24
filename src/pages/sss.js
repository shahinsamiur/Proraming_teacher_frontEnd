import React from 'react'
import { CiLogout } from "react-icons/ci";
import DashboardLeft from "../components/v2/dashboard_left"
import DashboardRight from "../components/v2/dashboard_right"
import { MyContext } from '../contextAPI';
import { useContext } from "react";
import AlertComponents from '../components/alert/alert';
import HomeAlertComponents from '../components/alert/homeAlert';

export default function Dash() {
  const { alert, setAlert } = useContext(MyContext);

  const handle_logout = () => {
    if (alert === "logout") setAlert(false)
    else setAlert("logout")

  }


  return (
    <div className='w-screen h-screen overflow-hidden bg-[#101010] text-white p-[1.5vw] flex flex-col'>
      {/* header  */}
      <div className=' w-full h-[8vh] flex flex-row justify-between'>


        <div className='w-auto   flex flex-row items-center justify-center'>
          <img src='/icons/dashboard_logo.svg' alt='error' className='w-[4vw]'
          />
          <h1 className='font-thin text-[#0087FF]'> NxtPie</h1>
        </div>


        <div className='w-auto   flex flex-row items-center justify-center gap-[1vw] cursor-pointer' onClick={handle_logout}>
          <h1 className='font-thin '>Logout</h1>

          <CiLogout className='text-[#0087FF] text-[2vw] ' />
        </div>


      </div>

      <div className='flex-1 flex flex-row overflow-hidden'>

        <DashboardLeft />
        <DashboardRight />
      </div>


      {alert === "logout" ? (
        <AlertComponents />
      ) : alert === "homeAlert" ? (
        <HomeAlertComponents />
      ) : null}

    </div>
  )
}
