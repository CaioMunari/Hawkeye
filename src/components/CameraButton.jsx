import { Flex } from "@chakra-ui/react";
import React from "react";
import Button from "./Button";

const CameraButton = ({ children, capture, imageSrc, deleteImage }) => {
  return (
    <Flex w="100%" justify="center" align="center">
      {children}
      <Button
        borderRadius="50%"
        width="2rem"
        height="2rem"
        colorScheme="gray"
        border="3px solid #ccc"
        style={{ marginLeft: "5%" }}
        onClick={!imageSrc ? capture : deleteImage}
      >
        {!imageSrc ? (
          <box-icon type="solid" name="camera" color="gray" size="2em" />
        ) : (
          <box-icon type="solid" name="trash-alt" color="red" size="2em" />
        )}
      </Button>
    </Flex>
  );
};

export default CameraButton;
