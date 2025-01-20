import React, { useEffect } from 'react'
import { CiLogout } from "react-icons/ci";

import { MyContext } from '../contextAPI';
import { useContext } from "react";
import AlertComponents from '../components/alert/alert';
import HomeAlertComponents from '../components/alert/homeAlert';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { update_User_data } from "../reduxSlices/userInfo"
import { useDispatch,useSelector } from 'react-redux';
import { getTime } from "../components/functions/Get_time";
import { BsEmojiTear } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import Card from './card';
import CardUpcomming from './Card_upComing';
export default function Dash() {

  const Upcomming_courses = [
    {
      title: "php Basic Course",
      image: "/course_image/php.webp"
    },
    {
      title: "Java Basic Course",
      image: "/course_image/java.jpg"
    }, {
      title: "C Basic Course",
      image: "/course_image/C.webp"
    }, {
      title: "C++ Basic Course",
      image: "/course_image/C++.png"
    },
    {
      title: "JavaScript Basic",
      image: "/course_image/javascript.webp"
    },
  ]

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userInfo);
  console.log(data)
  useEffect(() => {
    const checkCookie = async () => {
      try {
        // Check if the cookie exists
        const cookie = Cookies.get("user");
        if (cookie !== undefined) {
          // Send the cookie to the backend for validation
          const response = await axios.post("https://nextpie-app-nodejs-server.vercel.app/checkcookie", { "cookie": cookie });
          var date = getTime()
          // Handle invalid cookie
          if (response.status === 200) {
            response.data.date = date
            dispatch(update_User_data(response.data))
          }
        } else {
          Cookies.remove("user"); // Remove the invalid cookie
          // Redirect to sign-in if cookie is not present
          navigate("/signin");
        }
      } catch (error) {
        navigate("/signin"); // Redirect in case of an error
      }
    };

    // Call the async function
    checkCookie();
  }, [navigate]);








  const { alert, setAlert } = useContext(MyContext);


  const handle_logout = () => {
    if (alert === "logout") setAlert(false)
    else setAlert("logout")

  }


  return (
    <>


      <div className='w-screen h-screen overflow-hidden no-scrollbar bg-[#101010] text-white p-[1.5vw] hidden lg:flex flex-col'>
        {/* header */}
        <div className='w-full h-[8vh] flex flex-row justify-between'>
          <div className='w-auto flex flex-row items-center justify-center'>
            <img src='/icons/dashboard_logo.svg' alt='error' className='w-[4vw]' />
            <h1 className='font-thin text-[#0087FF]'> NxtPie</h1>
          </div>

          <div className='w-auto flex flex-row items-center justify-center gap-[1vw] cursor-pointer' onClick={handle_logout}>
            <h1 className='font-thin'>Logout</h1>
            <CiLogout className='text-[#0087FF] text-[2vw]' />
          </div>
        </div>



        {/* dashboard */}

        <div className='flex-1 flex flex-row overflow-hidden  border-[#2F2F2F]'>
          <div className='w-[10%] h-full flex flex-col border-r-[0.1vw] justify-between items-center py-[5vh] border-[#2F2F2F] '>
            <div className=" flex flex-col items-center">
              <FaRegCircleUser className='text-[#2F2F2F] text-[3vw] font-thin' />
              <h1 className='font-thin'>{data.Name}</h1>
            </div>
            <div className='w-auto flex flex-row items-center justify-center gap-[1vw] cursor-pointer' onClick={handle_logout}>
              <h1 className='font-thin'>Logout</h1>
              <CiLogout className='text-[#0087FF] text-[2vw]' />
            </div>
          </div>

          <div className='w-[90%] pl-[2vw] h-full flex flex-col gap-[1vh]'>
            <div className='w-full h-1/2 '>
              <h1 className='text-[1.2vw] text-[#484848]'>Availeable Courses</h1>
              <Card />
            </div>



            <div className='w-full h-1/2 '>
              <h1 className='text-[1.2vw] text-[#484848]'>Upcomming Courses</h1>
              <div className='w-full gap-[2vw] flex flex-row'>
                {Upcomming_courses.map((data) => {
                  return <CardUpcomming title={data.title} image={data.image} />;
                })}

              </div>

            </div>
          </div>


        </div>


        {/* alert components */}
        {alert === "logout" ? (
          <AlertComponents />
        ) : alert === "homeAlert" ? (
          <HomeAlertComponents />
        ) : null}
      </div>



      {/* this is for mobile screen  */}
      <div className='bg-[#101010] flex flex-col gap-[5vh] justify-center w-screen h-screen  items-center lg:hidden'>

        <BsEmojiTear className='text-[15vw] text-white/70' />
        <h1 className='text-center w-[70%] text-white/70 text-[4vw]'>We are really sorry, currently, we are available for computers only</h1>

      </div>
    </>
  )
}
