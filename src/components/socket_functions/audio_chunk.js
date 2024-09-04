const audio_chunk = async (chunk, resetTranscript, audioRef, onEnd) => {
  resetTranscript(); // Reset transcript on receiving audio chunk

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
          console.log("Chunk playback finished");
          if (onEnd) onEnd(); // Call the onEnd callback when playback finishes
      };
  } catch (error) {
      console.error('Error decoding audio data:', error); // Log error if decoding fails
  }

  resetTranscript(); // Reset transcript after handling audio chunk
};

export { audio_chunk };
