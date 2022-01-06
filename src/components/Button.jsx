import { Button } from "@chakra-ui/react";
import React from "react";

const CustomButton = ({ children, ...props }) => {
  return (
    <Button
      style={{ boxSizing: "border-box" }}
      p={8}
      borderRadius={0}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
