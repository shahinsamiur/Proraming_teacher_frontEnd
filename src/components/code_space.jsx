import React from 'react';
import Editor from "./EditorComponent";
import { FaPython, FaRegLightbulb } from "react-icons/fa";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { IoChatboxOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { set_right_side_state } from "../reduxSlices/check";
import Presentation from "./right_side_components/presentation";
import Inbox from './inbox';
import Canvas from './canvas';

export default function Code_space() {
    const Right_side_state = useSelector((state) => state.Check.Right_side_state);
    const dispatch = useDispatch();

    const TrigerPPT = () => {
        dispatch(set_right_side_state("presentation"));
    };

    const Trigercanvas = () => {
        dispatch(set_right_side_state("canvas"));
    };

    const TrigerInbox = () => {
        dispatch(set_right_side_state("inbox"));
    };

    return (
        <div className='w-full h-[90%] flex flex-row gap-[2%] overflow-hidden'>
            {/* Left Side */}
            <div className='w-[49%] h-full border-[0.01vw] border-[#2f2f2f]'>
                <div className='w-full h-[8%] border-b-[0.01vw] border-[#2f2f2f]'>
                    <div className='w-[20%] h-full bg-[#101010] flex justify-center items-center gap-[0.7vw] border-b-[#08618e] border-b-2'>
                        <FaPython className='text-[#08618e]' />
                        <span className='text-[0.9vw]'>app.py</span>
                    </div>
                </div>
                <Editor />
            </div>

            {/* Right Side */}
            <div className='w-[49%] h-full border-[0.01vw] border-[#2f2f2f]'>
                <div className='w-full h-[8%] border-[0.01vw] border-[#2f2f2f]' />
                {Right_side_state === "presentation" ? (
                    <Presentation />
                ) : Right_side_state === "canvas" ? (
                    <Canvas />
                ) : (
                    <Inbox />
                )}

                {/* Menu Icons */}
                <div className='w-full h-[9%] flex justify-center gap-[20%] border-t-[0.01vw] border-[#2f2f2f] items-center'>
                    <TfiLayoutSliderAlt
                        className={`text-[2vw] cursor-pointer ${
                            Right_side_state === "presentation" ? "text-[#31b8d6]" : "text-[#08618e]"
                        }`}
                        onClick={TrigerPPT}
                    />
                    <FaRegLightbulb
                        className={`text-[2vw] cursor-pointer ${
                            Right_side_state === "canvas" ? "text-[#31b8d6]" : "text-[#08618e]"
                        }`}
                        onClick={Trigercanvas}
                    />
                    <IoChatboxOutline
                        className={`text-[2vw] cursor-pointer ${
                            Right_side_state === "inbox" ? "text-[#31b8d6]" : "text-[#08618e]"
                        }`}
                        onClick={TrigerInbox}
                    />
                </div>
            </div>
        </div>
    );
}
