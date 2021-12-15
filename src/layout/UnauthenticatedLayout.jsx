import { Flex } from "@chakra-ui/react";
import React from "react";
const UnauthenticatedLayout = ({ children }) => {
  return (
    <Flex
      w="100%"
      h="100vh"
      padding={{ base: "0", md: "10rem" }}
      background="purple.700"
    >
      {children}
    </Flex>
  );
};

export default UnauthenticatedLayout;
