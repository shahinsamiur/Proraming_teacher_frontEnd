import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import EditorPage from './pages/editor_page'
import HomePage from './pages/home_page'
import TerminalPage from './pages/terminalPage'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<HomePage />} />
        <Route path='/editor' element={<EditorPage />} />
        <Route path='/terminal' element={<TerminalPage />} />
    
      </Routes>
    </BrowserRouter>
  )
}
