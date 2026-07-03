import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import PrivateRoute from "./routes/PrivateRoute";
import { useAuth } from "./context/AuthContext";

export default function App() {

  const { loading } = useAuth();
  
  if (loading) {
      return (
          <div className="flex items-center justify-center h-screen">
              Cargando sesión...
          </div>
      );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="/expenses" element={<Expenses />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}