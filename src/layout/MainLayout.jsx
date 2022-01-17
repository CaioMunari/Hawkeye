import { Flex } from "@chakra-ui/react";
import React from "react";
import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
const MainLayout = ({ children }) => {
  return (
    <Background>
      <Flex direction="column" minH="100vh">
        <Header />
        {children}
        <Footer />
      </Flex>
    </Background>
  );
};

export default MainLayout;
