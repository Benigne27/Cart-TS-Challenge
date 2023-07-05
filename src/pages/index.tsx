import { useState } from "react";
import "../styles/index.css";

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
}

const Landing = () => {
  const [theData, setTheData] = useState<Product[]>([]);
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      setTheData(data);
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
  //Initialize cart items and total price as empty and 0 respectively.
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const addToCart = (detail: Product) => {
    //check if the product is already in the cart.
    const itemInCart = cartItems.find((item) => item.id === detail.id);
    if (itemInCart) {
      //if it is already in the cart, then update the quantity.
      const updateCartItems = cartItems.map((item) =>
        item.id === detail.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updateCartItems);
    } else {
      //if the product is not in the cart, add it.
      const updateCartItems = [...cartItems, { ...detail, quantity: 1 }];
      setCartItems(updateCartItems);
    }
    //update the total price
    setTotalPrice(totalPrice + detail.price);
  };
  return (
    <>
      <br />
      <div className="main-products">
        {theData.map((detail) => (
          <div
            className="product-detail"
            key={detail.id}
            onClick={() => addToCart(detail)}
          >
            <div className="product-image">
              <img src={detail.image} className="theImages" />
            </div>
            <h3 className="title">{detail.title}</h3>
            <h4 className="category">{detail.category}</h4>
            <p className="description">{detail.description}</p>
            <h3 className="price">{detail.price}$</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Landing;
