import {
  Button,
  Skeleton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { ErrorText } from "../ErrorText/ErrorText";
import "./ActiveSteps.css";

export const ActiveStepOne = ({
  categories,
  categoriesLoading,
  product,
  formData,
  errors,
  setActiveStep,
  handleChange,
  checkPermissions,
}) => {
  return (
    <>
      <ToggleButtonGroup
        value={categories}
        exclusive
        aria-label="text alignment"
        size="small"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        disabled
      >
        {categoriesLoading ? (
          <div style={{ display: "flex", gap: "10px" }}>
            {Array(3)
              .fill("d")
              .map((e) => {
                return <Skeleton key={e} width={100} height={50} />;
              })}
          </div>
        ) : (
          categories?.map((category) => {
            return (
              <ToggleButton
                key={category}
                value={category}
                className={`${
                  category === "ALL" ? "active-category-tab" : "category-tab"
                }`}
              >
                {category}
              </ToggleButton>
            );
          })
        )}
      </ToggleButtonGroup>
      <div
        style={{
          margin: "40px 16%",
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {product?.imageUrl && (
          <div
            style={{
              width: "400px",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              srcset=""
              style={{ width: "400px" }}
            />
          </div>
        )}
        <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Typography variant="h5">{product?.name}</Typography>
            <div
              style={{
                color: "#fff",
                fontSize: "12px",
                padding: "8px 12px",
                borderRadius: "50px",
                backgroundColor: "#3f51b5",
              }}
            >
              Available Quantity : {product?.availableItems}
            </div>
          </div>
          <Typography variant="p">
            Category: <b>{product?.category}</b>
          </Typography>
          <Typography variant="subtitle1" margin="20px 0">
            <i>{product?.description}</i>
          </Typography>
          <Typography
            variant="paragraph"
            color="red"
            fontSize="20px"
            marginBottom="32px"
          >
            {product?.price?.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "INR",
            })}
          </Typography>
          <TextField
            type="number"
            label="Enter Quantity"
            value={formData?.quantity}
            onChange={(e) => handleChange(e.target.value, "quantity")}
            placeholder="Enter Quantity"
            size="small"
            required
          />
          {errors?.quantity && <ErrorText>{errors?.quantity}</ErrorText>}
          <Button
            variant="contained"
            className="button"
            sx={{ marginTop: "24px", width: "fit-content" }}
            onClick={() =>
              checkPermissions(["quantity"], () => setActiveStep(2))
            }
          >
            Place order
          </Button>
        </div>
      </div>
    </>
  );
};
