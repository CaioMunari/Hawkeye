import { Stack } from "@chakra-ui/react";
import React from "react";
import useOrientation from "../hooks/useOrientation";
const Paper = ({ children }) => {
  const { getOrientationValue } = useOrientation();
  return (
    <Stack
      direction="column"
      minWidth={{ base: "85vw", md: getOrientationValue("55vw", "85vw") }}
      bg="white"
      minHeight="65vh"
      padding="3rem"
      align="center"
      justify="space-between"
      borderRadius="24px"
      marginTop={{ base: 0, md: getOrientationValue("0", "1rem") }}
    >
      {children}
    </Stack>
  );
};

export default Paper;
