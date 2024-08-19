

const socket_connect_function = (SpeechRecognition, socket, transcript, data) => {
    // Start listening to speech
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    // Emit data immediately upon connection
    socket.current.emit("update_data", data);
    // console.log("data:", data);

};

export { socket_connect_function };
