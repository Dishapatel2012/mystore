import React from "react";

const Features = () => {
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

                <h3 className="mt-4 fw-semibold">{item.title}</h3>

                <p
                  className="text-secondary mt-3"
                  style={{ lineHeight: "1.8", fontSize: "17px" }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;