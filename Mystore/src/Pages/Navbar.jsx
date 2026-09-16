import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar bg-white py-4">
        <div className="container d-flex justify-content-between align-items-center">
          <h1
            className="fw-bold m-0 text-primary"
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            MyStore
          </h1>

          <form style={{ width: "500px" }}>
            <div
              className="input-group shadow-sm"
              style={{
                borderRadius: "50px",
                overflow: "hidden",
                border: "1px solid #ddd",
              }}
            >
              <input
                type="search"
                className="form-control border-0 px-4"
                placeholder="Search Products"
                style={{
                  height: "55px",
                  boxShadow: "none",
                }}
              />

              <button
                className="btn text-white"
                type="submit"
                style={{
                  background: "#0d6efd",
                  width: "85px",
                }}
              >
                <i className="bi bi-search fs-4"></i>
              </button>
            </div>
          </form>

          <div className="d-flex align-items-center">
            {!user ? (
              <>
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleSignIn}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                {user?.role === "user" && (
                  <Link
                    to="/cart"
                    className="btn btn-outline-success me-2 position-relative"
                  >
                    <i className="bi bi-cart3"></i>

                    <span className="ms-1">Cart</span>
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="btn btn-outline-primary rounded-circle me-2"
                >
                  <i className="bi bi-person-fill fs-4"></i>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <hr className="m-0" />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">

              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
 {user?.role !== "admin" && (
           <>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/order">
                  Order
                </Link>
              </li>
              </>
 )}
              {user?.role === "admin" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/manageproducts">
                      Manage Products
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/managecategories">
                      Manage Categories
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/manage-orders">
                      Manage Orders
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;