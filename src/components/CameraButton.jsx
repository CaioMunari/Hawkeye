import { Flex } from "@chakra-ui/react";
import React from "react";
import Button from "./Button";

const CameraButton = ({ children, capture, imageSrc, deleteImage }) => {
  return (
    <>
      {children}
      <Flex paddingTop={{ base: 10, md: 0 }} width="30%" height="25vh">
        {!imageSrc ? (
          <Button
            borderRadius="50%"
            width="3rem"
            height="3rem"
            p={"2.5rem"}
            border="3px solid #ccc"
            onClick={capture}
          >
            Foto
          </Button>
        ) : (
          <Button
            borderRadius="50%"
            colorScheme="red"
            width="3rem"
            height="3rem"
            p={"2.5rem"}
            border="3px solid #ccc"
            onClick={deleteImage}
          >
            Apagar
          </Button>
        )}
      </Flex>
    </>
  );
};

export default CameraButton;
