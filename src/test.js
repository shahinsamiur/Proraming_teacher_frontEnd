import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {incrise} from './reduxSlices/check'
export default function Test() {
    const dispatch=useDispatch()
    const value=useSelector((state)=>state.testi)
    console.log(value)
  return (
    <>
    <div>Test</div>

    <button onClick={()=>dispatch(incrise())}>clicked {value.languge}  times</button>
    
    </>
  )
}
