
import React, { useContext, useEffect, useRef, useState } from 'react';

import { MyContext } from '../contextAPI';

import io from 'socket.io-client';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { useDispatch, useSelector } from 'react-redux';

import { SetOutput } from "../reduxSlices/check"

import { audio_chunk } from '../components/socket_functions/audio_chunk';

import { socket_connect_function } from '../components/socket_functions/socket_connect';

import { updateData } from '../components/socket_functions/update_data';

import Header from '../components/header';

import Menu from '../components/menu';

import Editor from '../components/editor';

import Right_side from "../components/right_side"








const EditorPage = () => {

  const userData = useSelector((state) => state.UserInfo)
  const [ChangeSlide, setChangeSlide] = useState(null)






  const dispatch = useDispatch();

  const audioRef = useRef(null); // Ref for audio source

  const { socket, socket_handler, Slides, setSlides, setTimeOutIdC } = useContext(MyContext);

  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition(); // Hook for speech recognition

  const [timeoutid, setTimeOutId] = useState(null)
  const [newTimeoutId_trans, setnewTimeoutId_trans] = useState(null)
  var updateDataTemp = useRef(null);
  const isListeningRef = useRef(false); // Use useRef instead of var for persistent value
  const playing_audio_Ref = useRef(false);

  useEffect(() => {
    if (userData.re_request === true) {
      console.log("repeting the requeest")

      socket.current.emit("reciving_the_anwser", { userData, transcript });
    }





    console.log("this is transcript :", transcript)
    if (timeoutid) clearTimeout(timeoutid); // Clear previous timeout if any


    if (userData.current_program === "waiting_for_wish_response" && isListeningRef.current) {

      const newTimeoutId = setTimeout(() => {
        // if (transcript && transcript.length > 2) {
        //   // console.warn("Reciving_the_anwser emmiting", { userData, transcript })
        //   socket.current.emit("reciving_the_anwser", { userData, transcript }); // Emit transcript to server


        // } else {

        //   socket.current.emit("Skiping_cruent_program", { userData, transcript });

        // }
        socket.current.emit("reciving_the_anwser", { userData, transcript: "good morning" }); // Emit transcript to server
        console.log("waiting_for_wish_response : ")
      }, 5000); // Delay 





      setTimeOutId(newTimeoutId)




    }

    else if (userData.current_program === "intro_question" && isListeningRef.current) {

      // console.log("isListeningRef : ", isListeningRef, "playing_audio_Ref : ", playing_audio_Ref,)
      const newTimeoutId = setTimeout(() => {
        console.log("intro_question : ")
        // if (transcript && transcript.length > 2) {
        //   socket.current.emit("reciving_the_anwser", { userData, transcript }); // Emit transcript to server
        //   resetTranscript()
        // }


        // else {
        //   socket.current.emit("user_no_response", userData)

        // }
        socket.current.emit("reciving_the_anwser", { userData, transcript }); // Emit transcript to server

      }, 5000); // Delay of 5 seconds

      setTimeOutId(newTimeoutId); // Set new timeout ID


      // alert("error at line 121")

    }




    else if (userData.current_program === "intro_question_anwser_waiting" && isListeningRef.current) {
      // alert("intro_question_anwser_waiting")
      // socket.current.emit("reciving_the_anwser", { userData, transcript });
      console.log("intro_question_anwser_waiting")



      const newTimeoutId = setTimeout(() => {
        if (transcript && transcript.length > 2) {
          // console.warn("Reciving_the_anwser emmiting", { userData, transcript })
          socket.current.emit("reciving_the_anwser", { userData, transcript });


        } else {

          socket.current.emit("user_no_response", userData)

        }

      }, 5000); // Delay 
      setTimeOutId(newTimeoutId)

    }


    if (userData.re_request === "code") {
      if (newTimeoutId_trans) clearTimeout(newTimeoutId_trans)
      setnewTimeoutId_trans(setTimeout(() => {

        if (transcript && transcript.length > 10) {
          // socket.current.emit("", { userData, transcript });
          alert("transcript code has ")
          resetTranscript()
        } else {
          resetTranscript()
        }


      }, 3000)) // Delay 


      console.log("code no response ")
      const newTimeoutId = setTimeout(() => {

        console.log("code no response ")
        // console.warn("Reciving_the_anwser emmiting", { userData, transcript })
        socket.current.emit("code_no_response", { userData, transcript });




      }, 30000); // Delay 
      setTimeOutIdC(newTimeoutId)

    }







  }, [userData, transcript])











  useEffect(() => {
    // Initialize socket connection once
    if (!socket.current) {
      socket.current = io('http://localhost:5000');

      socket.current.on('connect', () => socket_connect_function(SpeechRecognition, socket, isListeningRef, userData));


      socket.current.on("updateData", async (data) => {
        if (data == "slides") setChangeSlide(true)
        if (data.imidiate === true) { // this is for when code test and run 
          let data_temp = data
          data_temp.imidiate = false
          updateData(data_temp, dispatch)
        }
        else if (updateDataTemp.current === null && data!=="slides") updateDataTemp.current = data
     
      })



      socket.current.on("runCodeResult", (data) => {
        dispatch(SetOutput({ "type": "result", "value": data.output }))
      });
      socket.current.on('audio_chunk', async (chunk) => {

        isListeningRef.current = false;
        if (playing_audio_Ref.current == false) {
          playing_audio_Ref.current = true
          await audio_chunk(chunk, resetTranscript, audioRef, () => {

            // This callback is called after each chunk finishes playing
            // If this is the last chunk, set isListening to false
            if (ChangeSlide) setSlides(Slides + 1)
            isListeningRef.current = true;
            if (updateDataTemp.current != null) {
              updateData(updateDataTemp.current, dispatch)
            }
            updateDataTemp.current = null
            resetTranscript()
            playing_audio_Ref.current = false
          })
        };
      });



      socket.current.on('disconnect', () => { console.log('Socket disconnected'); });
    }
    // Clean up the event listener on component unmount
    return () => {
      // window.removeEventListener('keydown', handleKeyPress);
      if (socket.current) {
        socket.current.disconnect(); // Disconnect socket
        socket.current = null;
      }
    };
  }, [dispatch, socket, socket_handler]);







  if (!browserSupportsSpeechRecognition) { return null; } // Return null if browser doesn't support speech recognition









  return (
    <div className='p-4 bg-[#F2F2F2]'>
      <Header />
      <div className='flex flex-row  w-full h-[84vh] gap-[1vw] font-Moderustic'>
        <Menu />
        <Editor />
        <Right_side />
      </div>
    </div>
  );
};





export default EditorPage;
