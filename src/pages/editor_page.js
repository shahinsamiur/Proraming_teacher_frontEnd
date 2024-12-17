import React, { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from '../contextAPI';
import io from 'socket.io-client';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useDispatch, useSelector } from 'react-redux';
import { SetOutput } from "../reduxSlices/check";
import { socket_connect_function } from '../components/socket_functions/socket_connect';
import { updateData } from '../components/socket_functions/update_data';
import { audio_chunk } from '../components/socket_functions/audio_chunk';
import "../App.css";
import Menu from '../components/v2/menu';
import Header from '../components/v2/header';
import CodeSpace from '../components/v2/code_space';
import CodeSpace2 from '../components/v2/CodeSpace2';
import EXMenu from '../components/v2/exMenu';
import PresentationFull from '../components/v2/presentationFull';
import SettingCom from '../components/setting_com';


const EditorPage = () => {
  const userData = useSelector((state) => state.UserInfo);
  const [ChangeSlide, setChangeSlide] = useState(null);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const { socket, socket_handler, Slides, setSlides, setTimeOutIdC, setbotStatus, isToggled, simpleState, setting_open } = useContext(MyContext);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const [timeoutid, setTimeOutId] = useState(null);
  const [newTimeoutId_trans, setnewTimeoutId_trans] = useState(null);
  var updateDataTemp = useRef(null);
  const isListeningRef = useRef(false);
  const playing_audio_Ref = useRef(false);


  useEffect(() => {
    console.log("hello")

  }, [isToggled])









  useEffect(() => {
    const handleRequest = async () => {

      if (userData.await === true) {
        await new Promise((resolve) => setTimeout(resolve, 4000)); // 4-second delay
      }

      if (userData.re_request === true) {
        if (ChangeSlide) {
          console.log("slide changed");
          setSlides(Slides + 1);
          setChangeSlide(false);
        }
        if (userData.current_program === "after_class_question") {
          socket.current.emit("after_class_question", { userData });

        }


        socket.current.emit("reciving_the_anwser", { userData, transcript });
      } else if (userData.re_request === "stop_user_query") {
        console.log("hit stop query ")
        socket.current.emit("stop_user_query", { userData, transcript });
      } else if (userData.re_request === "ask_querys_waiting") {
        // const newTimeoutId = setTimeout(() => {
        //   socket.current.emit("ask_querys_waiting", { userData, transcript });
        //   console.log("ask_querys_waiting:");
        // }, 5000);

      }

      console.log("this is transcript:", transcript);
      if (timeoutid) clearTimeout(timeoutid);

      if (userData.current_program === "waiting_for_wish_response" && isListeningRef.current) {
        const newTimeoutId = setTimeout(() => {
          socket.current.emit("reciving_the_anwser", { userData, transcript: transcript });
          console.log("waiting_for_wish_response:");
        }, 5000);
        setTimeOutId(newTimeoutId);
      }


      else if (userData.current_program === "intro_question" && isListeningRef.current) {
        const newTimeoutId = setTimeout(() => {
          console.log("intro_question:");
          socket.current.emit("reciving_the_anwser", { userData, transcript });
        }, 5000);
        setTimeOutId(newTimeoutId);
      }



      else if (userData.current_program === "intro_question_anwser_waiting" && isListeningRef.current) {
        console.log("intro_question_anwser_waiting");
        const newTimeoutId = setTimeout(() => {
          if (transcript && transcript.length > 2) {
            socket.current.emit("reciving_the_anwser", { userData, transcript });
          } else {
            socket.current.emit("user_no_response", userData);
          }
        }, 5000);
        setTimeOutId(newTimeoutId);
      }


      else if (userData.current_program === "after_class_question_waiting") {
        const newTimeoutId = setTimeout(() => {
          socket.current.emit("after_class_question_recived", { userData, transcript: "good morning" });
          console.log("after_class_question_waiting:");
        }, 5000);
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

        console.log("code no response");
        const newTimeoutId = setTimeout(() => {
          console.log("code no response");
          socket.current.emit("code_no_response", { userData, transcript });
        }, 30000);
        setTimeOutIdC(newTimeoutId);
      }
    };
    handleRequest();
  }, [userData, transcript]);

  useEffect(() => {
    console.log("this is bot status :", playing_audio_Ref.current)
    if (playing_audio_Ref.current === true) setbotStatus("speacking")
    else setbotStatus("listening")
  }, [])




  useEffect(() => {
    if (!socket.current) {
      socket.current = io('http://localhost:5000');
      socket.current.on('connect', () => socket_connect_function(SpeechRecognition, socket, isListeningRef, userData));

      socket.current.on("updateData", async (data) => {
        if (data === "slides") {
          console.log("slides data got");
          setChangeSlide(true);
        }
        if (data.imidiate === true) {
          let data_temp = data;
          data_temp.imidiate = false;
          updateData(data_temp, dispatch);
        } else if (updateDataTemp.current === null && data !== "slides") {
          updateDataTemp.current = data;
        }
      });

      socket.current.on("runCodeResult", (data) => {
        dispatch(SetOutput({ type: "result", value: data.output }));
      });

      socket.current.on('audio_chunk', async (chunk) => {
        isListeningRef.current = false;
        if (playing_audio_Ref.current === false) {
          playing_audio_Ref.current = true;
          setbotStatus("speacking")
          await audio_chunk(chunk, resetTranscript, audioRef, () => {
            if (ChangeSlide) {
              console.log("slide changed");

              setSlides(Slides + 1);
              setChangeSlide(false);
            }
            isListeningRef.current = true;
            if (updateDataTemp.current !== null) {
              updateData(updateDataTemp.current, dispatch);
            }
            updateDataTemp.current = null;
            resetTranscript();
            setbotStatus("listening")
            playing_audio_Ref.current = false;
            console.log("spoked")
          });
        }
      });

      socket.current.on('disconnect', () => { console.log('Socket disconnected'); });
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
    <div className="bg-[#101010] w-full
                         h-screen flex justify-center 
                         overflow-hidden p-1 gap-[1vw] 
                         items-center text-white"
    >
      < Menu />
      <div className="w-[90vw] h-[90vh] bg-[#151515] rounded-lg p-[1.5vw] flex flex-col gap-[1vw]">
        {/* header */}
        <Header />
        {isToggled && simpleState === "code" ? <CodeSpace2 /> : isToggled && simpleState === "presentation" ? <PresentationFull /> : < CodeSpace />}


        {isToggled ? <EXMenu /> : null}

      </div>


      {setting_open ? <SettingCom /> : null}


    </div>
  );
};

export default EditorPage;