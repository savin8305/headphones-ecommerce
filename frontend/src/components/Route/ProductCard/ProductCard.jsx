import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Check if item is in the wishlist
  useEffect(() => {
    const isWishlistItem = wishlist && wishlist.some((item) => item._id === data._id);
    setClick(isWishlistItem);
  }, [wishlist, data._id]);

  // Remove item from wishlist
  const removeFromWishlistHandler = (product) => {
    setClick(false);
    dispatch(removeFromWishlist(product));
  };

  // Add item to wishlist
  const addToWishlistHandler = (product) => {
    setClick(true);
    dispatch(addToWishlist(product));
  };

  // Add item to cart
  const addToCartHandler = (productId) => {
    const isItemInCart = cart && cart.some((item) => item._id === productId);

    if (isItemInCart) {
      toast.error("This item is already in your cart!");
    } else if (data.stock < 1) {
      toast.error("Sorry, the product stock is limited!");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <div className="w-full border-2 border-solid border-gray-100 rounded-md shadow-md p-4 relative cursor-pointer">
      <Link
        to={
          isEvent === true
            ? `/product/${data._id}?isEvent=true`
            : `/product/${data._id}`
        }
      >
        <img
          src={`${backend_url}${data.images && data.images[0]}`}
          alt=""
          className="w-full h-48 object-contain"
        />
      </Link>
      <div className="mt-4">
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className="text-sm font-medium text-gray-700 hover:text-black transition duration-300 ease-in-out">
            {data.shop.name}
          </h5>
        </Link>
        <Link
          to={
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }
          className="block mt-2 hover:text-black transition duration-300 ease-in-out"
        >
          <h4 className="text-base font-medium truncate">{data.name}</h4>

          <Ratings rating={data?.ratings} />

          <div className="flex items-center justify-between mt-2">
            <div className={`${styles.productDiscountPrice}`}>
              {data.originalPrice === 0 ? data.originalPrice : data.discountPrice}$
            </div>
            {data.originalPrice ? (
              <div className={`${styles.price} text-gray-500 ml-2`}>
                {data.originalPrice}$
              </div>
            ) : null}
            <span className="font-medium text-sm text-yellow-500">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>
      </div>

      {/* Side options */}
      <div className="absolute top-2 right-2 flex space-x-2">
        {click ? (
          <AiFillHeart
            size={22}
            className="text-red-500 cursor-pointer hover:text-red-600 transition duration-300 ease-in-out"
            onClick={() => removeFromWishlistHandler(data)}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer hover:text-red-600 transition duration-300 ease-in-out"
            onClick={() => addToWishlistHandler(data)}
            title="Add to wishlist"
          />
        )}
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer hover-text-green-500 transition duration-300 ease-in-out"
          onClick={() => addToCartHandler(data._id)}
          title="Add to cart"
        />
        <AiOutlineEye
          size={22}
          className="cursor-pointer hover:text-blue-500 transition duration-300 ease-in-out"
          onClick={() => setOpen(true)}
          title="Quick view"
        />
      </div>

      {/* Render product details card */
      open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
    </div>
  );
};

export default ProductCard;
