import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { getProperty } from "../services/auth";
import { buildBase64URL } from "../utils/photo";
const UserInfo = ({ style }) => {
  const userInfo = getProperty("userInfo");
  return (
    <Flex align="center" justify="space-between" style={style}>
      <Heading
        title={userInfo.name + " " + userInfo.lastName}
        fontSize="1rem"
        fontWeight="normal"
        color="#F8F9FA"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100px",
        }}
      >
        {userInfo.name + " " + userInfo.lastName}
      </Heading>
      <img
        style={{ width: "2rem", borderRadius: "50%", marginLeft: "1rem" }}
        src={buildBase64URL(userInfo.photo.image)}
        alt=""
        srcset=""
      />
    </Flex>
  );
};

export default UserInfo;
