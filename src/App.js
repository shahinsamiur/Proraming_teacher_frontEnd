import React, { useContext, useEffect, useRef, useState } from 'react';
import CodeEditor from './components/EditorComponent';
import { MyContext } from './contextAPI';
import Nav from './components/nav';
import io from 'socket.io-client';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Tarminal from "./components/tarminal"





const App = () => {

  const socket = useRef(null); // Ref to store the socket connection
  const audioRef = useRef(null); // Ref to store the audio source
  const [isListening, setIsListening] = useState(true); // State to manage listening status
  const { code, setOutput } = useContext(MyContext);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition(); // Hook for speech recognition
  const [timeoutId, setTimeoutId] = useState(null); // State to store timeout ID

  // Function to reset the transcript
  const clear = () => {
    resetTranscript();
  };


  useEffect(() => {
    // Initialize socket connection once
    if (!socket.current) {
      socket.current = io('http://localhost:5000');

      socket.current.on('connect', () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
        console.log('Socket connected');
      });



      socket.current.on('audio_chunk', async (chunk) => {
        resetTranscript(); // Reset transcript on receiving audio chunk
        setIsListening("playing"); // Set listening status to "playing"
        console.log("daya")
        const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Create new audio context
        if (audioContext.state === 'suspended') {
          await audioContext.resume(); // Resume audio context if suspended
        }

        try {
          const arrayBuffer = new Uint8Array(chunk).buffer; // Convert chunk to ArrayBuffer
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer); // Decode audio data
          const source = audioContext.createBufferSource(); // Create audio buffer source
          source.buffer = audioBuffer; // Set buffer to decoded audio data
          source.connect(audioContext.destination); // Connect source to audio context destination
          source.start(); // Start playing the audio
          audioRef.current = source; // Store the audio source in ref
          source.onended = () => {
            setIsListening(true); // Set listening status to true when audio ends
          };
        } catch (error) {
          console.error('Error decoding audio data:', error); // Log error if decoding fails
        }

        resetTranscript(); // Reset transcript after handling audio chunk
      });





      socket.current.on('disconnect', () => {
        console.log('Socket disconnected');
      });

    }
    // Clean up the event listener on component unmount
    return () => {
      // window.removeEventListener('keydown', handleKeyPress);
      if (socket.current) {
        socket.current.disconnect(); // Disconnect socket
        socket.current = null;
      }
    };
  }, [setOutput, resetTranscript]);

  useEffect(() => {
    console.log("i am listing....")
    if (transcript && transcript.length >= 2) {
      console.log("test: ", transcript);
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

  if (!browserSupportsSpeechRecognition) {
    return null; // Return null if browser doesn't support speech recognition
  }

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

export default App;
