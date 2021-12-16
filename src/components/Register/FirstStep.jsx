import React, { useState, useEffect } from "react";
import { Flex, HStack, RadioGroup, Radio, Heading } from "@chakra-ui/react";
import Button from "../Button";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
import { getResponsiveValue } from "../../utils/screen";

const FirstStep = ({
  handleChange,
  inputValidation,
  verify,
  nextStep,
  formData,
}) => {
  const [enableNextStep, setEnableNextStep] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isValid = verify(["name", "gender", "registration"]);
    setEnableNextStep(isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <>
      <Flex direction="column" w="100%" height="80%">
        <Heading fontSize="3em" fontWeight="normal">
          Cadastro
        </Heading>
        <Heading
          fontSize="1.5em"
          fontWeight="normal"
          style={{ marginBottom: getResponsiveValue(3, "em") }}
        >
          Dados Escolares
        </Heading>
        <Flex
          direction="column"
          width="100%"
          height="100%"
          justify="flex-start"
          align="center"
        >
          <Input
            isInvalid={inputValidation.name || inputValidation.lastName}
            errorBorderColor="crimson"
            bg="white"
            onChange={handleChange}
            name="name"
            placeholder="Nome"
            value={formData.name}
          />
          <RadioGroup
            value={formData.gender}
            defaultValue=""
            name="gender"
            width="100%"
            style={{ marginBottom: "2em" }}
          >
            <HStack
              spacing="24px"
              height={50}
              bg="white"
              borderRadius="5"
              color="inherit"
            >
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
            bg="white"
            onChange={handleChange}
            name="registration"
            placeholder="Matricula"
            value={formData.registration}
          />
        </Flex>
      </Flex>
      <Flex width="100%" justify="space-between">
        <Button
          width="40%"
          type="submit"
          color="gray.400"
          background="white"
          border="1px solid #ccc"
          onClick={() => navigate("/login")}
          loadingText="Submitting"
          style={{
            textTransform: "uppercase",
          }}
        >
          Voltar
        </Button>
        <Button
          colorScheme="teal"
          width="40%"
          type="submit"
          style={{ textTransform: "uppercase" }}
          fontWeight="bold"
          onClick={nextStep}
          loadingText="Submitting"
          disabled={!enableNextStep}
        >
          Próximo
        </Button>
      </Flex>
    </>
  );
};

export default FirstStep;
