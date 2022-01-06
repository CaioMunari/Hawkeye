import React, { useState } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { getSNToken, setAppID, setSNToken } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import Button from "../components/Button";
import Input from "../components/Input";
import useOrientation from "../hooks/useOrientation";
import { generateAppID } from "../utils/common";

const SerialNumber = () => {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState(getSNToken());
  const [error, setError] = useState(false);

  const { getOrientationValue } = useOrientation();

  const registerSerialNumber = (e) => {
    e.preventDefault();
    const appId = generateAppID();
    if (!serialNumber || serialNumber.length < 5) {
      setError(true);
      return;
    }
    setAppID(appId);
    setSNToken(serialNumber);
    navigate("/login");
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
              textAlign="center"
              width="50%"
            >
              Digite um número de dispositivo correto!
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
