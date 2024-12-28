import React, { useContext } from 'react';
// import Editor from "../EditorComponent";
import { FaPython } from "react-icons/fa";
// import { TfiLayoutSliderAlt } from "react-icons/tfi";
// import { IoChatboxOutline } from "react-icons/io5";
// import { useDispatch, useSelector } from 'react-redux';
// import { set_right_side_state } from "../../reduxSlices/check";
// import Presentation from "../right_side_components/presentation";
// import Inbox from './inbox';
// import Canvas from './canvas';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';

import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-monokai';
import "ace-builds/src-noconflict/worker-php"; // Ensure PHP worker is imported



import { MyContext } from '../../contextAPI';
import TerminalDemo from "../react-tarminal";




export default function Code_space() {
  const { code, updateCode ,EditorSetting} = useContext(MyContext);
  // const Right_side_state = useSelector((state) => state.Check.Right_side_state);
  // const dispatch = useDispatch();









  return (
    <div className='w-full h-[90%] flex flex-row gap-[2%] overflow-hidden'>
      {/* Left Side */}
      <div className='w-[49%] h-[100%] border-[0.01vw] border-[#2f2f2f] '>
        <div className='w-full h-[8%] border-b-[0.01vw] border-[#2f2f2f]'>
          <div className='w-[20%] h-full bg-[#101010] flex justify-center items-center gap-[0.7vw] border-b-[#08618e] border-b-2'>
            <FaPython className='text-[#08618e]' />
            <span className='text-[0.9vw]'>app.py</span>
          </div>
        </div>
        <AceEditor
          mode={EditorSetting.languageMode}
          theme={EditorSetting.theme}
          name="python_code_editor"
          onChange={updateCode}
          value={code}
          fontSize={EditorSetting.fontSize}
          width="100%"
          height="95%"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            showGutter: EditorSetting.showGutter,
            showLineNumbers: EditorSetting.showLineNumbers,
            highlightActiveLine: EditorSetting.highlightActiveLine,
            useWorker: false
          }}
        />
      </div>

      {/* Right Side */}
      <div className='w-[49%] h-full border-[0.01vw] border-[#2f2f2f] overflow-hidden'>
        <div className='w-full h-[8%] flex items-center justify-center font-light border-[0.01vw] border-[#2f2f2f]' >
          Terminal
        </div>
        <TerminalDemo />
      </div>
    </div>
  );
}
