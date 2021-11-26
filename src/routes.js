import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Checkin from "./pages/Checkin";
import Header from "./components/Header";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "./theme";

export default function Routes() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Flex direction="column" h="100vh">
          <Header />
          <Switch>
            <Route path="/checkin" exact element={<Checkin />} />
            <Route path="/" exact element={<Checkin />} />
          </Switch>
        </Flex>
      </ChakraProvider>
    </BrowserRouter>
  );
}
