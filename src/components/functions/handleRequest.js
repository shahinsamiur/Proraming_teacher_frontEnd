// const handleRequest = async () => {

//     if (userData.await === true) {
//       await new Promise((resolve) => setTimeout(resolve, 4000)); // 4-second delay
//     }
// // 
//     if (userData.re_request === true) {
//       if (ChangeSlide) {
//         console.log("slide changed");
//         setSlides(Slides + 1);
//         setChangeSlide(false);
//       }
//         if(userData.current_program === "after_class_question"){
//             socket.current.emit("after_class_question", { userData });
  
//         }


//       socket.current.emit("reciving_the_anwser", { userData, transcript });
//     } else if (userData.re_request === "ask_querys") {
//       socket.current.emit("ask_querys", { userData, transcript });
//     } else if (userData.re_request === "ask_querys_waiting") {
//       const newTimeoutId = setTimeout(() => {
//         socket.current.emit("ask_querys_waiting", { userData, transcript });
//         console.log("ask_querys_waiting:");
//       }, 5000);

//     }

//     console.log("this is transcript:", transcript);
//     if (timeoutid) clearTimeout(timeoutid);

//     if (userData.current_program === "waiting_for_wish_response" && isListeningRef.current) {
//       const newTimeoutId = setTimeout(() => {
//         socket.current.emit("reciving_the_anwser", { userData, transcript: "good morning" });
//         console.log("waiting_for_wish_response:");
//       }, 5000);
//       setTimeOutId(newTimeoutId);
//     } 
    
    
//     else if (userData.current_program === "intro_question" && isListeningRef.current) {
//       const newTimeoutId = setTimeout(() => {
//         console.log("intro_question:");
//         socket.current.emit("reciving_the_anwser", { userData, transcript });
//       }, 5000);
//       setTimeOutId(newTimeoutId);
//     }
    
    
    
//     else if (userData.current_program === "intro_question_anwser_waiting" && isListeningRef.current) {
//       console.log("intro_question_anwser_waiting");
//       const newTimeoutId = setTimeout(() => {
//         if (transcript && transcript.length > 2) {
//           socket.current.emit("reciving_the_anwser", { userData, transcript });
//         } else {
//           socket.current.emit("user_no_response", userData);
//         }
//       }, 5000);
//       setTimeOutId(newTimeoutId);
//     }
    
    
//     else if(userData.current_program=="after_class_question_waiting"){
//       const newTimeoutId = setTimeout(() => {
//         socket.current.emit("after_class_question_recived", { userData, transcript: "good morning" });
//         console.log("after_class_question_waiting:");
//       }, 5000);
//       setTimeOutId(newTimeoutId);
//     }

//     if (userData.re_request === "code") {
//       if (newTimeoutId_trans) clearTimeout(newTimeoutId_trans);
//       setnewTimeoutId_trans(setTimeout(() => {
//         if (transcript && transcript.length > 10) {
//           alert("transcript code has ");
//           resetTranscript();
//         } else {
//           resetTranscript();
//         }
//       }, 3000));

//       console.log("code no response");
//       const newTimeoutId = setTimeout(() => {
//         console.log("code no response");
//         socket.current.emit("code_no_response", { userData, transcript });
//       }, 30000);
//       setTimeOutIdC(newTimeoutId);
//     }
//   };