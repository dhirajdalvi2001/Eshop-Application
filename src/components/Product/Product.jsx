import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ActiveStepOne } from "../../common/components/ActiveOrderSteps/ActiveStepOne";
import { ActiveStepThree } from "../../common/components/ActiveOrderSteps/ActiveStepThree";
import { ActiveStepTwo } from "../../common/components/ActiveOrderSteps/ActiveStepTwo";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./Product.css";

const Product = () => {
  const { productId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [categories, setCategories] = useState(["ALL"]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [selectedAdress, setSelectedAddress] = useState();

  const steps = ["Items", "Select Address", "Confirm Order"];

  async function fetchProductDetails() {
    try {
      const result = await axiosPrivate.get(`/products/${productId}`);
      if (result.status === 200) {
        setProduct(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCategories() {
    if (categories.length <= 1) {
      setCategoriesLoading(true);
      const categoriesData = await axiosPrivate.get("/products/categories");
      setCategories((prev) => [...prev, ...categoriesData.data]);
      setCategoriesLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchProductDetails();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100%",
        height: "fit-content",
        backgroundColor: "#fafafa"
      }}>
      {activeStep === 1 && (
        <ActiveStepOne
          categories={categories}
          categoriesLoading={categoriesLoading}
          product={product}
          setActiveStep={setActiveStep}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      )}

      {activeStep === 2 && (
        <ActiveStepTwo
          steps={steps}
          setActiveStep={setActiveStep}
          selectedAdress={selectedAdress}
          setSelectedAddress={setSelectedAddress}
        />
      )}

      {activeStep === 3 && (
        <ActiveStepThree
          steps={steps}
          setActiveStep={setActiveStep}
          product={product}
          quantity={quantity}
          address={selectedAdress}
        />
      )}
    </div>
  );
};

export default Product;
