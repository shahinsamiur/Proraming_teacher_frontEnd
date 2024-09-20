import React, { useState,useContext } from 'react';
import { MyContext } from '../contextAPI';
import { useDispatch, useSelector } from 'react-redux';

import { SetOutput } from "../reduxSlices/check"

export default function TerminalPage() {
    const userData = useSelector((state) => state.Check.output)
    const {socket,code}=useContext(MyContext)
    const dispatch = useDispatch();


    const [value, setvalue] = useState("");

    const handleOnchange = (e) => {
        setvalue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (value === "cls"||value==="clear") {
                dispatch(SetOutput({"type":"clear","value":""}))  // Reset the test state to an empty array
            } else if(value === "run") {
                socket.current.emit("runCode", { code });
                let tempData={
                    "type=":"running_code",
                    "value":"Your code is running ..."
                }
                dispatch(SetOutput(tempData))

            }else{
                dispatch(SetOutput({"type":"command" , "value":value}))
            }
            setvalue("")
        }
       
    };

    return (
        <>
            <div className=" text-black px-2 pt-[1vh] w-full h-[45vh] overflow-auto " >
                <div className=" w-full h-auto ">





                    {userData.map((data, index) => (
                        data.type === "result" ? (
                            <div key={index} className="h-auto flex flex-row mb-3 justify-start items-start" >

                                <div type="text"  className='outline-0 bg-transparent w-[80%] text-wrap inline-block' >
                                <span className=" text-gray-400 mr-2" data-pc-section="prompt">Meheroon $</span>
                                    
                                    {data.value}</div>
                            </div>

                        ) : (<div key={index} className="" >
                            <span className=" text-gray-400 mr-2" data-pc-section="prompt">Meheroon $</span>
                            <input type="text" value={data.value} className='outline-0 bg-transparent' readOnly />
                        </div>)

                    ))}





                </div>
                <span className=" bg-transparent text-gray-400 mr-2" data-pc-section="prompt">Meheroon $&nbsp;</span>
                <input
                    type="text"
                    value={value}
                    className='outline-0 bg-transparent'
                    onChange={handleOnchange}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            </div>
        </>
    );
}




// create a data set
// running output ......>>>>>when user run the code
// code result >>>>>>>>>>>>>when user get the output of the code
// command by user >>>>>>>>> typed command by user 