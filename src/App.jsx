import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import PrivateRoute from "./routes/PrivateRoute";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";


export default function App() {

  return (

    <BrowserRouter>

      <Routes>


        <Route path="/" element={<Login />} />


        <Route element={<PrivateRoute />}>

          <Route element={<Layout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/expenses"
              element={<Expenses />}
            />

          </Route>

        </Route>


        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />


      </Routes>

    </BrowserRouter>

  );
}