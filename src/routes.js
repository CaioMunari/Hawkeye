import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Checkin from "./pages/Checkin";
import Register from "./pages/Register";
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
