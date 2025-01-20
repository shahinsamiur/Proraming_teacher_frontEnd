import React, { useState, useContext } from 'react';
import { MyContext } from '../contextAPI';
import { useDispatch, useSelector } from 'react-redux';
import { SetOutput } from "../reduxSlices/check";
import "../App.css";

export default function TerminalPage() {
    const userData = useSelector((state) => state.Check.output);
    const { socket, code } = useContext(MyContext);
    const dispatch = useDispatch();

    const [value, setvalue] = useState("");

    const handleOnchange = (e) => {
        setvalue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (value === "cls" || value === "clear") {
                dispatch(SetOutput({ type: "clear", value: "" })); // Clear the terminal output
            } else if (value === "run") {
                if (userData.re_request === "code") {
                    socket.current.emit("check_code", { code });
                } else {
                    socket.current.emit("runCode", { code });
                }
                const tempData = {
                    type: "running_code",
                    value: "Your code is running ..."
                };
                dispatch(SetOutput(tempData));
            } else {
                dispatch(SetOutput({ type: "command", value: value })); // Handle custom commands
            }
            setvalue("");
        }
    };

    return (
        <div className="text-white px-2 pt-[1vh] text-[1.2vw] pb-[20%] w-[100%] h-[90%] overflow-auto bg-[#151515] border-t-[0.01vw] border-[#2f2f2f] no-scrollbar">
            <div className="w-full h-auto">
                {userData.map((data, index) => (
                    data.type === "result" ? (
                        <div key={index} className="h-auto flex flex-row mb-[0.1%] justify-start items-start">
                            <div
                                type="text"
                                className={`outline-0 bg-transparent w-[80%] text-wrap inline-block ${data.value.includes('Error') || data.value.includes('error') ? 'text-red-500' :
                                        (data.value.includes('Warning') || data.value.includes('warning') ? 'text-yellow-500' : '')
                                    }`}
                            >
                                <span className="text-gray-400 mr-2" data-pc-section="prompt">Lily/python $</span>
                                {data.value.split('\n').map((line, lineIndex) => (
                                    <React.Fragment key={lineIndex}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div key={index} className="">
                            <span className="text-gray-400 mr-2 font-thin" data-pc-section="prompt">Lily/python $</span>
                            <input type="text" value={data.value} className="outline-0 bg-transparent" readOnly />
                        </div>
                    )
                ))}

            </div>
            <span className="bg-transparent text-white mr-2 text-[0.8vw] font-thin" data-pc-section="prompt">Lily/python $&nbsp;</span>
            <input
                type="text"
                value={value}
                className="outline-0 bg-transparent"
                onChange={handleOnchange}
                onKeyDown={handleKeyDown}
                autoFocus
            />
        </div>
    );
}
