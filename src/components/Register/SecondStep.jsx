import React, { useState, useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Button from "../Button";
import Input from "../Input";

const SecondStep = ({ handleChange, verify, nextStep, prevStep, formData }) => {
  const [enableNextStep, setEnableNextStep] = useState(false);
  useEffect(() => {
    const isValid = verify(["username", "password"]);
    setEnableNextStep(isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <>
      <Flex direction="column" width="100%" height="80%">
        <Heading fontSize="3em" fontWeight="normal">
          Cadastro
        </Heading>
        <Heading
          fontSize="1.5em"
          fontWeight="normal"
          style={{ marginBottom: 30 }}
        >
          Dados de Acesso
        </Heading>
        <Flex
          direction="column"
          width="100%"
          height="100%"
          justify="flex-start"
          align="center"
        >
          <Input
            errorBorderColor="crimson"
            onChange={handleChange}
            name="username"
            placeholder="Nome de usuário"
            value={formData.username}
          />
          <Input
            errorBorderColor="crimson"
            onChange={handleChange}
            name="password"
            placeholder="Senha"
            type="password"
            value={formData.password}
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

export default SecondStep;