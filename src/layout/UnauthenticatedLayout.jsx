import { Flex } from "@chakra-ui/react";
import React from "react";
const UnauthenticatedLayout = ({ children }) => {
  return (
    <Flex
      h="100vh"
      maxH="100vh"
      px={{ base: "0", md: "5em" }}
      background="purple.700"
    >
      {children}
    </Flex>
  );
};

export default UnauthenticatedLayout;
