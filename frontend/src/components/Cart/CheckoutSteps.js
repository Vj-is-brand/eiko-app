import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";

import { MdAccountBalance, MdOutlineLibraryAddCheck, MdOutlineLocalShipping } from "react-icons/md";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <MdOutlineLocalShipping size={28}/>
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <MdOutlineLibraryAddCheck size={28}/>
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <MdAccountBalance size={28}/>
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#9e2a53" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;