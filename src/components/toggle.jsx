import React, { useState } from 'react';

const ToggleButton = () => {
    // State to manage toggle state
    const [isToggled, setIsToggled] = useState(false);

    // Toggle handler
    const toggleSwitch = () => setIsToggled(!isToggled);

    return (
        <div className="flex items-center ">
            <span className="text-[1.4vw] font-thin w-[6vw]  text-center">
                {isToggled ? 'Flowing' : 'Flow'}
            </span>
            <button
                onClick={toggleSwitch}
                className={`w-[3vw] h-[50%] flex items-center rounded-full p-1 transition duration-300 ${isToggled ? 'bg-[#08618e]' : 'bg-gray-500'
                    }`}
            >
                {/* Circle */}
                <div
                    className={`w-[1.5vw] h-[1.5vw] bg-gray-300 rounded-full shadow-md transform transition duration-300 ${isToggled ? 'translate-x-[1.5vw]' : 'translate-x-[-0.5vw]'
                        }`}
                ></div>
            </button>


        </div>
    );
};

export default ToggleButton;
