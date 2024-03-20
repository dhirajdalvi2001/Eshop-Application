import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "./ActiveSteps.css";

export const ActiveStepThree = ({ steps, setActiveStep, product, quantity, address }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [addressInfo, setAddressInfo] = useState({});

  const fetchAddress = async () => {
    try {
      const resp = await axiosPrivate.get(`/addresses/${address}`);

      if (resp.status === 200) {
        setAddressInfo(resp.data);
      }
    } catch (error) {
      toast.error("UNable to fetch address!");
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

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
      {/* Card to display product details */}
      <div className="active-step-3">
        <div className="step-3-card step-3-product-details">
          <Typography variant="h5">{product?.name}</Typography>
          <Typography variant="p">
            Quantity: <b>{quantity}</b>
          </Typography>
          <Typography variant="p">
            Category: <b>{product?.category}</b>
          </Typography>
          <Typography variant="p">{product?.description}</Typography>
          <Typography variant="h6" style={{ color: "red" }}>
            Total Price:{" "}
            {(product?.price * quantity)?.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "INR"
            })}
          </Typography>
        </div>
        {/* Card to display address details */}
        <div className="step-3-card step-3-address-details">
          <Typography variant="h5">Address:</Typography>
          <Typography variant="p">{addressInfo?.city}</Typography>
          <Typography variant="p">Contact Number: {addressInfo?.contact}</Typography>
          <Typography variant="p">{addressInfo?.street}</Typography>
          <Typography variant="p">{addressInfo?.state}</Typography>
          <Typography variant="p">{addressInfo?.zipcode}</Typography>
        </div>
      </div>
      <div style={{ margin: "auto" }}>
        {/* Button to go back to the previous step */}
        <Button onClick={() => setActiveStep(2)}>Back</Button>
        {/* Button to place the order */}
        <Button
          variant="contained"
          className="button"
          onClick={() => {
            toast.success("Order placed successfully!");
            return navigate("/");
          }}>
          Place Order
        </Button>
      </div>
    </div>
  );
};

ActiveStepThree.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string),
  setActiveStep: PropTypes.func,
  product: PropTypes.object,
  quantity: PropTypes.number,
  address: PropTypes.string
};
