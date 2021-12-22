import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Button from "../Button";

const StatusStep = ({ title, subtitle, buttonText, onClick }) => {
  return (
    <>
      <Flex
        direction="column"
        justify="space-between"
        w="100%"
        align="center"
        h="100%"
        flex={1}
      >
        <Flex
          direction="column"
          w="100%"
          justify="center"
          align="center"
          flex={1}
        >
          <box-icon name="check-circle" color="#4DCCC4" size="15em" />
          <Text fontSize="1.5rem" colorScheme="black" mt={2}>
            {title}
          </Text>
          <Text width="50%" fontSize="1rem" textAlign="center" color="gray.500">
            {subtitle}
          </Text>
        </Flex>
        <Button
          colorScheme="teal"
          backgroundColor="teal.300"
          type="submit"
          style={{ textTransform: "uppercase" }}
          fontWeight="bold"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </Flex>
    </>
  );
};

export default StatusStep;
