import React, { useRef, useCallback, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Camera from "../components/Camera";
import { Button } from "@chakra-ui/react";

const Checkin = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    setImageSrc(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  const removeCapture = useCallback(() => {
    setImageSrc(null);
  }, [webcamRef]);

  const sendPhoto = () => {
    console.log("sending photo");
    console.log(imageSrc);
  };

  return (
    <Flex
      direction="column"
      justify="space-around"
      align="center"
      height="100vh"
      width="100%"
      p="2em"
    >
      <Camera imageSrc={imageSrc} ref={webcamRef} />
      {imageSrc ? (
        <Button
          colorScheme="red"
          w={{ base: "50%", xl: "30%", lg: "30%" }}
          p="8"
          onClick={removeCapture}
        >
          Remove picture
        </Button>
      ) : (
        <Button
          disabled={imageSrc}
          colorScheme="blue"
          w={{ base: "50%", xl: "30%", lg: "30%" }}
          p="8"
          onClick={capture}
        >
          Take Picture
        </Button>
      )}
      <Button
        w={{ base: "50%", xl: "30%", lg: "30%" }}
        p="8"
        colorScheme="blue"
        disabled={!imageSrc}
        onClick={sendPhoto}
      >
        Register Result
      </Button>
    </Flex>
  );
};

export default Checkin;
