// src/components/CodeEditor.js
import React, { useContext } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python'; // getting languge mode 
import 'ace-builds/src-noconflict/theme-twilight'; // getting theme 
import { MyContext } from '../contextAPI'
const CodeEditor = () => {

  const { code, setCode } = useContext(MyContext); // saving and getting code 


  
  return (
    <div className=' w-[50%] h-auto inline-block '>
      <h1 className='flex flex-row justify-center bg-[#232323] py-[2.4vh] '>Code Editor</h1>
      <AceEditor
        mode="python" // languge
        theme="twilight" // eidtor theme 
        name="python_code_editor" // name of code editor 
        onChange={setCode}
        value={code} 
        fontSize={14}
        width="100%"
        height="90vh"
        className='bg-[#252A33]'
      />

    </div>
  );
};

export default CodeEditor;
