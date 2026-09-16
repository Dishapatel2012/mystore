import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Layout/AxiosInstance";

const Login = () => {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginUser.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!loginUser.password.trim()) {
      alert("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post("/login", loginUser);

      console.log("Login Response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      alert(response.data.message || "Login Successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message || "Login Failed");
      } else if (error.request) {
        alert("Server is not responding.");
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <h2 className="text-center text-primary fw-bold mb-4">
                Login
              </h2>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={loginUser.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={loginUser.password}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Logging In..." : "Login"}
                </button>
              </form>

              <div className="text-center mt-3">
                <Link
                  to="/forgot-password"
                  className="text-decoration-none"
                >
                  Forgot Password?
                </Link>
              </div>

              <p className="text-center mt-4 mb-0">
                Don't have an account?{" "}
                <Link to="/sign-up">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;