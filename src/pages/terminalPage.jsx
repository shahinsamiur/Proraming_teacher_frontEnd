import React from 'react';
import "../App.css";
import Menu from '../components/v2/menu';
import Header from '../components/v2/header';
import Codepace from '../components/v2/code_space';

export default function TerminalPage() {
    return (
        <div className="bg-[#101010] w-full
                        h-screen flex justify-center 
                        overflow-hidden p-1 gap-[1vw] 
                        items-center text-white"
                        >
            < Menu />
            <div className="w-[90vw] h-[90vh] bg-[#151515] rounded-lg p-[1.5vw] flex flex-col gap-[1vw]">
                {/* header */}
                <Header />
                <Codepace />
            </div>
        </div>
    );
}
