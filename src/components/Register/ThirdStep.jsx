import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  Flex,
  Stack,
  HStack,
  RadioGroup,
  Radio,
  Heading,
} from "@chakra-ui/react";
import Button from "../Button";
import Camera from "../Camera";
import CameraButton from "../CameraButton";
const ThirdStep = ({
  handleChange,
  verify,
  nextStep,
  prevStep,
  setImageSrc,
  imageSrc,
}) => {
  const [enableNextStep, setEnableNextStep] = useState(false);
  const webcamRef = useRef(null);

  const verifyFields = (e) => {
    const isValid = verify(["username", "password"]);
    setEnableNextStep(isValid);
    handleChange(e);
  };
  const capture = useCallback(() => {
    const img = webcamRef.current.getScreenshot({ width: 640, height: 640 });
    setImageSrc(img);
  }, [webcamRef]);

  return (
    <>
      <Flex direction="column" w="100%">
        <Heading fontWeight="normal">Cadastro</Heading>
        <Heading fontSize="1em" fontWeight="normal">
          Verificação Facial
        </Heading>

        <Flex
          direction="column"
          width="100%"
          justify="space-between"
          align="center"
        >
          <Flex
            width="100%"
            maxHeight="55vh"
            align="center"
            justify="flex-end"
            flexDirection={{ base: "column", md: "row" }}
            border="1px solid red"
          >
            <CameraButton
              capture={capture}
              imageSrc={imageSrc}
              deleteImage={() => setImageSrc(null)}
            >
              <Camera
                id="teste"
                imageSrc={imageSrc}
                ref={webcamRef}
                style={{ position: "absolute" }}
                w={{ base: "60vw", md: "350px" }}
                h={{ base: "60vw", md: "350px" }}
              />
            </CameraButton>
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
          loadingText="Submitting"
          disabled={!imageSrc}
        >
          Próximo
        </Button>
      </Flex>
    </>
  );
};

export default ThirdStep;
