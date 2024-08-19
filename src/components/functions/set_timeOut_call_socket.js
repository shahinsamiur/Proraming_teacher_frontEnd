

const set_timeOut_call_socket=(emit,transcript,socket,timeout,resetTranscript)=>{


    const newTimeoutId = setTimeout(() => {
        console.warn("send request");

        if (transcript && transcript.length > 2) socket.current.emit(emit[0], { userData, transcript }); // Emit transcript to server
        else socket.current.emit(emit[0], { userData, transcript });
        resetTranscript(); // Reset transcript
      }, timeout); // Delay 

      return newTimeoutId


}
export {set_timeOut_call_socket}