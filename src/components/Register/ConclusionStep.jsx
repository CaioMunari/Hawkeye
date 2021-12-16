import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import useOrientation from "../../hooks/useOrientation";
import CameraImage from "../CameraImage";
const ConclusionStep = ({
  nextStep,
  prevStep,
  imageSrc,
  formData,
  isLoading,
}) => {
  const { getOrientationValue } = useOrientation();
  return (
    <>
      <Flex direction="column" justify="center" w="100%">
        <Heading fontWeight="normal" fontSize="3em">
          Concluir Cadastro
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          width="100%"
          align="center"
          justify="flex-start"
          py={5}
          px={10}
        >
          <CameraImage
            src={imageSrc}
            w={{ base: "220px", md: getOrientationValue("18vw", "80vw") }}
            h={{ base: "220px", md: getOrientationValue("18vw", "80vw") }}
          />
          <Flex
            mt={{ base: 5, md: 0 }}
            direction="column"
            marginLeft={10}
            justify="flex-start"
          >
            <Text fontSize="2em" fontWeight="semibold">
              {formData?.name || "Fabricio Silva"}
            </Text>
            <Flex>
              <Text fontWeight="semibold" fontSize="1em" color="gray">
                Usuário:
              </Text>
              <Text ml={2} fontSize="1em" fontWeight="semibold">
                {formData?.username || "fabricio.silva"}
              </Text>
            </Flex>
            <Flex>
              <Text fontWeight="semibold" fontSize="1em" color="gray">
                Matrícula:
              </Text>
              <Text ml={2} fontSize="1em" fontWeight="semibold">
                {formData?.registration || "1234567890"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex width="100%" justify="space-between" mt={0}>
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
          isLoading={isLoading}
        >
          Próximo
        </Button>
      </Flex>
    </>
  );
};

export default ConclusionStep;
