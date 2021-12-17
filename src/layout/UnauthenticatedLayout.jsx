import { Flex } from "@chakra-ui/react";
import React from "react";
import Background from "../components/Background";
import Header from "../components/Header";
const UnauthenticatedLayout = ({ children }) => {
  return (
    <Background>
      <Flex direction="column">
        <Header />
        {children}
      </Flex>
    </Background>
  );
};

export default UnauthenticatedLayout;
