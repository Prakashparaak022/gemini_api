import React from "react";
import { useRouter } from "next/router";
import "react-alice-carousel/lib/alice-carousel.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import animationData from "../utils/Gradient.json";
import Lottie from "react-lottie";
import { arrayItems } from "../utils/optionList";

function Home() {
  const router = useRouter();
  const handleItemClick = (item) => {
    selectOption(item.id);
    router.push(`/${item.id}`);
  };

  const selectOption = (option) => {
    console.log("Selected option:", option);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <section className="hero">
        <div className="">
          <video className="background-video" autoPlay muted loop>
            <source src="/Overlay.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container mt-5">
          <div className="d-flex align-items-center justify-content-center">
            <h1 className="text-center title headerFont">
              Prakash<span className="green">'</span>s A
              <span className="green iSymbol">i</span>
            </h1>
            <div style={{ margin: 0, marginLeft: "5px" }}>
              <Lottie options={defaultOptions} height={40} width={40} />
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2 justify-content-center">
            {arrayItems.map((item) => (
              <div key={item.id} className="col">
                <div className="container grid text-center boxContainers">
                  <div
                    className="grid-child"
                    onClick={() => handleItemClick(item)}>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container mt-5">
          <h2 className="text-center title">What can our AI do?</h2>
          <Carousel
            autoPlay={true} // Enable auto-slide
            interval={3000} // Set auto-slide interval to 3 seconds
            showArrows={true} // Show navigation arrows
            showStatus={false} // Hide status indicator
            showThumbs={false} // Hide thumbnail navigation
            infiniteLoop={true} // Enable infinite loop
            centerMode={true} // Enable center mode for displaying three items in a row
            centerSlidePercentage={33.33} // Set the percentage width of each slide
          >
            {arrayItems.map((item) => (
              <div key={item.id} className="carousel-items">
                <div
                  className="container grid text-center grid-carousel"
                  style={{ height: "200px" }}>
                  <div
                    className="grid-child text-center"
                    onClick={() => handleItemClick(item)}>
                    <div className="grid-carousel1">
                      <h4>{item.name}</h4>
                    </div>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    </>
  );
}

export default Home;
