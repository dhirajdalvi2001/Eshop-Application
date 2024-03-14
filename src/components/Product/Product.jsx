import React, { useEffect, useState } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ActiveStepOne } from "../../common/components/ActiveOrderSteps/ActiveStepOne";
import { ActiveStepTwo } from "../../common/components/ActiveOrderSteps/ActiveStepTwo";
import { ActiveStepThree } from "../../common/components/ActiveOrderSteps/ActiveStepThree";

const Product = () => {
  const { productId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({});
  const [activeStep, setActiveStep] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState(["ALL"]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const steps = ["Items", "Select Address", "Confirm Order"];

  const handleSubmit = () => {
    console.log(formData, "formData DD");
  };
  const handleChange = (value, key) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    delete errors[key];
  };
  const checkPermissions = (keys, func) => {
    const existingKeys = Object.keys(formData);
    const formattedKeys = Array.isArray(keys) ? keys : [keys];
    const remainingKeys = formattedKeys
      ?.map((key) => {
        if (existingKeys?.includes(key)) {
          if (formData[key] === "") return key;
          return null;
        } else {
          return key;
        }
      })
      .filter(Boolean);
    if (remainingKeys?.length === 0) {
      func();
      console.log(func, "func DD");
    } else {
      remainingKeys?.forEach((e) => {
        setErrors((prev) => ({ ...prev, [e]: "This field is required" }));
      });
    }
  };

  console.log(formData, errors, "formData,errors DD");

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
  async function fetchAddresses() {
    const result = await axiosPrivate.get(`/addresses`);
    console.log(result, "result DD");
  }

  useEffect(() => {
    fetchCategories();
    fetchProductDetails();
    // fetchAddresses();
  }, []);

  console.log(activeStep, "activeStep DD");

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100%",
        height: "fit-content",
        backgroundColor: "#fafafa",
      }}
    >
      {activeStep === 1 && (
        <ActiveStepOne
          categories={categories}
          categoriesLoading={categoriesLoading}
          product={product}
          errors={errors}
          formData={formData}
          setActiveStep={setActiveStep}
          handleChange={handleChange}
          checkPermissions={checkPermissions}
        />
      )}
      {activeStep === 2 && (
        <ActiveStepTwo
          steps={steps}
          setActiveStep={setActiveStep}
          addresses={addresses}
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          checkPermissions={checkPermissions}
        />
      )}
      {activeStep === 3 && (
        <ActiveStepThree
          steps={steps}
          setActiveStep={setActiveStep}
          formData={formData}
          product={product}
          errors={errors}
          handleChange={handleChange}
          checkPermissions={checkPermissions}
          handleSubmit={handleSubmit}
        />
      )}
      {/* // availableItems: 10; // category: "APPAREL"; // description: "Short
      description"; // id: "65ef2fa4be914a762c50f461"; // imageUrl:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9f0b914f-0394-41dc-8ef5-d2bd4a519c43/air-jordan-9-g-golf-shoes-Fp9GL3.png";
      // manufacturer: "Nike"; // name: "Air Jordan 9 G"; // price: 19695; */}
    </div>
  );
};

export default Product;
