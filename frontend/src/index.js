import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/index.css';
import './css/app.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './assets/HomePage';
import SignInPage from './assets/SignInPage';
import NavBar from './assets/NavBar';
import SignUpPage from './assets/SignUpPage';
import SearchResultPage from './assets/SearchResultPage';
import ServiceDetailPage from './assets/ServiceDetailPage';
import ShopDetailPage from './assets/ShopDetailPage';
import BusinessNavBar from './assets/BusinessNavBar';
import ManageProfilePage from './assets/ManageProfilePage';


export default function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<NavBar />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="business" element={<BusinessNavBar />} >
        </Route>
          <Route path="/business/profile" element={<ManageProfilePage />} />
        <Route exact path="/signIn" element={<SignInPage />} />
        <Route exact path="/signUp" element={<SignUpPage />} />
        <Route path="/search/" element={<SearchResultPage />}>
          <Route path=":name/:method" element={<SearchResultPage />} />
        </Route>
        <Route path="/serviceDetailPage/" element={<ServiceDetailPage />}>
          <Route path=":id" element={<ServiceDetailPage />} />
        </Route>
        <Route path="/shopDetailPage/" element={<ShopDetailPage />}>
          <Route path=":id" element={<ShopDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
