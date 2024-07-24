import React, { useContext, useEffect } from 'react'
import { MyContext } from '../contextAPI';
import Slider from "./swiper"
export default function Tarminalnav() {




    const { TrigerTarminal, setTrigerTarminal, output, socket, code } = useContext(MyContext);
    const Handle_Traminal_Triger = () => {
        setTrigerTarminal(true);
    }

    const Handle_Presentation_Triger = () => {
        setTrigerTarminal(false);
    }
    const onRun = () => socket.current.emit("runCode", { code });
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.shiftKey && event.key === 'Enter') {
                onRun()
            }
        };
        window.addEventListener('keydown', handleKeyPress);


    }, [])



    return (
        <div className='inline-block w-[50%] bg-[#252A33]'>
            <div className='flex flex-row justify-center space-x-[20%] bg-[#232323] py-[0.5vh] pb-[2vh]'>
                <h1 className='cursor-pointer bg-slate-700 px-[5vw] py-[0.5vw] rounded-lg' onClick={Handle_Traminal_Triger}>
                    Terminal
                </h1>
                <h1 className='cursor-pointer bg-slate-700 px-[5vw] py-[0.5vw] rounded-lg' onClick={Handle_Presentation_Triger}>
                    Presentation
                </h1>
            </div>
            {TrigerTarminal ? (
                <div className='p-[1vw] h-[90vh] bg-black overflow-y-auto pt-[4vh] pb-[8vh]' style={{ whiteSpace: 'pre-wrap' }}>
                    {output}
                </div>
            ) : (
                <div className='p-[1vw] h-[90vh] overflow-y-auto pt-[4vh] pb-[8vh] '>
                    <Slider />
                </div>
            )}
        </div>
    )
}
