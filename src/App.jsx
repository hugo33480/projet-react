import React from 'react';
import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Home from './Components/Home';
import Detail from './Components/Detail';
import SignUp from './Components/SignUp';
import Login from './Components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="blogs" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
