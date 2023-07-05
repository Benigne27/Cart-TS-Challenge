import React from "react";
import Landing from "./pages/index";
import Cart from "./pages/cart";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="cart-products">
        <button id="cart-button">Your Cart</button>
        <div className="heading">All Products</div>
        <Landing />
      </div>
    </div>
  );
};

export default App;
