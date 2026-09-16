import React from "react";

const About = () => {
  return (
    <>
      <section className="bg-light py-3">
        <hr className="m-0 border-secondary opacity-25" />
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <span className="badge bg-primary px-3 py-2 mb-3">
                About MyStore
              </span>

              <h1 className="fw-bold display-4">
                We Make Online Shopping
                <span className="text-primary"> Easy & Secure</span>
              </h1>

              <p className="text-secondary mt-4 fs-5">
                Welcome to <strong>MyStore</strong>, your trusted destination for
                premium fashion, electronics, accessories, and lifestyle
                products. We believe that shopping should be simple, enjoyable,
                and affordable for everyone.
              </p>

              <p className="text-secondary">
                Our mission is to deliver high-quality products with excellent
                customer service, fast shipping, and secure payments.
              </p>

              <button className="btn btn-primary btn-lg mt-3">
                Shop Now
              </button>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=700"
                className="img-fluid rounded-4 shadow"
                alt="About"
              />
            </div>

          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row text-center">

            <div className="col-md-3">
              <h2 className="text-primary fw-bold">10K+</h2>
              <p>Happy Customers</p>
            </div>

            <div className="col-md-3">
              <h2 className="text-primary fw-bold">500+</h2>
              <p>Premium Products</p>
            </div>

            <div className="col-md-3">
              <h2 className="text-primary fw-bold">50+</h2>
              <p>Top Brands</p>
            </div>

            <div className="col-md-3">
              <h2 className="text-primary fw-bold">24/7</h2>
              <p>Customer Support</p>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose Us?</h2>
            <p className="text-secondary">
              We provide the best shopping experience.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-lg-4">
              <div className="card border-0 shadow text-center p-4 h-100">
                <i className="bi bi-truck fs-1 text-primary"></i>
                <h4 className="mt-3">Fast Delivery</h4>
                <p className="text-secondary">
                  Free and fast delivery across the country with secure packaging.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow text-center p-4 h-100">
                <i className="bi bi-shield-check fs-1 text-primary"></i>
                <h4 className="mt-3">Secure Payment</h4>
                <p className="text-secondary">
                  Your payment information is protected with advanced security.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow text-center p-4 h-100">
                <i className="bi bi-arrow-repeat fs-1 text-primary"></i>
                <h4 className="mt-3">Easy Returns</h4>
                <p className="text-secondary">
                  Hassle-free returns and exchanges within 7 days.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section className="py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold">Meet Our Team</h2>
            <p className="text-secondary">
              Passionate people behind MyStore.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-lg-4">
              <div className="card shadow border-0 text-center">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="card-img-top"
                  alt="CEO"
                />
                <div className="card-body">
                  <h5>John Smith</h5>
                  <p className="text-primary">Founder & CEO</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card shadow border-0 text-center">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  className="card-img-top"
                  alt="Manager"
                />
                <div className="card-body">
                  <h5>Emma Johnson</h5>
                  <p className="text-primary">Marketing Manager</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card shadow border-0 text-center">
                <img
                  src="https://randomuser.me/api/portraits/men/55.jpg"
                  className="card-img-top"
                  alt="Developer"
                />
                <div className="card-body">
                  <h5>David Wilson</h5>
                  <p className="text-primary">Lead Developer</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default About;