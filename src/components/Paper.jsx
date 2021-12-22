import { Stack } from "@chakra-ui/react";
import React from "react";
import useOrientation from "../hooks/useOrientation";
import { getResponsiveValue } from "../utils/screen";
const Paper = ({ children, title, subtitle }) => {
  const { getOrientationValue } = useOrientation();
  return (
    <Stack
      direction="column"
      minWidth={{ base: "100vw", md: getOrientationValue("55vw", "100vw") }}
      bg="white"
      minHeight={{ base: "100%", md: getOrientationValue("65vh", "100%") }}
      px={getResponsiveValue(4, "em")}
      py={{ base: "2em", md: getResponsiveValue(4, "em") }}
      align="center"
      justify="space-between"
      borderRadius={{ base: 0, md: getOrientationValue(24, 0) }}
    >
      {children}
    </Stack>
  );
};

export default Paper;
