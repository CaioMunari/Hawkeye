import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const IconButton = ({ name, text, color, size, onClick }) => {
  return (
    <Flex
      onClick={onClick}
      align="center"
      style={{ cursor: "pointer" }}
      _hover={{ opacity: 0.5 }}
    >
      <box-icon name={name} color={color} size={size}></box-icon>
      <Text color={color} paddingLeft={2}>
        {text}
      </Text>
    </Flex>
  );
};

export default IconButton;
