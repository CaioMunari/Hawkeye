import React, { useState } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { getSNToken, setAppID, setSNToken } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import Button from "../components/Button";
import Input from "../components/Input";
import useOrientation from "../hooks/useOrientation";
import { getRegisterDevicePayload } from "../utils/payload";
import { api } from "../services/api";
import { routes } from "../services/routes";
const SerialNumber = () => {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState(getSNToken());
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { getOrientationValue } = useOrientation();

  const registerSerialNumber = async (e) => {
    e.preventDefault();
    if (!serialNumber || serialNumber.length < 5) {
      setError(true);
      setErrorMsg("Insira um Serial Number válido!");
      return;
    }
    const payload = getRegisterDevicePayload(serialNumber);
    try {
      const { data: response } = await api.post(
        routes.APISaveDevice(),
        payload
      );
      if (response.status === 1) {
        setError(true);
        if (response.message.includes("Invalid")) {
          setErrorMsg("Dispositivo não identificado!");
        } else if (response.message.includes("Serial in use")) {
          setErrorMsg("Dispositivo já cadastrado!");
        }
      } else {
        setAppID(payload.appId);
        setSNToken(serialNumber);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      width="100%"
      h="100%"
      align="center"
      justify={getOrientationValue("flex-end", "center")}
      px={{ base: "0", md: getOrientationValue("5rem", "0") }}
      flex={1}
    >
      <Stack
        direction="column"
        width={getOrientationValue("30%", "60%")}
        bg="white"
        p={"3rem"}
        justify={{ base: "flex-start", md: "flex-start" }}
        borderRadius="24px"
      >
        <form style={{ width: "100%" }} onSubmit={registerSerialNumber}>
          <Heading w="50%" fontWeight="normal" style={{ marginBottom: 5 }}>
            Registro do dispositivo
          </Heading>
          <Heading
            fontSize="1.5rem"
            fontWeight="normal"
            style={{ marginBottom: 30 }}
          >
            Antes de começar registre o serial number deste dispositivo. É
            simples e rápido.
          </Heading>
          <Input
            bg="white"
            placeholder="Serial Number"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            isInvalid={error}
            errorBorderColor="red.500"
            description="Você pode encontrar o serial number na parte traseira deste dispositivo."
            color={error && "red"}
          />
          {error && (
            <Text
              color="red"
              fontSize="0.9rem"
              style={{ marginTop: 10 }}
              width="50%"
            >
              {errorMsg}
            </Text>
          )}
          <br></br>
          <Button
            w="100%"
            onClick={registerSerialNumber}
            colorScheme="teal"
            backgroundColor="teal.300"
            type="submit"
            style={{ marginTop: 25, textTransform: "uppercase" }}
          >
            Registrar
          </Button>
        </form>
      </Stack>
    </Flex>
  );
};

export default SerialNumber;
