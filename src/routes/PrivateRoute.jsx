import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/common/LoadingScreen";

export default function PrivateRoute() {

    const { token, loading } = useAuth();

    if (loading) {
        return <LoadingScreen />;
    }

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}