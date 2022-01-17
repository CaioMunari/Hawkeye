import React, { useRef, useCallback } from "react";
import { Fade, Flex, Heading, Text } from "@chakra-ui/react";
import Button from "../Button";
import Camera from "../Camera";
import CameraButton from "../CameraButton";
import useOrientation from "../../hooks/useOrientation";
const ThirdStep = ({ nextStep, prevStep, setImageSrc, imageSrc }) => {
  const webcamRef = useRef(null);
  const { getOrientationValue } = useOrientation();
  const capture = useCallback(() => {
    const img = webcamRef.current.getScreenshot({ width: 640, height: 640 });
    setImageSrc(img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);

  return (
    <>
      <Flex direction="column" w="100%">
        <Heading fontSize="3rem" fontWeight="normal">
          Cadastro
        </Heading>
        <Heading fontSize="1.5rem" fontWeight="normal">
          Verificação Facial
        </Heading>
      </Flex>
      <Flex
        direction="column"
        width="100%"
        justify="space-between"
        align="center"
        paddingBottom="1rem"
      >
        <Flex width="100%" align="center" justify="flex-end" height="100%">
          <CameraButton
            capture={capture}
            imageSrc={imageSrc}
            deleteImage={() => setImageSrc(null)}
          >
            <Camera
              id="teste"
              imageSrc={imageSrc}
              ref={webcamRef}
              w={{ base: "220px", md: getOrientationValue("16vw", "50vw") }}
              h={{ base: "220px", md: getOrientationValue("16vw", "50vw") }}
            />
          </CameraButton>
        </Flex>
        {!imageSrc ? (
          <Text
            style={{ marginTop: "1rem" }}
            color="gray"
            width="50%"
            textAlign="center"
          >
            Aponte o rosto para câmera e clique no botão da câmera para capturar
            sua foto.
          </Text>
        ) : (
          <>
            <Text
              style={{ marginTop: "1rem" }}
              color="gray"
              width="55%"
              textAlign="center"
            >
              <Fade delay={0.5} in={imageSrc}>
                Pronto! Esta será sua foto de verificação.
              </Fade>
            </Text>
            <Text color="gray" width="55%" textAlign="center">
              <Fade delay={1.5} in={imageSrc}>
                Você pode deletar e capturar uma de seu gosto.
              </Fade>
            </Text>
          </>
        )}
      </Flex>
      <Flex width="100%" justify="center">
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
          border="1px solid white"
          style={{ textTransform: "uppercase", marginLeft: "1.5rem" }}
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
