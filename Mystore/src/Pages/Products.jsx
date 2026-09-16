import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../Layout/AxiosInstance";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/products"
      );

      const data = response.data.map((item) => ({
        id: item._id,
        name: item.productName,
        description: item.productDescription,
        price: Number(item.productPrice),
        image: `http://localhost:3000/uploads/${item.image}`,
      }));

      setProducts(data);
    } catch (error) {
      console.log("Products Error:", error);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await axiosInstance.post(
        "/add-cart",
        {
          productId: product.id,
          quantity: 1,
        }
      );

      alert(
        response.data.message ||
          "Product Added Successfully"
      );

      navigate("/cart");
    } catch (error) {
      console.log("Add Cart Error:", error);

      if (error.response?.status === 401) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Failed to add product to cart"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((item) => (
          <div
            className="col-md-3 mb-4"
            key={item.id}
          >
            <div className="card h-100 shadow">

              <img
                src={item.image}
                alt={item.name}
                className="card-img-top"
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body d-flex flex-column">

                <h5>
                  {item.name}
                </h5>

                <p
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "48px",
                    lineHeight: "24px",
                  }}
                >
                  {item.description}
                </p>

                <h4 className="text-primary">
                  ₹ {item.price}
                </h4>

                <button
                  className="btn btn-primary w-100 mt-auto"
                  onClick={() => addToCart(item)}
                >
                  Add To Cart
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;