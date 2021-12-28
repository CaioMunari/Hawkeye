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
import useOrientation from "../hooks/useOrientation";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getOrientationValue } = useOrientation();
  const login = async (e) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
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
    setIsLoading(false);
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
      width="100%"
      flex={1}
      h="100%"
      align="center"
      justify={getOrientationValue("flex-end", "center")}
      px={{ base: "0", md: getOrientationValue("5em", "0") }}
    >
      <form onSubmit={login}>
        <Stack
          direction="column"
          minWidth={{ base: "100vw", md: getOrientationValue("25vw", "80vw") }}
          bg="white"
          height={{ base: "100vh", md: "auto" }}
          p={12}
          justify={{ base: "flex-start", md: "flex-start" }}
          borderRadius={{ base: 0, md: 12 }}
        >
          <Heading fontWeight="normal" style={{ marginBottom: 30 }}>
            Login
          </Heading>
          <Input
            bg="white"
            placeholder="Nome de usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            isInvalid={error}
            errorBorderColor="red.500"
            color={error && "red"}
          />
          <Input
            type="password"
            bg="white"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={error}
            errorBorderColor="red.500"
            color={error && "red"}
          />
          {error && (
            <Text
              color="red"
              fontSize="0.9rem"
              style={{ marginTop: 10 }}
              textAlign="center"
              width="100%"
            >
              Suas informações de login não estão corretas!
            </Text>
          )}
          <Button
            onClick={login}
            colorScheme="teal"
            backgroundColor="teal.300"
            width="100%"
            type="submit"
            style={{ marginTop: 25, textTransform: "uppercase" }}
            isLoading={isLoading}
          >
            Entrar
          </Button>
          <Text
            color="purple.400"
            fontWeight="normal"
            fontSize="1.6em"
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
