import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../Layout/AxiosInstance";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [addresses, setAddresses] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loadingAddresses, setLoadingAddresses] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);

    useEffect(() => {
        if (user) {
            fetchAddresses();
            fetchOrders();
        }
    }, []);

    if (!user) {
        return <Navigate to="/login" />;
    }

    const fetchAddresses = async () => {
        try {
            const response = await axiosInstance.get("/addresses");

            console.log("Addresses Response:", response.data);

            setAddresses(
                Array.isArray(response.data)
                    ? response.data
                    : response.data.addresses || []
            );
        } catch (error) {
            console.log(
                "Address Error:",
                error.response?.data || error.message
            );
        } finally {
            setLoadingAddresses(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axiosInstance.get("/orders");

            console.log("Orders Response:", response.data);

            if (Array.isArray(response.data)) {
                setOrders(response.data);
            } else if (Array.isArray(response.data.orders)) {
                setOrders(response.data.orders);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.log(
                "Orders Error:",
                error.response?.data || error.message
            );

            if (error.response?.status === 401) {
                alert("Session expired. Please login again.");
            }
        } finally {
            setLoadingOrders(false);
        }
    };

    return (
        <div className="container my-5">

            <div className="row g-4">

                <div className="col-lg-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body text-center p-4">

                            <i
                                className="bi bi-person-circle text-primary"
                                style={{ fontSize: "100px" }}
                            ></i>

                            <h2 className="mt-3">
                                My Profile
                            </h2>

                            <hr />

                            <div className="text-start">

                                <div className="mb-3">
                                    <small className="text-muted">
                                        Name
                                    </small>

                                    <h5>
                                        {user.name}
                                    </h5>
                                </div>

                                <div className="mb-3">
                                    <small className="text-muted">
                                        Email
                                    </small>

                                    <h5>
                                        {user.email}
                                    </h5>
                                </div>

                                {user.phone && (
                                    <div className="mb-3">
                                        <small className="text-muted">
                                            Phone
                                        </small>

                                        <h5>
                                            {user.phone}
                                        </h5>
                                    </div>
                                )}

                                <div>
                                    <small className="text-muted">
                                        User ID
                                    </small>

                                    <p className="small text-break">
                                        {user._id || user.id}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-lg-8">

                    <div className="card shadow border-0 rounded-4 mb-4">

                        <div className="card-header bg-white p-4">
                            <h3 className="mb-0">
                                My Addresses
                            </h3>
                        </div>

                        <div className="card-body p-4">

                            {loadingAddresses ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary"></div>
                                </div>
                            ) : addresses.length === 0 ? (
                                <div className="text-center py-4">

                                    <i
                                        className="bi bi-geo-alt text-muted"
                                        style={{ fontSize: "50px" }}
                                    ></i>

                                    <h5 className="mt-3">
                                        No saved addresses
                                    </h5>

                                </div>
                            ) : (
                                addresses.map((address, index) => (

                                    <div
                                        key={address._id}
                                        className="border rounded-4 p-4 mb-3"
                                    >

                                        <div className="d-flex justify-content-between">

                                            <div>

                                                <h5 className="fw-bold">

                                                    {address.firstName}{" "}
                                                    {address.lastName}

                                                    {index === 0 && (
                                                        <span className="badge bg-primary ms-2">
                                                            Address
                                                        </span>
                                                    )}

                                                </h5>

                                                <p className="mb-1">
                                                    {address.email}
                                                </p>

                                                <p className="mb-1">
                                                    {address.phone}
                                                </p>

                                                <p className="mb-1">
                                                    {address.street}
                                                    {address.apartment &&
                                                        `, ${address.apartment}`}
                                                </p>

                                                <p className="mb-1">
                                                    {address.city},{" "}
                                                    {address.state}
                                                </p>

                                                <p className="mb-1">
                                                    {address.zip}
                                                </p>

                                                <p className="mb-0">
                                                    {address.country}
                                                </p>

                                            </div>

                                            <i
                                                className="bi bi-geo-alt-fill text-primary"
                                                style={{ fontSize: "30px" }}
                                            ></i>

                                        </div>

                                    </div>

                                ))
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;