import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const StatusStep = ({ nextStep }) => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        direction="column"
        justify="space-between"
        w="100%"
        align="center"
        h="100%"
      >
        <Box w="100%" align="center">
          <box-icon name="check-circle" color="#4DCCC4" size="15em" />
          <Text fontSize="1.5rem" colorScheme="black" mt={2}>
            Cadastro realizado com sucesso!
          </Text>
          <Text width="50%" fontSize="1rem" textAlign="center" color="gray.500">
            Agora você pode realizar seu acesso usando as credenciais
            cadastradas.
          </Text>
        </Box>
        <Button
          colorScheme="teal"
          backgroundColor="teal.300"
          width="40%"
          type="submit"
          style={{ textTransform: "uppercase" }}
          fontWeight="bold"
          onClick={() => navigate("/login")}
        >
          ir para o login
        </Button>
      </Flex>
    </>
  );
};

export default StatusStep;
