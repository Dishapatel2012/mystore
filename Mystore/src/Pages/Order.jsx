import React, { useEffect, useState } from "react";
import axiosInstance from "../Layout/AxiosInstance";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/orders");
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">
          No Orders Found
        </div>
      ) : (
        orders.map((order) => (
          <div className="card shadow mb-4" key={order._id}>

            <div className="card-header bg-primary text-white d-flex justify-content-between">
              <div>
                <strong>Order ID:</strong> {order._id}
              </div>

              <div>
                <strong>Status:</strong>{" "}
                <span>
                  {order.orderStatus || "Pending"}
                </span>
              </div>
            </div>

            <div className="card-body">
              <div className="row">

                {order.items?.map((item) => (
                  <div
                    className="col-md-6 mb-3"
                    key={item._id}
                  >
                    <div className="card h-100">
                      <div className="row g-0">

                        <div className="col-4">
                          <img
                            src={`http://localhost:3000/uploads/${item.productId?.image}`}
                            className="img-fluid rounded-start"
                            alt={
                              item.productId
                                ?.productName ||
                              "Product"
                            }
                            style={{
                              height: "120px",
                              width: "100%",
                              objectFit: "cover"
                            }}
                          />
                        </div>

                        <div className="col-8">
                          <div className="card-body">
                            <h5>
                              {item.productId
                                ?.productName ||
                                "Product"}
                            </h5>

                            <p className="mb-1">
                              Price: ₹
                              {item.productId
                                ?.productPrice || 0}
                            </p>

                            <p className="mb-1">
                              Quantity:{" "}
                              {item.quantity}
                            </p>

                            <p className="fw-bold text-success">
                              Total: ₹
                              {item.quantity *
                                (item.productId
                                  ?.productPrice ||
                                  0)}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}

              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <h5>
                  Order Total:{" "}
                  <span className="text-success">
                    ₹ {order.total}
                  </span>
                </h5>

                <h5>
                  Date:{" "}
                  {order.createdAt
                    ? new Date(
                      order.createdAt
                    ).toLocaleDateString()
                    : "-"}
                </h5>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;