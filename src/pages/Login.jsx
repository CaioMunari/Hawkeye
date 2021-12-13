import React, { useState, useEffect } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { setProperty } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { generatePassword } from "../utils/password";
import { routes } from "../services/routes";
import { Heading } from "@chakra-ui/react";
import Button from "../components/Button";
import Input from "../components/Input";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setError(false);
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
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
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

  useEffect(() => {
    console.log("error", error);
  }, [error]);

  return (
    <Flex
      w="100%"
      h="100vh"
      align="center"
      justify="flex-end"
      padding={{ base: "0", md: "10rem" }}
      background="purple.700"
    >
      <form onSubmit={login}>
        <Stack
          direction="column"
          minWidth={{ base: "100vw", md: "25vw" }}
          bg="white"
          height={{ base: "100vh", md: "auto" }}
          p={12}
          justify={{ base: "center", md: "flex-start" }}
          borderRadius={{ base: 0, md: 12 }}
        >
          <Heading fontWeight="normal" style={{ marginBottom: 30 }}>
            Login
          </Heading>
          <Input
            bg="white"
            placeholder="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            isInvalid={error}
            errorBorderColor="red.500"
          />
          <Input
            type="password"
            bg="white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={error}
            errorBorderColor="red.500"
          />
          <Button
            onClick={login}
            colorScheme="teal"
            width="100%"
            type="submit"
            style={{ marginTop: 25, textTransform: "uppercase" }}
          >
            Entrar
          </Button>
          <Text
            color="purple.400"
            fontWeight="500"
            fontSize="1.4em"
            style={{ marginTop: 50 }}
            textAlign="center"
            width="100%"
          >
            Ainda não tem cadastro?
          </Text>
          <Button
            background="white"
            color="gray"
            border="1px solid #ccc"
            width="100%"
            onClick={register}
            style={{ marginTop: 25, textTransform: "uppercase" }}
          >
            Cadastrar
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

export default Login;
