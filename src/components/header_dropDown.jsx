
'use client'
import React, { useContext } from 'react';
import { Dropdown, DropdownAction, DropdownContent, DropdownItem, DropdownList } from 'keep-react'
import { MyContext } from '../contextAPI';
import Python from "./Langue_icons_components/python" // python logo components 
import NodeJs from "./Langue_icons_components/nodejs"// Nodejs logo components 
import JAVA from "./Langue_icons_components/java"// java logo components 

const DropdownComponent = () => {
  const { Languge, setLanguge } = useContext(MyContext) // selected programing languge for code editor

  return (
    <Dropdown trigger="click" className=''>
      <DropdownAction className='bg-[#242424] rounded-md w-[10vw]'>

        {Languge === "python" ? <Python /> : Languge === "NodeJs" ? <NodeJs /> : Languge === "JAVA" ? <JAVA /> : null}
     
      </DropdownAction>
     
      <DropdownContent className='bg-[#242424] z-40 rounded-md w-[10vw] flex flex-col justify-center items-center'>
        
        <DropdownList>
         
          <DropdownItem onClick={(e) => setLanguge("python")} className='cursor-pointer'>
            <Python />
          </DropdownItem>

          <DropdownItem onClick={(e) => setLanguge("NodeJs")} className='cursor-pointer'>
            <NodeJs />
          </DropdownItem>

          <DropdownItem onClick={(e) => setLanguge("JAVA")} className='cursor-pointer'>
            <JAVA />
          </DropdownItem>

        </DropdownList>
      </DropdownContent>
    </Dropdown>
  )
}
export default DropdownComponent