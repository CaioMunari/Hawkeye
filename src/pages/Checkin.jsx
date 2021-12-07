import React, { useRef, useCallback, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Camera from "../components/Camera";
import { Button } from "@chakra-ui/react";
import {
  getAdminCheckinPayload,
  getMotorCheckinPayload,
  mockCheckinResponse,
} from "../utils/payload";
import { motorApi, api } from "../services/api";
import { routes } from "../services/routes";
const Checkin = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const sendPhotoToMotor = async (img) => {
      const payload = getMotorCheckinPayload(img);
      const { Id: afapTransactionId } = payload;
      try {
        await motorApi.post(routes.transaction, payload);
      } catch (error) {
        console.log(error);
      }
      const response = mockCheckinResponse();
      const adminPayload = getAdminCheckinPayload(
        response,
        img,
        afapTransactionId
      );
      sendPhotoToAdmin(adminPayload);
    };

    const img = webcamRef.current.getScreenshot({ width: 640, height: 640 });
    setImageSrc(img);
    sendPhotoToMotor(img);
  }, [webcamRef]);

  const sendPhotoToAdmin = async (payload) => {
    try {
      await api.put("/checkin/save", payload);
    } catch (error) {
      console.log("deu ruim");
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
