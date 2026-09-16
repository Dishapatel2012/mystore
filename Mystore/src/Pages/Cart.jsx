import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Layout/AxiosInstance";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:3000/cart"
      );

      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axiosInstance.delete(
        `http://localhost:3000/cart/${id}`
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      await axiosInstance.put(
        `http://localhost:3000/cart/increase/${productId}`
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      await axiosInstance.put(
        `http://localhost:3000/cart/decrease/${productId}`
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.items.reduce(
    (sum, item) =>
      sum +
      Number(item.productId.productPrice) * Number(item.quantity),
    0
  );

  const proceedToCheckout = () => {
    navigate("/checkout", {
      state: {
        cartItems: cart.items,
        total,
      },
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Cart</h2>

      {cart.items.length === 0 ? (
        <div className="alert alert-warning">
          Cart is Empty
        </div>
      ) : (
        <>
          {cart.items.map((item) => (
            <div className="card mb-3" key={item._id}>
              <div className="row g-0">
                <div className="col-md-3">
                  <img
                    src={`http://localhost:3000/uploads/${item.productId.image}`}
                    alt={item.productId.productName}
                    className="img-fluid rounded-start"
                    style={{
                      height: "180px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-md-9">
                  <div className="card-body">
                    <h4>{item.productId.productName}</h4>

                    <p>{item.productId.productDescription}</p>

                    <h5>₹ {item.productId.productPrice}</h5>

                    <div className="d-flex align-items-center mb-3">
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          decreaseQuantity(item.productId._id)
                        }
                      >
                        -
                      </button>

                      <h5 className="mx-3 mt-2">
                        {item.quantity}
                      </h5>

                      <button
                        className="btn btn-success"
                        onClick={() =>
                          increaseQuantity(item.productId._id)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="btn btn-dark"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="text-end">
            <h2>Total : ₹ {total}</h2>

            <button
              className="btn btn-primary mt-3"
              onClick={proceedToCheckout}
            >
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;