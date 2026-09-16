import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });


  const handleSignup = async (e) => {
    e.preventDefault();
    if (!user.name) {
      alert("Please select a name");
      return;
    }
    if (!user.email) {
      alert("Please enter email.");
      return;
    }
    if (!user.password) {
      alert("Please enter password.");
      return;
    }
    if (!user.confirmPassword) {
      alert("Please enter confirm password.");
      return;
    }
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signup`,
        user
      );

      alert(response.data.message);

      setUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user"
      });

    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }

  }


  return (
    <div className="container py-3">

      <div className="row justify-content-center">

        <div className="col-lg-5">

          <div className="card shadow border-0 rounded-4">

            <div className="card-body p-5">

              <h2 className="text-center fw-bold mb-4 text-primary">
                Create Account
              </h2>

              <form onSubmit={handleSignup}>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    value={user.confirmPassword}
                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Role</label>

                  <select
                    className="form-select"
                    value={user.role}
                    onChange={(e) =>
                      setUser({ ...user, role: e.target.value })
                    }
                  >
                    <option value="Select Role">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button className="btn btn-primary w-100 py-2">
                  Sign Up
                </button>

              </form>

              <p className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/login">Sign In</Link>
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SignUp;