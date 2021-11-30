import React from "react";
import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import { setToken } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const login = () => {
    setToken("teste");
    navigate("/checkin");
  };

  const register = () => {
    navigate("/register");
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
          height={{ base: "40%", md: "80%" }}
          justify="space-between"
          align="center"
          // border="2px solid red"
          spacing={10}
        >
          <Input height={50} bg="white" placeholder="User" />
          <Input
            type="password"
            height={50}
            bg="white"
            placeholder="Password"
          />
          <Button
            height={50}
            fontWeight="bold"
            onClick={login}
            colorScheme="blue"
            width="40%"
          >
            Login
          </Button>
          <Button
            height={50}
            fontWeight="bold"
            onClick={register}
            colorScheme="blue"
            width="40%"
          >
            Register
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Login;
