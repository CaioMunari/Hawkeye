import { Flex } from "@chakra-ui/react";
import React from "react";
const UnauthenticatedLayout = ({ children }) => {
  return (
    <Flex direction="column" h="100vh">
      {children}
    </Flex>
  );
};

export default UnauthenticatedLayout;
