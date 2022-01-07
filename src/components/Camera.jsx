import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Webcam from "react-webcam";
import CameraImage from "./CameraImage";
import Spinner from "./Spinner";

const videoConstraints = {
  width: 640,
  height: 640,
  facingMode: "user",
};

const Camera = React.forwardRef((props, ref) => {
  return (
    <Flex
      justify="center"
      align="center"
      w={props.w || ["80vw", "60vw", "35vw"]}
      h={props.h || ["80vw", "60vw", "35vw"]}
      borderRadius="50%"
      bg="gray.200"
      backgroundImage={!props.imageSrc && "url('/images/camera.png')"}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="30%"
      overflow="hidden"
    >
      {props.isLoading && <Spinner w={props.w} h={props.h} />}
      {props.imageSrc ? (
        <CameraImage src={props.imageSrc} w={props.w} h={props.h} />
      ) : (
        <Webcam
          ref={ref}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          videoConstraints={videoConstraints}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
        />
      )}
    </Flex>
  );
});

export default Camera;
