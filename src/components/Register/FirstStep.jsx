import React, { useState, useEffect } from "react";
import { Flex, HStack, RadioGroup, Radio, Heading } from "@chakra-ui/react";
import Button from "../Button";
import Input from "../Input";
import { useNavigate } from "react-router-dom";

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
  }, [formData]);

  return (
    <>
      <Flex direction="column" w="100%">
        <Heading fontWeight="normal">Cadastro</Heading>
        <Heading
          fontSize="1em"
          fontWeight="normal"
          style={{ marginBottom: 30 }}
        >
          Dados Escolares
        </Heading>
        <Flex
          direction="column"
          width="100%"
          justify="space-between"
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
          background="white"
          color="gray"
          border="1px solid #ccc"
          width="40%"
          type="submit"
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
          backgroundColor="teal.300"
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
