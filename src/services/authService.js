import api from "../api/axiosConfig";

export const loginRequest = async (email, password) => {
    const response = await api.post("/auth/login", {
        email: email.trim(),
        password
    });

    return response.data;
};