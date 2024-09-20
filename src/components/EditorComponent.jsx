import React, { useContext } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-crimson_editor';
import { MyContext } from '../contextAPI';
import TerminalDemo from "./react-tarminal"
const CodeEditor = () => {
  const { code, updateCode,socket } = useContext(MyContext);

  // const handleDrag = (e, data) => {
  //   console.log(data)
  //   setTerminalHeight(prevHeight => Math.max(10, prevHeight - data.deltaY)); // Adjust height based on drag distance, with a minimum height
  // };

  return (
    <div className='w-full h-full inline-block mt-[0vh] border-x-2 border-b-2'>
      <AceEditor
        mode="python"
        theme="crimson_editor"
        name="python_code_editor"
        onChange={updateCode}
        value={code}
        fontSize={14}
        width="100%"
        height='45vh' // Adjust editor height dynamically
      />

      {/* Draggable Handle */}
      {/* <Draggable
        axis="y"
        onDrag={handleDrag}
        bounds={{ top: -terminalHeight +0, bottom: 0 }} // Limit dragging to prevent collapse
      >
        <div style={{ height: '10px', cursor: 'row-resize', backgroundColor: 'red', zIndex: 100 }} />
      </Draggable> */}

      {/* Terminal */}
        <div className="bg-white z-50 border-b-2" >
        <TerminalDemo />
        </div>
    </div>
  );
};

export default CodeEditor;
