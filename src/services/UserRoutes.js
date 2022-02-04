import { Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import UnauthenticatedLayout from "../layout/UnauthenticatedLayout";
import { isAuthenticated, isSNRegistered, getSNToken } from "./auth";

export function PrivateRoute({ children }) {
  const auth = isAuthenticated();
  return auth ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
}

export function LoginRoute({ children }) {
  const auth = isAuthenticated();
  const SN = isSNRegistered();
  return auth ? (
    <Navigate to="/checkin" />
  ) : SN ? (
    <UnauthenticatedLayout>{children}</UnauthenticatedLayout>
  ) : (
    <Navigate to="/serialnumber" />
  );
}

export function SerialNumberRoute({ children }) {
  const hasToken = getSNToken();
  return hasToken ? (
    <Navigate to="/login" />
  ) : (
    <UnauthenticatedLayout>{children}</UnauthenticatedLayout>
  );
}
