import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CreatableSelect from "react-select/creatable";
import "./ActiveSteps.css";
import { ErrorText } from "../ErrorText/ErrorText";

export const ActiveStepTwo = ({
  steps,
  setActiveStep,
  addresses,
  formData,
  errors,
  handleChange,
  checkPermissions,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          width: "80%",
          margin: "auto auto 10px",
          padding: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <Stepper activeStep={1}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div className="active-step-2">
        <div className="flex flex-col" style={{ width: "100%" }}>
          <label style={{ fontSize: "14px" }}>Select Address</label>
          <CreatableSelect
            value={formData?.category}
            onChange={(e) => handleChange(e, "category")}
            isClearable
            className="react-select-container select-address"
            options={addresses}
          />
        </div>
        <Typography variant="subtitle2" margin="auto">
          -OR-
        </Typography>
        <form action="" className="address-form">
          <Typography variant="h6" color="#555555" margin="auto">
            Add Address
          </Typography>
          <div className="flex flex-col">
            <TextField
              type="text"
              label="Name"
              value={formData?.name}
              onChange={(e) => handleChange(e.target.value, "name")}
              placeholder="Name"
              size="small"
              required
            />
            <ErrorText>{errors?.name}</ErrorText>
          </div>
          <div className="flex flex-col">
            <TextField
              type="number"
              label="Contact Number"
              value={formData?.contact}
              onChange={(e) => handleChange(e.target.value, "contact")}
              placeholder="Contact Number"
              size="small"
              required
            />
            <ErrorText>{errors?.contact}</ErrorText>
          </div>
          <div className="flex flex-col">
            <TextField
              type="text"
              label="Street"
              value={formData?.street}
              onChange={(e) => handleChange(e.target.value, "street")}
              placeholder="Street"
              size="small"
              required
            />
            <ErrorText>{errors?.street}</ErrorText>
          </div>
          <div className="flex flex-col">
            <TextField
              type="text"
              label="City"
              value={formData?.city}
              onChange={(e) => handleChange(e.target.value, "city")}
              placeholder="City"
              size="small"
              required
            />
            <ErrorText>{errors?.city}</ErrorText>
          </div>
          <div className="flex flex-col">
            <TextField
              type="text"
              label="State"
              value={formData?.state}
              onChange={(e) => handleChange(e.target.value, "state")}
              placeholder="State"
              size="small"
              required
            />
            <ErrorText>{errors?.state}</ErrorText>
          </div>
          <div className="flex flex-col">
            <TextField
              type="text"
              label="Landmark"
              value={formData?.landmark}
              onChange={(e) => handleChange(e.target.value, "landmark")}
              placeholder="Landmark"
              size="small"
              required
            />
            <ErrorText>{errors?.landmark}</ErrorText>
          </div>
          <div className="flex flex-col">
            <TextField
              type="number"
              label="Zip Code"
              value={formData?.zipcode}
              onChange={(e) => handleChange(e.target.value, "zipcode")}
              placeholder="Zip Code"
              size="small"
              required
            />
            <ErrorText>{errors?.zipcode}</ErrorText>
          </div>
          <Button variant="contained" className="button">
            Save Address
          </Button>
          <div className="active-steps-2-buttons-group">
            <Button onClick={() => setActiveStep(1)}>Back</Button>
            <Button
              variant="contained"
              className="button"
              onClick={() =>
                checkPermissions(
                  [
                    "name",
                    "contact",
                    "street",
                    "city",
                    "state",
                    "landmark",
                    "zipcode",
                  ],
                  () => setActiveStep(3)
                )
              }
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
