import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosConfig";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {

            const savedToken = localStorage.getItem("token");

            if (!savedToken) {
            setLoading(false);
            return;
        }

        try {
            const response = await api.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${savedToken}`
                }
            });

            setToken(savedToken);
            setUser(response.data);

        } catch (error) {
            console.log("Token inválido");
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        }

        setLoading(false);
    };
    
    initAuth();
        
    }, []);

    const login = (jwt, userData) => {
        setToken(jwt);
        setUser(userData);

        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}