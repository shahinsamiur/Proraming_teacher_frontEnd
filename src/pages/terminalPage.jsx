import React ,{useContext} from 'react';
import "../App.css";
import Menu from '../components/v2/menu';
import Header from '../components/v2/header';
import CodeSpace from '../components/v2/code_space';
import CodeSpace2 from '../components/v2/CodeSpace2';
import { MyContext } from '../contextAPI';
import EXMenu from '../components/v2/exMenu';
import PresentationFull from '../components/v2/presentationFull';





export default function TerminalPage() {

    const {isToggled,simpleState}=useContext(MyContext)
    


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
                {isToggled && simpleState=="code"?<CodeSpace2 />:isToggled && simpleState=="presentation"?<PresentationFull />:< CodeSpace />}


                {isToggled?<EXMenu />:null}
                
            </div>
        </div>
    );
}
