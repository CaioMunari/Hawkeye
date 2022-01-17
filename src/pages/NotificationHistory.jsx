import React, { useEffect, useState } from "react";
import { Stack, Button, Flex, Heading, Box, Image } from "@chakra-ui/react";
import { api } from "../services/api";
import { getProperty } from "../services/auth";
import { routes } from "../services/routes";
import Paper from "../components/Paper";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import moment from "moment";
import IconButton from "../components/IconButton";
import { buildBase64URL } from "../utils/photo";
import Zoom from "react-medium-image-zoom";
import useOrientation from "../hooks/useOrientation";

export default function NotificationHistory() {
  const baseURL = api.defaults.baseURL;

  const [historyList, setHistoryList] = useState([]);
  const [page, setPage] = useState(0);

  const userInfo = getProperty("userInfo");
  const { getOrientationValue } = useOrientation();

  function alterPage(cmd) {
    if (cmd === "next") {
      if (historyList.length !== 5) return; //TODO: Improve next page logic
      if (historyList.length > 1) setPage(page + 1);
    } else {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    async function getHistoryList(id) {
      const response = await api.get(routes.APICheckInUserHistory(id, page));
      setHistoryList(response.data);
      //console.log(response.data)
    }
    const user = getProperty("userId");
    getHistoryList(user);
  }, [page]);

  return (
    <Flex
      direction="column"
      justify={{
        base: "flex-start",
        md: getOrientationValue("flex-start", "center"),
      }}
      align="center"
      width="100%"
      h="100%"
      flex={1}
    >
      <Paper>
        <Flex direction="column" w="100%" height="80%">
          <Heading fontSize="3rem" fontWeight="normal">
            Histórico
          </Heading>
          <Box
            border="1px solid"
            borderColor="gray.300"
            borderRadius="8px"
            overflowY="auto"
            h={"50vh"}
            px={"1.25rem"}
            py={"2rem"}
          >
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th fontSize="1.2rem" fontWeight="normal" color="#944CCD">
                    Cadastro
                  </Th>
                  <Th fontSize="1.2rem" fontWeight="normal" color="#944CCD">
                    Foto
                  </Th>
                  <Th fontSize="1.2rem" fontWeight="normal" color="#944CCD">
                    Nº Transação
                  </Th>
                  <Th fontSize="1.2rem" fontWeight="normal" color="#944CCD">
                    Data e horário
                  </Th>
                  <Th fontSize="1.2rem" fontWeight="normal" color="#944CCD">
                    Status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {historyList.map((item) => (
                  <Tr key={item.id}>
                    <Td>
                      <Zoom overlayBgColorEnd="rgba(0,0,0,0.7)" zoomMargin={10}>
                        <Image
                          w="2.5rem"
                          h="2.5rem"
                          borderRadius="50%"
                          src={buildBase64URL(userInfo.photo.image)}
                          alt=""
                        />
                      </Zoom>
                    </Td>
                    <Td>
                      <Zoom overlayBgColorEnd="rgba(0,0,0,0.7)" zoomMargin={10}>
                        <Image
                          w="2.5rem"
                          h="2.5rem"
                          borderRadius="50%"
                          src={baseURL + routes.APITransPhoto(item.id)}
                          alt=""
                        />
                      </Zoom>
                    </Td>
                    <Td>{item.id}</Td>
                    <Td>
                      {moment(item.dateCheck).format("DD/MM/YYYY HH:mm:ss")}
                    </Td>
                    <Td>
                      {item.approval === true ? (
                        <IconButton
                          size="2.5rem"
                          name="check-circle"
                          type="solid"
                          color="#4DCCC4"
                        />
                      ) : (
                        <IconButton
                          size="2.5rem"
                          name="x-circle"
                          type="solid"
                          color="#DF5552"
                        />
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <PageNav />
        </Flex>
      </Paper>
    </Flex>
  );

  function PageNav() {
    return (
      <Stack direction={"row"} align="center" justify="flex-end" pt={4}>
        <Button
          onClick={() => page + 1 > 1 && alterPage("prev")}
          disabled={page + 1 === 1 ? true : false}
          width="2rem"
          colorScheme="purple"
          _hover={{
            cursor: "pointer",
          }}
        >
          <box-icon
            size="2rem"
            type="solid"
            color="#fff"
            name="left-arrow-alt"
          ></box-icon>
        </Button>
        <Box
          border="1px solid"
          py={2}
          px={4}
          borderColor="gray.300"
          fontWeight="bold"
          borderRadius="4px "
        >
          {page + 1}
        </Box>
        <Button
          onClick={() => alterPage("next")}
          display={{ base: "inline-flex", md: "inline-flex" }}
          disabled={historyList.length !== 5}
          colorScheme="purple"
          width="2rem"
        >
          <box-icon
            size="2rem"
            type="solid"
            color="#fff"
            name="right-arrow-alt"
          ></box-icon>
        </Button>
      </Stack>
    );
  }
}
