import { Input } from "@chakra-ui/react";
import React from "react";
import { getResponsiveValue } from "../utils/screen";

const CustomInput = ({ children, ...props }) => {
  return (
    <>
      <Input
        style={{
          marginBottom: getResponsiveValue(1, "rem"),
        }}
        backgroundColor="gray.200"
        p={8}
        borderRadius={0}
        borderColor={props.error === true ? "red" : "gray.200"}
        {...props}
      >
        {children}
      </Input>
      {props.description && (
        <small
          style={{
            marginBottom: getResponsiveValue(0.2, "rem"),
            color: props.error === true && "red",
            fontSize: "0.8rem",
            width: "75%",
          }}
        >
          {props.description}
        </small>
      )}
      {props.errorMsg && (
        <small
          style={{
            marginBottom: getResponsiveValue(0.2, "rem"),
            color: props.error === true && "red",
            fontSize: "0.8rem",
            width: "75%",
          }}
        >
          {props.errorMsg}
        </small>
      )}
    </>
  );
};

export default CustomInput;
