import React, { createContext, useState, useEffect,useRef } from 'react';
import io from 'socket.io-client';




const MyContext = createContext(null);


const MyProvider = ({ children }) => {

  const socket = useRef(null);
  const [code, setCode] = useState(); // save code , code will save in localstorage 
  const [output, setOutput] = useState(''); // output for tarminal , tarminal output will never save in local storage 
  const [Languge, setLanguge] = useState("python"); // languge for code editor , default python
  const [TrigerTarminal, setTrigerTarminal] = useState(true);

useEffect(() => {
  if (!socket.current)socket.current = io('http://localhost:5000');


}, [])




  useEffect(() => {
    // this useEfect will run when the code update every time 
    // if code update then save in local storage , after any change in code 
    if (code && window.localStorage.getItem("code") !== null) window.localStorage.setItem("code", code)



      socket.current.on('runCodeResult', (result) => {
        console.log('Code execution result:', result);
        setOutput(result.output);
      });
  }, [code])


  useEffect(() => {
    // this will run when the code editor will open on browser 
    // cheching if any code saved in local storage if then set to update the code 
    if (window.localStorage.getItem("code")) setCode(window.localStorage.getItem("code"))
    else {
      window.localStorage.setItem("code", '# Python3.12.4 \n# Write Python code here !\n') // saving code comment on browser's storage 
      setCode('# Python3.12.4 \n# Write Python code here !\n') // updating the code editor here
    }

  }, [])

  const onRun = () => {
    socket.current.emit("runCode", { code });
  }

  return (
    <MyContext.Provider value={{ code, setCode, setOutput, output, setLanguge, Languge ,TrigerTarminal,setTrigerTarminal ,onRun,socket}}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext }