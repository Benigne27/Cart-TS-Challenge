import { useEffect, useState } from "react";
import { Product } from "../pages/index";
import "../styles/index.css";
import "../styles/cart.css";
import BackToTop from "../components/BackToTop";

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [itemNumber] = useState(1);

  const ShowCart = () => {
    const item: any = localStorage.getItem("product");
    setCartItems(JSON.parse(item));
  };
  

  useEffect(() => {
    ShowCart();
  }, []);

  const removeCartItems = (ItemId: number) => {
    const item: any = localStorage.getItem("product");
    let allProducts: any = [];
    allProducts = JSON.parse(item);
    let remProd = [];
    if (allProducts !== null) {
      remProd = allProducts.filter((item: Product) => item.id !== ItemId);
      localStorage.setItem("product", JSON.stringify(remProd));
      ShowCart();
    }
  };

  const incrementItems = (ItemId: number) => {
    const item: any = localStorage.getItem("product");
    let allProducts: any = [];

    allProducts = JSON.parse(item);
    let updatedList: any = [];
    if (allProducts !== null) {
      for (let item of allProducts) {
        if (item.id === ItemId) {
          let currentnumber = item?.count || 1;
          item.count = Number(currentnumber) + 1;
        }
        updatedList.push(item);
      }
      localStorage.setItem("product", JSON.stringify(updatedList));
      ShowCart();
    }
  };

  const decrementItems = (ItemId: number) => {
    const item: any = localStorage.getItem("product");
    let allProducts: any = [];
    allProducts = JSON.parse(item);

    let updatedList: any = [];

    if (allProducts !== null) {
      for (let item of allProducts) {
        if (item.id === ItemId) {
          let currentnumber = item?.count || 1;
          if (currentnumber === 1) {
            removeCartItems(ItemId);
            return;
          }
          item.count = Number(currentnumber) - 1;
        }
        updatedList.push(item);
      }
      localStorage.setItem("product", JSON.stringify(updatedList));
      ShowCart();
    }
  };
  const calculateTotal = (): number => {
    let total = 0;
    cartItems.forEach((item) => {
      total += (item?.count || 1) * item?.price;
    });
    return total;
  };

  return (
    <div className="products-in-cart">
      <h1 id="cart">Cart</h1>

      {cartItems.map((detail) => (
        <div className="cart-product" key={detail.id}>
          <div className="product-detail-left">
            <div className="product-image">
              <img src={detail.image} className="theImages" alt="product" />
            </div>
          </div>
          <div className="product-detail-middle">
            <h4 className="title">{detail.title}</h4>
            <p className="price">${detail.price}</p>
            <div className="operators">
              <button
                className="op-button"
                onClick={() => decrementItems(detail.id)}
              >
                -
              </button>
              <p id="new-number">{detail?.count || itemNumber}</p>
              <button
                className="op-button"
                onClick={() => incrementItems(detail.id)}
              >
                +
              </button>
            </div>
          </div>
          <div className="product-detail-right">
            <h4>${(detail?.count || 1) * detail?.price}</h4>
            <button
              className="delete-button"
              onClick={() => removeCartItems(detail.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <div className="price-totals">
        {/* <h2 className="del-title">Delivery</h2> */}
        <div className="delivery-totals">
          <h3>TOTAL: ${calculateTotal()}</h3>
          <div className="below">
            <button className="below-button1">Proceed to Checkout</button>
            <button
              className="below-button2"
              onClick={() => (window.location.href = "/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default Cart;
