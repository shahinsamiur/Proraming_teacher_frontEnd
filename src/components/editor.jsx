import React from 'react'
import EditorComponents from "./EditorComponent"

export default function editor() {
    return (
        <div className='w-[50vw] h-full overflow-hidden'>
            <div className='w-full h-[3vw] flex justify-center items-center border-b-2 border-t-2 rounded-md'>Code Editor</div>
            <EditorComponents />
        </div>
    )
}
