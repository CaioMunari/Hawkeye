import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Checkin from "./pages/Checkin";
import Register from "./pages/Register";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { LoginRoute, PrivateRoute } from "./services/UserRoutes";
import Login from "./pages/Login";

export default function Routes() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Switch>
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
            path="/"
            exact
            element={
              <PrivateRoute>
                <Checkin />
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
          <Route
            path="/register"
            exact
            element={
              <LoginRoute>
                <Register />
              </LoginRoute>
            }
          />
          <Route
            path="/registerPhoto"
            exact
            element={
              <LoginRoute>
                <Checkin />
              </LoginRoute>
            }
          />
        </Switch>
      </ChakraProvider>
    </BrowserRouter>
  );
}
