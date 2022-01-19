import { Box } from "@chakra-ui/react";
import React from "react";

const Background = ({ children }) => {
  return (
    <Box
      backgroundImage="/images/background.png"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      w="100%"
      minH="100vh"
    >
      {children}
    </Box>
  );
};

export default Background;
