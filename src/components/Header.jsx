import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../services/auth";
import useOrientation from "../hooks/useOrientation";
import IconButton from "./IconButton";
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
    >
      <img
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/checkin")}
        width="200px"
        alt="Logo"
        src={"/images/logo.svg"}
      />
      {getToken() !== null && (
        <Flex>
          <IconButton
            style={{ marginLeft: "1rem" }}
            onClick={() => navigate("/history")}
            name="spreadsheet"
            size="2em"
            color="#F8F9FA"
            text="Histórico"
          />
          <IconButton
            style={{ marginLeft: "1rem" }}
            onClick={logout}
            name="log-out"
            size="2em"
            color="#F8F9FA"
          ></IconButton>
        </Flex>
      )}
    </Flex>
  );
}
