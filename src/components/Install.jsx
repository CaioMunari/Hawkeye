import {
  Button,
  Flex,
  Text,
  usePrefersReducedMotion,
  keyframes,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PWAInstallerPrompt from "react-pwa-installer-prompt";
import useOrientation from "../hooks/useOrientation";

const spin = keyframes`
  from { bottom: -15vh; opacity: 0 }
  to { bottom: 1rem; opacity: 1 }
`;
const Install = () => {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { getOrientationValue } = useOrientation();
  const animation = prefersReducedMotion ? undefined : `${spin}  .3s linear`;
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  }, []);

  return (
    <PWAInstallerPrompt
      render={({ onClick }) => (
        <Flex justify="center" display={isOpen ? "flex" : "none"}>
          <Flex
            animation={animation}
            bg="rgba(148, 76, 205, 0.5)"
            position="absolute"
            bottom="0"
            flexDirection="column"
            align="center"
            justify="center"
            rounded="md"
            shadow="md"
            margin="0 auto"
            padding="1rem"
            borderRadius="8px"
            zIndex="999"
            maxWidth={{ base: "85%", md: getOrientationValue("20%", "45%") }}
          >
            <Flex align="center" w="100%" h="50%">
              <Image w="3rem" h="3rem" src="images/logo_white.svg" />
              <Text marginLeft="1rem" color="white">
                Faça seu checkin utilizando o aplicativo EDU Checkin.
              </Text>
            </Flex>
            <Flex marginTop=".5rem" w="100%" justify="flex-end" align="center">
              <Text
                cursor="pointer"
                color="gray.200"
                onClick={() => setIsOpen(false)}
                marginRight="1rem"
                verticalAlign="middle"
                fontWeight={500}
              >
                Agora não
              </Text>
              <Button onClick={onClick}>Instalar</Button>
            </Flex>
          </Flex>
        </Flex>
      )}
      callback={(data) => console.log(data)}
    ></PWAInstallerPrompt>
  );
};
export default Install;
