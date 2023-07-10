import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const filteredProducts =
      allProducts && allProducts.filter((product) => product.category === data.category);
    setProductData(filteredProducts);
  }, []);

  return (
    <div>
      {data && (
        <div className={`${styles.section} p-4`}>
          <h2 className={`${styles.heading} text-2xl font-semibold border-b mb-5`}>
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5 xl:gap-10 mb-12">
             {productData &&
               productData.map((product) => (
                 <ProductCard data={product} key={product.id} />
               ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestedProduct;
