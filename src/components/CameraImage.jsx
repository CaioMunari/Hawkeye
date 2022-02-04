import {
  Flex,
  Image,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import React from "react";
import CheckinStatus from "./CheckinStatus";

const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const CameraImage = ({ src, w, h, checkinIsCompleted, success }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animation = prefersReducedMotion ? undefined : `${blink} .5s linear`;
  return (
    <Flex
      align="center"
      justify="center"
      w={w || ["80vw", "60vw", "35vw"]}
      h={h || ["80vw", "60vw", "35vw"]}
      animation={animation}
      borderRadius="50%"
      zIndex={1}
      bg={"black"}
      border={checkinIsCompleted && "8px solid"}
      borderColor={success === true ? "teal" : "red.500"}
    >
      {checkinIsCompleted === true && <CheckinStatus success={success} />}
      <Image
        src={src}
        width="100%"
        height="100%"
        borderRadius="16px"
        opacity={checkinIsCompleted && 0.6}
        style={{
          objectFit: "cover",
          borderRadius: "50%",
          zIndex: -1,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </Flex>
  );
};

export default CameraImage;
