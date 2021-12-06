import React, { useState } from "react";
import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import { getUserId, setProperty, setToken } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { generatePassword } from "../utils/password";
import { routes } from "../services/routes";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const { data } = await api.post(routes.APIUserLogin, {
        password: generatePassword(password),
        userName: user,
      });
      if (data && data.id !== 0) {
        getPhotoId(data.id);
        getSettings(data.id);
        setProperty("userId", data.id);
        navigate("/checkin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPhotoId = async (userId) => {
    try {
      const { data } = await api.get(routes.APIPhotoId(userId));
      if (data) {
        setProperty("photoId", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSettings = async (userId) => {
    try {
      const { data } = await api.get(routes.APISettings(userId));
      if (data) {
        setProperty("minScore", data);
      }
    } catch (error) {
      console.log(error);
    }
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
          <Input
            height={50}
            bg="white"
            placeholder="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <Input
            type="password"
            height={50}
            bg="white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
