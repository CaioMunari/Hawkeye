import React, { useState, useEffect } from "react";
import {
  Flex,
  HStack,
  RadioGroup,
  Radio,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import Button from "../Button";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
import { getResponsiveValue } from "../../utils/screen";

const FirstStep = ({
  handleChange,
  validateError,
  errorForm,
  verify,
  nextStep,
  formData,
  errorMsgs,
  isLoading,
}) => {
  const [enableNextStep, setEnableNextStep] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isValid = verify(["name", "gender", "registration"]);
    setEnableNextStep(isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const getBackToLogin = () => {
    setIsModalOpen(true);
    // if (
    //   window.confirm(
    //     "Deseja voltar à tela de Login? Todos os dados do cadastro serão perdidos!"
    //   )
    // ) {
    //   navigate("/login");
    // } else {
    //   // They clicked no
    // }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent padding="1rem">
          <ModalHeader fontSize="2rem" fontWeight="normal" fontFamily="Khand">
            Sair desta tela
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              As alterações feitas podem não ser salvas. Quer sair assim mesmo?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Flex pt={2} width="100%" justify="space-between">
              <Button
                width="40%"
                type="submit"
                color="gray.400"
                background="white"
                border="1px solid #ccc"
                onClick={() => setIsModalOpen(false)}
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
                onClick={() => navigate("/login")}
                isLoading={isLoading}
              >
                Sair
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex direction="column" w="100%" height="80%">
        <Heading fontSize="3rem" fontWeight="normal">
          Cadastro
        </Heading>
        <Heading
          fontSize="1.5rem"
          fontWeight="normal"
          style={{ marginBottom: getResponsiveValue(2, "em") }}
        >
          Dados Escolares
        </Heading>
        <Flex
          direction="column"
          width="100%"
          height="100%"
          justify="flex-start"
          align="flex-start"
        >
          <Input
            maxLength={510}
            errorBorderColor="crimson"
            bg="white"
            onChange={handleChange}
            name="name"
            placeholder="Nome completo"
            value={formData.name}
            description="Insira nome e sobrenome"
            onBlur={validateError}
            error={errorForm?.name}
          />

          <RadioGroup
            value={formData.gender}
            defaultValue=""
            name="gender"
            width="100%"
            onBlur={validateError}
            error={errorForm?.gender}
          >
            <HStack
              spacing="24px"
              height={16}
              bg="white"
              borderRadius="5"
              color="inherit"
            >
              <Radio
                errorBorderColor="crimson"
                value="M"
                onChange={handleChange}
              >
                Masculino
              </Radio>
              <Radio
                errorBorderColor="crimson"
                value="F"
                onChange={handleChange}
              >
                Feminino
              </Radio>
            </HStack>
          </RadioGroup>
          <Input
            errorBorderColor="crimson"
            bg="white"
            maxLength={255}
            onChange={handleChange}
            name="registration"
            placeholder="Número de matrícula"
            value={formData.registration}
            onBlur={validateError}
            error={errorForm?.registration}
            errorMsg={errorMsgs?.registration}
          />
        </Flex>
      </Flex>
      <Flex pt={2} width="100%" justify="space-between">
        <Button
          width="40%"
          type="submit"
          color="gray.400"
          background="white"
          border="1px solid #ccc"
          onClick={getBackToLogin}
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
          disabled={!enableNextStep || isLoading}
          isLoading={isLoading}
        >
          Próximo
        </Button>
      </Flex>
    </>
  );
};

export default FirstStep;
