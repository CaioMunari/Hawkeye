import React, { useRef, useCallback, useState, useEffect } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Camera from "../components/Camera";
import Button from "../components/Button";
import {
  getAdminCheckinPayload,
  getMotorCheckinPayload,
  mockCheckinResponse,
} from "../utils/payload";
import { api } from "../services/api";
import { routes } from "../services/routes";
import useOrientation from "../hooks/useOrientation";
import Paper from "../components/Paper";
import StatusStep from "../components/Register/StatusStep";
import { useNavigate } from "react-router-dom";
import { getProperty, setLastCheckin } from "../services/auth";
import { useSync } from "../hooks/useSync";
const Checkin = () => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checkinIsCompleted, setCheckinIsCompleted] = useState(false);
  const [lastStep, setLastStep] = useState(false);
  const webcamRef = useRef(null);
  const { getOrientationValue } = useOrientation();
  const { sync, setSync } = useSync();
  const capture = useCallback(() => {
    setIsLoading(true);
    const sendPhotoToMotor = async (img) => {
      setCheckinIsCompleted(false);
      const payload = getMotorCheckinPayload(img);
      const { Id: afapTransactionId } = payload;
      try {
        // await motorApi.post(routes.transaction, payload);
        const response = mockCheckinResponse();
        const adminPayload = getAdminCheckinPayload(
          response,
          img,
          afapTransactionId
        );
        await sendPhotoToAdmin(adminPayload);
      } catch (error) {
        setSuccess(false);
        setImageSrc(null);
      }
    };
    const img = webcamRef.current.getScreenshot({ width: 640, height: 640 });
    setImageSrc(img);
    sendPhotoToMotor(img);
    // eslint-disable-next-line
  }, [webcamRef]);

  const user = getProperty("userInfo");
  const sendPhotoToAdmin = async (payload) => {
    try {
      await api.put(routes.APIAddCheckInUser, payload);
      setSuccess(true);
      setLastCheckin(new Date());
      if (!sync) {
        setSync(true);
      }
    } catch (error) {
      setSuccess(false);
      console.log(error);
    }
    setIsLoading(false);
    setCheckinIsCompleted(true);
  };

  const clearCheckin = () => {
    setImageSrc(null);
    setCheckinIsCompleted(false);
  };

  useEffect(() => {
    if (success === true) {
      setTimeout(() => {
        setLastStep(true);
      }, 2000);
    }
  }, [success]);

  const imageSize = getOrientationValue("22vw", "80vw");
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
        {lastStep !== false ? (
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
              <Heading fontSize="1rem" fontWeight="normal" color="purple.500">
                {`${user.name} ${user.lastName}`}
              </Heading>
            </Flex>
            <Camera
              isLoading={isLoading}
              w={imageSize}
              h={imageSize}
              imageSrc={imageSrc}
              ref={webcamRef}
              checkinIsCompleted={checkinIsCompleted}
              success={success}
            />
            {checkinIsCompleted && success === false && (
              <Text
                style={{ marginTop: "1rem" }}
                color="gray"
                width="50%"
                textAlign="center"
              >
                Verificação inválida! Tente novamente.
              </Text>
            )}
            {checkinIsCompleted ? (
              <Button
                style={{ marginTop: "1rem" }}
                w={imageSize}
                disabled={success === true}
                colorScheme="teal"
                onClick={success === false && clearCheckin}
                loadingText="Verificando..."
              >
                {success === false
                  ? "Tentar novamente"
                  : "Verificar minha foto"}
              </Button>
            ) : (
              <Button
                style={{ marginTop: "1rem" }}
                w={imageSize}
                disabled={imageSrc}
                colorScheme="teal"
                onClick={capture}
                loadingText="Verificando..."
              >
                Verificar minha foto
              </Button>
            )}
          </>
        )}
      </Paper>
    </Flex>
  );
};

export default Checkin;
