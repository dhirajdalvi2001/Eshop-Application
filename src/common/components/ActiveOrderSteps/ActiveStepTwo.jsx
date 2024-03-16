import { Box, Button, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "./ActiveSteps.css";

export const ActiveStepTwo = ({ steps, setActiveStep, selectedAdress, setSelectedAddress }) => {
  const axiosPrivate = useAxiosPrivate();

  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async () => {
    const resp = await axiosPrivate.get(`/addresses`);

    if (resp.status === 200) {
      setAddresses(
        resp.data.map((address) => ({
          value: address.id,
          label: `${address.name}-->${address.city}, ${address.state}`
        }))
      );
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const city = formData.get("city");
    const state = formData.get("state");

    try {
      const resp = await axiosPrivate.post("/addresses", {
        name,
        contactNumber: formData.get("contactNumber"),
        city,
        landmark: formData.get("landmark"),
        street: formData.get("street"),
        state,
        zipcode: formData.get("zipcode"),
        user: "" // User ID
      });

      if (resp.status === 201) {
        const addressId = resp.data;
        setAddresses([
          ...addresses,
          {
            value: addressId,
            label: `${name}-->${city}, ${state}`
          }
        ]);
      }
    } catch (error) {
      toast.error("Unable to save Address!");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          width: "80%",
          margin: "auto auto 10px",
          padding: "20px"
        }}>
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
            onChange={(e) => setSelectedAddress(e.value)}
            isClearable
            className="react-select-container select-address"
            options={addresses}
          />
        </div>

        <Typography variant="subtitle2" margin="auto">
          -OR-
        </Typography>

        <Typography variant="h5" color="#555555" margin="auto">
          Add Address
        </Typography>

        <Box
          id="address-form"
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "80%" }}>
          <TextField type="text" label="Name" name="name" size="small" required fullWidth />

          <TextField
            type="number"
            label="Contact Number"
            name="contactNumber"
            size="small"
            required
            fullWidth
            sx={{ mt: 2 }}
          />

          <TextField
            type="text"
            label="Street"
            name="street"
            size="small"
            required
            fullWidth
            sx={{ mt: 2 }}
          />

          <TextField
            type="text"
            label="City"
            name="city"
            size="small"
            required
            fullWidth
            sx={{ mt: 2 }}
          />

          <TextField
            type="text"
            label="State"
            name="state"
            size="small"
            required
            fullWidth
            sx={{ mt: 2 }}
          />

          <TextField
            type="text"
            label="Landmark"
            name="landmark"
            size="small"
            required
            fullWidth
            sx={{ mt: 2 }}
          />

          <TextField
            type="number"
            label="Zip Code"
            name="zipcode"
            size="small"
            required
            fullWidth
            sx={{ mt: 2 }}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 1 }}>
            Save Address
          </Button>
        </Box>

        <div className="active-steps-2-buttons-group">
          <Button onClick={() => setActiveStep(1)}>Back</Button>

          <Button
            variant="contained"
            className="button"
            onClick={() => {
              if (!selectedAdress) {
                toast.error("Please select an address to proceed!");
                return;
              }
              setActiveStep(3);
            }}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

ActiveStepTwo.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string),
  setActiveStep: PropTypes.func,
  selectedAdress: PropTypes.string,
  setSelectedAddress: PropTypes.func
};
