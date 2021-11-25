import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Checkin from "./pages/Checkin";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

export default function Routes() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route path="/checkin" exact element={<Checkin />} />
          <Route path="/" exact element={<Home />} />
        </Switch>
      </ChakraProvider>
    </BrowserRouter>
  );
}
