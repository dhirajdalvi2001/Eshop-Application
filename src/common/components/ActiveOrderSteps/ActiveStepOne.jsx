import {
  Button,
  Skeleton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
import "./ActiveSteps.css";

export const ActiveStepOne = ({
  categories,
  categoriesLoading,
  product,
  setActiveStep,
  quantity,
  setQuantity
}) => {
  return (
    <>
      {/* Toggle button group for categories */}
      <ToggleButtonGroup
        value={categories}
        exclusive
        aria-label="text alignment"
        size="small"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
        disabled>
        {categoriesLoading ? (
          <div style={{ display: "flex", gap: "10px" }}>
            {Array("d", "e", "f").map((e) => {
              return <Skeleton key={e} width={100} height={50} />;
            })}
          </div>
        ) : (
          categories?.map((category) => {
            return (
              <ToggleButton
                key={category}
                value={category}
                className={`${category === "ALL" ? "active-category-tab" : "category-tab"}`}>
                {category}
              </ToggleButton>
            );
          })
        )}
      </ToggleButtonGroup>
      {/* Product details */}
      <div
        style={{
          margin: "40px 16%",
          display: "flex",
          alignItems: "center",
          gap: "24px"
        }}>
        {/* Product image */}
        {product?.imageUrl && (
          <div
            style={{
              width: "400px",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden"
            }}>
            <img src={product.imageUrl} alt={product.name} srcSet="" style={{ width: "400px" }} />
          </div>
        )}
        <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
          {/* Product name and available quantity */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Typography variant="h5">{product?.name}</Typography>
            <div
              style={{
                color: "#fff",
                fontSize: "12px",
                padding: "8px 12px",
                borderRadius: "50px",
                backgroundColor: "#3f51b5"
              }}>
              Available Quantity : {product?.availableItems}
            </div>
          </div>
          {/* Product category */}
          <Typography variant="p">
            Category: <b>{product?.category}</b>
          </Typography>
          {/* Product description */}
          <Typography variant="subtitle1" margin="20px 0">
            <i>{product?.description}</i>
          </Typography>
          {/* Product price */}
          <Typography variant="paragraph" color="red" fontSize="20px" marginBottom="32px">
            {product?.price?.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "INR"
            })}
          </Typography>
          {/* Input field for quantity */}
          <TextField
            type="number"
            label="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            placeholder="Enter Quantity"
            size="small"
            required
          />

          {/* Button to place next step */}
          <Button
            variant="contained"
            className="button"
            sx={{ marginTop: "24px", width: "fit-content" }}
            onClick={() => {
              if (!quantity || quantity === 0 || quantity > product.availableItems) {
                toast.error("Invalid Quantity selected!", {
                  className: {
                    background: "#222"
                  }
                });
                return;
              }
              setActiveStep(2);
            }}>
            Place order
          </Button>
        </div>
      </div>
    </>
  );
};

ActiveStepOne.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  categoriesLoading: PropTypes.bool,
  product: PropTypes.object,
  setActiveStep: PropTypes.func,
  quantity: PropTypes.number,
  setQuantity: PropTypes.func
};
