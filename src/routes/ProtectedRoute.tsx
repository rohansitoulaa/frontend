// src/components/auth/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface ProtectedRouteProps {
  adminOnly?: boolean;
  children: React.ReactNode;
}

const ADMIN_ID = "dyUWvAgD";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  adminOnly = false,
  children,
}) => {
  const { token, user } = useAuthStore();

  const isAuthenticated = !!token;
  const isAdmin = user?.UserId === ADMIN_ID;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
