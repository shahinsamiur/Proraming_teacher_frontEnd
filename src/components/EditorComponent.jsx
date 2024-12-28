import React, { useContext } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';

import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-monokai';
import "ace-builds/src-noconflict/worker-php"; 
import "ace-builds/src-noconflict/worker-javascript"; 
import { MyContext } from '../contextAPI';
import TerminalDemo from "./react-tarminal";
import "../App.css";

const CodeEditor = () => {
  const { code, updateCode ,EditorSetting} = useContext(MyContext);

  return (
    <div className="w-full h-full inline-block mt-[0vh] bg-inherit ">
      <AceEditor
        mode={EditorSetting.languageMode}
        theme={EditorSetting.theme}
        name="python_code_editor"
        onChange={updateCode}
        value={code}
        fontSize={EditorSetting.fontSize}
        width="99%"
        height="40vh"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          showGutter: EditorSetting.showGutter,
          showLineNumbers: EditorSetting.showLineNumbers,
          highlightActiveLine: EditorSetting.highlightActiveLine,
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
