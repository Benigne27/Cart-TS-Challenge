import React from "react";
import Landing from "./pages/index";
import Cart from "./pages/cart";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="cart-products">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
