import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import EditorPage from './pages/editor_page'
import HomePage from './pages/dashboard'
import TerminalPage from './pages/terminalPage'
import SignupForm from './pages/signup'
import SigninForm from './pages/signin'
export default function App() {








  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<HomePage />} />
        <Route path='/editor' element={<EditorPage />} />
        <Route path='/terminal' element={<TerminalPage />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/signin' element={<SigninForm />} />

    
      </Routes>
    </BrowserRouter>
  )
}
