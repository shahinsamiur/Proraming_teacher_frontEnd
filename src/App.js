import React,{useLayoutEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import EditorPage from './pages/editor_page'
import HomePage from './pages/dashboard'
import TerminalPage from './pages/terminalPage'
import Sss from './pages/sss'
import SignupForm from './components/v2/signup'
import SigninForm from './components/v2/signin'
export default function App() {








  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<HomePage />} />
        <Route path='/editor' element={<EditorPage />} />
        <Route path='/terminal' element={<TerminalPage />} />
        <Route path='/test' element={<Sss />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/signin' element={<SigninForm />} />

    
      </Routes>
    </BrowserRouter>
  )
}
