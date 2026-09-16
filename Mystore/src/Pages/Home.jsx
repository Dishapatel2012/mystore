import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
     const [hello, setHello] = useState();

    const fetchHello = async () => {
        try {
            const response = await axios.get("http://localhost:3000");
            console.log(response.data);
            setHello(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchHello();
    }, []);

      const features = [
    {
      icon: "bi-truck",
      title: "Free Shipping",
      desc: "Nulla sit morbi vestibulum eros duis amet, consectetur vitae lacus. Ut quis tempor felis sed nunc viverra.",
    },
    {
      icon: "bi-piggy-bank",
      title: "Money Back Guarantee",
      desc: "Nullam gravida felis ac nunc tincidunt, sed malesuada justo pulvinar. Vestibulum nec diam vitae eros.",
    },
    {
      icon: "bi-percent",
      title: "Discount Offers",
      desc: "Nulla ipsum nisi vel adipiscing amet, dignissim consectetur ornare. Vestibulum quis posuere elit auctor.",
    },
    {
      icon: "bi-headset",
      title: "24/7 Support",
      desc: "Ipsum dolor amet sit consectetur adipiscing, nullam vitae euismod tempor nunc felis vestibulum ornare.",
    },
  ];
    return (
             <>
        <section className="py-3 bg-light">
             <hr className="m-0 border-secondary opacity-25" />
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-4 py-3 fs-6 mb-4">
                            New Collection 2025 {hello}
                        </span>
                        <h1
                            className="fw-bold text-dark"
                            style={{ fontSize: "65px", lineHeight: "1.1" }}
                        >
                            Discover Stylish <br />
                            <span className="text-primary border-bottom border-4 border-primary">
                                Fashion
                            </span>{" "}
                            For Every <br />
                            Season
                        </h1>
                        <p className="text-secondary fs-5 mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Ut elit tellus, luctus nec ullamcorper mattis,
                            pulvinar dapibus leo.
                        </p>
                        <div className="mt-5">
                            <button className="btn btn-primary btn-lg rounded-3 px-5 me-3">
                                Shop Now
                                <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                            <button className="btn btn-outline-secondary btn-lg rounded-3 px-5">
                                View Collection
                            </button>
                        </div>
                        <div className="d-flex gap-5 mt-5">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-truck fs-3 text-primary me-2"></i>
                                <strong>Free Shipping</strong>
                            </div>
                            <div className="d-flex align-items-center">
                                <i className="bi bi-shield-check fs-3 text-primary me-2"></i>
                                <strong>Secure Payment</strong>
                            </div>
                            <div className="d-flex align-items-center">
                                <i className="bi bi-arrow-repeat fs-3 text-primary me-2"></i>
                                <strong>Easy Returns</strong>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 position-relative text-center">
                        <img
                            src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-f-9.webp"
                            alt="Model"
                            className="img-fluid"
                        />
                        <div
                            className="position-absolute top-0 end-0 bg-primary text-white rounded-circle d-flex flex-column justify-content-center align-items-center"
                            style={{
                                width: "110px",
                                height: "110px",
                                right: "40px",
                                top: "40px",
                            }}
                        >
                            <h2 className="fw-bold m-0">30%</h2>
                            <small>OFF</small>
                        </div>
                        <div
                            className="card shadow border-0 position-absolute"
                            style={{
                                width: "260px",
                                top: "150px",
                                left: "20px",
                                borderRadius: "20px",
                            }}
                        >
                            <div className="card-body d-flex align-items-center">
                                <img
                                    src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-4.webp"
                                    className="rounded"
                                    alt=""
                                    style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                />
                                <div className="ms-3 text-start">
                                    <h5 className="mb-1">Summer Collection</h5>
                                    <h4 className="text-primary">$89.99</h4>
                                </div>
                            </div>
                        </div>
                        <div
                            className="card shadow border-0 position-absolute"
                            style={{
                                width: "250px",
                                bottom: "50px",
                                right: "0",
                                borderRadius: "20px",
                            }}
                        >
                            <div className="card-body d-flex align-items-center">
                                <img
                                    src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-3.webp"
                                    className="rounded"
                                    alt=""
                                    style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                />
                                <div className="ms-3 text-start">
                                    <h5 className="mb-1">Casual Wear</h5>
                                    <h4 className="text-primary">$59.99</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    <section className="py-5 bg-light">
      <div className="container">
        <div className="row g-4">
          {features.map((item, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="text-center p-4 h-100">

                <i
                  className={`bi ${item.icon} text-dark`}
                  style={{ fontSize: "55px" }}
                ></i>

                <h3 className="mt-4 fw-semibold">
                  {item.title}
                </h3>

                <p
                  className="text-secondary mt-3"
                  style={{
                    lineHeight: "1.8",
                    fontSize: "17px",
                  }}
                >
                  {item.desc}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>
     </section>
    </>
  );
};

export default Home;