import { Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useOrientation from "../hooks/useOrientation";
import IconButton from "./IconButton";

const Footer = () => {
  const navigate = useNavigate();
  const { getOrientationValue } = useOrientation();
  return (
    <Flex w="20%">
      <IconButton
        style={{
          marginLeft: "4rem",
          marginBottom: "5rem",
          display: getOrientationValue("none", "flex"),
        }}
        onClick={() => navigate("/history")}
        name="spreadsheet"
        size="2rem"
        color="#F8F9FA"
        text="Histórico"
      />
    </Flex>
  );
};

export default Footer;
