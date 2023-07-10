import React, { useState } from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { FaHeart, FaCartPlus } from "react-icons/fa";

const EventCard = ({ active, data }) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <div
      className={`relative w-full block bg-white rounded-lg ${
        active ? "" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-3/5 m-auto">
        <div className="border-4 border-yellow-500 rounded-lg overflow-hidden">
          <img
            src={`${backend_url}${data.images[0]}`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="w-full lg:w-2/5 flex flex-col justify-between pl-4">
        <div>
          <h2
            className={`${styles.productTitle} text-xl font-bold mb-2 truncate`}
          >
            {data.name}
          </h2>
          <p className="text-gray-600 line-clamp-3">{data.description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <h5 className="font-semibold text-lg text-gray-800 pr-2">
              ${data.discountPrice}
            </h5>
            {data.originalPrice && (
              <h5 className="font-semibold text-sm line-through text-red-500">
                ${data.originalPrice}
              </h5>
            )}
          </div>
          <span className="px-2 py-1 rounded-full bg-green-500 text-white text-sm font-medium">
            {data.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <div className="flex justify-between mt-6">
          <div className="flex items-center">
            <button
              onClick={handleToggleWishlist}
              className={`${
                isWishlist ? "text-red-500" : "text-gray-400"
              } mr-4 focus:outline-none`}
            >
              <FaHeart size={20} />
            </button>
            <Link to={`/product/${data._id}?isEvent=true`}>
              <div
                className={`${styles.button} text-[#fff] bg-gray-800 hover:bg-gray-900`}
              >
                See Details
              </div>
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => addToCartHandler(data)}
              className={`${styles.button} bg-yellow-500 hover:bg-yellow-600 text-white flex items-center text-sm`}
            >
              <FaCartPlus size={20} />
              <span className="ml-2">Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
