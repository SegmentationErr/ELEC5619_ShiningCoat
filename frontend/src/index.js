import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/index.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './assets/HomePage';
import NavBar from './assets/NavBar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<NavBar />} />
      <Route exact path="/" element={<HomePage />} />
    </Routes>
  </Router>
);
