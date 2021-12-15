import React, { useState, useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Button from "../Button";
import Input from "../Input";

const SecondStep = ({
  handleChange,
  inputValidation,
  verify,
  nextStep,
  prevStep,
  formData,
}) => {
  const [enableNextStep, setEnableNextStep] = useState(false);

  useEffect(() => {
    const isValid = verify(["username", "password"]);
    setEnableNextStep(isValid);
  }, [formData]);

  return (
    <>
      <Flex direction="column" width="100%">
        <Heading fontWeight="normal">Cadastro</Heading>
        <Heading
          fontSize="1em"
          fontWeight="normal"
          style={{ marginBottom: 30 }}
        >
          Dados de Acesso
        </Heading>
        <Flex
          direction="column"
          width="100%"
          justify="space-between"
          align="center"
        >
          <Input
            isInvalid={inputValidation.username}
            errorBorderColor="crimson"
            bg="white"
            onChange={handleChange}
            name="username"
            placeholder="Nome de usuário"
            value={formData.username}
          />
          <Input
            isInvalid={inputValidation.password}
            errorBorderColor="crimson"
            bg="white"
            onChange={handleChange}
            name="password"
            placeholder="Senha"
            type="password"
            mb={5}
            value={formData.password}
          />
        </Flex>
      </Flex>
      <Flex width="100%" justify="space-between" mt={25}>
        <Button
          background="white"
          color="gray"
          border="1px solid #ccc"
          width="40%"
          type="submit"
          onClick={prevStep}
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

export default SecondStep;
