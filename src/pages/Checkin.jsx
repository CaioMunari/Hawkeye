import React, { useRef, useCallback, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Camera from "../components/Camera";
import { Button } from "@chakra-ui/react";

const Checkin = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const img = webcamRef.current.getScreenshot();
    setImageSrc(img);
    sendPhoto(img);
  }, [webcamRef]);

  const sendPhoto = (img) => {
    console.log("sending photo");
    console.log(img);
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

      <Button
        disabled={imageSrc}
        colorScheme="blue"
        w={{ base: "50%", xl: "30%", lg: "30%" }}
        p="8"
        onClick={capture}
      >
        Take Picture
      </Button>
    </Flex>
  );
};

export default Checkin;
