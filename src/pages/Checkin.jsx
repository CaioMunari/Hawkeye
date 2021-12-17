import React, { useRef, useCallback, useState } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Camera from "../components/Camera";
import Button from "../components/Button";
import {
  getAdminCheckinPayload,
  getMotorCheckinPayload,
  mockCheckinResponse,
} from "../utils/payload";
import { motorApi, api } from "../services/api";
import { routes } from "../services/routes";
import useOrientation from "../hooks/useOrientation";
import Paper from "../components/Paper";
const Checkin = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const webcamRef = useRef(null);
  const { getOrientationValue } = useOrientation();

  const capture = useCallback(() => {
    const sendPhotoToMotor = async (img) => {
      const payload = getMotorCheckinPayload(img);
      const { Id: afapTransactionId } = payload;
      try {
        await motorApi.post(routes.transaction, payload);
        const response = mockCheckinResponse();
        const adminPayload = getAdminCheckinPayload(
          response,
          img,
          afapTransactionId
        );
        sendPhotoToAdmin(adminPayload);
      } catch (error) {
        console.log(error);
      }
    };

    const img = webcamRef.current.getScreenshot({ width: 640, height: 640 });
    setImageSrc(img);
    sendPhotoToMotor(img);
  }, [webcamRef]);

  const sendPhotoToAdmin = async (payload) => {
    try {
      await api.put(routes.APIAddCheckInUser, payload);
    } catch (error) {
      console.log("deu ruim");
    }
  };

  const imageSize = getOrientationValue("25vw", "80vw");
  return (
    <Flex
      direction="column"
      justify="space-around"
      align="center"
      height="100vh"
      width="100%"
      p={getOrientationValue("2em", 0)}
    >
      <Paper title="Check-in">
        <Flex direction="column" w="100%">
          <Heading fontSize="3em" fontWeight="normal">
            Check-in
          </Heading>
        </Flex>
        <Camera
          w={imageSize}
          h={imageSize}
          imageSrc={imageSrc}
          ref={webcamRef}
        />
        <Button
          w={imageSize}
          disabled={imageSrc}
          colorScheme="teal"
          p="8"
          onClick={capture}
        >
          Verificar minha foto
        </Button>
      </Paper>
    </Flex>
  );
};

export default Checkin;
