import React from 'react';
import '../../App.css'; // Import the custom animation styles

function Speaking() {
  return (
    <div className="flex items-center justify-center w-[full] h-[full] gap-[0.4vw]">
      <div className="line1 w-[0.1vw] bg-[#08618e]" />
      <div className="line2 w-[0.1vw] bg-[#08618e]" />
      <div className="line3 w-[0.1vw] bg-[#08618e]" />
      <div className="line4 w-[0.1vw] bg-[#08618e]" />
    </div>
  );
}

export default Speaking;
