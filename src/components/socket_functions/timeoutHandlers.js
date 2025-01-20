// timeoutHandlers.js

/**
 * Sets a timeout to handle delayed socket requests and responses
 * @param {object} socket - socket instance
 * @param {object} userData - user data
 * @param {string} transcript - current transcript data
 * @param {function} setTimeoutId - function to store the timeout ID
 * @param {string} program - program identifier for conditional logic
 */
export const handleRequestTimeout = (socket, userData, transcript, setTimeoutId, program) => {
    let timeoutDuration = 5000;
    const newTimeoutId = setTimeout(() => {
      if (program === 'waiting_for_wish_response') {
        socket.current.emit('reciving_the_anwser', { userData, transcript: 'good morning' });
      } else if (program === 'intro_question') {
        socket.current.emit('reciving_the_anwser', { userData, transcript });
      } else {

      }
    }, timeoutDuration);
    setTimeoutId(newTimeoutId);
  };
  
  /**
   * Clears any existing timeouts to avoid duplicate events
   * @param {number} timeoutId - primary timeout ID
   * @param {number} newTimeoutIdTrans - secondary timeout ID (if any)
   */
  export const clearExistingTimeouts = (timeoutId, newTimeoutIdTrans) => {
    if (timeoutId) clearTimeout(timeoutId);
    if (newTimeoutIdTrans) clearTimeout(newTimeoutIdTrans);
  };
  