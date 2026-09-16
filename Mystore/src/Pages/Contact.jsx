import React from "react";

const Contact = () => {
  return (
    <section className="py-3 bg-light">
        <hr className="m-0 border-secondary opacity-25" />
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Contact Us</h1>
          <p className="text-muted">
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="row g-5">
          <div className="col-lg-5">

            <div className="card border-0 shadow-sm p-4 h-100">

              <h3 className="fw-bold mb-4">Get In Touch</h3>

              <div className="d-flex mb-4">
                <div className="me-3">
                  <i className="bi bi-geo-alt-fill text-primary fs-2"></i>
                </div>
                <div>
                  <h5>Address</h5>
                  <p className="text-muted mb-0">
                    Ahmedabad, Gujarat, India
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="me-3">
                  <i className="bi bi-telephone-fill text-primary fs-2"></i>
                </div>
                <div>
                  <h5>Phone</h5>
                  <p className="text-muted mb-0">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="me-3">
                  <i className="bi bi-envelope-fill text-primary fs-2"></i>
                </div>
                <div>
                  <h5>Email</h5>
                  <p className="text-muted mb-0">
                    info@mystore.com
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="me-3">
                  <i className="bi bi-clock-fill text-primary fs-2"></i>
                </div>
                <div>
                  <h5>Working Hours</h5>
                  <p className="text-muted mb-0">
                    Mon - Sat : 9:00 AM - 7:00 PM
                  </p>
                </div>
              </div>

            </div>

          </div>
          <div className="col-lg-7">

            <div className="card border-0 shadow-sm p-4">

              <h3 className="fw-bold mb-4">Send Message</h3>

              <form>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>

                </div>

                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="6"
                    placeholder="Write your message..."
                  ></textarea>
                </div>

                <button className="btn btn-primary px-5 py-2">
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </div>
        <div className="mt-5">

          <div className="card border-0 shadow-sm">

            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Ahmedabad,Gujarat&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;