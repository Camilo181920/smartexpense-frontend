import api from "../api/axiosConfig";

export const getSummary = async () => {
    const response = await api.get("/expenses/summary");
    return response.data;
};


export const getExpenses = async () => {
    const response = await api.get("/expenses");
    return response.data;
};


export const getExpensesByCategory = async () => {
    const response = await api.get("/expenses/by-category");
    return response.data;
};


export const createExpense = async (data) => {
    const response = await api.post("/expenses", data);
    return response.data;
};


export const updateExpense = async (id, data) => {
    const response = await api.put(`/expenses/${id}`, data);
    return response.data;
};


export const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}`);
};