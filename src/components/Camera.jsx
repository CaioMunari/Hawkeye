import React from "react";
import { Box } from "@chakra-ui/react";
import Webcam from "react-webcam";
import CameraImage from "./CameraImage";

const videoConstraints = {
  width: 1080,
  height: 1080,
  facingMode: "user",
};

const Camera = React.forwardRef((props, ref) => {
  return (
    <Box
      border="2px solid"
      borderColor="gray.500"
      w={["80vw", "60vw", "35vw"]}
      h={["80vw", "60vw", "35vw"]}
      borderRadius="50%"
      bg="gray.200"
      backgroundImage={!props.imageSrc && "url('/images/camera.png')"}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="30%"
      overflow="hidden"
    >
      {props.imageSrc ? (
        <CameraImage src={props.imageSrc} />
      ) : (
        <Webcam
          ref={ref}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          videoConstraints={videoConstraints}
          screenshotFormat="image/jpeg"
        />
      )}
    </Box>
  );
});

export default Camera;
