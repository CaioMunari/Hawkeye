import React from "react";
import {
  Box,
  Flex,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import "boxicons";

const StepIndicator = ({ steps, step }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const opacity = keyframes`
  from { opacity: 0.2 }
  to { opacity: 1 }
`;
  const animation = prefersReducedMotion
    ? undefined
    : `${opacity}  0.3s linear`;

  let i = 1;
  let newStepsArr = [];
  while (i <= steps.length) {
    let isSelected = i <= step;
    let isLineSelected = i < step;
    newStepsArr.push(
      <Flex align="center" marginTop={{ base: 5, md: 0 }} pb={5}>
        <Box
          display="flex"
          alignItems="center"
          p="1em"
          border="1px solid white"
          borderColor={isSelected ? "yellow" : "white"}
          borderRadius="50%"
          animation={isSelected && animation}
        >
          <box-icon
            type="solid"
            name={steps[i - 1]}
            size="2em"
            color={isSelected ? "yellow" : "white"}
          />
        </Box>
        {i < steps.length && (
          <Box
            animation={isLineSelected && animation}
            style={{
              height: 1.5,
              width: 50,
              background: isLineSelected ? "yellow" : "white",
            }}
          />
        )}
      </Flex>
    );

    i++;
  }
  return <Flex>{newStepsArr}</Flex>;
};

export default StepIndicator;
