const calling_socket = (userData, socket, timeoutid, setTimeoutId, resetTranscript, transcript) => {
    if (userData.current_program === "waiting_for_wish_response") {
        if (transcript && transcript.length >= 2) {
            console.log("test 00: ", transcript);

            if (timeoutid) clearTimeout(timeoutid); // Clear previous timeout if any

            const newTimeoutId = setTimeout(() => {
                console.warn("send request");
                // socket.current.emit('start_audio_stream', transcript); // Emit transcript to server
                // resetTranscript(); // Reset transcript
            }, 5000); // Delay of 5 seconds

            setTimeoutId(newTimeoutId); // Set new timeout ID
        } else {
            if (timeoutid) clearTimeout(timeoutid); // Clear previous timeout if any

            const newTimeoutId = setTimeout(() => {
                console.warn("send request transcript is null");
                // socket.current.emit('start_audio_stream', transcript); // Emit transcript to server
                // resetTranscript(); // Reset transcript
            }, 5000); // Delay of 5 seconds

            setTimeoutId(newTimeoutId); // Set new timeout ID
        }
    }
};

export { calling_socket };
