import React from 'react'
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './pages/Search';
import Watch from './pages/Watch';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/watch/:id" element={<Watch />} />
      {/* Add more routes here */}
    </Routes>
    </BrowserRouter>
  )
}
//AIzaSyC_cwAC79nGt2ZmxcmQ1FTKEpfVhYk2O9g
export default App;