import React from 'react'
import Slider from "./swiper"
import { TiggerToPPT,TriggerToTerminal } from "../reduxSlices/check";
import { useDispatch, useSelector } from 'react-redux';
export default function Tarminalnav() {

    const dispatch = useDispatch()
    const TriggerTerminal = useSelector((state) => state.Check.TriggerTerminal)
    const OutPut = useSelector((state) => state.Check.output)
    const Handle_Traminal_Triger = () => {
        dispatch(TriggerToTerminal())
    }

    const Handle_Presentation_Triger = () => {
        dispatch(TiggerToPPT())
    }



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
            {TriggerTerminal ? (
                <div className='p-[1vw] h-[90vh] bg-black overflow-y-auto pt-[4vh] pb-[8vh]' style={{ whiteSpace: 'pre-wrap' }}>
                    {OutPut}
                </div>
            ) : (
                <div className='p-[1vw] h-[90vh] overflow-y-auto pt-[4vh] pb-[8vh] '>
                    <Slider />
                </div>
            )}
        </div>
    )
}
