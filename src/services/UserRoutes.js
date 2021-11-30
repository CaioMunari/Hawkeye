import { Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import UnauthenticatedLayout from "../layout/UnauthenticatedLayout";
import { isAuthenticated } from "./auth";

export function PrivateRoute({ children }) {
  const auth = isAuthenticated();
  return auth ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
}

export function LoginRoute({ children }) {
  const auth = isAuthenticated();
  return auth ? (
    <Navigate to="/checkin" />
  ) : (
    <UnauthenticatedLayout>{children}</UnauthenticatedLayout>
  );
}
