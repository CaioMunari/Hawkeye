import { Flex } from "@chakra-ui/react";
import React from "react";
import Button from "./Button";

import useOrientation from "../hooks/useOrientation";

const CameraButton = ({ children, capture, imageSrc, deleteImage }) => {
  const { getOrientationValue } = useOrientation();

  return (
    <Flex width="100%" justify="center">
      <Flex
        direction={{
          base: "column",
          md: getOrientationValue("row", "column"),
        }}
        width="60%"
        justify="flex-end"
        align="center"
      >
        {children}
        <Button
          borderRadius="50%"
          width="3rem"
          height="3rem"
          colorScheme="gray"
          border="3px solid #ccc"
          style={{ marginLeft: "5%" }}
          onClick={!imageSrc ? capture : deleteImage}
          mt={getOrientationValue(0, "50%")}
        >
          {!imageSrc ? (
            <box-icon type="solid" name="camera" color="gray" size="2em" />
          ) : (
            <box-icon type="solid" name="trash-alt" color="red" size="2em" />
          )}
        </Button>
      </Flex>
    </Flex>
  );
};

export default CameraButton;
