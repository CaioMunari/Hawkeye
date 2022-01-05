import React, { useState } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { getSNToken, setSNToken } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import Button from "../components/Button";
import Input from "../components/Input";
import useOrientation from "../hooks/useOrientation";

const SerialNumber = () => {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState(getSNToken());
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  navigator.serviceWorker.ready.then(async (registration) => {
    console.log("REGISTRADO");
    setInterval(() => {
      updateList();
    }, 5000);
  });

  const updateList = () => {
    // setInterval(() => {
    const newList = [...list];
    setList([...newList, new Date().toString()]);
    // }, 5000);
  };

  const { getOrientationValue } = useOrientation();

  const registerSerialNumber = (e) => {
    e.preventDefault();
    if (!serialNumber || serialNumber.length < 5) {
      setError(true);
      return;
    }
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
      <form style={{ width: "30%" }} onSubmit={registerSerialNumber}>
        <Stack
          direction="column"
          minWidth={{ base: "100vw", md: getOrientationValue("20vw", "80vw") }}
          bg="white"
          height={{ base: "100vh", md: "auto" }}
          p={12}
          justify={{ base: "flex-start", md: "flex-start" }}
          borderRadius={{ base: 0, md: 12 }}
        >
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
          <Button
            onClick={registerSerialNumber}
            colorScheme="teal"
            backgroundColor="teal.300"
            type="submit"
            style={{ marginTop: 25, textTransform: "uppercase" }}
          >
            Registrar
          </Button>
          {list.map((item) => (
            <Text key={item}>{item}</Text>
          ))}
        </Stack>
      </form>
    </Flex>
  );
};

export default SerialNumber;
