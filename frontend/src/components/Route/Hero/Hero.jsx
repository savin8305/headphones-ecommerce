import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const images = [
  "https://themes.rslahmed.dev/rafcart/assets/images/banner-1.jpg",
  "https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg",

  "https://themes.rslahmed.dev/rafcart/assets/images/banner-3.jpg",

  // Add more image URLs as needed
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to go to the next image
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    // Automatically slide to the next image every 5 seconds
    const intervalId = setInterval(goToNextImage, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
    >
      <div
        className={`${styles.section} w-full ml-8 p-10 md:w-[90%] lg:w-[60%] flex flex-col items-start pl-[5vw] md:pl-0`}
      >
        <h1
          className={`text-[25px] leading-[1.2] md:text-[60px] text-[#3d3a3a] font-[400] capitalize mb-5`}
        >
          Your Gateway to Secure Opportunities.
        </h1>
        <p className="text-[16px] font-[Poppins] font-[400] text-[#000000ba] mb-10">
          "Welcome to the Future of Work! Our platform is your passport to
          success, providing workers with secure opportunities and connecting
          contractors with top talent. Your safety is our priority, ensuring you
          work with confidence. Join us today and revolutionize your career
          journey!"
        </p>
        <div className="flex justify-center items-center">
          {/* <Link to="/products"> */}
          <button
            className={`${styles.button} py-3 px-5 rounded-md bg-[#FF6D3E] hover:bg-[#FF8121] transition-colors duration-300 ease-in-out`}
          >
            <span className="text-[#fff] text-center font-[Poppins] text-[18px]">
              Find Now
            </span>
          </button>
          {/* </Link> */}
        </div>
      </div>
      <div className="absolute inset-0 object-cover w-full h-full z-[-1]">
        <img
          src={images[currentImageIndex]}
          alt="Banner"
          className="w-full h-full"
        />
        <button
          onClick={goToPreviousImage}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[rgba(0,0,0,0.3)] text-white p-2 rounded-l-md"
        >
          {"<"}
        </button>
        <button
          onClick={goToNextImage}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[rgba(0,0,0,0.3)] text-white p-2 rounded-r-md"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Hero;
