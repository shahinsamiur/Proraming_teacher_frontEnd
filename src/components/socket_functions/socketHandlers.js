// socketHandlers.js

import { audio_chunk } from './audio_chunk';
import { updateData } from './update_data';
// Import SetOutput from the correct path
import { SetOutput } from "../../reduxSlices/check";

/**
 * Initialize socket connection and define core socket events
 * @param {object} socket - socket instance
 * @param {object} userData - user information
 * @param {function} SpeechRecognition - speech recognition instance
 */
export const handleSocketConnection = (socket, userData, SpeechRecognition) => {
  socket.current.on('connect', () => {
    socket.current.emit('initial_connection', userData);
  });

  socket.current.on('disconnect', () => {
  });
};

/**
 * Define event listeners for handling incoming socket events
 * @param {object} socket - socket instance
 * @param {object} handlers - collection of handler functions and state variables
 */
export const handleSocketEvents = (
  socket,
  {
    userData,
    transcript,
    dispatch,
    setChangeSlide,
    setSlides,
    setTimeoutId,
    resetTranscript,
    audioRef,
  }
) => {
  socket.current.on('updateData', (data) => handleUpdateData(data, dispatch, setChangeSlide));
  socket.current.on('runCodeResult', (data) => dispatch(SetOutput({ type: 'result', value: data.output })));
  socket.current.on('audio_chunk', async (chunk) => {
    await handleAudioChunk(chunk, audioRef, resetTranscript, setSlides, setChangeSlide);
  });
};

/**
 * Handle incoming data updates and conditionally change slides
 * @param {string} data - data to update or trigger slide change
 */
const handleUpdateData = (data, dispatch, setChangeSlide) => {
  if (data === 'slides') {
    setChangeSlide(true);
  } else {
    dispatch(updateData(data));
  }
};

/**
 * Process incoming audio chunks and manage transcript reset
 * @param {object} chunk - audio chunk data
 * @param {object} audioRef - audio reference
 * @param {function} resetTranscript - resets the speech transcript
 */
const handleAudioChunk = async (chunk, audioRef, resetTranscript, setSlides, setChangeSlide) => {
  await audio_chunk(chunk, resetTranscript, audioRef, () => {
    if (setChangeSlide) {
      setSlides((prevSlides) => prevSlides + 1);
      setChangeSlide(false);
    }
    resetTranscript();
  });
};
