import React from "react";
import LoginPage from "../pages/Login";
import UserRegistration from "../pages/UserRegistration";
import DashBoard from "../pages/DashBoard";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="registration" element={<UserRegistration />} />
      <Route path="dashBoard" element={<DashBoard />} />
      <Route path="product" element={<Product />} />
      <Route path="cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
