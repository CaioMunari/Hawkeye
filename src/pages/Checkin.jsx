import React, { useRef, useCallback, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Camera from "../components/Camera";
import { Button } from "@chakra-ui/react";
import { getCheckinPayload } from "../utils/payload";
import { motorApi } from "../services/api";
import { routes } from "../services/routes";
const Checkin = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const img = webcamRef.current.getScreenshot({ width: 640, height: 640 });
    setImageSrc(img);
    sendPhoto(img);
  }, [webcamRef]);

  const sendPhoto = async (img) => {
    const payload = getCheckinPayload(img);
    try {
      await motorApi.post(routes.transaction, payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      direction="column"
      justify="space-around"
      align="center"
      height="100%"
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
