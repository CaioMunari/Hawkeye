import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Checkin from "./pages/Checkin";
import Register from "./pages/Register";
import { ChakraProvider } from "@chakra-ui/react";
import {
  LoginRoute,
  PrivateRoute,
  SerialNumberRoute,
} from "./services/UserRoutes";
import theme from "./theme";
import Login from "./pages/Login";
import History from "./pages/NotificationHistory";
import SerialNumber from "./pages/SerialNumber";
import "boxicons";
import { SyncProvider } from "./hooks/useSync";
export default function Routes() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <SyncProvider>
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
              path="/serialnumber"
              exact
              element={
                <SerialNumberRoute>
                  <SerialNumber />
                </SerialNumberRoute>
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
        </SyncProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}
