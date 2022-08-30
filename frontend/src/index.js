import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/index.css'

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './assets/HomePage';
import SignInPage from './assets/SignInPage';
import NavBar from './assets/NavBar';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/" element={<HomePage />} />
        <Route exact path="/signIn" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
