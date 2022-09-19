import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './assets/HomePage';
import SignInPage from './assets/SignInPage';
import NavBar from './assets/NavBar';
import SignUpPage from './assets/SignUpPage';
import SearchResultPage from './assets/SearchResultPage';
import ServiceDetailPage from './assets/ServiceDetailPage';
import ShopDetailPage from './assets/ShopDetailPage';
import AllBookingsPage from './assets/AllBookingsPage';
import BusinessNavBar from './assets/BusinessNavBar';
import ManageProfilePage from './assets/ManageProfilePage';
import ManageShopsPage from './assets/ManageShopPage';
import LocationMapPage from './assets/LocationMapPage';
import GoogleSignIn from './assets/GoogleSignIn';


export default function App() {
  document.body.style.backgroundColor = "#F3E3CF";

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<NavBar />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<GoogleSignIn />} />
        <Route path="business" element={<BusinessNavBar />} >
          <Route path="profile" element={<ManageProfilePage />} />
          <Route path="shops" element={<ManageShopsPage />} />
        </Route>
        <Route exact path="/signIn" element={<SignInPage />} />
        <Route exact path="/signUp" element={<SignUpPage />} />
        <Route path="/search/" element={<SearchResultPage />}>
          <Route path=":name/:method" element={<SearchResultPage />} />
        </Route>
        <Route path="/user/">
          <Route path="getAllBookings/:userId" element={<AllBookingsPage />} />
        </Route>
        <Route path="/serviceDetailPage/" element={<ServiceDetailPage />}>
          <Route path=":id" element={<ServiceDetailPage />} />
        </Route>
        <Route path="/LocationMapPage/" element={<LocationMapPage />}>
          <Route path=":id" element={<LocationMapPage />} />
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
