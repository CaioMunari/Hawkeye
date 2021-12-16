import React, { useState, useEffect } from "react";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { api, motorApi } from "../services/api";
import {
  getAdminRegisterPayload,
  getMotorRegisterPayload,
} from "../utils/payload";
import { routes } from "../services/routes";
import StepIndicator from "../components/StepIndicator";
import FirstStep from "../components/Register/FirstStep";
import SecondStep from "../components/Register/SecondStep";
import ThirdStep from "../components/Register/ThirdStep";
import ConclusionStep from "../components/Register/ConclusionStep";
import useOrientation from "../hooks/useOrientation";
import { getResponsiveValue } from "../utils/screen";
const Register = () => {
  const { getOrientationValue } = useOrientation();
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(3);
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
    setIsLoading(true);
    registerAdmin()
      .then((adminResponse) => {
        if (adminResponse?.status === 0) {
          registerEngine(adminResponse.user)
            .then((engineResponse) => {
              if (engineResponse?.status === 0) {
                setRegister(false);
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
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
      [e.target.name]: e.target.value,
    });
  }

  function verify(keysToValidate = Object.keys(formData)) {
    const keys = keysToValidate;
    let tempForm = {};
    let numberOfErrors = keys.length;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key === "name") {
        let trimmedName = formData[key].trim().split(" ");
        if (trimmedName.length === 2) {
          tempForm[key] = false;
          numberOfErrors--;
        } else {
          tempForm[key] = true;
        }
      } else {
        if (formData[key] === "" || formData[key] === undefined) {
          tempForm[key] = true;
        } else {
          tempForm[key] = false;
          numberOfErrors--;
        }
      }
    }
    if (numberOfErrors <= 0) {
      return true;
      // requestRegister();
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (register) registerUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc, register]);

  const icons = ["user-detail", "key", "face-mask", ""];
  return (
    <Flex
      style={{ boxSizing: "border-box" }}
      flexDirection="column"
      justify="center"
      align="center"
      w="100%"
    >
      <StepIndicator steps={icons} step={step} />
      <div style={{ marginBottom: "1em" }}></div>
      <Stack
        direction="column"
        minWidth={{ base: "100vw", md: getOrientationValue("55vw", "100vw") }}
        bg="white"
        height={{ base: "100%", md: getOrientationValue("75vh", "100%") }}
        px={getResponsiveValue(4, "em")}
        py={{ base: "2em", md: getResponsiveValue(4, "em") }}
        align="flex-start"
        justify="space-between"
        borderRadius={{ base: 0, md: getOrientationValue(12, 0) }}
      >
        {
          {
            1: (
              <FirstStep
                formData={formData}
                handleChange={handleChange}
                verify={verify}
                inputValidation={inputValidation}
                nextStep={() => setStep(step + 1)}
              />
            ),
            2: (
              <SecondStep
                formData={formData}
                handleChange={handleChange}
                verify={verify}
                inputValidation={inputValidation}
                prevStep={() => setStep(step - 1)}
                nextStep={() => setStep(step + 1)}
              />
            ),
            3: (
              <ThirdStep
                formData={formData}
                handleChange={handleChange}
                verify={verify}
                inputValidation={inputValidation}
                prevStep={() => setStep(step - 1)}
                nextStep={() => setStep(step + 1)}
                isLoading={isLoading}
                imageSrc={imageSrc}
                setImageSrc={setImageSrc}
              />
            ),
            4: (
              <ConclusionStep
                formData={formData}
                handleChange={handleChange}
                verify={verify}
                inputValidation={inputValidation}
                prevStep={() => setStep(step - 1)}
                nextStep={registerUser}
                isLoading={isLoading}
                imageSrc={imageSrc}
                setImageSrc={setImageSrc}
              />
            ),
          }[step]
        }
      </Stack>
    </Flex>
  );
};

export default Register;
