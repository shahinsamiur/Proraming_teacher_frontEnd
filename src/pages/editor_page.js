import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import CodeEditor from '../components/EditorComponent';
import { MyContext } from '../contextAPI';
import Nav from '../components/nav';
import io from 'socket.io-client';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Tarminal from "../components/tarminal"
import { useDispatch } from 'react-redux';
import { SetOutput } from "../reduxSlices/check"
// import { connect_socket } from '../components/socket_functions/socket_connect_function';
import { audio_chunk } from '../components/socket_functions/audio_chunk';
import { getTime } from '../components/functions/Get_time';
const EditorPage = () => {

  var date = getTime()
  const dispatch = useDispatch();
  const audioRef = useRef(null); // Ref for audio source
  const [isListening, setIsListening] = useState(true); // State to manage listening status
  const { socket } = useContext(MyContext);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition(); // Hook for speech recognition
  const [timeoutId, setTimeoutId] = useState(null); // State to store timeout ID

  // Function to reset the transcript
  const clear = useCallback(() => { resetTranscript(); 

    console.log("called")
  }, [resetTranscript]);

  useEffect(() => {

    console.log(date)
    // Initialize socket connection once
    if (!socket.current) {
      socket.current = io('http://localhost:5000');
      socket.current.on('connect', () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
        socket.current.emit("wish", date)
      });





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
  }, [resetTranscript, dispatch, socket]);

  useEffect(() => {
    if (transcript && transcript.length >= 2) {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout if any

      const newTimeoutId = setTimeout(() => {
        // socket.current.emit('start_audio_stream', transcript); // Emit transcript to server
        setIsListening(false); // Set listening status to false
        resetTranscript(); // Reset transcript
        clear(); // Clear transcript
      }, 3000); // Delay of 3 seconds
      setTimeoutId(newTimeoutId); // Set new timeout ID
    }
  }, [transcript, isListening, clear, resetTranscript, timeoutId]); // Effect dependencies

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
