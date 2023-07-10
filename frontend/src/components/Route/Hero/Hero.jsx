import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full  bg-no-repeat ${styles.noramlFlex}`}>
      <div className={`${styles.section} w-full ml-8 p-10 md:w-[90%] lg:w-[60%] flex flex-col items-start pl-[5vw] md:pl-0`}>
        <h1 className={`text-[35px] leading-[1.2] md:text-[60px] text-[#3d3a3a] font-[600] capitalize mb-5`}>
          Best Collection for Home Decoration
        </h1>
        <p className="text-[16px] font-[Poppins] font-[400] text-[#000000ba] mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, assumenda? Quisquam itaque exercitationem labore vel, dolore quidem asperiores, laudantium temporibus soluta optio consequatur aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <div className="flex justify-center items-center">
          <Link to="/products">
            <button className={`${styles.button} py-3  px-5 rounded-md bg-[#FF6D3E] hover:bg-[#FF8121] transition-colors duration-300 ease-in-out`}>
              <span className="text-[#fff] text-center font-[Poppins] text-[18px]">Shop Now</span>
            </button>
          </Link>
        </div>
      </div>
      <img src="https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg" alt="Banner" className="absolute inset-0 object-cover w-full h-full z-[-1]" />
    </div>
  );
};

export default Hero;
