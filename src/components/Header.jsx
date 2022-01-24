import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { clearToken, isAuthenticated } from "../services/auth";
import useOrientation from "../hooks/useOrientation";
import IconButton from "./IconButton";
import UserInfo from "./UserInfo";
export default function WithSubnavigation() {
  const navigate = useNavigate();
  const { getOrientationValue } = useOrientation();

  const logout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <Flex
      justify="space-between"
      px={getOrientationValue("5em", "2em")}
      py="2em"
      align="center"
      boxSizing="border-box"
    >
      <img
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/checkin")}
        width="200px"
        alt="Logo"
        src={"/images/logo.svg"}
      />
      {isAuthenticated() && (
        <Flex align="center">
          <IconButton
            style={{
              marginRight: "1rem",
              display: getOrientationValue("flex", "none"),
            }}
            _hover={{ backgroundColor: "#6F2FA2" }}
            onClick={() => navigate("/checkin")}
            name="check-circle"
            size="2rem"
            color="#F8F9FA"
            text="Fazer Checkin"
          />
          <IconButton
            style={{
              marginRight: "1rem",
              display: getOrientationValue("flex", "none"),
            }}
            _hover={{ backgroundColor: "#6F2FA2" }}
            onClick={() => navigate("/history")}
            name="spreadsheet"
            size="2rem"
            color="#F8F9FA"
            text="Histórico"
          />
          <UserInfo style={{ marginRight: "1rem" }} />
          <IconButton
            onClick={logout}
            name="log-out"
            size="2rem"
            color="#F8F9FA"
          ></IconButton>
        </Flex>
      )}
    </Flex>
  );
}
