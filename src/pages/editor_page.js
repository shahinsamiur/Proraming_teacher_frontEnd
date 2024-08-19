import React, { useContext, useEffect, useRef, useState } from 'react';
import CodeEditor from '../components/EditorComponent';
import { MyContext } from '../contextAPI';
import Nav from '../components/nav';
import io from 'socket.io-client';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Tarminal from "../components/tarminal"
import { useDispatch, useSelector } from 'react-redux';
import { SetOutput } from "../reduxSlices/check"
import { audio_chunk } from '../components/socket_functions/audio_chunk';
import { socket_connect_function } from '../components/socket_functions/socket_connect';
import { updateData } from '../components/socket_functions/update_data';
// import { calling_socket } from '../components/calling_socket';
import { set_timeOut_call_socket } from "../components/functions/set_timeOut_call_socket"









const EditorPage = () => {
  const userData = useSelector((state) => state.UserInfo)



  const dispatch = useDispatch();
  const audioRef = useRef(null); // Ref for audio source
  const [isListening, setIsListening] = useState(true); // State to manage listening status
  const { socket, socket_handler } = useContext(MyContext);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition(); // Hook for speech recognition
  const [timeoutid, setTimeOutId] = useState(null)
  useEffect(() => {
    console.log("this is transcript :", transcript)
    if (timeoutid) clearTimeout(timeoutid); // Clear previous timeout if any
    if (userData.current_program === "waiting_for_wish_response") {
      var setTimeoutidTemp = set_timeOut_call_socket(["Skiping_cruent_program"],transcript,socket,5000,resetTranscript)
      setTimeOutId(setTimeoutidTemp)

    } else if (userData.current_program === "intro_question") {
      console.log("intro_question ")
      const newTimeoutId = setTimeout(() => {
        if (transcript && transcript.length > 2) {
          console.log("we have  response ")
        }
        else {
          console.log("we have no response ")
          socket.current.emit("user_no_response")

        }

      }, 5000); // Delay of 5 seconds

      setTimeOutId(newTimeoutId); // Set new timeout ID

    }

  }, [userData, transcript])


  useEffect(() => {
    // Initialize socket connection once
    if (!socket.current) {
      socket.current = io('http://localhost:5000');


      socket.current.on('connect', () => socket_connect_function(SpeechRecognition, socket, transcript, userData));
      socket.current.on("updateData", (data) => { updateData(data, dispatch) })
      socket.current.on("runCodeResult", (data) => { dispatch(SetOutput(data)) });
      socket.current.on('audio_chunk', (chunk) => audio_chunk(chunk, resetTranscript, setIsListening, audioRef)); // Pass required params
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
    <div className='flex flex-col bg-[#232323] h-[100vh] w-full text-[white] pt-[2vh] overflow-hidden'>
      <Nav />
      <div className='flex flex-row'>
        <CodeEditor />
        <Tarminal />
      </div>
    </div>
  );
};

export default EditorPage;
