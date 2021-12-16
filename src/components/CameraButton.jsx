import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Button from "./Button";

import useOrientation from "../hooks/useOrientation";

import "boxicons";

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
        py={10}
        // border="1px solid red"
      >
        {children}
        <Button
          borderRadius="50%"
          width="3rem"
          height="3rem"
          p="2.5rem"
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
