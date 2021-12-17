import { Flex } from "@chakra-ui/react";
import React from "react";
import Background from "../components/Background";
import Header from "../components/Header";
const UnauthenticatedLayout = ({ children }) => {
  return (
    <Background>
      <Flex h="100vh" direction="column" maxH="100vh">
        <Header />
        {children}
      </Flex>
    </Background>
  );
};

export default UnauthenticatedLayout;
