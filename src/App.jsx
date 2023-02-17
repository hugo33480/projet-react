import React from 'react';
import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Detail from './Components/Detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="blogs" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
