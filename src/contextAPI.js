import React, { createContext, useState, useEffect, useRef } from 'react';
import  { useSpeechRecognition } from 'react-speech-recognition';
const MyContext = createContext(null);


const MyProvider = ({ children }) => {
  const socket = useRef(null);
  const [code, setCode] = useState(); // save code , code will save in localstorage 
  const [socket_handler,setSocket_handler]=useState("")
  const audioRef = useRef(null); // Ref to store the audio source
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition(); // Hook for speech recognition
  const updateCode=(code )=>{
    window.localStorage.setItem("code",code)
    setCode(code)
  }
  useEffect(() => {
    // this will run when the code editor will open on browser 
    // cheching if any code saved in local storage if then set to update the code 
    if (window.localStorage.getItem("code")) setCode(window.localStorage.getItem("code"))
    else {
      window.localStorage.setItem("code", '# Python3.12.4 \n# Write Python code here !\n') // saving code comment on browser's storage 
      setCode('# Python3.12.4 \n# Write Python code here !\n') // updating the code editor here
    }

  }, [])

  return (
    <MyContext.Provider value={{
       socket ,code,updateCode,
       transcript,
       browserSupportsSpeechRecognition,
       resetTranscript,
       audioRef,
       socket_handler,
       setSocket_handler
      }
       }>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext }