import { Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useOrientation from "../hooks/useOrientation";
import IconButton from "./IconButton";

const Footer = () => {
  const navigate = useNavigate();
  const { getOrientationValue } = useOrientation();
  return (
    <Flex
      alignSelf="center"
      minWidth={{ base: "85vw", md: getOrientationValue("55vw", "85vw") }}
      align="flex-start"
      paddingTop="2rem"
    >
      <IconButton
        style={{
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
