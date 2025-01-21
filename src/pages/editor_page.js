import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MyContext } from '../contextAPI';
import io from 'socket.io-client';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDispatch, useSelector } from 'react-redux';
import { SetOutput } from "../reduxSlices/check";
import { socket_connect_function } from '../components/socket_functions/socket_connect';
import { updateData } from '../components/socket_functions/update_data';
import { audio_chunk } from '../components/socket_functions/audio_chunk';
import "../App.css";
import Menu from '../components/menu';
import Header from '../components/header';
import CodeSpace from '../components/code_space';
import CodeSpace2 from '../components/CodeSpace2';
import EXMenu from '../components/exMenu';
import PresentationFull from '../components/presentationFull';
import SettingCom from '../components/setting_com';
import AlertComponents from '../components/alert/alert';
import HomeAlertComponents from '../components/alert/homeAlert';
import CanvasFull from '../components/canvasFull';
import InboxFull from '../components/inbox_full';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BsEmojiTear } from "react-icons/bs";







const EditorPage = () => {
  const userData = useSelector((state) => state.UserInfo);
  const [ChangeSlide, setChangeSlide] = useState(null);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const { socket, socket_handler, Slides, setSlides, setTimeOutIdC,setsimpleState, isUserIterect, setbotStatus, isToggled,setIsToggled, simpleState, setting_open,set_setting_open, alert } = useContext(MyContext);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const [timeoutid, setTimeOutId] = useState(null);
  const [newTimeoutId_trans, setnewTimeoutId_trans] = useState(null);
  var updateDataTemp = useRef(null);
  const isListeningRef = useRef(false);
  const playing_audio_Ref = useRef(false);
  const free_to_request = useRef(false);
  const cookie = useRef(false);



  const navigate = useNavigate()

  useLayoutEffect(() => {
    const checkCookie = async () => {
      try {
        // Check if the cookie exists
         cookie.current =  Cookies.get("user");
        if (cookie.current !== undefined) {
          // Send the cookie to the backend for validation
          const response = await axios.post("https://nextpie-app-nodejs-server.vercel.app/checkcookie", { "cookie": cookie.current });

          // Handle invalid cookie
          if (response.status === 404) {
            Cookies.remove("user"); // Remove the invalid cookie
            navigate("/signin"); // Redirect to sign-in page
          }
        } else {
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



  useEffect(() => {
    if (!isUserIterect) navigate("/")
  }, [])
  useEffect(() => {
    const handleRequest = async () => {
      if (userData.await === true) {
        free_to_request.current = false
        await new Promise((resolve) => setTimeout(resolve, 4000)); // 4-second delay
      }

      if (userData.extra_explain) {
        socket.current.emit("extra_explain", { userData, Slides });
        free_to_request.current = false
      }

      if (userData.re_request === true) {
        if (ChangeSlide) {
          setSlides(Slides + 1);
          setChangeSlide(false);
        }


        if (userData.current_program === "after_class_question") {
          const newTimeoutId = setTimeout(() => {
            socket.current.emit("after_class_question", { userData, transcript });
          }, 2000);
          setTimeOutId(newTimeoutId);
        }
        if(userData.current_program === "intro_question"&& userData.current_program_count===1) set_setting_open(true)
          if(userData.current_program === "intro_question"&& userData.current_program_count===2) set_setting_open(false)
        if(userData.current_program === "intro_question"&& userData.current_program_count===5) setIsToggled(true)
          if(userData.current_program === "intro_question"&& userData.current_program_count===6) setsimpleState("code")
        if(userData.current_program === "intro_question"&& userData.current_program_count===6) setsimpleState("presentation")
        if(userData.current_program === "intro_question"&& userData.current_program_count===7) setsimpleState("canvas")
        if(userData.current_program === "intro_question"&& userData.current_program_count===8) setsimpleState("inbox")
        if(userData.current_program === "agenda"){
          setsimpleState("code")
          setIsToggled(false)
        }
        
          socket.current.emit("reciving_the_anwser", { userData, transcript });
      } else if (userData.re_request === "stop_user_query") {
        socket.current.emit("stop_user_query", { userData, transcript });
        free_to_request.current = false
      } else if (userData.re_request === "ask_querys") {
        const newTimeoutId = setTimeout(() => {
          socket.current.emit("ask_querys", { userData, transcript });
          free_to_request.current = false

        }, 3000);
      } else if (userData.re_request === "ask_querys_waiting") {
        const newTimeoutId = setTimeout(() => {
          if (transcript.length > 1) {

            socket.current.emit("ask_querys_waiting", { userData, transcript, Slides });
            free_to_request.current = false

          } else {
            socket.current.emit("user_no_response", { userData });
            free_to_request.current = false

          }

        }, 3000);
        setTimeOutId(newTimeoutId);
      } else if (userData.re_request === "Finished_the_class") {
        socket.current.emit("Finished_the_class", { userData, transcript });

      }
      if (timeoutid) clearTimeout(timeoutid);

      if (userData.current_program === "waiting_for_wish_response" && isListeningRef.current) {
        const newTimeoutId = setTimeout(() => {
          socket.current.emit("reciving_the_anwser", { userData, transcript: transcript });
          free_to_request.current = false
        }, 3000);
        setTimeOutId(newTimeoutId);
      } else if (userData.current_program === "intro_question" && isListeningRef.current) {
        const newTimeoutId = setTimeout(() => {
          socket.current.emit("reciving_the_anwser", { userData, transcript });
          free_to_request.current = false
        }, 3000);
        setTimeOutId(newTimeoutId);
      } else if (userData.current_program === "intro_question_anwser_waiting" && isListeningRef.current) {
        const newTimeoutId = setTimeout(() => {
          free_to_request.current = false
          if (transcript && transcript.length > 2) {
            socket.current.emit("reciving_the_anwser", { userData, transcript });
          } else {
            socket.current.emit("user_no_response", userData);
          }
        }, 3000);
        setTimeOutId(newTimeoutId);
      } else if (userData.current_program === "after_class_question_waiting") {
        const newTimeoutId = setTimeout(() => {
          free_to_request.current = false
          socket.current.emit("after_class_question_recived", { userData, transcript });
        }, 3000);
        setTimeOutId(newTimeoutId);
      } else if (userData.current_program === "feedBack") {
        const newTimeoutId = setTimeout(() => {
          socket.current.emit("feedBack", { userData, transcript });
        }, 3000);
        setTimeOutId(newTimeoutId);
      }

      if (userData.re_request === "code") {
        if (newTimeoutId_trans) clearTimeout(newTimeoutId_trans);
        setnewTimeoutId_trans(setTimeout(() => {
          if (transcript && transcript.length > 10) {
            alert("transcript code has ");
            resetTranscript();
          } else {
            resetTranscript();
          }
        }, 3000));

        const newTimeoutId = setTimeout(() => {

          socket.current.emit("code_no_response", { userData, transcript });
        }, 7000);
        setTimeOutIdC(newTimeoutId);
      }
    };

    handleRequest();

  }, [userData, transcript]);





  useEffect(() => {
    if (playing_audio_Ref.current === true) setbotStatus("speacking");
    else setbotStatus("listening");
  }, [playing_audio_Ref.current]);



  // https://programing-teacher-backend.onrender.com
  // http://localhost:5000
  useEffect(() => {
    if (!socket.current) {
      socket.current = io("https://programing-teacher-backend.onrender.com");
      socket.current.on("connect", () => socket_connect_function(SpeechRecognition, socket, userData,cookie.current));

      socket.current.on("updateData", async (data) => {
        if (data === "slides") {
          setChangeSlide(true);
          free_to_request.current = true
        }
        if (data.imidiate === true) {
          let data_temp = data;
          data_temp.imidiate = false;
          updateData(data_temp, dispatch);
        } else if (updateDataTemp.current === null && data !== "slides") {
          updateDataTemp.current = data;
        }
        free_to_request.current = true
      });

      socket.current.on("runCodeResult", (data) => {
        dispatch(SetOutput({ type: "result", value: data.output }));
      });

      socket.current.on("audio_chunk", async (chunk) => {
        isListeningRef.current = false;
        if (playing_audio_Ref.current === false) {
          playing_audio_Ref.current = true;
          setbotStatus("speacking");
          await audio_chunk(chunk, resetTranscript, audioRef, () => {
            if (ChangeSlide) {

              setSlides(Slides + 1);
              setChangeSlide(false);
            }
            isListeningRef.current = true;
            if (updateDataTemp.current !== null) {
              updateData(updateDataTemp.current, dispatch);
            }
            updateDataTemp.current = null;
            resetTranscript();
            setbotStatus("listening");
            playing_audio_Ref.current = false;
          });
        }


      });

      socket.current.on("disconnect", () => {
      });
    }

    socket.current.on("Imidiate_change_slide", () => {
      setSlides((prevSlides) => prevSlides + 1);
      setChangeSlide(false);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [dispatch, socket, socket_handler]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (


    <>


      <div
        className="bg-[#101010] w-full hidden
                         h-screen lg:flex justify-center 
                         overflow-hidden p-1 gap-[1vw] 
                         items-center text-white"
      >
        <Menu />
        <div className="w-[90vw] h-[90vh] bg-[#151515] rounded-lg p-[1.5vw] flex flex-col gap-[1vw]">
          <Header />
          {isToggled && simpleState === "code" ? (
            <CodeSpace2 />
          ) : isToggled && simpleState === "presentation" ? (
            <PresentationFull />
          ) : isToggled && simpleState === "canvas" ? (
            <CanvasFull />
          ) : isToggled && simpleState === "inbox" ? (
            <InboxFull />
          ) : <CodeSpace />}
          {isToggled ? <EXMenu /> : null}
        </div>
        {setting_open ? <SettingCom /> : null}
        {alert === "logout" ? (
          <AlertComponents />
        ) : alert === "homeAlert" ? (
          <HomeAlertComponents />
        ) : null}
      </div>

      <div className='bg-[#101010] flex flex-col gap-[5vh] justify-center w-screen h-screen  items-center lg:hidden'>

        <BsEmojiTear className='text-[15vw] text-white/70' />
        <h1 className='text-center w-[70%] text-white/70 text-[4vw]'>We are really sorry, currently, we are available for computers only</h1>

      </div>



    </>
  );
};

export default EditorPage;
