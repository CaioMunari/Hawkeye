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
import StatusStep from "../components/Register/StatusStep";
import { useNavigate } from "react-router-dom";

const Checkin = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const webcamRef = useRef(null);
  const { getOrientationValue } = useOrientation();

  const capture = useCallback(() => {
    setIsLoading(true);
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
        setImageSrc(null);
        console.log(error);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    const img = webcamRef.current.getScreenshot({ width: 640, height: 640 });
    setImageSrc(img);
    sendPhotoToMotor(img);
  }, [webcamRef]);

  const sendPhotoToAdmin = async (payload) => {
    try {
      await api.put(routes.APIAddCheckInUser, payload);
      setSuccess(true);
    } catch (error) {
      console.log("deu ruim");
    }
  };

  const imageSize = getOrientationValue("25vw", "80vw");
  return (
    <Flex
      direction="column"
      justify="flex-start"
      flex={1}
      align="center"
      height="100%"
      width="100%"
    >
      <Paper title="Check-in">
        {success ? (
          <StatusStep
            title="Checkin realizado com sucesso!"
            subtitle=""
            buttonText="Clique aqui para usar o dispositivo"
            onClick={() => navigate("/login")}
          />
        ) : (
          <>
            <Flex direction="column" w="100%">
              <Heading fontSize="3rem" fontWeight="normal">
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
              onClick={capture}
              isLoading={isLoading}
              loadingText="Verificando..."
            >
              Verificar minha foto
            </Button>
          </>
        )}
      </Paper>
    </Flex>
  );
};

export default Checkin;
