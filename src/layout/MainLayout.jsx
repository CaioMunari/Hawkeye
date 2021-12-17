import { Flex } from "@chakra-ui/react";
import React from "react";
import Background from "../components/Background";
import Header from "../components/Header";
const MainLayout = ({ children }) => {
  return (
    <Background>
      <Flex direction="column" h="100vh">
        <Header />
        {children}
      </Flex>
    </Background>
  );
};

export default MainLayout;
