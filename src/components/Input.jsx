import { Input } from "@chakra-ui/react";
import React from "react";

const CustomButton = ({ children, ...props }) => {
  return (
    <Input
      style={{ marginTop: 12, marginBottom: 12 }}
      backgroundColor="gray.200"
      p={8}
      borderRadius={0}
      {...props}
    >
      {children}
    </Input>
  );
};

export default CustomButton;
