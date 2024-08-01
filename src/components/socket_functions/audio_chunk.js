const audio_chunk = async (chunk, resetTranscript, setIsListening, audioRef) => {
    resetTranscript(); // Reset transcript on receiving audio chunk
    setIsListening("playing"); // Set listening status to "playing"
    console.log("daya");
  
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
  };
  
  export { audio_chunk };
  