import {
  Button,
  Flex,
  Text,
  usePrefersReducedMotion,
  keyframes,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PWAInstallerPrompt from "react-pwa-installer-prompt";

const spin = keyframes`
  from { bottom: -15vh; opacity: 0 }
  to { bottom: 0px; opacity: 1 }
`;
const Install = () => {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion ? undefined : `${spin}  .5s linear`;
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
            bg="purple.500"
            position="absolute"
            bottom="0"
            padding="1rem"
            flexDirection="column"
            align="center"
            justify="center"
            rounded="md"
            shadow="md"
            margin="0 auto"
          >
            <Button onClick={onClick}>Instalar aplicação</Button>
            <Text
              cursor="pointer"
              marginTop="1rem"
              color="gray.200"
              onClick={() => setIsOpen(false)}
            >
              Agora não
            </Text>
          </Flex>
        </Flex>
      )}
      callback={(data) => console.log(data)}
    />
  );
};
export default Install;
