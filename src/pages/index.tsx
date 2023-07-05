import { useState } from "react";
import "../styles/index.css";
import BackToTop from "../components/BackToTop";
// import { Link } from "react-router-dom";

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
  description: string;
  count: number;
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

  const addToCart = (product: Product) => {
    const item: any = localStorage.getItem("product");
    var allProducts: any = [];
    console.log(JSON.parse(item));

    allProducts = JSON.parse(item);
    if (allProducts === null) {
      allProducts = [];
      allProducts.push(product);
    } else {
      var findSameItem = allProducts.filter(
        (item: Product) => item.id === product.id
      );
      console.log(findSameItem);
      if (findSameItem.length < 1) {
        allProducts.push(product);
      }
    }

    console.log(allProducts, product);
    localStorage.setItem("product", JSON.stringify(allProducts));
  };
  return (
    <div className="body">
      <span id="cart-button" onClick={() => (window.location.href = "/cart")}>
        <i className="bx bx-cart-alt"></i>
      </span>
      <div className="heading">All Products</div>
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
            <h3 className="price">${detail.price}</h3>
          </div>
        ))}
      </div>
      <BackToTop />
    </div>
  );
};

export default Landing;
