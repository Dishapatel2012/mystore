import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Layout/AxiosInstance";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [addresses, setAddresses] = useState([]);

  const [showNewAddress, setShowNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    saveAddress: false,
    billingSame: true,
  });

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/cart");

      setCartItems(response.data.items || []);
      setTotal(Number(response.data.total) || 0);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axiosInstance.get("/addresses");

      setAddresses(response.data || []);

      if (response.data.length > 0) {
        const address = response.data[0];

        setSelectedAddress(address._id);

        setFormData({
          firstName: address.firstName || "",
          lastName: address.lastName || "",
          email: address.email || "",
          phone: address.phone || "",
          street: address.street || "",
          apartment: address.apartment || "",
          city: address.city || "",
          state: address.state || "",
          zip: address.zip || "",
          country: address.country || "",
          saveAddress: false,
          billingSame: true,
        });
      } else {
        const user = JSON.parse(localStorage.getItem("user"));

        setShowNewAddress(true);

        setFormData((prev) => ({
          ...prev,
          firstName: user?.name?.split(" ")[0] || "",
          lastName: user?.name?.split(" ").slice(1).join(" ") || "",
          email: user?.email || "",
        }));
      }
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address._id);
    setShowNewAddress(false);

    setFormData({
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      email: address.email || "",
      phone: address.phone || "",
      street: address.street || "",
      apartment: address.apartment || "",
      city: address.city || "",
      state: address.state || "",
      zip: address.zip || "",
      country: address.country || "",
      saveAddress: false,
      billingSame: true,
    });
  };

  const handleNewAddress = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    setShowNewAddress(true);
    setSelectedAddress("");

    setFormData({
      firstName: user?.name?.split(" ")[0] || "",
      lastName:
        user?.name?.split(" ").slice(1).join(" ") || "",
      email: user?.email || "",
      phone: "",
      street: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      saveAddress: true,
      billingSame: true,
    });
  };

  const placeOrder = async () => {
    try {

      if (cartItems.length === 0) {
        alert("Your cart is empty");
        navigate("/cart");
        return;
      }

      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone ||
        !formData.street ||
        !formData.city ||
        !formData.state ||
        !formData.zip ||
        !formData.country
      ) {
        alert("Please fill all required details");
        return;
      }

      let addressId = selectedAddress;

      if (showNewAddress && formData.saveAddress) {
        const addressResponse = await axiosInstance.post(
          "/addresses",
          formData
        );

        addressId = addressResponse.data.address._id;

        setAddresses((prev) => [
          addressResponse.data.address,
          ...prev,
        ]);
      }

      const orderData = {
        addressId,
        cartItems,
        total,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
        billingSame: formData.billingSame,
      };

      const response = await axiosInstance.post('/api/payment/create-order', {
        amount: total, // Amount in rupees
        currency: 'INR',
      });

      const { id: order_id, amount, currency } = response.data;

      // Set up RazorPay options
      const options = {
        key: "rzp_test_TRFhAMOFlFGZN5", // Replace with your RazorPay Key ID
        amount: amount,
        currency: currency,
        name: "My Store",
        description: "Test Transaction",
        order_id: order_id,
        handler: async (response) => {
          console.log(response,"response")
          const res = await axiosInstance.post(
            "/place-order",
            {orderData,response}
          );

          alert(
            res.data.message ||
            "Order placed successfully"
          );

        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      setCartItems([]);
      setTotal(0);

      navigate("/order");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Order Failed"
      );
    }
  };

  return (
    <div className="container my-5">
      <div className="row">

        <div className="col-lg-8">

          <div className="card border-0 shadow rounded-4 mb-4">
            <div className="card-header bg-white p-4">
              <h3 className="mb-0">
                <span className="badge bg-primary rounded-circle me-3">
                  1
                </span>
                Customer Information
              </h3>
            </div>

            <div className="card-body p-4">
              <div className="row">

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">
                    First Name
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">
                    Last Name
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control form-control-lg"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </div>
          </div>

          {addresses.length > 0 && (
            <div className="card border-0 shadow rounded-4 mb-4">

              <div className="card-header bg-white p-4">
                <h3 className="mb-0">
                  <span className="badge bg-primary rounded-circle me-3">
                    2
                  </span>
                  Select Address
                </h3>
              </div>

              <div className="card-body p-4">

                {addresses.map((address) => (
                  <div
                    key={address._id}
                    className={`border rounded-3 p-3 mb-3 ${selectedAddress === address._id
                        ? "border-primary bg-light"
                        : ""
                      }`}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleAddressSelect(address)
                    }
                  >

                    <div className="d-flex">

                      <input
                        type="radio"
                        className="form-check-input me-3 mt-1"
                        checked={
                          selectedAddress ===
                          address._id
                        }
                        onChange={() =>
                          handleAddressSelect(address)
                        }
                      />

                      <div>

                        <h6 className="fw-bold">
                          {address.firstName}{" "}
                          {address.lastName}
                        </h6>

                        <p className="mb-1">
                          {address.street}
                          {address.apartment &&
                            `, ${address.apartment}`}
                        </p>

                        <p className="mb-1">
                          {address.city},{" "}
                          {address.state}{" "}
                          {address.zip}
                        </p>

                        <p className="mb-1">
                          {address.country}
                        </p>

                        <small className="text-muted">
                          {address.phone}
                        </small>

                      </div>

                    </div>

                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-outline-primary w-100"
                  onClick={handleNewAddress}
                >
                  + Add New Address
                </button>

              </div>
            </div>
          )}

          {showNewAddress && (
            <div className="card border-0 shadow rounded-4 mb-4">

              <div className="card-header bg-white p-4">
                <h3 className="mb-0">
                  <span className="badge bg-primary rounded-circle me-3">
                    3
                  </span>
                  Add New Address
                </h3>
              </div>

              <div className="card-body p-4">

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Street Address
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Apartment, Suite, etc.
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                  />
                </div>

                <div className="row">

                  <div className="col-md-4 mb-4">
                    <label className="form-label fw-semibold">
                      City
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-4">
                    <label className="form-label fw-semibold">
                      State
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-4">
                    <label className="form-label fw-semibold">
                      ZIP Code
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Country
                  </label>

                  <select
                    className="form-select"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Country
                    </option>

                    <option value="India">
                      India
                    </option>

                    <option value="United States">
                      United States
                    </option>

                    <option value="Canada">
                      Canada
                    </option>

                    <option value="Australia">
                      Australia
                    </option>

                    <option value="United Kingdom">
                      United Kingdom
                    </option>
                  </select>

                </div>

                <div className="form-check mb-3">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="saveAddress"
                    checked={formData.saveAddress}
                    onChange={handleChange}
                  />

                  <label className="form-check-label">
                    Save this address for future orders
                  </label>

                </div>

                <div className="form-check">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="billingSame"
                    checked={formData.billingSame}
                    onChange={handleChange}
                  />

                  <label className="form-check-label">
                    Billing address same as shipping
                  </label>

                </div>

              </div>
            </div>
          )}

        </div>

        <div className="col-lg-4">

          <div
            className="card border-0 shadow rounded-4 sticky-top"
            style={{ top: "20px" }}
          >

            <div className="card-header bg-primary text-white p-3">
              <h4 className="mb-0">
                Order Summary
              </h4>
            </div>

            <div className="card-body">

              {cartItems.length === 0 ? (
                <div className="text-center py-4">

                  <i
                    className="bi bi-cart-x text-muted"
                    style={{ fontSize: "50px" }}
                  ></i>

                  <h5 className="mt-3">
                    Your cart is empty
                  </h5>

                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping
                  </button>

                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="d-flex justify-content-between align-items-center mb-3"
                    >
                      <div>
                        <h6>
                          {item.productId?.productName}
                        </h6>

                        <small>
                          Qty: {item.quantity}
                        </small>
                      </div>

                      <strong>
                        ₹{" "}
                        {Number(
                          item.productId?.productPrice || 0
                        ) *
                          Number(item.quantity || 0)}
                      </strong>
                    </div>
                  ))}

                  <hr />

                  <div className="d-flex justify-content-between">
                    <h5>Total</h5>

                    <h5>
                      ₹ {total}
                    </h5>
                  </div>

                  <button
                    className="btn btn-primary w-100 mt-4 py-3"
                    onClick={placeOrder}
                  >
                    Place Order
                  </button>
                </>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;