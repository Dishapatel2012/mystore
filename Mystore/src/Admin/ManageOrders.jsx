import React, { useEffect, useState } from "react";
import axiosInstance from "../Layout/AxiosInstance";

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axiosInstance.get(
                "http://localhost:3000/manage-orders"
            );

            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (id, orderStatus) => {
        try {
            const response = await axiosInstance.put(
                `http://localhost:3000/manage-orders/${id}`,
                {
                    orderStatus,
                }
            );

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === id
                        ? {
                              ...order,
                              orderStatus:
                                  response.data.orderStatus,
                          }
                        : order
                )
            );
        } catch (error) {
            console.log(error);
            alert("Failed to update order status");
        }
    };

    const deleteOrder = async (id) => {
        if (!window.confirm("Delete Order?")) {
            return;
        }

        try {
            await axiosInstance.delete(
                `http://localhost:3000/manage-orders/${id}`
            );

            setOrders((prevOrders) =>
                prevOrders.filter(
                    (order) => order._id !== id
                )
            );
        } catch (error) {
            console.log(error);
            alert("Failed to delete order");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Manage Orders</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>User</th>
                            <th>Products</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center"
                                >
                                    No Orders Found
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id}>
                                    <td>
                                        <strong>
                                            {order.userId?.name ||
                                                "User"}
                                        </strong>

                                        <br />

                                        <small className="text-muted">
                                            {order.userId?.email ||
                                                ""}
                                        </small>
                                    </td>

                                    <td>
                                        {order.items?.map(
                                            (item) => (
                                                <div
                                                    key={
                                                        item._id
                                                    }
                                                    className="mb-2"
                                                >
                                                    <strong>
                                                        {item
                                                            .productId
                                                            ?.productName ||
                                                            "Product"}
                                                    </strong>

                                                    <br />

                                                    Qty:{" "}
                                                    {
                                                        item.quantity
                                                    }

                                                    <hr />
                                                </div>
                                            )
                                        )}
                                    </td>

                                    <td>
                                        <strong>
                                            ₹{order.total}
                                        </strong>
                                    </td>

                                    <td>
                                        <select
                                            className="form-select"
                                            value={
                                                order.orderStatus ||
                                                "Pending"
                                            }
                                            onChange={(e) =>
                                                updateStatus(
                                                    order._id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="Pending">
                                                Pending
                                            </option>

                                            <option value="Processing">
                                                Processing
                                            </option>

                                            <option value="Shipped">
                                                Shipped
                                            </option>

                                            <option value="Delivered">
                                                Delivered
                                            </option>
                                        </select>
                                    </td>

                                    <td>
                                        {order.createdAt
                                            ? new Date(
                                                  order.createdAt
                                              ).toLocaleDateString()
                                            : "-"}
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                deleteOrder(
                                                    order._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;