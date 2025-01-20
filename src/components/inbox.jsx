import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import "../App.css"



export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

const handleSubmit=(e)=>{
  e.preventDefault()
  if (inputValue.trim() !== "") {
    setMessages([...messages, { type: "user", text: inputValue }]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "I’m glad to see you’re trying to solve the problem. Unfortunately, I cannot address your coding issue at the moment as I’m still under development and have some limitations. Our developers are working hard to make this functionality available, and it will be ready in the near future." },
      ]);
    }, 500);
  }
}




  // Handle sending messages
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, { type: "user", text: inputValue }]);
      setInputValue("");

      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "ai", text: "I’m glad to see you’re trying to solve the problem. Unfortunately, I cannot address your coding issue at the moment as I’m still under development and have some limitations. Our developers are working hard to make this functionality available, and it will be ready in the near future." },
        ]);
      }, 500);
    }
  };

  return (
    <div className="h-[82%] w-full flex flex-col    justify-center">
      {/* Messages Section */}
      <div className="h-[88%] p-4 overflow-y-auto  overflow-hidden no-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-[0.5vh] ${
              msg.type === "user"
                ? "text-right"
                : "text-left  p-2 rounded-lg  "
            }`}
          >
            <span
              className={`inline-block px-[0.6vw] py-[0.2vw] text-[1vw] rounded-lg ${
                msg.type === "user"
                  ? "bg-[#08618e] text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
           {messages.length===0?<div className="w-full h-full flex items-center justify-center text-[#2c2c2c]">Your inbox is empty</div>:null}
      </div>


   

      {/* Input Section */}
      <form className="w-[full] px-[3%] gap-2 " onSubmit={handleSubmit}>

        <div className=" flex w-[full] bg-[#2c2c2c] h-[5vh] rounded-lg">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className=" bg-inherit text-[0.8vw] h-full rounded-lg w-[90%] px-[1vw] outline-none"
          placeholder="Type a message..."
        />
          <IoIosSend className=" text-[#31b8d6]  text-[2.1vw] cursor-pointer" onClick={handleSendMessage}
          
          />

        </div>
     
      </form>
    </div>
  );
}
