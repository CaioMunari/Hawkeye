import { Box } from "@chakra-ui/react";
import React from "react";

const Background = ({ children }) => {
  return (
    <Box
      backgroundImage="/images/background_transparent.png"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      w="100%"
      minH="100vh"
      backgroundColor="purple.500"
      backgroundBlendMode={"multiply"}
    >
      {children}
    </Box>
  );
};

export default Background;
