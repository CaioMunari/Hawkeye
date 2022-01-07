import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
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
import StatusStep from "../components/Register/StatusStep";
import Paper from "../components/Paper";
import useOrientation from "../hooks/useOrientation";
import { useNavigate } from "react-router-dom";

const minLength = {
  userName: 6,
  password: 6,
  registration: 6,
};

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const initialFormData = Object.freeze({
    userName: "",
    password: "",
    name: "",
    lastName: "",
    registration: "",
    gender: "",
  });
  const [formData, setFormData] = useState(initialFormData);
  const [inputValidation, setInputValidation] = useState(initialFormData);
  const [errorForm, setErrorForm] = useState(initialFormData);

  const { getOrientationValue } = useOrientation();
  const registerUser = async () => {
    setIsLoading(true);
    try {
      await registerAdmin();
      // removeUserAdmin(response.user.id);
      setTimeout(() => {
        setStep(5);
      }, 4000);
    } catch (error) {
      console.log(error);
    }
    // .then((adminResponse) => {
    //   if (adminResponse?.status === 0) {
    //     registerEngine(adminResponse.user)
    //       .then((engineResponse) => {
    //         if (engineResponse?.status === 0) {
    //           setRegister(false);
    //         } else {
    //           console.log(
    //             "Not possible to register user on engine, removing temp records."
    //           );
    //           removeUserAdmin(adminResponse.user.id);
    //           setRegister(false);
    //           //TODO: error message
    //         }
    //       })
    //       .catch(() => {
    //         console.log(" Engine-Server comunication error");
    //         console.log(
    //           "Not possible to register user on engine, removing temp records."
    //         );
    //         removeUserAdmin(adminResponse.user.id);
    //         setRegister(false);
    //       });
    //   } else {
    //     setRegister(false);
    //     alert("Register error");
    //     //TODO: error message
    //   }
    // })
    // .catch(() => {
    //   console.log(" Admin-Server comunication error");
    // });

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  async function registerAdmin() {
    const payload = getAdminRegisterPayload(formData, imageSrc);
    console.log(payload);
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
        let minSize = 1;
        if (minLength[key]) {
          minSize = minLength[key];
        }
        if (formData[key].length < minSize || formData[key] === undefined) {
          tempForm[key] = true;
        } else {
          tempForm[key] = false;
          numberOfErrors--;
        }
      }
    }
    setInputValidation(tempForm);
    if (numberOfErrors <= 0) {
      return true;
    } else {
      return false;
    }
  }

  const validateError = (e) => {
    let key = e.target.name;
    setErrorForm({ ...errorForm, [key]: inputValidation[key] });
  };

  useEffect(() => {
    if (register) registerUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc, register]);

  const icons = ["user-detail", "key", "face-mask", ""];
  return (
    <Flex
      style={{ boxSizing: "border-box" }}
      flexDirection="column"
      justify="flex-start"
      align="center"
      w="100%"
      h="90vh"
      px={{ base: "0", md: "5em" }}
      marginTop={{ base: "0", md: getOrientationValue("-3%", 0) }}
    >
      <StepIndicator steps={icons} step={step} />
      <Paper>
        {
          {
            1: (
              <FirstStep
                formData={formData}
                handleChange={handleChange}
                verify={verify}
                nextStep={() => setStep(step + 1)}
                validateError={validateError}
                errorForm={errorForm}
              />
            ),
            2: (
              <SecondStep
                formData={formData}
                handleChange={handleChange}
                verify={verify}
                prevStep={() => setStep(step - 1)}
                nextStep={() => setStep(step + 1)}
                validateError={validateError}
                errorForm={errorForm}
              />
            ),
            3: (
              <ThirdStep
                formData={formData}
                handleChange={handleChange}
                verify={verify}
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
            5: (
              <StatusStep
                title="Cadastro realizado com sucesso!"
                subtitle="Agora você pode realizar seu acesso usando as credenciais
            cadastradas."
                buttonText="ir para o login"
                nextStep={registerUser}
                onClick={() => navigate("/login")}
              />
            ),
          }[step]
        }
      </Paper>
    </Flex>
  );
};

export default Register;
