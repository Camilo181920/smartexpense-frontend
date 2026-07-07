import { 
    createContext, 
    useCallback, 
    useContext, 
    useEffect, 
    useMemo, 
    useState 
} from "react";
import { getCurrentUser } from "../services/userService";
import api from "../api/axiosConfig";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [token, setToken] = useState(() =>
        localStorage.getItem("token")
    );

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

                const currentUser = await getCurrentUser();

                setToken(savedToken);
                setUser(currentUser);

            } catch (error) {

                console.error("Sesión inválida", error);

                localStorage.removeItem("token");

                setToken(null);
                setUser(null);

            } finally {

                setLoading(false);

            }
        };

        initAuth();

    }, []);


    const login = useCallback(async (jwt) => {

        localStorage.setItem("token", jwt);

        setToken(jwt);

        const currentUser = await getCurrentUser();

        setUser(currentUser);

    }, []);


    const logout = useCallback(() => {

        setToken(null);
        setUser(null);

        localStorage.removeItem("token");

    }, []);


    const value = useMemo(() => ({
        token,
        user,
        login,
        logout,
        loading
    }), [
        token,
        user,
        login,
        logout,
        loading
    ]);


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {

    return useContext(AuthContext);

}