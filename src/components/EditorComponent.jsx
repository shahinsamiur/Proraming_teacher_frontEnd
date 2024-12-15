import React, { useContext } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import { MyContext } from '../contextAPI';
import TerminalDemo from "./react-tarminal";
import "../App.css";

const CodeEditor = () => {
  const { code, updateCode, socket } = useContext(MyContext);

  return (
    <div className="w-full h-full inline-block mt-[0vh] bg-inherit ">
      <AceEditor
        mode="python"
        theme="tomorrow_night"
        name="python_code_editor"
        onChange={updateCode}
        value={code}
        fontSize={12}
        width="99%"
        height="40vh"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          showGutter: true,
          showLineNumbers: true,
          highlightActiveLine: false,
        }}
      />

      {/* Terminal */}
      <div className='overflow-hidden h-[40%] w-[99%] '>
        <TerminalDemo />
      </div>
    </div>
  );
};

export default CodeEditor;
