

const socket_connect_function = (SpeechRecognition, socket, data,cookie) => {
    // Start listening to speech
     SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    
    // Emit data immediately upon connection
    socket.current.emit("update_data", {data,cookie});

};

export { socket_connect_function };
