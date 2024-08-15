let timeoutId;

const socket_connect_function = (SpeechRecognition, socket, transcript, data) => {
    // Start listening to speech
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    // Emit data immediately upon connection
    socket.current.emit("update_data", data);
    // console.log("data:", data);

    // Function to handle the timeout
    const handleTimeout = (waitTime) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (!transcript) {
                // Emit data if transcript is empty
                socket.current.emit("skip", data);
                console.log("Transcript empty, emitted data:", data);
            } else {
                console.log("Transcript updated, waiting for next timeout.");
            }
        }, waitTime);
    };

    // Initially, wait 5 seconds if the transcript is empty
    handleTimeout(5000);

    // Check if transcript is updated
    const checkTranscript = () => {
        if (transcript) {
            // If transcript is updated, reset the timeout for 3 seconds
            handleTimeout(3000);
        } else {
            // If transcript is still empty, keep waiting for 5 seconds
            handleTimeout(5000);
        }
    };

    // Assuming you have a way to monitor transcript updates
    // You can use an interval or a listener for transcript changes
    const transcriptInterval = setInterval(checkTranscript, 1000); // Checking every 1 second

    // Make sure to clear the interval when it's no longer needed
    // clearInterval(transcriptInterval);
};

export { socket_connect_function };
