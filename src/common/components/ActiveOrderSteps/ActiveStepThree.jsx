import React from "react";
import "./ActiveSteps.css";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

export const ActiveStepThree = ({
  steps,
  setActiveStep,
  formData,
  errors,
  product,
  handleChange,
  checkPermissions,
  handleSubmit,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div className="active-step-3">
        <div className="step-3-card step-3-product-details">
          <Typography variant="h5">{product?.name}</Typography>
          <Typography variant="p">
            Quantity: <b>{formData?.quantity}</b>
          </Typography>
          <Typography variant="p">
            Category: <b>{product?.category}</b>
          </Typography>
          <Typography variant="p">{product?.description}</Typography>
          <Typography variant="h6" style={{ color: "red" }}>
            Total Price:{" "}
            {product?.price?.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "INR",
            })}
          </Typography>
        </div>
        <div className="step-3-card step-3-address-details">
          <Typography variant="h5">Address:</Typography>
          <Typography variant="p">{formData?.city}</Typography>
          <Typography variant="p">
            Contact Number: {formData?.contact}
          </Typography>
          <Typography variant="p">{formData?.street}</Typography>
          <Typography variant="p">{formData?.state}</Typography>
          <Typography variant="p">{formData?.zipcode}</Typography>
        </div>
      </div>
      <div style={{ margin: "auto" }}>
        <Button onClick={() => setActiveStep(2)}>Back</Button>
        <Button variant="contained" className="button" onClick={handleSubmit}>
          Place Order
        </Button>
      </div>
    </div>
  );
};
