import React from "react";
import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const registerPhoto = () => {
    navigate("/registerPhoto");
  };
  return (
    <Flex w="100%" h="100vh" align="center" justify="center">
      <Stack
        direction="column"
        width={{ base: "100vw", md: "25vw" }}
        bg="gray.200"
        height={{ base: "100vh", md: "30vh" }}
        px={6}
        align="center"
        justify={{ base: "center", md: "space-around" }}
        borderRadius={8}
      >
        <Flex
          direction="column"
          width="100%"
          height={{ base: "25%", md: "70%" }}
          justify="space-between"
          align="center"
          spacing={10}
        >
          <Input height={50} bg="white" placeholder="ID" />
          <Input
            type="password"
            height={50}
            bg="white"
            placeholder="Student Name"
          />
          <Button
            height={50}
            fontWeight="bold"
            onClick={registerPhoto}
            colorScheme="blue"
            width="40%"
          >
            Proceed
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Register;
