import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/index.css';
import './css/app.css'

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './assets/HomePage';
import SignInPage from './assets/SignInPage';
import NavBar from './assets/NavBar';
import SignUpPage from './assets/SignUpPage';


export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<NavBar />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route exact path="/signIn" element={<SignInPage />} />
        <Route exact path="/signUp" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
