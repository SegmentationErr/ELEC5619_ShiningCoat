import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/index.css';
import './css/app.css'

import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import HomePage from './assets/HomePage';
import SignInPage from './assets/SignInPage';
import NavBar from './assets/NavBar';
import SignUpPage from './assets/SignUpPage';
import SearchResultPage from './assets/SearchResultPage';


export default function App() {

  const { name, method } = useParams();

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<NavBar />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route exact path="/signIn" element={<SignInPage />} />
        <Route exact path="/signUp" element={<SignUpPage />} />
        <Route path="/search/" element={<SearchResultPage />}>
          <Route path=":name/:method" element={<SearchResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
