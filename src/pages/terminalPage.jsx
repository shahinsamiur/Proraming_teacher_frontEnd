import React, { useState } from 'react';

export default function TerminalPage() {
    const [test, settest] = useState([
        {
            "type": "running_code",
            "value": "running your code ....."
        },
        {
            "type": "result",
            "value": "samiur shahin"
        },


    ]);
    const [value, setvalue] = useState("");

    const handleOnchange = (e) => {
        setvalue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (value === "cls") {
                console.log("cls");
                settest([]);  // Reset the test state to an empty array
            } else {
                let temp = [...test, value];
                settest(temp);
            }
            setvalue("");  // Clear the input field after pressing Enter
        }
    };

    return (
        <>
            <div className=" text-black px-2 pt-[1vh] w-[50%] h-[50vh] border-y-2" data-pc-name="terminal" data-pc-section="root">
                <div className=" w-full h-auto" data-pc-section="content">





                    {test.map((data, index) => (
                        data.type === "result" ? (
                            <div key={index} className="" data-pc-section="container">
                                <span className=" text-gray-400 mr-2" data-pc-section="prompt">Output :&nbsp;</span>
                                <input type="text" value={data.value} className='outline-0 bg-transparent' readOnly />
                            </div>

                        ) : (<div key={index} className="" data-pc-section="container">
                            <span className=" text-gray-400 mr-2" data-pc-section="prompt">Meheroon $&nbsp;</span>
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