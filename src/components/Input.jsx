import { Input } from "@chakra-ui/react";
import React from "react";
import { getResponsiveValue } from "../utils/screen";

const CustomInput = ({ children, ...props }) => {
  return (
    <Input
      style={{ marginBottom: getResponsiveValue(1, "em") }}
      backgroundColor="gray.200"
      p={8}
      borderRadius={0}
      {...props}
    >
      {children}
    </Input>
  );
};

export default CustomInput;
