import React from "react";
import "../../css/thinking.css"
const BouncingDots = () => {
    return (
        <div className="flex justify-center items-center ">
            <div className="flex gap-[0.1vw]">
                <div className="h-[0.3vw] w-[0.3vw] bg-white rounded-full animate-bounce"></div>
                <div className="h-[0.3vw] w-[0.3vw] bg-white rounded-full animate-bounce two_point"></div>
                <div className="h-[0.3vw] w-[0.3vw] bg-white rounded-full animate-bounce three_point"></div>
            </div>
        </div>
    );
};

export default BouncingDots;
