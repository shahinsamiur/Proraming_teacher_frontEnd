import React, { createContext, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
const MyContext = createContext(null);


const MyProvider = ({ children }) => {
  const socket = useRef(null);
  const [code, setCode] = useState(); // save code , code will save in localstorage 
  const [socket_handler, setSocket_handler] = useState("")
  const audioRef = useRef(null); // Ref to store the audio source
  const [botStatus, setbotStatus] = useState("listening")
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition(); // Hook for speech recognition
  const [ImageState, setImageState] = useState("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDxUPDw8PDw8PDw8PDw8PDw8PDw8PFRUWFhURFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EACMQAQEBAAEDAgcAAAAAAAAAAAABEQIhMbFx8AMSQVFhcpH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9qVIAomqCKICoKAgAUACkRqAAAAAAYBoJdAIaQDVABLFATAAFRQRUAEVABQBFSwBRAVUAE1QGcagABFAAAVAEzr/AAqpQAIC1FSgGmACooAICgAyqRQRYAFS0AU0AMA0AAADAFRQAAAAQVAVBKDQgAqACoAAAaJgBGkkNABABUgKCAoAJFgYCpVQDipQEVAFRUBUCAJVSgoABAgFAAABFTAGkwUGQoCoqUFAAhQoAACouAipYQCwFBBQEFQAAARQAAKAAACCgAkABUoKJFAAAAAAAUAEVAAAUABIUAABFLEBRKsAEoCoAKJqggABe4AoAIoAAQAAFEAAqAoRQAASgACfXyoCRaAaIoJVABKoDO++g0AgeFAAACAAigAgKIsAAtARdQFgAKmgCFgUC1WZOu+rQCYoCKlWAIAKqKCKAMwIoCCgJFqQFAAqCgIoCYYKAlipQWKkAKYACKmgb5VIoCAASiAqooJhqpaB80+4534cQHWCpgLAACiggAJe60AAUEIUAKAAqUENKAaKlgEigAgAWooBFTCAqWKAmAApCkBUqoAqQAqoAKAIqKAimAgqABqAAWgESVQNUSwFTQoCoAqSiSg0Jq6AqAGCxARbTD8gRcTooGAAIoDPLnJfVoANSCSg0gAAAM8mtZkAigCggKVKoIsVAVLFATBUBNVMAasABGefaftAA4d63QAKACKAUAEIoCCgIACXuoAhQAqqAkRQCCgCAAKAzQAf/9k=")
  const [EditorSetting, setEditorSetting] = useState({

  });


  useLayoutEffect(() => {
    if (localStorage.getItem("editorSettings")) {
      setEditorSetting(JSON.parse(localStorage.getItem("editorSettings")))
    } else {

      var data = {
        theme: "monokai",
        fontSize: "12",
        languageMode: "Python",
        showGutter: false,
        showLineNumbers: false,
        enableBasicAutocomplete: false,
        enableLiveAutocomplete: false,
        showPrintMargin: false,
        highlightActiveLine: false,
        enableSnippets: false
      }


      setEditorSetting(data)
      localStorage.setItem("editorSettings",JSON.stringify(data))
    }



  }, [])




  const updateCode = (code) => {
    window.localStorage.setItem("code", code)
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


  const [Slides, setSlides] = useState(0)
  const [timeoutidC, setTimeOutIdC] = useState(null)
  const [isToggled, setIsToggled] = useState(false);
  const [simpleState, setsimpleState] = useState("presentation");
  const [setting_open, set_setting_open] = useState(false);
  const [alert, setAlert] = useState(false)
  return (
    <MyContext.Provider value={{
      socket, code, updateCode,
      transcript,
      browserSupportsSpeechRecognition,
      resetTranscript,
      audioRef,
      socket_handler,
      setSocket_handler,
      Slides, setSlides,
      timeoutidC, setTimeOutIdC, botStatus, setbotStatus,
      isToggled, setIsToggled,
      simpleState, setsimpleState, setting_open, set_setting_open, alert, setAlert,
      ImageState, setImageState, EditorSetting, setEditorSetting
    }
    }>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext }