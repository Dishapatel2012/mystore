import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <div className="container">

        <div className="row">

          {/* Logo */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h2 className="fw-bold text-primary">MyStore</h2>

            <p className="text-white-50 mt-3">
              Discover premium fashion, accessories, and lifestyle products at
              affordable prices. Shop confidently with fast delivery and secure
              payment.
            </p>

            <div className="mt-4">
              <a href="#" className="text-light me-3 fs-4">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="#" className="text-light me-3 fs-4">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="#" className="text-light me-3 fs-4">
                <i className="bi bi-twitter-x"></i>
              </a>

              <a href="#" className="text-light fs-4">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>

            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50 text-decoration-none">Home</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none">Shop</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none">Categories</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold mb-3">Customer Service</h5>

            <ul className="list-unstyled">
              <li><a href="#" className="text-white-50 text-decoration-none">My Account</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none">Track Order</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none">Returns</a></li>
              <li><a href="#" className="text-white-50 text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>

            <p className="text-white-50">
              <i className="bi bi-geo-alt-fill me-2"></i>
              Ahmedabad, Gujarat
            </p>

            <p className="text-white-50">
              <i className="bi bi-envelope-fill me-2"></i>
              info@mystore.com
            </p>

            <p className="text-white-50">
              <i className="bi bi-telephone-fill me-2"></i>
              +91 98765 43210
            </p>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center">
          <p className="mb-0 text-white-50">
            © 2026 <span className="text-primary fw-bold">MyStore</span>. All
            Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;