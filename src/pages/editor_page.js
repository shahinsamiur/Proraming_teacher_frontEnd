import React, { useContext, useEffect, useRef, useState} from 'react';
import CodeEditor from '../components/EditorComponent';
import { MyContext } from '../contextAPI';
import Nav from '../components/nav';
import io from 'socket.io-client';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Tarminal from "../components/tarminal"
import { useDispatch,useSelector } from 'react-redux';
import { SetOutput } from "../reduxSlices/check"
import { audio_chunk } from '../components/socket_functions/audio_chunk';
import { socket_connect_function } from '../components/socket_functions/socket_connect';
import { updateData } from '../components/socket_functions/update_data';


const EditorPage = () => {
  const userData= useSelector((state) => state.UserInfo)



  const dispatch = useDispatch();
  const audioRef = useRef(null); // Ref for audio source
  const [isListening, setIsListening] = useState(true); // State to manage listening status
  const { socket, socket_handler, setSocket_handler } = useContext(MyContext);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition(); // Hook for speech recognition
  const [timeoutId, setTimeoutId] = useState(null); // State to store timeout ID

useEffect(() => {
 console.log("userData : ",userData)
}, [userData])


  useEffect(() => {
    // Initialize socket connection once
    if (!socket.current) {
      socket.current = io('http://localhost:5000');

     
      socket.current.on('connect', () => socket_connect_function(SpeechRecognition, socket, transcript, userData));
      socket.current.on("updateData",(data)=>{updateData(data,dispatch)})
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

  useEffect(() => {
    if (transcript && transcript.length >= 2) {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout if any
      console.log(transcript)

    }
  }, [isListening, transcript, timeoutId]); // Effect dependencies

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
