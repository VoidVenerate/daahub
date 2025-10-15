import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home/Home'
import './App.css'
import Category from './Pages/Category/Category'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
      </Routes>
    </>
  )
}

export default App
