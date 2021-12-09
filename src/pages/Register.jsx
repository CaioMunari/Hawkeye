import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  Button,
  Flex,
  Input,
  Stack,
  HStack,
  RadioGroup,
  Radio,
  FormLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Camera from "../components/Camera";
import { api, motorApi } from "../services/api";
import {
  getAdminRegisterPayload,
  getMotorRegisterPayload,
} from "../utils/payload";
import { routes } from "../services/routes";

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const webcamRef = useRef(null);
  const initialFormData = Object.freeze({
    username: "",
    password: "",
    name: "",
    lastName: "",
    registration: "",
    gender: "",
  });
  const [formData, setFormData] = useState(initialFormData);
  const [inputValidation, setInputValidation] = useState(initialFormData);

  const registerUser = async () => {
    registerAdmin()
      .then((adminResponse) => {
        if (adminResponse?.status === 0) {
          registerEngine(adminResponse.user)
            .then((engineResponse) => {
              if (engineResponse?.status === 0) {
                setRegister(false);
                navigate("../login", { replace: true });
              } else {
                console.log(
                  "Not possible to register user on engine, removing temp records."
                );
                removeUserAdmin(adminResponse.user.id);
                setRegister(false);
                //TODO: error message
              }
            })
            .catch(() => {
              console.log(" Engine-Server comunication error");
              console.log(
                "Not possible to register user on engine, removing temp records."
              );
              removeUserAdmin(adminResponse.user.id);
              setRegister(false);
            });
        } else {
          setRegister(false);
          alert("Register error");
          //TODO: error message
        }
      })
      .catch(() => {
        console.log(" Admin-Server comunication error");
      });
  };

  async function registerAdmin() {
    const payload = getAdminRegisterPayload(formData, imageSrc);
    try {
      const adminResponse = await api.put(routes.APIAddUser, payload);
      if (adminResponse?.data?.status === 0) {
        console.log("user register (Admin): " + adminResponse.data.message);
        return adminResponse.data;
      } else {
        console.log("user register (Admin): Fail");
        return { status: 500 };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeUserAdmin(userId) {
    const adminResponse = await api.delete(routes.APIRemoveUser(userId));
    console.log("User removal from Admin: " + adminResponse.data);

    if (adminResponse?.data === "true") {
      return adminResponse.data;
    } else {
      return { status: 500 };
    }
  }

  async function registerEngine(user) {
    const payload = getMotorRegisterPayload(user, formData, imageSrc);

    const engineResponse = await motorApi.post(routes.transaction, payload);

    if (engineResponse?.data[0]?.status === 0) {
      console.log("user register (Engine): " + engineResponse.data[0].message);
      console.log(engineResponse.data);
      return engineResponse.data[0];
    } else {
      console.log("user register (Engine): Fail");
      return { status: 500 };
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });

    if (e.target.name === "name") {
      const fullName = e.target.value.trim();
      setFormData({
        ...formData,
        name: fullName.split(/\s(.+)/)[0],
        lastName: fullName.split(/\s(.+)/)[1],
      });
    }
  }

  const capture = useCallback(() => {
    const img = webcamRef.current.getScreenshot({ width: 640, height: 640 });
    setImageSrc(img);
    //console.log(img)
  }, [webcamRef]);

  const requestRegister = () => {
    if (!imageSrc) {
      capture();
      setRegister(true);
    } else {
      setRegister(true);
    }
  };

  function verify() {
    const keys = Object.keys(formData);

    let tempForm = {};
    let numberOfErrors = keys.length;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (formData[key] === "" || formData[key] === undefined) {
        tempForm[key] = true;
      } else {
        tempForm[key] = false;
        numberOfErrors--;
      }
    }
    setInputValidation(tempForm);

    if (numberOfErrors <= 0) {
      requestRegister();
    } else {
      console.log("Dados não preenchidos");
    }
  }

  useEffect(() => {
    if (register) registerUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc, register]);

  return (
    <Flex w="100%" h="100vh" align="center" justify="center">
      <Stack
        direction="column"
        width={{ base: "100vw", md: "45vw" }}
        bg="gray.200"
        height={{ base: "100vh", md: "70vh" }}
        px={6}
        align="center"
        borderRadius={8}
        p={5}
      >
        <Flex
          direction="column"
          width="100%"
          height={{ base: "25%", md: "80%" }}
          justify="space-between"
          align="center"
          spacing={15}
        >
          <Input
            isInvalid={inputValidation.name || inputValidation.lastName}
            errorBorderColor="crimson"
            height={50}
            bg="white"
            onChange={handleChange}
            name="name"
            placeholder="Nome"
          />
          <RadioGroup defaultValue="" name="gender" width="100%">
            <HStack
              spacing="24px"
              height={50}
              bg="white"
              borderRadius="5"
              color="inherit"
              pl={5}
            >
              <FormLabel color="#A0AEC0">Sexo: </FormLabel>
              <Radio
                isInvalid={inputValidation.gender}
                errorBorderColor="crimson"
                value="M"
                onChange={handleChange}
              >
                Masculino
              </Radio>
              <Radio
                isInvalid={inputValidation.gender}
                errorBorderColor="crimson"
                value="F"
                onChange={handleChange}
              >
                Feminino
              </Radio>
            </HStack>
          </RadioGroup>

          <Input
            isInvalid={inputValidation.registration}
            errorBorderColor="crimson"
            height={50}
            bg="white"
            onChange={handleChange}
            name="registration"
            placeholder="Matricula"
          />
          <Flex direction="row" width="100%">
            <Input
              isInvalid={inputValidation.username}
              errorBorderColor="crimson"
              height={50}
              bg="white"
              onChange={handleChange}
              name="username"
              placeholder="Usuario"
            />
            <Input
              isInvalid={inputValidation.password}
              errorBorderColor="crimson"
              height={50}
              bg="white"
              onChange={handleChange}
              name="password"
              placeholder="Senha"
              type="password"
              mb={5}
            />
          </Flex>
        </Flex>

        <Flex
          direction="column"
          justify="center"
          align="center"
          height={{ base: "auto", md: "60vh" }}
          onClick={() => {
            imageSrc ? setImageSrc(null) : capture();
          }}
        >
          <Camera
            id="teste"
            imageSrc={imageSrc}
            ref={webcamRef}
            w="250px"
            h="250px"
          />
        </Flex>

        <Button
          fontWeight="bold"
          onClick={verify}
          colorScheme="blue"
          mt={5}
          p="5"
          isLoading={register ? true : false}
          loadingText="Submitting"
        >
          Cadastrar
        </Button>
      </Stack>
    </Flex>
  );
};

export default Register;
