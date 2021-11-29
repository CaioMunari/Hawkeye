import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { LoginRoute, PrivateRoute } from "./services/UserRoutes";
import theme from "./theme";
import Checkin from "./pages/Checkin";
import Login from "./pages/Login";
import History from "./pages/NotificationHistory";

export default function Routes() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route
            path="/"
            exact
            element={
              <LoginRoute>
                <Login />
              </LoginRoute>
            }
          />
          <Route
            path="/checkin"
            exact
            element={
              <PrivateRoute>
                <Checkin />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            exact
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            exact
            element={
              <LoginRoute>
                <Login />
              </LoginRoute>
            }
          />
        </Switch>
      </ChakraProvider>
    </BrowserRouter>
  );
}
