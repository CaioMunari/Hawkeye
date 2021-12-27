import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const backgrounds = {
  notReached: "transparent",
  current: "transparent",
  completed: "yellow.400",
};
const borders = {
  notReached: "white",
  current: "yellow.400",
  completed: "transparent",
};

const iconColor = {
  notReached: "white",
  current: "#ECC94B",
  completed: "white",
};

const lines = {
  notReached: "white",
  current: "white",
  completed: "#ECC94B",
};

const StepIndicator = ({ steps, step }) => {
  let i = 1;
  let newStepsArr = [];

  const getStatus = (i) => {
    if (i < step) {
      return "completed";
    } else if (i === step) {
      return "current";
    } else {
      return "notReached";
    }
  };
  while (i <= 3) {
    let status = getStatus(i);
    newStepsArr.push(
      <Flex key={i} align="center">
        <Box
          display="flex"
          alignItems="center"
          p="1em"
          border="1px solid white"
          borderColor={borders[status]}
          backgroundColor={backgrounds[status]}
          borderRadius="50%"
        >
          <box-icon
            type="solid"
            name={steps[i - 1]}
            size="2em"
            color={iconColor[status]}
          />
        </Box>
        {i < 3 && (
          <Box
            style={{
              height: 1.5,
              width: 100,
              background: lines[status],
            }}
          />
        )}
      </Flex>
    );

    i++;
  }
  return <Flex py={5}>{newStepsArr}</Flex>;
};

export default StepIndicator;
