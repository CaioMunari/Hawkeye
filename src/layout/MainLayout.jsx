import { Flex } from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";
const MainLayout = ({ children }) => {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      {children}
    </Flex>
  );
};

export default MainLayout;
