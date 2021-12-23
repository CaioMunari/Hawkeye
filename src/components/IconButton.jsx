import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const IconButton = ({ name, text, color, size, onClick, style, type }) => {
  return (
    <Flex
      onClick={onClick}
      align="center"
      style={{ cursor: onClick && "pointer", ...style }}
      _hover={{ opacity: onClick && 0.5 }}
    >
      <box-icon type={type} name={name} color={color} size={size}></box-icon>
      <Text color={color} paddingLeft={2}>
        {text}
      </Text>
    </Flex>
  );
};

export default IconButton;
