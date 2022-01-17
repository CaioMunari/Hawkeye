import { Box, Fade } from "@chakra-ui/react";
import React from "react";
import IconButton from "./IconButton";

const CheckinStatus = ({ success }) => {
  return (
    <Box style={{ position: "absolute" }}>
      <Fade delay={1} in={true}>
        {success === true ? (
          <IconButton
            type="regular"
            size="10rem"
            color="#4DCCC4"
            name="check-circle"
          />
        ) : (
          <IconButton type="regular" size="10rem" color="#FF615E" name="x" />
        )}
      </Fade>
    </Box>
  );
};

export default CheckinStatus;
