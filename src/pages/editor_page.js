
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









  const dispatch = useDispatch();

  const audioRef = useRef(null); // Ref for audio source

  const [isListening, setIsListening] = useState(false); // State to manage listening status

  const { socket, socket_handler} = useContext(MyContext);

  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition(); // Hook for speech recognition
  
  const [timeoutid, setTimeOutId] = useState(null)
  var age=true




  useEffect(() => {
    console.log("this is transcript :", transcript)
    if (timeoutid) clearTimeout(timeoutid); // Clear previous timeout if any
    if (userData.current_program === "waiting_for_wish_response") {
        const newTimeoutId = setTimeout(() => {
        console.warn(userData.current_program,transcript);

        if (transcript && transcript.length > 2) {
          console.warn("Reciving_the_anwser emmiting")
          socket.current.emit("Reciving_the_anwser", { userData, transcript }); // Emit transcript to server
        }
          
        
        else socket.current.emit("Skiping_cruent_program", { userData, transcript });
        resetTranscript(); // Reset transcript
      }, 5000); // Delay 

      setTimeOutId(newTimeoutId)

    } else if (userData.current_program === "intro_question") {
      console.log("intro_question ")
      const newTimeoutId = setTimeout(() => {
        if (transcript && transcript.length > 2) {
          socket.current.emit("Reciving_the_anwser", { userData, transcript }); // Emit transcript to server
        }
        else {
          console.log("we have no response ")
          socket.current.emit("user_no_response",userData)

        }

      }, 5000); // Delay of 5 seconds

      setTimeOutId(newTimeoutId); // Set new timeout ID

    }

  }, [userData, transcript])





  useEffect(() => {
    console.log("isLisning", isListening)
    console.log("this is transcript :", transcript)
    if (timeoutid) clearTimeout(timeoutid); // Clear previous timeout if any
    if(isListening==false){
      
      const newTimeoutId = setTimeout(() => {
        socket.current.emit("Reciving_the_anwser", { userData, transcript }); // Emit transcript to server
        // console.log("request send ")
      resetTranscript(); // Reset transcript
    }, 5000); // Delay 

    setTimeOutId(newTimeoutId)

    }
        

    

  }, [transcript,isListening])





  useEffect(() => {
    // Initialize socket connection once
    if (!socket.current) {
      socket.current = io('http://localhost:5000');


      socket.current.on('connect', () => socket_connect_function(SpeechRecognition, socket, transcript, userData));
      socket.current.on("updateData", (data) => { updateData(data, dispatch) })
      socket.current.on("runCodeResult", (data) => { dispatch(SetOutput(data)) });
     
      socket.current.on('audio_chunk', async (chunk) => { 
        console.log("Receiving audio chunk...");
    
        setIsListening(true);
    
        await audio_chunk(chunk, resetTranscript, audioRef, () => {
            // This callback is called after each chunk finishes playing
            // If this is the last chunk, set `isListening` to false
            console.log("All chunks finished playing, setting isListening to false.");
            setIsListening(false);
        });
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
