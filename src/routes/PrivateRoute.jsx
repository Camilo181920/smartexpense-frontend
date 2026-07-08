import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/useAuth";
import LoadingScreen from "../components/common/LoadingScreen";


export default function PrivateRoute() {

    const { token, user, loading } = useAuth();


    if (loading) {
        return <LoadingScreen />;
    }


    if (!token || !user) {
        return <Navigate to="/" replace />;
    }


    return <Outlet />;
}