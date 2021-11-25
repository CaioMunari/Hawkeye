import {
  Box,
  Image,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import React from "react";

const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const CameraImage = ({ src }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animation = prefersReducedMotion ? undefined : `${blink} .5s linear`;
  return (
    <Box
      bg="pink"
      w={["80vw", "60vw", "35vw"]}
      h={["80vw", "60vw", "35vw"]}
      borderRadius="50%"
      animation={animation}
    >
      <Image src={src} width="100%" height="100%" borderRadius="50%" />
    </Box>
  );
};

export default CameraImage;
