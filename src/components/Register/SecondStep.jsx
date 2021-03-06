import React, { useState, useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Button from "../Button";
import Input from "../Input";

const SecondStep = ({
  handleChange,
  verify,
  nextStep,
  prevStep,
  formData,
  validateError,
  errorForm,
  errorMsgs,
  isLoading,
}) => {
  const [enableNextStep, setEnableNextStep] = useState(false);
  useEffect(() => {
    const isValid = verify(["userName", "password"]);
    setEnableNextStep(isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <>
      <Flex direction="column" width="100%" height="80%">
        <Heading fontSize="3rem" fontWeight="normal">
          Cadastro
        </Heading>
        <Heading
          fontSize="1.5rem"
          fontWeight="normal"
          style={{ marginBottom: "2em" }}
        >
          Dados de Acesso
        </Heading>
        <Flex
          direction="column"
          width="100%"
          height="100%"
          justify="flex-start"
          align="flex-start"
        >
          <Input
            onChange={handleChange}
            name="userName"
            maxLength={255}
            placeholder="Nome de usuário"
            value={formData.userName}
            onBlur={validateError}
            error={errorForm?.userName}
            errorMsg={errorMsgs?.userName}
          />
          <Input
            onChange={handleChange}
            name="password"
            maxLength={255}
            placeholder="Senha"
            type="password"
            value={formData.password}
            description="Insira uma senha com ao menos 6 caracteres"
            onBlur={validateError}
            error={errorForm?.password}
          />
        </Flex>
      </Flex>
      <Flex width="100%" justify="space-between">
        <Button
          color="gray.400"
          background="white"
          border="1px solid #ccc"
          width="40%"
          type="submit"
          onClick={prevStep}
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
          border="1px solid white"
          style={{ textTransform: "uppercase" }}
          fontWeight="bold"
          onClick={nextStep}
          disabled={!enableNextStep || isLoading}
          isLoading={isLoading}
        >
          Próximo
        </Button>
      </Flex>
    </>
  );
};

export default SecondStep;
